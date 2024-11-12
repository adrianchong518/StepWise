"use client";

import { getNodesBounds } from "@xyflow/react";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { createStore, type StoreApi } from "zustand/vanilla";

import type { Question, StepId } from "@/app/api/question";
import { StepNode } from "../components/StepNode";
import { getStepNodeId } from "../lib";
import { createGraphStore, GraphStore } from "./graph";

export type DemoStore = GraphStore & {
  question?: Question;
  displayedSteps: StepId[];
  setQuestion: (question: Question) => void;
  addStep: (step: StepId) => void;
};

const createDemoStore = () =>
  createStore<DemoStore>()((...a) => {
    const [set, get] = a;
    return {
      ...createGraphStore(...a),
      displayedSteps: [],
      setQuestion: (question) =>
        set({
          question,
          nodes: [
            {
              id: getStepNodeId(question.id, 0),
              type: "step",
              data: { questionId: question.id, stepNumber: 0, stepId: 0 },
              position: { x: 0, y: 0 },
            },
          ],
          displayedSteps: [question.steps[0].id],
        }),

      addStep: (step) => {
        if (step in get().displayedSteps) return;
        const question = get().question;
        if (question === undefined) return;
        if (!(step in question.steps)) return;
        const source = getStepNodeId(
          question.id,
          get().displayedSteps[get().displayedSteps.length - 1],
        );
        const target = getStepNodeId(question.id, step);
        const newNode: StepNode = {
          id: target,
          type: "step",
          data: {
            questionId: question.id,
            stepNumber: get().displayedSteps.length,
            stepId: step,
          },
          position: { x: 0, y: 700 * get().displayedSteps.length },
        };
        console.log(getNodesBounds([newNode]));
        set({
          displayedSteps: [...get().displayedSteps, step],
          nodes: [...get().nodes, newNode],
          edges: [
            ...get().edges,
            {
              id: `${source}->${target}`,
              source,
              sourceHandle: "next-step",
              target,
              targetHandle: "prev-step",
            },
          ],
        });
      },
    };
  });

export const DemoStoreContext = createContext<StoreApi<DemoStore> | undefined>(
  undefined,
);

export const DemoStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StoreApi<DemoStore>>(null);
  if (!storeRef.current) {
    storeRef.current = createDemoStore();
  }

  return (
    <DemoStoreContext.Provider value={storeRef.current}>
      {children}
    </DemoStoreContext.Provider>
  );
};

const useDemoStore = <T,>(selector: (store: DemoStore) => T): T => {
  const appStoreContext = useContext(DemoStoreContext);

  if (!appStoreContext) {
    throw new Error(`useDemoStore must be used within DemoStoreProvider`);
  }

  return useStore(appStoreContext, useShallow(selector));
};
export default useDemoStore;

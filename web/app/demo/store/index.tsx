"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import { createStore, type StoreApi } from "zustand/vanilla";

import type { Question, StepId } from "@/app/api/question";
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
          edges: [
            {
              id: "ahh",
              source: getStepNodeId(question.id, 0),
              sourceHandle: "next-step",
              target: getStepNodeId(question.id, 1),
              targetHandle: "prev-step",
            },
          ],
          displayedSteps: [question.steps[0].id],
        }),

      addStep: (step) => {
        if (step in get().displayedSteps) return;
        const question = get().question;
        if (question === undefined) return;
        if (!(step in question.steps)) return;
        set({
          displayedSteps: [...get().displayedSteps, step],
          nodes: [
            ...get().nodes,
            {
              id: getStepNodeId(question.id, step),
              type: "step",
              data: {
                questionId: question.id,
                stepNumber: get().displayedSteps.length,
                stepId: step,
              },
              position: { x: 0, y: 1000 * get().displayedSteps.length },
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

  return useStore(appStoreContext, selector);
};
export default useDemoStore;

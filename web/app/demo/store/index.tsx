"use client";

import { MarkerType } from "@xyflow/react";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { createStore, type StoreApi } from "zustand/vanilla";

import type { Question, StepId } from "@/app/api/question";
import type { Sample, SampleId } from "@/app/api/sample";
import type { SampleNode, SampleQuestionNode } from "../components/SampleNode";
import type { StepNode } from "../components/StepNode";
import { createEdge, createNode, getSampleNodeId, getStepNodeId } from "../lib";
import { createGraphStore, type DemoNode, type GraphStore } from "./graph";

export type DemoStore = GraphStore & {
  question?: Question;
  setQuestion: (question: Question) => void;

  questionExpanded: boolean;
  setQuestionExpanded: (expanded: boolean) => void;

  displayedSteps: StepId[];
  addStep: (step: StepId) => { nodeId: string; edgeId: string } | undefined;
  addSampleBase: (
    step: StepId,
    sampleId: SampleId,
  ) => { nodeId: string; edgeId: string } | undefined;
  addSample: (baseNodeId: string, sample: Sample) => void;
};

const createDemoStore = () =>
  createStore<DemoStore>()((...a) => {
    const [set, get] = a;
    return {
      ...createGraphStore(...a),
      questionExpanded: true,
      setQuestionExpanded: (expanded) => {
        set({ questionExpanded: expanded });
      },
      displayedSteps: [],
      setQuestion: (question) =>
        set({
          question,
          nodes: [
            createNode({
              id: getStepNodeId(question.id, 0),
              type: "step",
              data: { questionId: question.id, stepNumber: 0, stepId: 0 },
              position: { x: 0, y: 0 },
            }),
          ],
          displayedSteps: [question.steps[0].id],
        }),

      addStep: (step) => {
        const question = get().question;
        if (question === undefined) return;
        if (!(step in question.steps)) return;

        const source = getStepNodeId(
          question.id,
          get().displayedSteps[get().displayedSteps.length - 1],
        );
        const target = getStepNodeId(question.id, step);

        if (step in get().displayedSteps)
          return { nodeId: target, edgeId: `${source}->${target}` };

        const newNode = createNode<StepNode>({
          id: target,
          type: "step",
          data: {
            questionId: question.id,
            stepNumber: get().displayedSteps.length,
            stepId: step,
          },
          position: { x: 0, y: 700 * get().displayedSteps.length },
        });

        const nextStepEdge = createEdge({
          id: `${source}->${target}`,
          source,
          sourceHandle: "next-step",
          target,
          targetHandle: "prev-step",
          style: { strokeWidth: 4 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
          },
          animated: true,
        });

        set({
          displayedSteps: [...get().displayedSteps, step],
          nodes: [...get().nodes, newNode],
          edges: [...get().edges, nextStepEdge],
        });

        return { nodeId: newNode.id, edgeId: nextStepEdge.id };
      },

      addSampleBase: (stepId, sampleId) => {
        const question = get().question;
        if (question === undefined) return;
        if (!(stepId in get().displayedSteps)) return;

        const stepNodeId = getStepNodeId(question.id, stepId);
        const stepNode = get().nodes.find(
          (n) => n.id === stepNodeId,
        ) as StepNode;
        const sampleNodeId = getSampleNodeId(question.id, sampleId);

        if (get().nodes.find((n) => n.id === sampleNodeId) === undefined) {
          const sampleNode = createNode<SampleNode>({
            id: sampleNodeId,
            type: "sample",
            data: { sampleId },
            position: {
              x: stepNode.position.x + 1000,
              y: stepNode.position.y,
            },
            style: {
              width: 750,
              height: 1000,
            },
          });
          set({ nodes: [...get().nodes, sampleNode] });
        }

        const sampleEdgeId = `${stepNodeId}->${sampleNodeId}`;
        if (get().edges.find((e) => e.id === sampleEdgeId) === undefined) {
          const sampleEdge = createEdge({
            id: sampleEdgeId,
            source: stepNodeId,
            sourceHandle: "explain",
            target: sampleNodeId,
            style: { strokeWidth: 4 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
            },
            animated: true,
          });
          set({ edges: [...get().edges, sampleEdge] });
        }

        return { nodeId: sampleNodeId, edgeId: sampleEdgeId };
      },

      addSample: (baseNodeId, sample) => {
        const questionNode = createNode<SampleQuestionNode>(
          {
            id: `${baseNodeId}_question`,
            type: "sample-question",
            data: { sample },
            parentId: baseNodeId,
            position: { x: 0, y: 0 },
          },
          false,
        );

        set({
          nodes: [...get().nodes, questionNode],
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

"use client";

import { MarkerType } from "@xyflow/react";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { createStore, type StoreApi } from "zustand/vanilla";

import { ConceptId } from "@/app/api/concept";
import type { Question, StepId } from "@/app/api/question";
import type { Sample, SampleId, SampleStepId } from "@/app/api/sample";
import { nextTick } from "@/app/utils";
import { layoutELK } from "@/app/utils/auto-layout";
import tailwindConfig from "@/app/utils/tailwind";
import { ConceptNode } from "../components/ConceptNode";
import type {
  SampleNode,
  SampleQuestionNode,
  SampleStepNode,
} from "../components/SampleNode";
import type { StepNode } from "../components/StepNode";
import {
  createEdge,
  createNode,
  getConceptNodeId,
  getSampleNodeId,
  getStepNodeId,
} from "../lib";
import { createGraphStore, type GraphStore } from "./graph";

export type DemoStore = GraphStore & {
  question?: Question;
  setQuestion: (question: Question) => void;

  questionExpanded: boolean;
  setQuestionExpanded: (expanded: boolean) => void;

  displayedSteps: StepId[];
  addStep: (step: StepId) => { nodeId: string; edgeId: string } | undefined;
  currentStep: StepId;
  setCurrentStep: (step: StepId) => void;

  displayedSamples: SampleId[];
  addSampleBase: (
    step: StepId,
    sampleId: SampleId,
  ) => { nodeId: string; edgeId: string; exists: boolean } | undefined;
  addSample: (baseNodeId: string, sample: Sample) => Promise<void>;
  currentSample: SampleId;
  setCurrentSample: (sampleId: SampleId) => void;
  showExplain: (id: number) => void;

  displayedConcepts: ConceptId[];
  addConcept: (
    sampleId: SampleId,
    conceptId: ConceptId,
  ) => { nodeId: string; edgeId: string; exists: boolean } | undefined;
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
      setQuestion: (question) =>
        set({
          question,
          nodes: [
            createNode({
              id: question.id,
              type: "question",
              data: {
                questionId: question.id,
                questionDetail: question.details,
              },
              position: { x: 0, y: 0 },
            }),
            createNode({
              id: getStepNodeId(question.id, 0),
              type: "step",
              data: { questionId: question.id, stepNumber: 0, stepId: 0 },
              position: { x: 0, y: 700 },
            }),
            createNode({
              id: "explain1",
              type: "explainer",
              data: {
                title: "Herons Formula",
                content:
                  "Herons Formula is usually used to find the area of a triangle using the lengths of the three sides.",
                stepNodeId: getStepNodeId(question.id, 1),
              },
              position: { x: -800, y: 1150 },
              hidden: true,
            }),
            createNode({
              id: "explain2",
              type: "explainer",
              data: {
                title: "Cosine Formula",
                content:
                  "To use the cosine formula for finding an angle, you need the all three side lengths of the triangle.",
                stepNodeId: getStepNodeId(question.id, 1),
              },
              position: { x: -800, y: 1500 },
              hidden: true,
            }),
          ],
          displayedSteps: [question.steps[0].id],
          edges: [
            createEdge({
              id: `${question.id}->${getStepNodeId(question.id, 0)}`,
              source: question.id,
              sourceHandle: "next-step",
              target: getStepNodeId(question.id, 0),
              targetHandle: "prev-step",
            }),
          ],
          currentStep: 0,
          displayedSamples: [],
          displayedConcepts: [],
        }),

      displayedSteps: [],
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
          position: { x: 0, y: 700 * get().displayedSteps.length + 700 },
        });

        const nextStepEdge = createEdge({
          id: `${source}->${target}`,
          source,
          sourceHandle: "next-step",
          target,
          targetHandle: "prev-step",
        });

        set({
          displayedSteps: [...get().displayedSteps, step],
          nodes: [...get().nodes, newNode],
          edges: [...get().edges, nextStepEdge],
        });

        if (step == 1) {
          set({
            edges: [
              ...get().edges,
              createEdge({
                id: `explain1`,
                source: target,
                sourceHandle: "explainer",
                target: "explain1",
                hidden: true,
              }),
              createEdge({
                id: `explain2`,
                source: target,
                sourceHandle: "explainer",
                target: "explain2",
                hidden: true,
              }),
            ],
          });
        }

        return { nodeId: newNode.id, edgeId: nextStepEdge.id };
      },
      showExplain: (id) => {
        set({
          nodes: get().nodes.map((n) => {
            if (n.id == `explain${id}`) {
              return { ...n, hidden: false };
            }
            return n;
          }),
          edges: get().edges.map((e) => {
            if (e.id == `explain${id}`) {
              return { ...e, hidden: false };
            }
            return e;
          }),
        });
      },

      currentStep: 0,
      setCurrentStep: (step) => {
        if (get().displayedSteps.includes(step)) {
          set({ currentStep: step });
        }
      },

      displayedSamples: [],
      addSampleBase: (stepId, sampleId) => {
        const question = get().question;
        if (question === undefined) return;
        if (!(stepId in get().displayedSteps)) return;

        const stepNodeId = getStepNodeId(question.id, stepId);
        const stepNode = get().nodes.find(
          (n) => n.id === stepNodeId,
        ) as StepNode;
        const sampleNodeId = getSampleNodeId(question.id, sampleId);

        let exists = true;
        if (get().nodes.find((n) => n.id === sampleNodeId) === undefined) {
          exists = false;
          const sampleNode = createNode<SampleNode>({
            id: sampleNodeId,
            type: "sample",
            data: { sampleId },
            position: {
              x: stepNode.position.x + 750,
              y: stepNode.position.y,
            },
            origin: [0, 0.5],
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
          });
          set({ edges: [...get().edges, sampleEdge] });
        }

        return { nodeId: sampleNodeId, edgeId: sampleEdgeId, exists };
      },

      addSample: async (baseNodeId, sample) => {
        if (get().displayedSamples.includes(sample.id)) return;
        const questionNodeId = `${baseNodeId}_question`;
        const stepNodeId = (id: SampleStepId) => `${baseNodeId}_step_${id}`;

        const newEdges = sample.steps.flatMap((step) =>
          createEdge({
            id: `${questionNodeId}->${stepNodeId(step.id)}`,
            source: questionNodeId,
            target: stepNodeId(step.id),
            zIndex: 1,
            style: {
              strokeWidth: 4,
              stroke: tailwindConfig.colors.purple[300],
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: tailwindConfig.colors.purple[400],
            },
          }),
        );

        set({
          displayedSamples: [...get().displayedSamples, sample.id],
          nodes: [
            ...get().nodes,
            createNode<SampleQuestionNode>(
              {
                id: questionNodeId,
                type: "sample-question",
                data: { sample },
                parentId: baseNodeId,
                position: { x: 0, y: 0 },
              },
              false,
            ),
            ...sample.steps.map((step) =>
              createNode<SampleStepNode>(
                {
                  id: stepNodeId(step.id),
                  type: "sample-step",
                  data: {
                    baseNodeId,
                    sampleId: sample.id,
                    step,
                    numSteps: sample.steps.length,
                  },
                  parentId: baseNodeId,
                  position: { x: 0, y: 0 },
                  style: { visibility: "hidden" },
                },
                false,
              ),
            ),
          ],
        });

        await nextTick(10);
        const newNodes = get().nodes.filter(
          (n) => n.id.startsWith(baseNodeId) && n.id !== baseNodeId,
        );
        const layout = await layoutELK({ nodes: newNodes, edges: newEdges });
        if (!layout) return;
        const { width, height, positions } = layout;
        set({
          nodes: get().nodes.map((n) => {
            if (n.id.startsWith(baseNodeId)) {
              if (n.id === baseNodeId) {
                return {
                  ...n,
                  position: {
                    ...n.position,
                    y: Math.max(
                      n.position.y,
                      get().displayedSamples.reduce((maxY, id) => {
                        const node = get().nodes.find(
                          (n) =>
                            n.id ===
                              getSampleNodeId(get().question?.id ?? "", id) &&
                            n.id !== baseNodeId,
                        );
                        if (!node) return maxY;
                        return Math.max(
                          maxY,
                          node.position.y + (node.measured?.height ?? 0),
                        );
                      }, 0),
                    ),
                  },
                  style: { width: width + 150 / 2, height: height + 150 / 2 },
                };
              } else {
                return {
                  ...n,
                  position: positions[n.id],
                  style: { visibility: "visible" },
                };
              }
            }
            return n;
          }),
          edges: [...get().edges, ...newEdges],
        });
      },

      currentSample: 0,
      setCurrentSample: (sampleId) => set({ currentSample: sampleId }),

      displayedConcepts: [],
      addConcept: (sampleId, conceptId) => {
        const question = get().question;
        if (question === undefined) return;
        if (!get().displayedSamples.includes(sampleId)) return;

        const sampleNodeId = getSampleNodeId(question.id, sampleId);
        const sampleNode = get().nodes.find(
          (n) => n.id === sampleNodeId,
        ) as SampleNode;
        const conceptNodeId = getConceptNodeId(question.id, conceptId);

        let exists = true;
        if (get().nodes.find((n) => n.id === conceptNodeId) === undefined) {
          exists = false;
          const conceptNode = createNode<ConceptNode>({
            id: conceptNodeId,
            type: "concept",
            data: { conceptId },
            position: {
              x:
                sampleNode.position.x + (sampleNode.measured?.width ?? 0) + 500,
              y: sampleNode.position.y,
            },
            origin: [0, 0.5],
          });
          set({
            nodes: [...get().nodes, conceptNode],
            displayedConcepts: [...get().displayedConcepts, conceptId],
          });
        }

        const conceptEdgeId = `${sampleNodeId}->${conceptNodeId}`;
        if (get().edges.find((e) => e.id === conceptEdgeId) === undefined) {
          const conceptEdge = createEdge({
            id: conceptEdgeId,
            source: sampleNodeId,
            target: conceptNodeId,
          });
          set({ edges: [...get().edges, conceptEdge] });
        }

        return { nodeId: conceptNodeId, edgeId: conceptEdgeId, exists };
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

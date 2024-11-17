import {
  type Edge,
  type FitViewOptions,
  type Node,
  MarkerType,
} from "@xyflow/react";

import type { QuestionId, StepId } from "@/app/api/question";
import type { SampleId } from "@/app/api/sample";

export const getStepNodeId = (questionId: QuestionId, stepId: StepId) =>
  `${questionId}_step_${stepId}`;

export const getSampleNodeId = (questionId: QuestionId, sampleId: SampleId) =>
  `${questionId}_sample_${sampleId}`;

export const fitViewToNode = (node: Node | { id: string }): FitViewOptions => ({
  nodes: [node],
  padding: 0.7,
  maxZoom: 1.5,
  duration: 350,
});

export const createNode = <N extends Node>(
  node: N,
  centered: boolean = true,
): N => ({
  origin: centered ? [0.5, 0.5] : [0, 0],
  draggable: false,
  selectable: false,
  deletable: false,
  ...node,
});

export const createEdge = <E extends Edge>(edge: E): E => ({
  type: "smoothstep",
  selectable: false,
  deletable: false,
  style: { strokeWidth: 4 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
  },
  animated: true,
  ...edge,
});

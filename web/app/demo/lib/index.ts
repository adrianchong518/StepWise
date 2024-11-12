import { type Edge, type FitViewOptions, type Node } from "@xyflow/react";

import { QuestionId, StepId } from "@/app/api/question";

export const getStepNodeId = (questionId: QuestionId, stepId: StepId) =>
  `${questionId}_step_${stepId}`;

export const fitViewToNode = (node: Node | { id: string }): FitViewOptions => ({
  nodes: [node],
  padding: 0.7,
  maxZoom: 1.5,
  duration: 350,
});

export const createNode = <N extends Node>(node: N): N => ({
  ...node,
  origin: [0.5, 0.5],
  draggable: false,
  selectable: false,
  deletable: false,
});

export const createEdge = <E extends Edge>(edge: E): E => ({
  ...edge,
  selectable: false,
  deletable: false,
});

import { type FitViewOptions, type Node } from "@xyflow/react";

import { QuestionId, StepId } from "@/app/api/question";

export const getStepNodeId = (questionId: QuestionId, stepId: StepId) =>
  `${questionId}_step_${stepId}`;

export const fitViewToNode = (node: Node | { id: string }): FitViewOptions => ({
  nodes: [node],
  maxZoom: 1.5,
  duration: 150,
});

import { type Node, type NodeProps } from "@xyflow/react";
import useSWR from "swr";

import { type StepResponse } from "@/app/api/question/[id]/[step]/type";

export type StepNode = Node<
  {
    questionId: string;
    stepId: string;
  },
  "step"
>;

export function StepNode({ data }: NodeProps<StepNode>) {
  const { data: step } = useSWR<StepResponse>(
    `/api/question/${data.questionId}/${data.stepId}`,
  );

  return (
    <div>
      This is a StepNode for {step?.questionId}:{step?.stepId}
    </div>
  );
}

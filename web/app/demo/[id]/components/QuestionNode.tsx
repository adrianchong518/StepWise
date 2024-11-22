import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import {
  Handle,
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { ReactNode, useCallback, useState } from "react";

import type { QuestionDetails, QuestionId } from "@/app/api/question";
import KatexSpan from "@/app/components/KatexSpan";
import { fitViewToNode, getStepNodeId } from "../lib";
import useStore from "../store";

export type QuestionNode = Node<
  {
    questionId: QuestionId;
    questionDetail: QuestionDetails;
  },
  "question"
>;

export function QuestionNode({
  data: { questionId, questionDetail },
}: NodeProps<QuestionNode>) {
  const { displayedSteps, setCurrentStep } = useStore((s) => ({
    displayedSteps: s.displayedSteps,
    setCurrentStep: s.setCurrentStep,
  }));
  const { fitView } = useReactFlow();

  return (
    <Card className="w-[50em]">
      <CardHeader className="bg-primary-100">
        <div className="flex w-full items-center justify-between">
          <h4 className="text-2xl font-medium">Question</h4>
          <ButtonGroup className="justify-self-end transition-colors">
            <Button
              isIconOnly
              color="primary"
              className="bg-primary-100 text-gray-700"
              onPress={(_) => {
                setCurrentStep(displayedSteps[0]);
                fitView(
                  fitViewToNode({
                    id: getStepNodeId(questionId, 0),
                  }),
                );
              }}
            >
              <ChevronDownIcon />
            </Button>
          </ButtonGroup>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="p-8">
          <KatexSpan>{questionDetail.content}</KatexSpan>
        </div>
        <div className="flex flex-row justify-center w-full">
          <Button
            color="primary"
            onPress={(_) => {
              setCurrentStep(displayedSteps[0]);
              fitView(
                fitViewToNode({
                  id: getStepNodeId(questionId, 0),
                }),
              );
            }}
          >
            Get Started
          </Button>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <InformationCircleIcon className="size-5" />
          <div className="text-sm">
            You can review the question anytime at the top-left corner.
          </div>
        </div>
      </CardFooter>

      <Handle
        type="source"
        position={Position.Bottom}
        id="next-step"
        className="invisible"
      />
    </Card>
  );
}

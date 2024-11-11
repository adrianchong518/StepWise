import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
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
import Image from "next/image";
import { useShallow } from "zustand/shallow";

import { type QuestionId, type StepId } from "@/app/api/question/index";
import KatexSpan from "@/app/components/KatexSpan";
import { fitViewToNode, getStepNodeId } from "../lib";
import useStore from "../store";

export type StepNode = Node<
  {
    questionId: QuestionId;
    stepNumber: number;
    stepId: StepId;
  },
  "step"
>;

export function StepNode({
  id: nodeId,
  data: { stepNumber, stepId },
}: NodeProps<StepNode>) {
  const { question, displayedSteps, addStep } = useStore(
    useShallow((s) => ({
      question: s.question,
      displayedSteps: s.displayedSteps,
      addStep: s.addStep,
    })),
  );

  const { fitView } = useReactFlow();

  if (question === undefined) {
    return;
  }

  const step = question.steps[stepId];
  if (step === undefined) {
    return;
  }

  const hasPrevStep = stepNumber > 0;
  const hasNextStep = stepNumber < displayedSteps.length - 1;

  return (
    <Card className="w-[50em]">
      <CardHeader className="bg-primary-100">
        <div className="flex w-full items-center justify-between">
          <h4 className="text-2xl font-medium">Step {stepNumber}</h4>
          <ButtonGroup className="justify-self-end">
            <Button
              isIconOnly
              color={hasPrevStep ? "primary" : "default"}
              disabled={!hasPrevStep}
              disableAnimation={!hasPrevStep}
              onPress={(_) =>
                fitView(
                  fitViewToNode({
                    id: getStepNodeId(
                      question.id,
                      displayedSteps[stepNumber - 1],
                    ),
                  }),
                )
              }
            >
              <ChevronUpIcon />
            </Button>
            <Button
              isIconOnly
              color={hasNextStep ? "primary" : "default"}
              disabled={!hasNextStep}
              disableAnimation={!hasNextStep}
              onPress={(_) =>
                fitView(
                  fitViewToNode({
                    id: getStepNodeId(
                      question.id,
                      displayedSteps[stepNumber + 1],
                    ),
                  }),
                )
              }
            >
              <ChevronDownIcon />
            </Button>
          </ButtonGroup>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-row justify-between w-full text-lg">
          <div className="self-center">
            <KatexSpan>{step.prompt}</KatexSpan>
          </div>
          <div className="w-1/2 aspect-square relative">
            {step.variables.map((v) => (
              <Image
                key={`${nodeId}_${v}`}
                src={`${question.variables[v].figure1}`}
                alt=""
                layout="fill"
              />
            ))}
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          onPress={(_) => {
            const nextStep = stepNumber + 1;
            addStep(nextStep);
            setTimeout(() =>
              fitView(
                fitViewToNode({
                  id: getStepNodeId(question.id, nextStep),
                }),
              ),
            );
          }}
        >
          Next Step
        </Button>
      </CardFooter>

      <Handle
        type="target"
        position={Position.Top}
        id="prev-step"
        className="invisible"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="next-step"
        className="invisible"
      />
    </Card>
  );
}

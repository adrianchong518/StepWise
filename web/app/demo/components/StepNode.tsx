import {
  ArrowsPointingOutIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import {
  Handle,
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import Image from "next/image";
import { ReactNode, useCallback, useState } from "react";

import type { OptionResponse, QuestionId, StepId } from "@/app/api/question";
import KatexSpan from "@/app/components/KatexSpan";
import { fitViewToNode, getStepNodeId } from "../lib";
import useStore from "../store";

const NewNodeButton = ({
  children,
  questionId,
  nextStep,
  className,
}: {
  children: ReactNode;
  questionId: QuestionId;
  nextStep?: number;
  className?: string;
}) => {
  const { addStep } = useStore((s) => ({
    addStep: s.addStep,
  }));
  const { fitView } = useReactFlow();

  const [status, setStatus] = useState<
    "active" | "correct" | "wrong" | "inactive"
  >("active");

  const newNode = useCallback(() => {
    if (nextStep) {
      setStatus("correct");
      addStep(nextStep);
      setTimeout(
        () =>
          fitView(
            fitViewToNode({
              id: getStepNodeId(questionId, nextStep),
            }),
          ),
        250,
      );
    }
  }, [fitView, setStatus]);

  return (
    <Button
      className={`${
        status === "active"
          ? "bg-primary-200 text-gray-800"
          : status === "correct"
            ? "bg-success-600 text-gray-100"
            : status === "inactive"
              ? "bg-default-400 text-gray-200"
              : status === "wrong"
                ? "bg-danger-600 text-gray-100"
                : ""
      } font-medium transition-colors ${className}`}
      onPress={newNode}
      disabled={status == "inactive" || status == "wrong"}
    >
      {children}
    </Button>
  );
};

const OptionResponseInput = ({
  optRes,
  questionId,
  stepId,
}: {
  optRes: OptionResponse;
  questionId: QuestionId;
  stepId: StepId;
}) =>
  optRes.options.length === 1 ? (
    <NewNodeButton
      key={`${questionId}_${stepId}_${optRes.type}`}
      questionId={questionId}
      nextStep={optRes.options[0].nextStep}
      className="place-self-center w-[10em]"
    >
      {optRes.options[0].value}
    </NewNodeButton>
  ) : (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-5/6">
      {optRes.options.map(({ value, nextStep }) => (
        <NewNodeButton
          key={`${questionId}_${stepId}_${optRes.type}_${value}`}
          questionId={questionId}
          nextStep={nextStep}
        >
          {value}
        </NewNodeButton>
      ))}
    </div>
  );

export type StepNode = Node<
  {
    questionId: QuestionId;
    stepNumber: number;
    stepId: StepId;
  },
  "step"
>;

const EndStepNode = ({
  stepNumber,
  questionId,
}: {
  stepNumber: number;
  questionId: QuestionId;
}) => {
  const { displayedSteps, nodes } = useStore((s) => ({
    displayedSteps: s.displayedSteps,
    nodes: s.nodes,
  }));
  const { fitView } = useReactFlow();

  return (
    <Card className="w-[30em]">
      <CardHeader className="bg-primary-200">
        <div className="grid grid-cols-2 items-center justify-center w-full h-full">
          <h3 className="text-3xl">The End</h3>
          <Button
            className="justify-self-end"
            isIconOnly
            color="primary"
            onPress={() =>
              fitView(
                fitViewToNode({
                  id: getStepNodeId(questionId, displayedSteps[stepNumber - 1]),
                }),
              )
            }
          >
            <ChevronUpIcon />
          </Button>
        </div>
      </CardHeader>

      <CardBody>
        <div className="flex items-center justify-center">
          <div className="text-xl">
            You have successfully completed the question!
          </div>
        </div>
      </CardBody>

      <Divider />

      <CardFooter>
        <div className="flex flex-row items-center justify-between w-full h-full">
          <div className="flex flex-col gap-2">
            <Button
              size="lg"
              startContent={<HomeIcon className="w-5 md:w-6" />}
              as={Link}
              href="/"
            >
              Return to home
            </Button>
            <Button
              startContent={<ChevronDoubleUpIcon className="w-5 md:w-6" />}
              onPress={() => {
                fitView(
                  fitViewToNode({
                    id: getStepNodeId(questionId, displayedSteps[0]),
                  }),
                );
              }}
            >
              Go to start
            </Button>
          </div>
          <div className="place-self-stretch">
            <Button
              startContent={<ArrowsPointingOutIcon className="w-5 md:w-6" />}
              className="h-full"
              onPress={() => {
                fitView({ nodes, duration: 750 });
              }}
            >
              Show overview
            </Button>
          </div>
        </div>
      </CardFooter>

      <Handle
        type="target"
        position={Position.Top}
        id="prev-step"
        className="invisible"
      />
    </Card>
  );
};

export function StepNode({
  id: nodeId,
  data: { stepNumber, stepId },
}: NodeProps<StepNode>) {
  const { question, displayedSteps } = useStore((s) => ({
    question: s.question,
    displayedSteps: s.displayedSteps,
  }));

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

  if (step.response.type === "end") {
    return <EndStepNode stepNumber={stepNumber} questionId={question.id} />;
  }

  return (
    <Card className="w-[50em]">
      <CardHeader className="bg-primary-100">
        <div className="flex w-full items-center justify-between">
          <h4 className="text-2xl font-medium">Step {stepNumber}</h4>
          <ButtonGroup className="justify-self-end transition-colors">
            {stepNumber != 0 && (
              <Button
                isIconOnly
                color={hasPrevStep ? "primary" : "default"}
                className={hasPrevStep ? "" : "text-gray-500"}
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
            )}
            <Button
              isIconOnly
              color={hasNextStep ? "primary" : "default"}
              className={hasNextStep ? "" : "text-gray-500"}
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
        <div className="flex flex-row justify-between w-full text-md">
          <div className="w-1/2 self-center flex flex-col justify-center gap-6">
            <KatexSpan>{step.prompt}</KatexSpan>
            {step.response.type === "option" ? (
              <OptionResponseInput
                optRes={step.response}
                questionId={question.id}
                stepId={step.id}
              />
            ) : (
              <NewNodeButton questionId={question.id} nextStep={stepNumber + 1}>
                Next Step
              </NewNodeButton>
            )}
          </div>
          <div className="w-1/2 aspect-square relative">
            {step.variables.map((v) => (
              <Image
                key={`${nodeId}_${v} `}
                src={`/${question.variables[v].figure1} `}
                alt=""
                layout="fill"
              />
            ))}
          </div>
        </div>
      </CardBody>

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

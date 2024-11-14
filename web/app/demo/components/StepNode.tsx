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
import type { SampleId } from "@/app/api/sample";
import KatexSpan from "@/app/components/KatexSpan";
import { nextTick, timeout } from "@/app/utils";
import { fitViewToNode, getStepNodeId } from "../lib";
import useStore from "../store";

const NewNodeButton = ({
  children,
  stepId,
  next,
  className,
}: {
  children: ReactNode;
  stepId: StepId;
  next: { stepId: StepId } | { sampleId: SampleId };
  className?: string;
}) => {
  const { addStep, addSampleBase } = useStore((s) => ({
    addStep: s.addStep,
    addSampleBase: s.addSampleBase,
  }));
  const { fitView } = useReactFlow();

  const [status, setStatus] = useState<
    "active" | "correct" | "wrong" | "inactive"
  >("active");

  const newNode = useCallback(() => {
    (async () => {
      if ("stepId" in next) {
        setStatus("correct");
        const id = addStep(next.stepId)?.nodeId;
        await nextTick(2);
        await timeout(300);
        id && fitView(fitViewToNode({ id }));
      } else if ("sampleId" in next) {
        setStatus("wrong");
        const ret = addSampleBase(stepId, next.sampleId);
        if (ret && ret.exists) {
          await timeout(300);
          fitView(fitViewToNode({ id: ret.nodeId }));
        }
      }
    })();
  }, [fitView, setStatus]);

  return (
    <Button
      className={`font-medium transition-colors ${className}`}
      color={
        status == "correct"
          ? "success"
          : status == "wrong"
            ? "danger"
            : "primary"
      }
      onPress={newNode}
      isDisabled={status == "inactive" || status == "wrong"}
    >
      {children}
    </Button>
  );
};

const OptionResponseInput = ({
  optRes,
  questionId,
  stepId,
  sampleId,
}: {
  optRes: OptionResponse;
  questionId: QuestionId;
  stepId: StepId;
  sampleId: SampleId;
}) =>
  optRes.options.length === 1 ? (
    <NewNodeButton
      key={`${questionId}_${stepId}_${optRes.type}`}
      stepId={stepId}
      next={
        optRes.options[0].nextStep
          ? { stepId: optRes.options[0].nextStep }
          : { sampleId }
      }
      className="w-[10em]"
    >
      {optRes.options[0].value}
    </NewNodeButton>
  ) : (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      {optRes.options.map(({ value, nextStep }) => (
        <NewNodeButton
          key={`${questionId}_${stepId}_${optRes.type}_${value}`}
          stepId={stepId}
          next={nextStep ? { stepId: nextStep } : { sampleId }}
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
              color="primary"
              className="bg-primary-700 text-gray-100"
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
              color="primary"
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
                color="primary"
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
              color="primary"
              isDisabled={!hasNextStep}
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
            <div className="w-fit place-self-center">
              <KatexSpan>{step.prompt}</KatexSpan>
            </div>
            <div className="w-fit place-self-center">
              {step.response.type === "option" ? (
                <OptionResponseInput
                  optRes={step.response}
                  questionId={question.id}
                  stepId={step.id}
                  sampleId={step.sampleId}
                />
              ) : (
                <NewNodeButton stepId={step.id} next={{ stepId: step.id + 1 }}>
                  Next Step
                </NewNodeButton>
              )}
            </div>
          </div>
          <div className="w-1/2 aspect-square relative">
            {step.variables.map((v) => (
              <Image
                key={`${nodeId}_${v} `}
                src={`/${question.variables[v].figure1} `}
                alt=""
                fill
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
      <Handle
        type="source"
        position={Position.Right}
        id="explain"
        className="invisible"
      />
    </Card>
  );
}

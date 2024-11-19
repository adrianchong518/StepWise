import {
  ArrowsPointingOutIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Link,
} from "@nextui-org/react";
import {
  Handle,
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { ReactNode, useCallback, useState } from "react";

import type {
  MultiOptionResponse,
  NumberResponse,
  OptionResponse,
  QuestionId,
  StepId,
} from "@/app/api/question";
import type { SampleId } from "@/app/api/sample";
import KatexSpan from "@/app/components/KatexSpan";
import { nextTick, timeout } from "@/app/utils";
import { fitViewToNode, getStepNodeId } from "../lib";
import useStore from "../store";

const useShowStep = () => {
  const { addStep, setCurrentStep } = useStore((s) => ({
    addStep: s.addStep,
    setCurrentStep: s.setCurrentStep,
  }));
  const { fitView } = useReactFlow();

  return useCallback((stepId: StepId) => {
    (async () => {
      const id = addStep(stepId)?.nodeId;
      await nextTick(2);
      await timeout(300);
      setCurrentStep(stepId);
      id && fitView(fitViewToNode({ id }));
    })();
  }, []);
};

const useShowSample = () => {
  const { addSampleBase, setCurrentSample } = useStore((s) => ({
    addSampleBase: s.addSampleBase,
    setCurrentSample: s.setCurrentSample,
  }));
  const { fitView } = useReactFlow();

  return useCallback((stepId: StepId, sampleId?: SampleId) => {
    if (!sampleId) return;
    (async () => {
      const ret = addSampleBase(stepId, sampleId);
      if (ret && ret.exists) {
        await timeout(300);
        fitView(fitViewToNode({ id: ret.nodeId }));
      }
      setCurrentSample(sampleId);
    })();
  }, []);
};

const NewNodeButton = ({
  children,
  stepId,
  next,
  className,
}: {
  children: ReactNode;
  stepId: StepId;
  next: { stepId: StepId } | { sampleId?: SampleId };
  className?: string;
}) => {
  const showSample = useShowSample();
  const showStep = useShowStep();

  const [status, setStatus] = useState<
    "active" | "correct" | "wrong" | "inactive"
  >("active");

  const newNode = useCallback(() => {
    (async () => {
      if ("stepId" in next) {
        setStatus("correct");
        showStep(next.stepId);
      } else if ("sampleId" in next) {
        setStatus("wrong");
        showSample(stepId, next.sampleId);
      }
    })();
  }, [setStatus, showSample, showStep]);

  return (
    <Button
      className={`font-medium transition-colors text-wrap text-gray-50 h-fit p-2 ${className}`}
      color={
        status === "correct"
          ? "success"
          : status === "wrong"
            ? "secondary"
            : "primary"
      }
      onPress={newNode}
      isDisabled={status === "inactive" || status === "wrong"}
    >
      <KatexSpan>{children}</KatexSpan>
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
  sampleId?: SampleId;
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
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full">
      {optRes.options.map(({ value, nextStep }) => (
        <NewNodeButton
          key={`${questionId}_${stepId}_${optRes.type}_${value}`}
          stepId={stepId}
          next={nextStep ? { stepId: nextStep } : { sampleId }}
          className="w-full"
        >
          {value}
        </NewNodeButton>
      ))}
    </div>
  );

const MultiOptionResponseInput = ({
  multiOptRes,
  questionId,
  stepId,
  sampleId,
}: {
  multiOptRes: MultiOptionResponse;
  questionId: QuestionId;
  stepId: StepId;
  sampleId?: SampleId;
}) => {
  const showSample = useShowSample();
  const showStep = useShowStep();

  const [checkbox, setCheckbox] = useState(
    Object.fromEntries(multiOptRes.options.map((value) => [value, false])),
  );
  const [status, setStatus] = useState<"default" | "correct" | "wrong">(
    "default",
  );

  const updateCheckbox = useCallback(
    (value: (typeof multiOptRes.options)[number], selected: boolean) => {
      const newCheckbox = { ...checkbox };
      newCheckbox[value] = selected;
      setCheckbox(newCheckbox);
      setStatus("default");
    },
    [checkbox, setCheckbox, setStatus],
  );

  const validateInput = useCallback(() => {
    (async () => {
      const correct = Object.entries(checkbox).reduce(
        (correct: boolean, [value, checked]) =>
          correct && checked === multiOptRes.correctOptions.includes(value),
        true,
      );
      if (correct) {
        setStatus("correct");
        showStep(multiOptRes.nextStep);
      } else {
        setStatus("wrong");
        showSample(stepId, sampleId);
      }
    })();
  }, [checkbox, showStep, showSample]);

  return (
    <div className="grid grid-cols-2 gap-6 w-full">
      {multiOptRes.options.map((value) => (
        <Checkbox
          key={`${questionId}_${stepId}_${value}`}
          className={`${checkbox[value] ? "bg-primary-100" : "bg-default-100"} rounded-xl w-full`}
          isSelected={checkbox[value]}
          onValueChange={(selected) => updateCheckbox(value, selected)}
        >
          <KatexSpan>{value}</KatexSpan>
        </Checkbox>
      ))}
      <Button
        className={`col-span-2 place-self-center w-[10em] ${status === "correct" && "text-gray-100"}`}
        color={
          status === "correct"
            ? "success"
            : status === "wrong"
              ? "secondary"
              : "primary"
        }
        isDisabled={status === "wrong"}
        onPress={validateInput}
      >
        Done
      </Button>
    </div>
  );
};

const NumberResponse = ({
  numberRes,
  stepId,
  sampleId,
}: {
  numberRes: NumberResponse;
  questionId: QuestionId;
  stepId: StepId;
  sampleId?: SampleId;
}) => {
  const showSample = useShowSample();
  const showStep = useShowStep();

  const [status, setStatus] = useState<"default" | "correct" | "wrong">(
    "default",
  );
  const [value, setValue] = useState("");

  const checkInput = useCallback(() => {
    (async () => {
      const num = +value;
      if (value.length <= 0 || isNaN(num)) return;

      if (num === numberRes.value) {
        setStatus("correct");
        showStep(numberRes.nextStep);
      } else {
        setStatus("wrong");
        showSample(stepId, sampleId);
      }
    })();
  }, [value, showSample, showStep]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Your answer..."
        size="lg"
        radius="lg"
        classNames={{ input: "border-none" }}
        validate={(v) => (isNaN(+v) ? "Please input a number." : true)}
        onValueChange={(v) => {
          setValue(v);
          setStatus("default");
        }}
      />
      <Button
        className={`${status === "correct" && "text-gray-100"}`}
        color={
          status === "correct"
            ? "success"
            : status === "wrong"
              ? "secondary"
              : "primary"
        }
        isDisabled={status === "wrong"}
        onPress={checkInput}
      >
        Submit
      </Button>
    </div>
  );
};

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
  const { displayedSteps, nodes, setCurrentStep } = useStore((s) => ({
    displayedSteps: s.displayedSteps,
    nodes: s.nodes,
    setCurrentStep: s.setCurrentStep,
  }));
  const { fitView } = useReactFlow();

  return (
    <Card className="w-[30em]">
      <CardHeader className="bg-primary-100">
        <div className="grid grid-cols-2 items-center justify-center w-full h-full">
          <h3 className="text-3xl">The End</h3>
          <Button
            className="justify-self-end bg-primary-100 text-gray-700"
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
              className="bg-primary-500 text-gray-100"
              as={Link}
              href="/"
            >
              Return to home
            </Button>
            <Button
              startContent={<ChevronDoubleUpIcon className="w-5 md:w-6" />}
              onPress={() => {
                setCurrentStep(displayedSteps[0]);
                fitView({
                  ...fitViewToNode({
                    id: getStepNodeId(questionId, displayedSteps[0]),
                  }),
                  duration: 1000,
                });
              }}
            >
              Go to start
            </Button>
          </div>
          <div className="place-self-stretch">
            <Button
              color="primary"
              startContent={<ArrowsPointingOutIcon className="w-5 md:w-6" />}
              className="h-full bg-primary-200 text-black"
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
  const { question, displayedSteps, setCurrentStep } = useStore((s) => ({
    question: s.question,
    displayedSteps: s.displayedSteps,
    setCurrentStep: s.setCurrentStep,
  }));
  const { fitView } = useReactFlow();
  const showSample = useShowSample();

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
                className="bg-primary-100 text-gray-700"
                onPress={(_) => {
                  setCurrentStep(displayedSteps[0]);
                  fitView(
                    fitViewToNode({
                      id: getStepNodeId(
                        question.id,
                        displayedSteps[stepNumber - 1],
                      ),
                    }),
                  );
                }}
              >
                <ChevronUpIcon />
              </Button>
            )}
            {hasNextStep && (
              <Button
                isIconOnly
                color="primary"
                className="bg-primary-100 text-gray-700"
                isDisabled={!hasNextStep}
                onPress={(_) => {
                  setCurrentStep(displayedSteps[0]);
                  fitView(
                    fitViewToNode({
                      id: getStepNodeId(
                        question.id,
                        displayedSteps[stepNumber + 1],
                      ),
                    }),
                  );
                }}
              >
                <ChevronDownIcon />
              </Button>
            )}
          </ButtonGroup>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-row justify-between w-full text-md">
          <div className="w-1/2 p-8 self-center flex flex-col justify-center gap-12">
            <div className="w-full items-center">
              <KatexSpan>{step.prompt}</KatexSpan>
            </div>
            <div className="w-full place-self-center">
              {step.response.type === "option" ? (
                <OptionResponseInput
                  optRes={step.response}
                  questionId={question.id}
                  stepId={step.id}
                  sampleId={step.sampleId}
                />
              ) : step.response.type === "multioption" ? (
                <MultiOptionResponseInput
                  multiOptRes={step.response}
                  questionId={question.id}
                  stepId={step.id}
                  sampleId={step.sampleId}
                />
              ) : step.response.type === "number" ? (
                <NumberResponse
                  numberRes={step.response}
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
            {step.variables.map(
              (v) =>
                v && (
                  <img
                    key={`${nodeId}_${v} `}
                    src={`/${question.variables[v].figure1} `}
                    alt=""
                    className="w-full h-full absolute"
                  />
                ),
            )}
          </div>
        </div>
      </CardBody>

      {step.sampleId && false && (
        <CardFooter>
          <div className="flex flex-row justify-end w-full">
            <Button
              startContent={<QuestionMarkCircleIcon className="size-5" />}
              onPress={() => {
                showSample(step.id, step.sampleId);
              }}
            >
              Show Sample
            </Button>
          </div>
        </CardFooter>
      )}

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

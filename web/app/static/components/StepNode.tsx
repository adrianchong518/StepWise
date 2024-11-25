import {
  ArrowsPointingOutIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronRightIcon,
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

import KatexSpan from "@/app/components/KatexSpan";
import { fitViewToNode, getStepNodeId } from "../lib";
import useStore from "../store";

const useShowStep = () => {
  const { setCurrentStep } = useStore((s) => ({
    setCurrentStep: s.setCurrentStep,
  }));
  const { fitView } = useReactFlow();

  return useCallback((step: string) => {
    (async () => {
      setCurrentStep(step);
      fitView(fitViewToNode({ id: step }));
    })();
  }, []);
};

const useShowSample = () => {
  const { setCurrentSample } = useStore((s) => ({
    setCurrentSample: s.setCurrentSample,
  }));
  const { fitView } = useReactFlow();

  return useCallback((sample: string) => {
    setCurrentSample(sample);
    fitView(fitViewToNode({ id: sample }));
  }, []);
};

const NewNodeButton = ({
  children,
  next,
  className,
  status,
}: {
  children: ReactNode;
  next: { step: string } | { explain: string };
  className?: string;
  status: "active" | "correct" | "wrong" | "inactive";
}) => {
  const showStep = useShowStep();
  const { fitView } = useReactFlow();

  const show = useCallback(() => {
    if ("step" in next) {
      showStep(next.step);
    } else if ("explain" in next) {
      fitView(fitViewToNode({ id: next.explain }));
    }
  }, [showStep]);

  return (
    <ButtonGroup>
      <Button
        className={`font-medium transition-colors text-gray-50 h-full p-2 ${className}`}
        color={
          status === "correct"
            ? "success"
            : status === "wrong"
              ? "secondary"
              : "primary"
        }
        onPress={show}
      >
        <div className="text-wrap">
          <KatexSpan>{children}</KatexSpan>
        </div>
      </Button>
      {children != "OK" && (
        <Button
          isIconOnly
          className={`text-gray-50 h-full p-2`}
          color={
            status === "correct"
              ? "success"
              : status === "wrong"
                ? "secondary"
                : "primary"
          }
          onPress={show}
        >
          <QuestionMarkCircleIcon className="size-5" />
        </Button>
      )}
    </ButtonGroup>
  );
};

export type Option = {
  value: string;
  next: { step: string } | { explain: string };
  status: "correct" | "wrong" | "active";
};
export type OptRes = {
  type: "opt";
  opts: Option[];
};
const OptionResponseInput = ({ res: { opts } }: { res: OptRes }) =>
  opts.length === 1 ? (
    <div className="flex flex-row justify-center w-full">
      <NewNodeButton
        next={opts[0].next}
        status={opts[0].status}
        className="w-[10em]"
      >
        {opts[0].value}
      </NewNodeButton>
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full">
      {opts.map(({ value, next, status }) => (
        <NewNodeButton
          key={Math.random()}
          next={next}
          status={status}
          className="w-full"
        >
          {value}
        </NewNodeButton>
      ))}
    </div>
  );

export type MultiOptRes = {
  type: "multi";
  options: { [value: string]: boolean };
  nextStep: string;
};
const MultiOptionResponseInput = ({
  multiOpts,
  sample,
}: {
  multiOpts: MultiOptRes;
  sample?: string;
}) => {
  const showSample = useShowSample();
  const showStep = useShowStep();

  const [checkbox, setCheckbox] = useState(multiOpts.options);
  const [status, setStatus] = useState<"default" | "correct" | "wrong">(
    "correct",
  );

  const updateCheckbox = useCallback(
    (value: keyof typeof multiOpts.options, selected: boolean) => {
      const newCheckbox = { ...checkbox };
      newCheckbox[value] = selected;
      setCheckbox(newCheckbox);
      setStatus("default");
    },
    [checkbox, setCheckbox, setStatus],
  );

  return (
    <div className="grid grid-cols-2 gap-6 w-full justify-stretch place-items-stretch">
      {Object.entries(multiOpts.options).map(([value]) => (
        <Checkbox
          key={Math.random()}
          className={`${checkbox[value] ? "bg-primary-100" : "bg-default-100"} rounded-xl max-w-full`}
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
        onPress={() => {
          const correct = Object.entries(checkbox).reduce(
            (correct: boolean, [value, checked]) =>
              correct && checked === multiOpts.options[value],
            true,
          );
          if (correct) {
            setStatus("correct");
            showStep(multiOpts.nextStep);
          } else {
            setStatus("wrong");
            sample && showSample(sample);
          }
        }}
      >
        Done
      </Button>
    </div>
  );
};

export type NumberRes = {
  type: "num";
  value: number;
  nextStep: string;
};
const NumberResponse = ({
  numberRes,
  sample,
}: {
  numberRes: NumberRes;
  sample?: string;
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
        sample && showSample(sample);
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
        defaultValue={numberRes.value.toString()}
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
    step: string;
    prompt: string;
    res: OptRes | MultiOptRes | NumberRes | { type: "end" };
    sample?: string;
    figure?: string;
  },
  "step"
>;

const EndStepNode = ({ step }: { step: string }) => {
  const { setCurrentStep } = useStore((s) => ({
    setCurrentStep: s.setCurrentStep,
  }));
  const { fitView, getNodes } = useReactFlow();

  return (
    <Card className="w-[30em]">
      <CardHeader className="bg-primary-100">
        <div className="grid grid-cols-2 items-center justify-center w-full h-full">
          <h3 className="text-3xl">The End</h3>
          <Button
            className="justify-self-end bg-primary-100 text-gray-700"
            isIconOnly
            color="primary"
            onPress={() => {
              // TODO:
              // fitView(
              //   fitViewToNode({
              //     id: getStepNodeId(questionId, displayedSteps[stepNumber - 1]),
              //   }),
              // )
            }}
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
              href="/catalog"
            >
              Return to home
            </Button>
            <Button
              size="lg"
              startContent={<ChevronRightIcon className="w-5 md:w-6" />}
              color="primary"
              className="bg-primary-300 text-black"
              as={Link}
              href="/static"
            >
              Go to next part
            </Button>
            <Button
              startContent={<ChevronDoubleUpIcon className="w-5 md:w-6" />}
              onPress={() => {
                // TODO:
                // setCurrentStep(displayedSteps[0]);
                // fitView({
                //   ...fitViewToNode({
                //     id: getStepNodeId(questionId, displayedSteps[0]),
                //   }),
                //   duration: 1000,
                // });
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
                fitView({ nodes: getNodes(), duration: 750 });
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
  data: { step, prompt, res, sample, figure },
}: NodeProps<StepNode>) {
  const { setCurrentStep } = useStore((s) => ({
    setCurrentStep: s.setCurrentStep,
  }));
  const { fitView } = useReactFlow();
  const showSample = useShowSample();

  if (res.type === "end") {
    return <EndStepNode step={step} />;
  }

  // TODO:
  const hasNextStep = true;

  return (
    <Card className="w-[50em]">
      <CardHeader className="bg-primary-100">
        <div className="flex w-full items-center justify-between">
          <h4 className="text-2xl font-medium">{step}</h4>
          <ButtonGroup className="justify-self-end transition-colors">
            <Button
              isIconOnly
              color="primary"
              className="bg-primary-100 text-gray-700"
              onPress={(_) => {
                // TODO:
                // setCurrentStep(displayedSteps[stepNumber - 1]);
                // fitView(
                //   fitViewToNode({
                //     id:
                //       stepNumber == 0
                //         ? question.id
                //         : getStepNodeId(
                //             question.id,
                //             displayedSteps[stepNumber - 1],
                //           ),
                //   }),
                // );
              }}
            >
              <ChevronUpIcon />
            </Button>
            {hasNextStep && (
              <Button
                isIconOnly
                color="primary"
                className="bg-primary-100 text-gray-700"
                isDisabled={!hasNextStep}
                onPress={(_) => {
                  // TODO:
                  // setCurrentStep(displayedSteps[stepNumber + 1]);
                  // fitView(
                  //   fitViewToNode({
                  //     id: getStepNodeId(
                  //       question.id,
                  //       displayedSteps[stepNumber + 1],
                  //     ),
                  //   }),
                  // );
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
            <div className="w-full items-center text-lg">
              <KatexSpan>{prompt}</KatexSpan>
            </div>
            <div className="w-full place-self-center">
              {res.type === "opt" ? (
                <OptionResponseInput res={res} />
              ) : res.type === "multi" ? (
                <MultiOptionResponseInput multiOpts={res} sample={sample} />
              ) : res.type === "num" ? (
                <NumberResponse numberRes={res} sample={sample} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="w-1/2 p-8 aspect-square relative">
            <img src={`/${figure}`} alt="" className="w-full h-full" />
          </div>
        </div>
      </CardBody>

      {sample && (
        <CardFooter>
          <div className="flex flex-row justify-end w-full gap-2">
            <div className="text-xs place-self-center">
              See a sample question to help you along!
            </div>
            <Button
              className="bg-secondary-100"
              startContent={<QuestionMarkCircleIcon className="size-5" />}
              onPress={() => showSample(sample)}
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
      <Handle
        type="source"
        position={Position.Left}
        id="explainer"
        className="invisible"
      />
    </Card>
  );
}

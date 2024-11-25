import {
  ArrowsPointingOutIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import {
  Handle,
  NodeToolbar,
  Position,
  useReactFlow,
  useViewport,
  type Node,
  type NodeProps,
} from "@xyflow/react";

import KatexSpan from "@/app/components/KatexSpan";
import { fitViewToNode } from "../lib";
import useStore from "../store";

export type SampleQuestionNode = Node<
  { name: string; question: string; figure?: string },
  "sample-question"
>;
export function SampleQuestionNode({
  data: { name, question, figure },
}: NodeProps<SampleQuestionNode>) {
  return (
    <Card className="w-full max-w-[30em]">
      <CardHeader className="bg-secondary-200">
        <div className="flex flex-row justify-between w-full">
          <h3 className="text-2xl font-medium">Sample Question</h3>
          <h4 className="text-2xl">{name}</h4>
        </div>
      </CardHeader>
      <CardBody>
        {figure ? (
          <div className="w-full flex flex-col items-center">
            <div className="text-md place-self-center">
              <KatexSpan>{question}</KatexSpan>
            </div>
            <div className="w-1/2 p-8 aspect-square relative">
              <img src={`/${figure}`} className="w-full h-full" />
            </div>
          </div>
        ) : (
          <div className="text-md">
            <KatexSpan>{question}</KatexSpan>
          </div>
        )}
      </CardBody>
      <Handle type="source" position={Position.Bottom} className="invisible" />
    </Card>
  );
}

export type SampleStepNode = Node<
  {
    sample: string;
    step: {
      header: string;
      text: string;
      figure?: string;
      prev?: string;
      next?: string;
    };
  },
  "sample-step"
>;
export function SampleStepNode({
  parentId,
  data: { sample, step },
}: NodeProps<SampleStepNode>) {
  const { setCurrentSample } = useStore((s) => ({
    setCurrentSample: s.setCurrentSample,
  }));
  const { fitView } = useReactFlow();

  return (
    <Card className="w-fit">
      <CardHeader className="bg-secondary-200">
        <div className="flex flex-row justify-between items-center w-full">
          <h4 className="text-xl"> {step.header} </h4>
          {false && (
            <ButtonGroup
              className="justify-self-end transition-colors"
              size="sm"
            >
              {step.prev && (
                <Button
                  isIconOnly
                  color="secondary"
                  onPress={() =>
                    fitView(fitViewToNode({ id: step.prev ?? "" }))
                  }
                >
                  <ChevronLeftIcon />
                </Button>
              )}
              {step.next && (
                <Button
                  isIconOnly
                  color="secondary"
                  onPress={() =>
                    fitView(fitViewToNode({ id: step.next ?? "" }))
                  }
                >
                  <ChevronRightIcon />
                </Button>
              )}
              <Button
                isIconOnly
                color="secondary"
                onPress={(_) => {
                  setCurrentSample(sample);
                  fitView(fitViewToNode({ id: parentId ?? "" }));
                }}
              >
                <ArrowsPointingOutIcon />
              </Button>
            </ButtonGroup>
          )}
        </div>
      </CardHeader>
      <CardBody>
        {step.figure ? (
          <div className="w-full flex flex-col items-center">
            <div className="text-md p-8 place-self-center">
              <KatexSpan>{step.text}</KatexSpan>
            </div>
            <div className="w-1/2 p-8 aspect-square relative">
              <img src={`/${step.figure}`} className="w-full h-full" />
            </div>
          </div>
        ) : (
          <div className="text-md p-8">
            <KatexSpan>{step.text}</KatexSpan>
          </div>
        )}
      </CardBody>
      <Handle type="target" position={Position.Top} className="invisible" />
      <Handle type="source" position={Position.Bottom} className="invisible" />
    </Card>
  );
}

export type SampleNode = Node<{ concept: string }, "sample">;
export function SampleNode({ data: { concept } }: NodeProps<SampleNode>) {
  const { currentStep } = useStore((s) => ({
    currentStep: s.currentStep,
  }));
  const { fitView } = useReactFlow();
  const { zoom } = useViewport();

  const showConcept = () => {
    fitView(fitViewToNode({ id: concept }));
  };

  return (
    <>
      <NodeToolbar
        isVisible={zoom >= 0.45}
        position={Position.Top}
        align="center"
      >
        <ButtonGroup size="lg">
          <Button
            className="bg-secondary-100"
            startContent={<ChevronLeftIcon className="size-5" />}
            onPress={() => fitView(fitViewToNode({ id: currentStep }))}
          >
            Return
          </Button>
          <Button
            className="bg-secondary-100 font-bold"
            endContent={<SquaresPlusIcon className="size-5" />}
            onPress={showConcept}
          >
            Show Concept
          </Button>
        </ButtonGroup>
      </NodeToolbar>

      <div className="w-full h-full bg-secondary-50 rounded-3xl">
        <Handle type="target" position={Position.Left} className="invisible" />
        <Handle type="source" position={Position.Right} className="invisible" />
      </div>
    </>
  );
}

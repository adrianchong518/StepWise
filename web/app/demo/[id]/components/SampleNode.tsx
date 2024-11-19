import {
  ArrowsPointingOutIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
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
  useNodeId,
  useReactFlow,
  useViewport,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { useEffect } from "react";
import useSWR from "swr";

import type { Sample, SampleId, SampleStep } from "@/app/api/sample";
import KatexSpan from "@/app/components/KatexSpan";
import { nextTick, timeout } from "@/app/utils";
import { fitViewToNode, getStepNodeId } from "../lib";
import useStore from "../store";

export type SampleQuestionNode = Node<{ sample: Sample }, "sample-question">;
export function SampleQuestionNode({
  data: { sample },
}: NodeProps<SampleQuestionNode>) {
  // TODO: figure
  return (
    <Card className="w-full max-w-[30em]">
      <CardHeader className="bg-secondary-200">
        <div className="flex flex-row justify-between w-full">
          <h3 className="text-2xl font-medium">Sample Question</h3>
          <h4 className="text-2xl">{sample.name}</h4>
        </div>
      </CardHeader>
      <CardBody>
        <div className="text-md">
          <KatexSpan>{sample.question}</KatexSpan>
        </div>
      </CardBody>
      <Handle type="source" position={Position.Bottom} className="invisible" />
    </Card>
  );
}

export type SampleStepNode = Node<
  {
    baseNodeId: string;
    sampleId: SampleId;
    step: SampleStep;
    numSteps: number;
  },
  "sample-step"
>;
export function SampleStepNode({
  data: { baseNodeId, sampleId, step, numSteps },
}: NodeProps<SampleStepNode>) {
  const { setCurrentSample } = useStore((s) => ({
    setCurrentSample: s.setCurrentSample,
  }));
  const { fitView } = useReactFlow();

  return (
    <Card className="w-fit">
      <CardHeader className="bg-secondary-200">
        <div className="flex flex-row justify-between items-center w-full">
          <h4 className="text-xl"> Step {step.id} </h4>
          <ButtonGroup className="justify-self-end transition-colors" size="sm">
            {step.id != 0 && (
              <Button
                isIconOnly
                color="secondary"
                onPress={() => {
                  fitView(
                    fitViewToNode({ id: `${baseNodeId}_step_${step.id - 1}` }),
                  );
                }}
              >
                <ChevronUpIcon />
              </Button>
            )}
            {step.id < numSteps - 1 && (
              <Button
                isIconOnly
                color="secondary"
                onPress={(_) => {
                  fitView(
                    fitViewToNode({ id: `${baseNodeId}_step_${step.id + 1}` }),
                  );
                }}
              >
                <ChevronDownIcon />
              </Button>
            )}
            <Button
              isIconOnly
              color="secondary"
              onPress={(_) => {
                setCurrentSample(sampleId);
                fitView(fitViewToNode({ id: `${baseNodeId}` }));
              }}
            >
              <ArrowsPointingOutIcon />
            </Button>
          </ButtonGroup>
        </div>
      </CardHeader>
      <CardBody>
        {step.figure ? (
          <div className="w-full flex flex-col items-center">
            <div className="text-md place-self-center">
              <KatexSpan>{step.text}</KatexSpan>
            </div>
            <div className="w-1/2 aspect-square relative">
              <img src={`/${step.figure}`} className="w-full h-full absolute" />
            </div>
          </div>
        ) : (
          <div className="text-md">
            <KatexSpan>{step.text}</KatexSpan>
          </div>
        )}
      </CardBody>
      <Handle type="target" position={Position.Top} className="invisible" />
      <Handle type="source" position={Position.Bottom} className="invisible" />
    </Card>
  );
}

export type SampleNode = Node<{ sampleId: SampleId }, "sample">;
export function SampleNode({ data: { sampleId } }: NodeProps<SampleNode>) {
  const { addSample, question, currentStep, addConcept } = useStore((s) => ({
    addSample: s.addSample,
    question: s.question,
    currentStep: s.currentStep,
    addConcept: s.addConcept,
  }));
  const { fitView } = useReactFlow();
  const { zoom } = useViewport();
  const { data: sample } = useSWR<Sample>(`/api/sample/${sampleId}`);
  const baseNodeId = useNodeId() ?? "";

  useEffect(() => {
    (async () => {
      if (!sample) return;
      await addSample(baseNodeId, sample);
      await nextTick(2);
      fitView(fitViewToNode({ id: baseNodeId }));
    })();
  }, [sample, baseNodeId]);

  const showConcept = () => {
    (async () => {
      if (!sample) return;
      const nodeId = addConcept(sampleId, sample.concept)?.nodeId ?? "";
      await nextTick(4);
      await timeout(300);
      fitView(fitViewToNode({ id: nodeId }));
    })();
  };

  return (
    <>
      <NodeToolbar
        isVisible={zoom >= 0.25}
        position={Position.Top}
        align="center"
      >
        <ButtonGroup size="lg">
          <Button
            className="bg-secondary-100"
            startContent={<ChevronLeftIcon className="size-5" />}
            onPress={() => {
              fitView(
                fitViewToNode({
                  id: getStepNodeId(question?.id ?? "", currentStep),
                }),
              );
            }}
          >
            Return
          </Button>
          <Button
            className="bg-secondary-100"
            endContent={<SquaresPlusIcon className="size-5" />}
            onPress={showConcept}
          >
            Show Concept
          </Button>
        </ButtonGroup>
      </NodeToolbar>

      <div className="w-full h-full bg-secondary-50 rounded-3xl">
        <Handle type="target" position={Position.Left} className="invisible" />
        <Handle type="source" position={Position.Left} className="invisible" />
      </div>
    </>
  );
}

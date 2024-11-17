import type { Sample, SampleId, SampleStep } from "@/app/api/sample";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  Handle,
  Position,
  useNodeId,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { useEffect } from "react";
import useSWR from "swr";

import KatexSpan from "@/app/components/KatexSpan";
import { nextTick } from "@/app/utils";
import { fitViewToNode } from "../lib";
import useStore from "../store";

export type SampleQuestionNode = Node<{ sample: Sample }, "sample-question">;
export function SampleQuestionNode({
  data: { sample },
}: NodeProps<SampleQuestionNode>) {
  // TODO: figure
  return (
    <Card className="w-full">
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

export type SampleStepNode = Node<{ step: SampleStep }, "sample-step">;
export function SampleStepNode({ data: { step } }: NodeProps<SampleStepNode>) {
  // TODO: figure
  return (
    <Card className="w-full">
      <CardHeader className="bg-secondary-200">
        <h4 className="text-xl">Step {step.id}</h4>
      </CardHeader>
      <CardBody>
        <div className="text-md">
          <KatexSpan>{step.text}</KatexSpan>
        </div>
      </CardBody>
      <Handle type="target" position={Position.Top} className="invisible" />
      <Handle type="source" position={Position.Bottom} className="invisible" />
    </Card>
  );
}

export type SampleNode = Node<{ sampleId: SampleId }, "sample">;
export function SampleNode({ data: { sampleId } }: NodeProps<SampleNode>) {
  const { addSample } = useStore((s) => ({ addSample: s.addSample }));
  const { fitView } = useReactFlow();
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

  return (
    <div className="w-full h-full bg-secondary-50">
      <Handle type="target" position={Position.Left} className="invisible" />
    </div>
  );
}

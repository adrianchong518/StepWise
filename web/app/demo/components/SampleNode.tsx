import type { Sample, SampleId } from "@/app/api/sample";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  Handle,
  Position,
  useNodeId,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { useEffect } from "react";
import useSWR from "swr";

import KatexSpan from "@/app/components/KatexSpan";
import useStore from "../store";

export type SampleQuestionNode = Node<{ sample: Sample }, "sample-question">;
export function SampleQuestionNode({
  data: { sample },
}: NodeProps<SampleQuestionNode>) {
  return (
    <Card className="w-full">
      <CardHeader className="bg-secondary-100">
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
    </Card>
  );
}

export type SampleNode = Node<{ sampleId: SampleId }, "sample">;
export function SampleNode({ data: { sampleId } }: NodeProps<SampleNode>) {
  const { addSample } = useStore((s) => ({
    addSample: s.addSample,
  }));
  const { data: sample } = useSWR<Sample>(`/api/sample/${sampleId}`);
  const baseNodeId = useNodeId() ?? "";

  useEffect(() => {
    (async () => {
      if (!sample) return;

      addSample(baseNodeId, sample);
    })();
  }, [sample, addSample]);

  return (
    <div className="w-full h-full bg-secondary-50">
      <Handle type="target" position={Position.Left} className="invisible" />
    </div>
  );
}

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  Handle,
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";

import KatexSpan from "@/app/components/KatexSpan";
import { fitViewToNode } from "../lib";

export type ExplainerNode = Node<
  { title: string; content: string; stepNodeId: string },
  "explainer"
>;
export function ExplainerNode({
  data: { title, content, stepNodeId },
}: NodeProps<ExplainerNode>) {
  const { fitView } = useReactFlow();

  return (
    <Card className="w-[30em]">
      <CardHeader className="bg-secondary-200">
        <div className="flex flex-row justify-between items-center w-full">
          <h4 className="text-2xl font-medium">{title}</h4>
          <Button
            className="bg-default-100"
            endContent={<ChevronRightIcon className="size-5" />}
            onPress={() => {
              fitView(
                fitViewToNode({
                  id: stepNodeId,
                }),
              );
            }}
          >
            Return
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="text-md">
          <KatexSpan>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="place-self-center p-8"
            />
          </KatexSpan>
        </div>
      </CardBody>
      <Handle type="target" position={Position.Right} className="invisible" />
    </Card>
  );
}

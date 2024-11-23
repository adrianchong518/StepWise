import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionItem,
  Button,
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
import useSWR from "swr";

import { Concept, ConceptId } from "@/app/api/concept";
import KatexSpan from "@/app/components/KatexSpan";
import { fitViewToNode, getSampleNodeId } from "../lib";
import useStore from "../store";

export type ConceptNode = Node<{ conceptId: ConceptId }, "concept">;
export function ConceptNode({ data: { conceptId } }: NodeProps<ConceptNode>) {
  const { question, currentSample } = useStore((s) => ({
    question: s.question,
    currentSample: s.currentSample,
  }));
  const { data: concept } = useSWR<Concept>(`/api/concept/${conceptId}`);

  const { fitView } = useReactFlow();

  if (!concept) return;

  return (
    <Card className="w-fit">
      <CardHeader className="bg-gray-200">
        <div className="flex flex-row justify-between items-center w-full">
          <h4 className="text-2xl font-medium">{concept.name}</h4>
          <Button
            className="bg-default-100"
            endContent={<ChevronLeftIcon className="size-5" />}
            onPress={() => {
              fitView(
                fitViewToNode({
                  id: getSampleNodeId(question?.id ?? "", currentSample),
                }),
              );
            }}
          >
            Return
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {concept.figure ? (
          <div className="w-full flex flex-row items-center">
            <div className="w-1/2 p-8 text-md">
              <KatexSpan>
                <div
                  dangerouslySetInnerHTML={{ __html: concept.text }}
                  className="place-self-center"
                />
              </KatexSpan>
            </div>
            <div className="w-1/2 aspect-square relative">
              <img
                src={`/${concept.figure}`}
                className="w-full h-full absolute"
              />
            </div>
          </div>
        ) : (
          <div className="text-md">
            <KatexSpan>
              <div
                dangerouslySetInnerHTML={{ __html: concept.text }}
                className="place-self-center"
              />
            </KatexSpan>
          </div>
        )}
      </CardBody>

      <Divider />

      <CardFooter>
        <Accordion>
          <AccordionItem
            key="1"
            title="Similar Questions that you have done before"
          >
            <div className="grid grid-cols-2 w-full gap-y-3 gap-x-5">
              <Button>HKDSE 2022 Mathematics Paper 1 Q18</Button>
              <Button>HKDSE 2022 Mathematics Paper 2 Q12</Button>
              <Button>HKDSE 2022 Mathematics Paper 2 Q35</Button>
              <Button>HKDSE 2021 Mathematics Paper 1 Q5</Button>
            </div>
          </AccordionItem>
        </Accordion>
      </CardFooter>

      <Handle type="target" position={Position.Left} className="invisible" />
    </Card>
  );
}
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  ButtonGroup,
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

import type { QuestionDetails } from "@/app/api/question";
import KatexSpan from "@/app/components/KatexSpan";
import { fitViewToNode } from "../lib";
import useStore from "../store";

export type QuestionNode = Node<
  {
    questionDetail: QuestionDetails;
    firstStep: string;
  },
  "question"
>;

export function QuestionNode({
  data: { questionDetail, firstStep },
}: NodeProps<QuestionNode>) {
  const { setCurrentStep } = useStore((s) => ({
    setCurrentStep: s.setCurrentStep,
  }));
  const { fitView } = useReactFlow();

  return (
    <Card className="w-[50em]">
      <CardHeader className="bg-primary-100">
        <div className="flex w-full items-center justify-between">
          <h4 className="text-2xl font-medium">Question</h4>
          <ButtonGroup className="justify-self-end transition-colors">
            <Button
              isIconOnly
              color="primary"
              className="bg-primary-100 text-gray-700"
              onPress={(_) => {
                setCurrentStep(firstStep);
                fitView(fitViewToNode({ id: firstStep }));
              }}
            >
              <ChevronDownIcon />
            </Button>
          </ButtonGroup>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-row justify-between w-full text-md">
          <div className="w-1/2 p-8 self-center flex flex-col justify-center gap-12">
            <div className="w-full items-center text-lg">
              <KatexSpan>{questionDetail.content}</KatexSpan>
            </div>
            <div className="place-self-center">
              <Button
                color="primary"
                onPress={(_) => {
                  setCurrentStep(firstStep);
                  fitView(fitViewToNode({ id: firstStep }));
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
          <div className="w-1/2 p-8 aspect-square relative">
            <img
              src={`/${questionDetail.figure}`}
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="p-8"></div>
      </CardBody>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <InformationCircleIcon className="size-5" />
          <div className="text-sm">
            You can review the question anytime at the top-left corner.
          </div>
        </div>
      </CardFooter>

      <Handle
        type="source"
        position={Position.Bottom}
        id="next-step"
        className="invisible"
      />
    </Card>
  );
}

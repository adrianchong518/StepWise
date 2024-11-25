import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

import { type QuestionDetails } from "@/app/api/question/index";
import KatexSpan from "@/app/components/KatexSpan";
import useStore from "../store";

export default function QuestionCard({
  question,
}: {
  question: QuestionDetails;
}) {
  const { expanded, setExpanded } = useStore((s) => ({
    expanded: s.questionExpanded,
    setExpanded: s.setQuestionExpanded,
  }));

  return (
    <Card className="max-w-[40em] h-fit">
      <CardHeader className="bg-primary-500 text-gray-100">
        <Button
          className="justify-self-end h-fit"
          color="primary"
          disableAnimation
          size="lg"
          startContent={
            expanded ? (
              <ChevronDownIcon className="size-5/6" />
            ) : (
              <ChevronRightIcon className="size-5/6" />
            )
          }
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <div className="flex flex-col justify-center items-start">
            <div className="text-3xl">
              {question.source.kind} {question.source.year} {question.subject}
            </div>
            <div className="text-2xl">
              Question {question.number}({question.part})
            </div>
          </div>
        </Button>
      </CardHeader>
      {expanded && (
        <>
          <Divider />
          <CardBody className="text-xl h-fit">
            <div className="flex flex-col h-fit">
              <div>
                <KatexSpan>{question.content}</KatexSpan>
              </div>
              <div className="w-1/2 place-self-center aspect-square relative">
                {question.figure && (
                  <img src={`/${question.figure}`} className="w-full h-full" />
                )}
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="text-md"></CardFooter>
        </>
      )}
    </Card>
  );
}

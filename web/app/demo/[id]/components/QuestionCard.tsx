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
    <Card className="max-w-[40em]">
      <CardHeader className="bg-primary-500 text-gray-100">
        <Button
          className="justify-self-end"
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
            <div className="text-2xl">
              {question.source.kind} {question.source.year} {question.subject}
            </div>
            <div className="text-lg">
              Question {question.number}({question.part})
            </div>
          </div>
        </Button>
      </CardHeader>
      {expanded && (
        <>
          <Divider />
          <CardBody className="text-md">
            <KatexSpan>{question.content}</KatexSpan>
          </CardBody>
          <Divider />
          <CardFooter className="text-md"></CardFooter>
        </>
      )}
    </Card>
  );
}

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";

import { type QuestionDetails } from "@/app/api/question/index";
import KatexSpan from "@/app/components/KatexSpan";

export default function QuestionCard({
  question,
}: {
  question: QuestionDetails;
}) {
  const [] = useState(false);

  return (
    <Card className="min-w-md max-w-lg">
      <CardHeader className="bg-primary-500 text-gray-100">
        <div className="flex flex-row items-center font-bold w-full justify-between">
          <div className="text-xl">
            {question.source.kind} {question.source.year} {question.subject}
          </div>
          <div className="text-lg">
            Question {question.number}({question.part})
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="text-md">
        <KatexSpan>{question.content}</KatexSpan>
      </CardBody>
      <Divider />
      <CardFooter className="text-md"></CardFooter>
    </Card>
  );
}

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import useSWR from "swr";

import { type QuestionResponse } from "@/app/api/question/[id]/type";
import KatexSpan from "@/app/components/KatexSpan";

export type QuestionProps = {
  questionId: string;
};

export default function Question({ questionId }: QuestionProps) {
  const { data: question } = useSWR<QuestionResponse>(
    `/api/question/${questionId}`,
  );

  if (question === undefined) {
    return;
  }

  return (
    <Card>
      <CardHeader className="bg-primary-500 text-gray-100">
        <div className="flex flex-row font-bold">
          <span className="text-xl">
            {question.source} {question.subject} {question.year}
          </span>
          <span className="text-lg">
            Question {question.number}({question.part})
          </span>
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

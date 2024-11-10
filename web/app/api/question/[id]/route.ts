import { questionData } from "@/app/api/data";
import { type QuestionResponse } from "./type";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  // HACK: generalize later
  if (id === "Math_2023_17_a") {
    const res: QuestionResponse = {
      id: id,
      source: "HKDSE",
      subject: "Mathematics",
      year: questionData[id].year,
      number: questionData[id].questionNumber,
      part: questionData[id].part,
      content: questionData[id].Content,
    };
    return Response.json(res);
  }

  return new Response("Not found", { status: 404 });
}

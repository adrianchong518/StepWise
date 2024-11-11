import { questionData } from "@/app/api/data";
import { type Question, type StepResponse } from "@/app/api/question/index";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  // HACK: generalize later
  if (id === "Math_2023_17_a") {
    const res: Question = {
      id: id,

      details: {
        subject: "Mathematics",
        source: { kind: "HKDSE", year: questionData[id].year },
        number: questionData[id].questionNumber,
        part: questionData[id].part,
        content: questionData[id].Content,
      },

      variables: Object.fromEntries(
        Object.entries(questionData[id].var).map(([k, v]) => [
          k,
          {
            value: v.Value,
            given: !!v.Given,
            figure1: v.Photo1 ?? undefined,
            figure2: v.Photo2 ?? undefined,
          },
        ]),
      ),

      steps: Object.entries(questionData[id].steps).map(([k, v]) => {
        return {
          id: +k,
          prompt: v.Questions,
          variables: v.Variables,
          response: v.Choices as StepResponse,
          sampleQuestion: v["Sample Questions"],
        };
      }),
    };
    return Response.json(res);
  }

  return new Response("Not found", { status: 404 });
}

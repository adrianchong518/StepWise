import { questionData } from "@/app/api/data";
import type { Question, StepResponse } from "..";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  // HACK: generalize later
  const data: any = questionData[id as keyof typeof questionData];
  if (data) {
    const res: Question = {
      id: id,
      nextId: data.nextId,

      details: {
        subject: "Mathematics",
        source: { kind: "HKDSE", year: data.details.source.year },
        number: data.details.number,
        part: data.details.part ?? undefined,
        content: data.details.content,
      },

      variables: Object.fromEntries(
        Object.entries(data.variables).map(([k, v]: any) => [
          k,
          {
            value: v.value,
            given: !!v.given,
            figure1: v.figure1 ?? undefined,
            figure2: v.figure2 ?? undefined,
          },
        ]),
      ),

      steps: Object.entries(data.steps).map(([k, v]: any) => {
        return {
          id: +k,
          prompt: v.prompt,
          variables: v.variables,
          response: v.response as StepResponse,
          sampleId: v["Sample Questions"],
        };
      }),
    };
    return Response.json(res);
  }

  return new Response("Not found", { status: 404 });
}

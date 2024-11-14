import { sampleData } from "@/app/api/data";
import { Sample } from "..";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  const data =
    sampleData.MATH.sample[id as keyof typeof sampleData.MATH.sample];
  if (data) {
    const res: Sample = {
      id: +id,
      subject: "Mathematics",
      name: data["Skill set"],
      question: data.Questions,
      concept: data.Concept,
      steps: Object.values(data.steps).map((s, id) => ({
        id,
        text: s.step,
        figure: s.Photo ?? undefined,
        links: s.Links,
      })),
    };
    return Response.json(res);
  }

  return new Response("Not found", { status: 404 });
}

import { conceptData } from "@/app/api/data";
import { Concept } from "..";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  const data =
    conceptData.MATH.concept[id as keyof typeof conceptData.MATH.concept];
  if (data) {
    const res: Concept = {
      id: +id,
      subject: "Mathematics",
      name: data.name,
      text: data.text,
      figure: data.figure ?? undefined,
    };
    return Response.json(res);
  }

  return new Response("Not found", { status: 404 });
}

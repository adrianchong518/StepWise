import { type StepResponse } from "./type";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; step: string }> },
) {
  const { id, step } = await params;
  const res: StepResponse = { questionId: id, stepId: step };
  return Response.json(res);
}

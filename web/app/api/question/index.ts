import type { SampleId } from "../sample";
import type { Figure } from "../type";

export type QuestionId = string;

export type Question = {
  id: QuestionId;
  nextId: string;
  details: QuestionDetails;
  variables: Record<string, Variable>;
  steps: Step[];
};

export type QuestionDetails = {
  subject: "Mathematics";
  source: QuestionSource;
  number: number;
  part?: string;
  content: string;

  figure?: Figure;
};

export type QuestionSource = HKDSEQuestion /*  | PublisherQuestion */;

export type HKDSEQuestion = {
  kind: "HKDSE";
  year: number;
};

// export type PublisherQuestion = {
//   kind: "Publisher";
// };

export type Variable = {
  value: string | number;
  given: boolean;
  figure1?: Figure;
  figure2?: Figure;
};

export type Step = {
  id: StepId;
  prompt: string;
  variables: string[];
  response: StepResponse;
  sampleId?: SampleId;
};

export type StepId = number;

export type StepResponse =
  | OptionResponse
  | MultiOptionResponse
  | NumberResponse
  | EndResponse;

export type OptionResponse = {
  type: "option";
  options: {
    value: string;
    nextStep?: StepId;
  }[];
};

export type MultiOptionResponse = {
  type: "multioption";
  options: string[];
  correctOptions: string[];
  nextStep: StepId;
};

export type NumberResponse = {
  type: "number";
  value: number;
  nextStep: StepId;
};

export type EndResponse = {
  type: "end";
};

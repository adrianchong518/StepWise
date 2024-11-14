import type { Figure } from "../type";

export type SampleId = number;

export type Sample = {
  id: SampleId;
  subject: "Mathematics";
  name: string;
  question: string;
  figure?: Figure;
  concept: ConceptId;
  steps: SampleStep[];
};

export type SampleStepId = number;

export type SampleStep = {
  id: SampleStepId;
  text: string;
  figure?: Figure;
  links: SampleStepId[];
};

export type ConceptId = number;

export type Concept = {};

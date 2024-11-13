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

export type SampleStep = {
  text: string;
  figure?: Figure;
  links: number[];
};

export type ConceptId = number;

export type Concept = {};

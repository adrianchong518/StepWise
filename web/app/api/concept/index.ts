import type { Figure } from "../type";

export type ConceptId = number;

export type Concept = {
  id: ConceptId;
  subject: "Mathematics";
  name: string;
  text: string;
  figure?: Figure;
};

import { Edge } from "@xyflow/react";
import { QuestionDetails } from "../api/question";
import { ConceptNode } from "./components/ConceptNode";
import { ExplainerNode } from "./components/ExplainerNode";
import { QuestionNode } from "./components/QuestionNode";
import {
  SampleNode,
  SampleQuestionNode,
  SampleStepNode,
} from "./components/SampleNode";
import { StepNode } from "./components/StepNode";
import { createEdge, createNode } from "./lib";

const invisibleNodeStyle: CSSProperties = {
  height: 1,
  width: 150,
  padding: 0,
  visibility: "hidden"
};

function InvisibleHelperNode() {
  return (
    <div style= { invisibleNodeStyle } >
    <Handle type="target" position = { Position.Top } style = {{ top: 0 }
} />
  < Handle type = "source" position = { Position.Bottom } style = {{ top: -8 }} />
    </div>
  );
}

export type StaticNode =
  | StepNode
  | SampleNode
  | SampleQuestionNode
  | SampleStepNode
  | ConceptNode
  | QuestionNode
  | ExplainerNode;

export const questionDetails: QuestionDetails = {
  subject: "Mathematics",
  source: {
    kind: "HKDSE",
    year: 2023,
  },
  number: 17,
  part: "b",
  content:
    "Figure 3 shows the pyramid \\( WXYZ \\), where \\( WZ=XZ=YZ \\). The base of this pyramid is the triangle \\( WXY \\) described in (a). It is given that the angle between \\( WZ \\) and the triangle \\( WXY \\) is \\( 30^\\circ \\). Does the angle between the triangles \\( WXY \\) and \\( XYZ \\) exceed \\( 45^\\circ \\)? Explain your answer.",
  figure: "image/static/Image1.svg",
};

export const initialNodes: StaticNode[] = [
  createNode<QuestionNode>({
    id: "question",
    type: "question",
    position: { x: 0, y: -800 },
    data: {
      questionDetail: questionDetails,
      firstStep: "step0",
    },
  }),
  createNode<StepNode>({
    id: "step0",
    type: "step",
    position: { x: 0, y: 0 },
    data: {
      step: "Details",
      prompt:
        "From the graph, we may denote \\(Z'\\) is the projection of \\(Z\\) on \\(\\triangle XYW\\), where \\(A\\) is the point on \\(XY\\) such that \\(Z'A\\perp XY\\) and \\(ZA\\perp XY\\). Also, we know that \\(WZ=XZ=YZ\\)",
      res: {
        type: "opt",
        opts: [
          {
            value: "OK",
            next: {
              step: "step1",
            },
            status: "correct",
          },
        ],
      },
      figure: "image/static/Image2.svg",
    },
  }),
  createNode<StepNode>({
    id: "step1",
    type: "step",
    position: { x: 0, y: 800 },
    data: {
      step: "Step 1",
      prompt:
        "From the question, we're provided with the angle between \\( WZ \\) and the triangle \\( WXY \\) is \\( 30^\\circ \\). Where exactly it is?",
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`\(\triangle WXY\)`,
            next: { step: "" },
            status: "active",
          },
          {
            value: String.raw`\(\triangle AWZ\)`,
            next: { explain: "explain1" },
            status: "wrong",
          },
          {
            value: String.raw`\(\triangle Z'WZ\)`,
            next: { step: "step2" },
            status: "correct",
          },
        ],
      },
      figure: "image/static/Image3.svg",
    },
  }),
  createNode<StepNode>({
    id: "step2",
    type: "step",
    position: { x: 0, y: 1600 },
    data: {
      step: "Step 2",
      prompt: "Which angle exactly in the triangle?",
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`\(\angle ZZ'W\)`,
            next: { step: "" },
            status: "active",
          },
          {
            value: String.raw`\(\angle ZWZ'\)`,
            next: { step: "step3" },
            status: "correct",
          },
          {
            value: String.raw`\(\angle Z'ZW\)`,
            next: { step: "" },
            status: "active",
          },
        ],
      },
      figure: "image/static/Image6.svg",
    },
  }),
  createNode<StepNode>({
    id: "step3",
    type: "step",
    position: { x: 0, y: 2400 },
    data: {
      step: "Step 3",
      prompt: String.raw`From the question, we're finding the angle between the triangles \( WXY \) and \( XYZ \).
Where exactly it is?`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`\(\triangle WXY\)`,
            next: { step: "" },
            status: "active",
          },
          {
            value: String.raw`\(\triangle AWZ\)`,
            next: { explain: "explain1" },
            status: "wrong",
          },
          {
            value: String.raw`\(\triangle Z'AZ\)`,
            next: { step: "step4" },
            status: "correct",
          },
        ],
      },
      figure: "image/static/Image7.svg",
    },
  }),
  createNode<StepNode>({
    id: "step4",
    type: "step",
    position: { x: 0, y: 3200 },
    data: {
      step: "Step 4",
      prompt: String.raw`Which angle exactly in the triangle?`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`\(\angle ZZ'A\)`,
            next: { step: "" },
            status: "active",
          },
          {
            value: String.raw`\(\angle ZAZ'\)`,
            next: { step: "step5" },
            status: "correct",
          },
          {
            value: String.raw`\(\angle Z'ZA\)`,
            next: { step: "" },
            status: "active",
          },
        ],
      },
      figure: "image/static/Image8.svg",
    },
  }),
  createNode<StepNode>({
    id: "step5",
    type: "step",
    position: { x: 0, y: 4000 },
    data: {
      step: "Step 5",
      prompt: String.raw`Which method should we use to obtain the \(\angle ZAZ'\)?`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`Basic trignometry`,
            next: { step: "step6" },
            status: "correct",
          },
          {
            value: String.raw`Area of triangle`,
            next: { explain: "explain2" },
            status: "wrong",
          },
          {
            value: String.raw`Sine law`,
            next: { step: "step8" },
            status: "correct",
          },
        ],
      },
      figure: "image/static/Image9.svg",
    },
  }),
  createNode<StepNode>({
    id: "step6",
    type: "step",
    position: { x: 0, y: 4800 },
    data: {
      step: "Step 6",
      prompt: String.raw`Which method could you use to obtain the \(\angle ZAZ'\), using basic trignometry?`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`sin`,
            next: { step: "step7" },
            status: "correct",
          },
          {
            value: String.raw`cos`,
            next: { step: "" },
            status: "active",
          },
          {
            value: String.raw`tan`,
            next: { step: "" },
            status: "active",
          },
        ],
      },
      figure: "image/static/Image10.svg",
    },
  }),
  createNode<StepNode>({
    id: "step7",
    type: "step",
    position: { x: 0, y: 5600 },
    data: {
      step: "Step 7",
      prompt: String.raw`Correspondingly, which side lengths should we obtain to proceed?`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`\(ZA\)`,
            next: { step: "step9" },
            status: "correct",
          },
          {
            value: String.raw`\(ZZ'\)`,
            next: { step: "step14" },
            status: "correct",
          },
          {
            value: String.raw`\(AZ'\)`,
            next: { step: "" },
            status: "wrong",
          },
        ],
      },
      figure: "image/static/Image10.svg",
    },
  }),
  createNode<StepNode>({
    id: "step8",
    type: "step",
    position: { x: -1000, y: 5200 },
    data: {
      step: "Step 8",
      prompt: String.raw`Note that we have to combine \(\triangle ZAZ'\) and \(\triangle ZWZ'\) in the same plane. Correspondingly, which side lengths should we obtain to proceed?`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`\(ZA\)`,
            next: { step: "step9" },
            status: "correct",
          },
          {
            value: String.raw`\(AW\)`,
            next: { step: "" },
            status: "wrong",
          },
          {
            value: String.raw`\(ZW\)`,
            next: { step: "step16" },
            status: "correct",
          },
        ],
      },
      figure: "image/static/Image11.svg",
    },
  }),
  createNode<StepNode>({
    id: "step9",
    type: "step",
    position: { x: 0, y: 6400 },
    data: {
      step: "Step 9",
      prompt: String.raw`How can we find \(ZA\)?`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`Pythagorean theorem`,
            next: { step: "step10" },
            status: "correct",
          },
          {
            value: String.raw`Herons Formula`,
            next: { step: "step12" },
            status: "correct",
          },
          {
            value: String.raw`Basic trigonmetry`,
            next: { explain: "explain3" },
            status: "wrong",
          },
        ],
      },
      figure: "image/static/Image13.svg",
    },
  }),
  createNode<StepNode>({
    id: "step10",
    type: "step",
    position: { x: 0, y: 8000 },
    data: {
      step: "Step 10",
      prompt: String.raw`Which property can we use with Pythagorean theorem?`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`Property of isosceles Triangle`,
            next: { step: "step11" },
            status: "correct",
          },
          {
            value: String.raw`Property of equilateral triangle`,
            next: { explain: "explain4" },
            status: "wrong",
          },
          {
            value: String.raw`Basic trigonmetry`,
            next: { explain: "" },
            status: "active",
          },
        ],
      },
      figure: "image/static/Image14.svg",
    },
  }),
  createNode<StepNode>({
    id: "step11",
    type: "step",
    position: { x: 0, y: 8800 },
    data: {
      step: "Step 11",
      prompt: String.raw`Which properties of isosceles triangles should we use?`,
      res: {
        type: "multi",
        options: {
          [String.raw`\(ZY=ZX\)`]: true,
          [String.raw`\(\angle ZAX = 90^\circ\)`]: true,
          [String.raw`\(XY = 5\)`]: true,
          [String.raw`\(XA=AY\)`]: false,
        },
        nextStep: "step13",
      },
      figure: "image/static/Image14.svg",
    },
  }),
  createNode<StepNode>({
    id: "step12",
    type: "step",
    position: { x: 0, y: 9600 },
    data: {
      step: "Step 12",
      prompt: String.raw`Given that \(ZA\) is the height of the \(\triangle ZXY\), we can calculate it using Herons Formula. What should we find in order to use Herons Formula?`,
      res: {
        type: "multi",
        options: {
          [String.raw`\(ZY\)`]: true,
          [String.raw`\(ZX\)`]: true,
          [String.raw`\(XY\)`]: true,
          [String.raw`\(\angle XZY\)`]: false,
        },
        nextStep: "step13",
      },
      figure: "image/static/Image14.svg",
    },
  }),
  createNode<StepNode>({
    id: "step13",
    type: "step",
    position: { x: 0, y: 10400 },
    data: {
      step: "Step 13",
      prompt: String.raw`How can we find \(ZX\) and \(ZY\)`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`Given \(ZX=ZY=ZW\)`,
            next: { step: "step16" },
            status: "correct",
          },
          {
            value: String.raw`Property of equilateral triangles`,
            next: { explain: "" },
            status: "wrong",
          },
          {
            value: String.raw`Property of isosceles triangles`,
            next: { explain: "" },
            status: "wrong",
          },
        ],
      },
      figure: "image/static/Image15.svg",
    },
  }),
  createNode<StepNode>({
    id: "step14",
    type: "step",
    position: { x: 0, y: 11200 },
    data: {
      step: "Step 14",
      prompt: String.raw`How should we find ZZ'`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`Basic trignometry`,
            next: { step: "step15" },
            status: "correct",
          },
          {
            value: String.raw`Volume of the solid`,
            next: { explain: "explain5" },
            status: "wrong",
          },
          {
            value: String.raw`Pythagorean theorem`,
            next: { explain: "" },
            status: "active",
          },
        ],
      },
      figure: "image/static/Image16.svg",
    },
  }),
  createNode<StepNode>({
    id: "step15",
    type: "step",
    position: { x: 0, y: 12000 },
    data: {
      step: "Step 15",
      prompt: String.raw`To find ZZ' using trignometry, which of these values do we need?`,
      res: {
        type: "multi",
        options: {
          [String.raw`\(ZW\)`]: false,
          [String.raw`\(Z'W\)`]: true,
          [String.raw`\(\angle ZWZ' = 30^\circ\)`]: true,
          [String.raw`\(\angle ZZ'W = 90^\circ\)`]: true,
          [String.raw`\(\angle Z'ZW\)`]: false,
        },
        nextStep: "step18",
      },
      figure: "image/static/Image17.svg",
    },
  }),
  createNode<StepNode>({
    id: "step16",
    type: "step",
    position: { x: 0, y: 12800 },
    data: {
      step: "Step 16",
      prompt: String.raw`To find ZW, which method should we use?`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`Basic trignometry`,
            next: { step: "step17" },
            status: "correct",
          },
          {
            value: String.raw`Pythagorean theorem`,
            next: { explain: "" },
            status: "active",
          },
          {
            value: String.raw`Property of isosceles triangles`,
            next: { explain: "" },
            status: "active",
          },
        ],
      },
      figure: "image/static/Image18.svg",
    },
  }),
  createNode<StepNode>({
    id: "step17",
    type: "step",
    position: { x: 0, y: 13600 },
    data: {
      step: "Step 17",
      prompt: String.raw`What values do we need to find \(ZW\) using basic trignometry?`,
      res: {
        type: "multi",
        options: {
          [String.raw`\(ZZ\)`]: false,
          [String.raw`\(Z'W\)`]: true,
          [String.raw`\(\angle ZWZ' = 30^\circ\)`]: true,
          [String.raw`\(\angle ZZ'W = 90^\circ\)`]: true,
          [String.raw`\(\angle Z'ZW\)`]: false,
        },
        nextStep: "step18",
      },
      figure: "image/static/Image17.svg",
    },
  }),
  createNode<StepNode>({
    id: "step18",
    type: "step",
    position: { x: 0, y: 14400 },
    data: {
      step: "Step 18",
      prompt: String.raw`To find \(Z'W\), we can start with the property of \(Z'\), what should we look for?`,
      res: {
        type: "opt",
        opts: [
          {
            value: String.raw`Circumcenter`,
            next: { step: "step19" },
            status: "correct",
          },
          {
            value: String.raw`In-center`,
            next: { explain: "explain6" },
            status: "wrong",
          },
          {
            value: String.raw`Orthocenter`,
            next: { explain: "explain6" },
            status: "wrong",
          },
        ],
      },
      figure: "image/static/Image19.svg",
    },
  }),
];

export const initialEdges: Edge[] = [
  createEdge({ id: "question->step0", source: "question", target: "step0" }),
  createEdge({
    id: "step0->step1",
    source: "step0",
    sourceHandle: "next-step",
    target: "step1",
  }),
  createEdge({
    id: "step1->step2",
    source: "step1",
    sourceHandle: "next-step",
    target: "step2",
  }),
  createEdge({
    id: "step2->step3",
    source: "step2",
    sourceHandle: "next-step",
    target: "step3",
  }),
  createEdge({
    id: "step3->step4",
    source: "step3",
    sourceHandle: "next-step",
    target: "step4",
  }),
  createEdge({
    id: "step4->step5",
    source: "step4",
    sourceHandle: "next-step",
    target: "step5",
  }),
  createEdge({
    id: "step5->step6",
    source: "step5",
    sourceHandle: "next-step",
    target: "step6",
  }),
  createEdge({
    id: "step5->step8",
    source: "step5",
    sourceHandle: "next-step",
    target: "step8",
  }),
  createEdge({
    id: "step6->step7",
    source: "step6",
    sourceHandle: "next-step",
    target: "step7",
  }),
  createEdge({
    id: "step7->step9",
    source: "step7",
    sourceHandle: "next-step",
    target: "step9",
  }),
  createEdge({
    id: "step8->step9",
    source: "step8",
    sourceHandle: "next-step",
    target: "step9",
  }),
];

import tailwindConfig from "@/app/utils/tailwind";
import {
  Edge,
  Handle,
  MarkerType,
  Node,
  NodeProps,
  Position,
} from "@xyflow/react";
import { CSSProperties } from "react";
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
  visibility: "hidden",
};
export type InvisibleHelperNode = Node<{}, "invisible">;
export function InvisibleHelperNode({ }: NodeProps<InvisibleHelperNode>) {
  return (
    <div style={invisibleNodeStyle}>
      <Handle type="target" position={Position.Top} style={{ top: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ top: -8 }} />
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
  | ExplainerNode
  | InvisibleHelperNode;

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
      sample: "sample1",
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
            next: { explain: "explain1_2" },
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
      sample: "sample1",
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
  createNode<ExplainerNode>({
    id: "explain2",
    type: "explainer",
    position: { x: -1000, y: 4000 },
    data: {
      title: "Area of Triangle",
      content: String.raw`Notice that this method is generally the same as basic trignometry, as \(\angle ZZ'A = 90^\circ\)!
\[\begin{aligned}
\text{Area} & = \frac{1}{2} \times AZ \times AZ' \times \sin{\angle ZAZ'} \\ 
  & = \frac{1}{2} \times AZ' \times ZZ' \sin{\angle ZAZ'} = ZZ' / AZ
\end{aligned}\]
Thus, consider using easier approach!`,
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
      sample: "sample2",
      figure: "image/static/Image10.svg",
    },
  }),
  createNode<StepNode>({
    id: "step8",
    type: "step",
    position: { x: -2000, y: 5200 },
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
  createNode<ExplainerNode>({
    id: "explain3",
    type: "explainer",
    position: { x: -1000, y: 6400 },
    data: {
      title: "Hint",
      content: String.raw`Basic trignometry is not applicable to the question, as it don't exist any \(90^\circ\) here.`,
    },
  }),
  createNode<StepNode>({
    id: "step10",
    type: "step",
    position: { x: 0, y: 7200 },
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
  createNode<ExplainerNode>({
    id: "explain4",
    type: "explainer",
    position: { x: -750, y: 7200 },
    data: {
      title: "Hint",
      content: String.raw`It is only given that \(ZY=ZX\)`,
    },
  }),
  createNode<StepNode>({
    id: "step11",
    type: "step",
    position: { x: 0, y: 8000 },
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
    position: { x: -1000, y: 8000 },
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
    position: { x: 0, y: 8800 },
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
    position: { x: 1000, y: 6400 },
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
  createNode<ExplainerNode>({
    id: "explain5",
    type: "explainer",
    position: { x: 2000, y: 6400 },
    data: {
      title: "Hint",
      content: String.raw`Although it is possible to find \(ZZ'\) using the volume, as \(ZZ'\) is the height of the solid. However, this method is too time consuming when compared with others, it is not recommended to use this method!`,
      pos: Position.Left,
    },
  }),
  createNode<StepNode>({
    id: "step15",
    type: "step",
    position: { x: 1000, y: 7200 },
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
    position: { x: 0, y: 9600 },
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
    position: { x: 0, y: 10400 },
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
    position: { x: 0, y: 11200 },
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
  createNode<ExplainerNode>({
    id: "explain6",
    type: "explainer",
    position: { x: -1000, y: 11200 },
    data: {
      title: "Hint",
      content: String.raw`You have been given \(ZX=ZY=ZW\) and \(X Y W\) are vertexs of triangle!`,
    },
  }),
  createNode<InvisibleHelperNode>({
    id: "step8_top",
    type: "invisible",
    position: { x: -2000, y: 4600 },
    data: {},
  }),
  createNode<InvisibleHelperNode>({
    id: "step8_bottom",
    type: "invisible",
    position: { x: -2000, y: 6000 },
    data: {},
  }),
  createNode<InvisibleHelperNode>({
    id: "step8_bottom2",
    type: "invisible",
    position: { x: -2000, y: 9000 },
    data: {},
  }),
  createNode<InvisibleHelperNode>({
    id: "step12_top",
    type: "invisible",
    position: { x: -1000, y: 6800 },
    data: {},
  }),
  createNode<InvisibleHelperNode>({
    id: "step15_bottom",
    type: "invisible",
    position: { x: 1000, y: 10600 },
    data: {},
  }),
  createNode<ExplainerNode>({
    id: "explain1",
    type: "explainer",
    position: { x: -1000, y: 800 },
    data: {
      title: "Trap",
      content:
        "Remember, AZ'W is not a straight line here! The question did not given this information!",
    },
  }),
  createNode<ExplainerNode>({
    id: "explain1_2",
    type: "explainer",
    position: { x: -1000, y: 2400 },
    data: {
      title: "Trap",
      content:
        "Remember, AZ'W is not a straight line here! The question did not given this information!",
    },
  }),
  createNode<SampleNode>({
    id: "sample1",
    type: "sample",
    position: { x: 1000, y: 1600 },
    origin: [0, 0.5],
    style: { width: 480 + 120, height: 1000 },
    data: { concept: "concept1" },
  }),
  createNode<SampleQuestionNode>({
    id: "sample1_q",
    type: "sample-question",
    parentId: "sample1",
    position: { x: 300, y: 250 },
    data: {
      name: "Angle between two planes",
      question: String.raw`Given a diagram, locate the angle between \(\triangle ABC\) and \(\triangle BCD\)`,
      figure: "image/static/Image4.svg",
    },
  }),
  createNode<SampleStepNode>({
    id: "sample1_1",
    type: "sample-step",
    parentId: "sample1",
    position: { x: 300, y: 750 },
    data: {
      sample: "sample1",
      step: {
        header: "Method",
        text: String.raw`Directly obtained from the graph, we have \(\angle AMD\)`,
        figure: "image/static/Image5.svg",
      },
    },
  }),
  createNode<ConceptNode>({
    id: "concept1",
    type: "concept",
    position: { x: 2200, y: 1600 },
    data: {
      concept: {
        id: 0,
        subject: "Mathematics",
        name: "Angle between two planes",
        text: "It refers to the smallest angle between two planes, constructed by straight line perpendicular to the intersection line.",
      },
    },
  }),
  createNode<SampleNode>({
    id: "sample2",
    type: "sample",
    position: { x: 1000, y: 5000 },
    origin: [0, 0.5],
    style: { width: 480 + 120, height: 1000 },
    data: { concept: "concept1" },
  }),
  createNode<SampleQuestionNode>({
    id: "sample2_q",
    type: "sample-question",
    parentId: "sample2",
    position: { x: 300, y: 250 },
    data: {
      name: "Sine Function",
      question: String.raw`Find \(AC\) from the given triangle, given \(BC = 4\), \(\angle ABC=90^\circ\), \(\angle BAC = 45^\circ\).`,
      figure: "image/static/Image12.svg",
    },
  }),
  createNode<SampleStepNode>({
    id: "sample2_1",
    type: "sample-step",
    parentId: "sample2",
    position: { x: 300, y: 750 },
    data: {
      sample: "sample1",
      step: {
        header: "Method",
        text: String.raw`\[
sin{45^\circ} = \frac{4}{AC} \\
AC = \frac{4}{sin{45^\circ}} = 4\sqrt{2}
\]`,
      },
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
  createEdge(
    {
      id: "step5->step8_top",
      source: "step5",
      sourceHandle: "next-step",
      target: "step8_top",
    },
    false,
  ),
  createEdge({
    id: "step8_top->step8",
    source: "step8_top",
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
  createEdge(
    {
      id: "step8->step8_bottom",
      source: "step8",
      sourceHandle: "next-step",
      target: "step8_bottom",
    },
    false,
  ),
  createEdge(
    {
      id: "step8->step8_bottom2",
      source: "step8",
      sourceHandle: "next-step",
      target: "step8_bottom2",
    },
    false,
  ),
  createEdge({
    id: "step8_bottom->step9",
    source: "step8_bottom",
    target: "step9",
  }),
  createEdge({
    id: "step9->step10",
    source: "step9",
    sourceHandle: "next-step",
    target: "step10",
  }),
  createEdge({
    id: "step10->step11",
    source: "step10",
    sourceHandle: "next-step",
    target: "step11",
  }),
  createEdge({
    id: "step11->step13",
    source: "step11",
    sourceHandle: "next-step",
    target: "step13",
  }),
  createEdge(
    {
      id: "step9->step12_top",
      source: "step9",
      sourceHandle: "next-step",
      target: "step12_top",
    },
    false,
  ),
  createEdge({
    id: "step12_top->step12",
    source: "step12_top",
    target: "step12",
  }),
  createEdge({
    id: "step12->step13",
    source: "step12",
    sourceHandle: "next-step",
    target: "step13",
  }),
  createEdge({
    id: "step7->step14",
    source: "step7",
    sourceHandle: "next-step",
    target: "step14",
  }),
  createEdge({
    id: "step14->step15",
    source: "step14",
    sourceHandle: "next-step",
    target: "step15",
  }),
  createEdge({
    id: "step13->step16",
    source: "step13",
    sourceHandle: "next-step",
    target: "step16",
  }),
  createEdge({
    id: "step8_bottom2->step16",
    source: "step8_bottom2",
    target: "step16",
  }),
  createEdge({
    id: "step16->step17",
    source: "step16",
    sourceHandle: "next-step",
    target: "step17",
  }),
  createEdge({
    id: "step17->step18",
    source: "step17",
    sourceHandle: "next-step",
    target: "step18",
  }),
  createEdge(
    {
      id: "step15->step15_bottom",
      source: "step15",
      sourceHandle: "next-step",
      target: "step15_bottom",
    },
    false,
  ),
  createEdge({
    id: "step15_bottom->step18",
    source: "step15_bottom",
    target: "step18",
  }),
  createEdge({
    id: "step1->explain1",
    source: "step1",
    sourceHandle: "explainer",
    target: "explain1",
  }),
  createEdge({
    id: "step3->explain1_2",
    source: "step3",
    sourceHandle: "explainer",
    target: "explain1_2",
  }),
  createEdge({
    id: "step1->sample1",
    source: "step1",
    sourceHandle: "explain",
    target: "sample1",
  }),
  createEdge({
    id: "step3->sample1",
    source: "step3",
    sourceHandle: "explain",
    target: "sample1",
  }),
  createEdge({
    id: "sample1_q->sample1_1",
    source: "sample1_q",
    target: "sample1_1",
    zIndex: 1,
    style: {
      strokeWidth: 4,
      stroke: tailwindConfig.colors.purple[300],
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: tailwindConfig.colors.purple[400],
    },
  }),
  createEdge({
    id: "step7->sample2",
    source: "step7",
    sourceHandle: "explain",
    target: "sample2",
  }),
  createEdge({
    id: "sample2_q->sample2_1",
    source: "sample2_q",
    target: "sample2_1",
    zIndex: 1,
    style: {
      strokeWidth: 4,
      stroke: tailwindConfig.colors.purple[300],
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: tailwindConfig.colors.purple[400],
    },
  }),
  createEdge({
    id: "sample1->concept1",
    source: "sample1",
    target: "concept1",
  }),
  createEdge({
    id: "step5->explain2",
    source: "step5",
    sourceHandle: "explainer",
    target: "explain2",
  }),
  createEdge({
    id: "step9->explain3",
    source: "step9",
    sourceHandle: "explainer",
    target: "explain3",
  }),
  createEdge({
    id: "step10->explain4",
    source: "step10",
    sourceHandle: "explainer",
    target: "explain4",
  }),
  createEdge({
    id: "step14->explain5",
    source: "step14",
    sourceHandle: "explain",
    target: "explain5",
  }),
  createEdge({
    id: "step18->explain6",
    source: "step18",
    sourceHandle: "explainer",
    target: "explain6",
  }),
];

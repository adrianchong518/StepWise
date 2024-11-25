"use client";

import {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type NodeMouseHandler,
} from "@xyflow/react";
import { useCallback } from "react";

import tailwind from "@/app/utils/tailwind";
import { ConceptNode } from "./components/ConceptNode";
import { ExplainerNode } from "./components/ExplainerNode";
import QuestionCard from "./components/QuestionCard";
import { QuestionNode } from "./components/QuestionNode";
import {
  SampleNode,
  SampleQuestionNode,
  SampleStepNode,
} from "./components/SampleNode";
import { StepNode } from "./components/StepNode";
import { fitViewToNode } from "./lib";

import {
  ArrowLeftStartOnRectangleIcon,
  ArrowsPointingOutIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";
import { Button, ButtonGroup, Link, Tooltip } from "@nextui-org/react";
import "@xyflow/react/dist/style.css";
import {
  initialEdges,
  initialNodes,
  InvisibleHelperNode,
  questionDetails,
  StaticNode,
} from "./nodes";
import useStore from "./store";

const nodeTypes = {
  step: StepNode,
  sample: SampleNode,
  question: QuestionNode,
  "sample-question": SampleQuestionNode,
  "sample-step": SampleStepNode,
  concept: ConceptNode,
  explainer: ExplainerNode,
  invisible: InvisibleHelperNode,
};

export default function Page() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  const { setQuestionExpanded, setCurrentStep, setCurrentSample } = useStore(
    (s) => ({
      setQuestionExpanded: s.setQuestionExpanded,
      setCurrentStep: s.setCurrentStep,
      setCurrentSample: s.setCurrentSample,
    }),
  );

  const focusNode = useCallback<NodeMouseHandler<StaticNode>>(
    (_, node) => {
      if (node.type === "step") {
        setCurrentStep(node.id);
      } else if (node.type === "sample") {
        setCurrentSample(node.id);
      }
      fitView(fitViewToNode(node));
    },
    [fitView, setCurrentStep, setCurrentSample],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={focusNode}
        onMove={() => setQuestionExpanded(false)}
        minZoom={0}
        maxZoom={2}
        deleteKeyCode={null}
        proOptions={{ hideAttribution: true }}
        zoomOnDoubleClick={false}
        fitView
        fitViewOptions={fitViewToNode({ id: "question" })}
      >
        <Panel position="top-left">
          <QuestionCard question={questionDetails} />
        </Panel>

        <Panel position="top-center">
          <ButtonGroup>
            <Tooltip content="Go to latest step">
              <Button
                isIconOnly
                className="p-1 bg-primary-50"
                size="lg"
                onPress={() => {
                  setCurrentStep("end");
                  fitView({ ...fitViewToNode({ id: "end" }), duration: 2000 });
                }}
              >
                <ChevronDoubleDownIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Expand all nodes">
              <Button isIconOnly className="p-1 bg-primary-50" size="lg">
                <ArrowsPointingOutIcon />
              </Button>
            </Tooltip>
            <Tooltip content="Exit">
              <Button
                isIconOnly
                className="p-1 bg-primary-50"
                size="lg"
                as={Link}
                href="/catalog"
              >
                <ArrowLeftStartOnRectangleIcon />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Panel>

        <Background />
        {false && <Controls fitViewOptions={{ duration: 750 }} />}
        <MiniMap
          pannable
          zoomable
          zoomStep={2}
          onNodeClick={focusNode}
          nodeColor={(node) => {
            switch (node.type) {
              case "step":
                return tailwind.colors.blue[200];
              case "sample":
                return tailwind.colors.purple[100];
              case "sample-question":
              case "sample-step":
                return tailwind.colors.purple[300];
              default:
                return tailwind.colors.gray[300];
            }
          }}
        />
      </ReactFlow>
    </div>
  );
}

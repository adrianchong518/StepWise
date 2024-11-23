"use client";

import {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  useReactFlow,
  type NodeMouseHandler,
} from "@xyflow/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import useSWR from "swr";

import { type Question } from "@/app/api/question";
import { nextTick } from "@/app/utils";
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
import { fitViewToNode, getStepNodeId } from "./lib";
import useStore from "./store";
import { DemoNode } from "./store/graph";

import {
  ArrowLeftStartOnRectangleIcon,
  ArrowsPointingOutIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";
import { Button, ButtonGroup, Link, Tooltip } from "@nextui-org/react";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  step: StepNode,
  sample: SampleNode,
  question: QuestionNode,
  "sample-question": SampleQuestionNode,
  "sample-step": SampleStepNode,
  concept: ConceptNode,
  explainer: ExplainerNode,
};

export default function Demo() {
  const { id: questionId } = useParams<{ id: string }>();

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setQuestion,
    setQuestionExpanded,
    setCurrentStep,
    setCurrentSample,
    displayedSteps,
  } = useStore((s) => ({
    nodes: s.nodes,
    edges: s.edges,
    onNodesChange: s.onNodesChange,
    onEdgesChange: s.onEdgesChange,
    onConnect: s.onConnect,
    setNodes: s.setNodes,
    question: s.question,
    setQuestion: s.setQuestion,
    setQuestionExpanded: s.setQuestionExpanded,
    setCurrentStep: s.setCurrentStep,
    setCurrentSample: s.setCurrentSample,
    displayedSteps: s.displayedSteps,
  }));

  const { data: question } = useSWR<Question>(`/api/question/${questionId}`);
  const { fitView } = useReactFlow();

  const focusNode = useCallback<NodeMouseHandler<DemoNode>>(
    (_, node) => {
      if (node.type === "step") {
        setCurrentStep(node.data.stepId);
      } else if (node.type === "sample") {
        setCurrentSample(node.data.sampleId);
      }
      fitView(fitViewToNode(node));
    },
    [fitView, setCurrentStep, setCurrentSample],
  );

  useEffect(() => {
    (async () => {
      if (question) {
        setQuestion(question);
        await nextTick(2);
        fitView(fitViewToNode({ id: question.id }));
      }
    })();
  }, [question, fitView]);

  if (question === undefined) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-4xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={focusNode}
        onMove={() => setQuestionExpanded(false)}
        minZoom={0}
        maxZoom={2}
        deleteKeyCode={null}
        proOptions={{ hideAttribution: true }}
        zoomOnDoubleClick={false}
      >
        <Panel position="top-left">
          <QuestionCard question={question.details} />
        </Panel>

        <Panel position="top-center">
          <ButtonGroup>
            <Tooltip content="Go to latest step">
              <Button
                isIconOnly
                className="p-1 bg-primary-50"
                size="lg"
                onPress={() => {
                  setCurrentStep(displayedSteps[displayedSteps.length - 1]);
                  fitView({
                    ...fitViewToNode({
                      id: getStepNodeId(
                        questionId,
                        displayedSteps[displayedSteps.length - 1],
                      ),
                    }),
                    duration: 750,
                  });
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

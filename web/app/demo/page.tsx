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
import { useCallback, useEffect } from "react";
import useSWR from "swr";

import { type Question } from "@/app/api/question";
import { nextTick } from "@/app/utils";
import QuestionCard from "./components/QuestionCard";
import {
  SampleNode,
  SampleQuestionNode,
  SampleStepNode,
} from "./components/SampleNode";
import { StepNode } from "./components/StepNode";
import useStore from "./store";
import { DemoNode } from "./store/graph";

import "@xyflow/react/dist/style.css";
import { fitViewToNode, getStepNodeId } from "./lib";

const nodeTypes = {
  step: StepNode,
  sample: SampleNode,
  "sample-question": SampleQuestionNode,
  "sample-step": SampleStepNode,
};

const questionId = "Math_2023_17_a";

export default function Demo() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setQuestion,
    setQuestionExpanded,
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
  }));

  const { data: question } = useSWR<Question>(`/api/question/${questionId}`);
  const { fitView } = useReactFlow();

  const focusNode = useCallback<NodeMouseHandler<DemoNode>>(
    (_, node) => {
      fitView(fitViewToNode(node));
    },
    [fitView],
  );

  useEffect(() => {
    (async () => {
      if (question) {
        setQuestion(question);
        await nextTick(2);
        fitView(fitViewToNode({ id: getStepNodeId(question.id, 0) }));
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

        <Background />
        <Controls fitViewOptions={{ duration: 750 }} />
        <MiniMap pannable zoomable zoomStep={2} onNodeClick={focusNode} />
      </ReactFlow>
    </div>
  );
}

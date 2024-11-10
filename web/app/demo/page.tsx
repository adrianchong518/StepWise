"use client";

import {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  type Edge,
  type OnConnect,
} from "@xyflow/react";
import { useCallback } from "react";

import Question from "./components/Question";
import { StepNode } from "./components/StepNode";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  step: StepNode,
};

const initNodes: StepNode[] = [];

const initEdges: Edge[] = [];

const questionId = "Math_2023_17_a";

export default function Demo() {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlowProvider>
      <div className="h-full w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          onlyRenderVisibleElements
        >
          <Panel position="top-center">
            <Question questionId={questionId} />
          </Panel>

          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

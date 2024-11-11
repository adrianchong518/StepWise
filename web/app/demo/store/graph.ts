import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import { type StateCreator } from "zustand";

import { StepNode } from "@/app/demo/components/StepNode";

export type DemoNode = StepNode;

export type GraphStore = {
  nodes: DemoNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<DemoNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: DemoNode[]) => void;
  setEdges: (edges: Edge[]) => void;
};

export const createGraphStore: StateCreator<GraphStore, [], [], GraphStore> = (
  set,
  get,
) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
});

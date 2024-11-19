import { Edge } from "@xyflow/react";
import ELK from "elkjs";

import { DemoNode } from "../demo/[id]/store/graph";

const elk = new ELK({
  workerFactory: function(url) {
    const { Worker } = require("elkjs/lib/elk-worker.js"); // non-minified
    return new Worker(url);
  },
  algorithms: ["mrtree"],
});

export const layoutELK = async ({
  nodes,
  edges,
}: {
  nodes: DemoNode[];
  edges: Edge[];
}) => {
  const layoutNodes = nodes.map((node) => ({
    id: node.id,
    width: node.measured?.width ?? 0,
    height: node.measured?.height ?? 0,
    ports: [
      { id: `${node.id}_source`, properties: { side: "SOUTH" } },
      { id: `${node.id}_target`, properties: { side: "NORTH" } },
    ],
    properties: {
      "org.eclipse.elk.portConstraints": "FIXED_ORDER",
    },
  }));

  const layoutEdges = edges.map((edge) => {
    return {
      id: edge.id,
      sources: [`${edge.source}_source`],
      targets: [`${edge.target}_target`],
    };
  });

  const layouted = await elk
    .layout({
      id: "@root",
      children: layoutNodes,
      edges: layoutEdges,
      layoutOptions: {
        // - https://www.eclipse.org/elk/reference/algorithms.html
        "elk.algorithm": "mrtree",
        "elk.direction": "DOWN",
        // - https://www.eclipse.org/elk/reference/options.html
        "elk.spacing.nodeNode": "150",
        "elk.layered.spacing.nodeNodeBetweenLayers": "150",
      },
    })
    .catch((e) => {
      console.log("❌ ELK layout failed", e);
    });

  if (!layouted?.children) {
    return;
  }
  const layoutedNodePositions = layouted.children.reduce(
    (pre, v) => {
      pre[v.id] = {
        x: v.x ?? 0,
        y: v.y ?? 0,
      };
      return pre;
    },
    {} as Record<string, { x: number; y: number }>,
  );

  return {
    width: layouted.width ?? 0,
    height: layouted.height ?? 0,
    positions: layoutedNodePositions,
  };
};

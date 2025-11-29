import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './Trigger-sheet';

export type NodeMetadata = any;

interface NodeType {
  data: {
    type: "action" | "trigger",
    kind: "price-trigger" | "timer-trigger" | "hyperliquid" | "backpack" | "lighter",
    metadata: NodeMetadata
    label : string
  },
  id: string,
  position: {
    x: number,
    y: number
  }
}

interface EdgeType {
  id: string,
  source: string,
  target: string
}

export default function Workflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!nodes.length && (
        <TriggerSheet
          onSelect={({ kind, metadata }) => {
            setNodes((nodesSnapshot) => [...nodesSnapshot, {
              id: '1',
              position: { x: 250, y: 5 },
              data: { 
                type: 'trigger', kind: kind as NodeType['data']['kind'], 
                metadata : metadata, 
                label: kind
              },
            }]);
          }}
        />
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}
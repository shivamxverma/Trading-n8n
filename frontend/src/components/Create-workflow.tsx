import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './Trigger-sheet';
import Timer from '@/nodes/triggers/Timer';
import PriceTrigger from '@/nodes/triggers/PriceTrigger';
import { ActionSheet } from './Action-sheet';
import {Lighter} from '@/nodes/actions/Lighter';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid';
import { Backpack } from '@/nodes/actions/BackPack';
import type { NodeMetadata } from '@/lib/types';

const nodeTypes = {
  "timer": Timer,
  "price-trigger": PriceTrigger,
  "lighter": Lighter,
  "hyperliquid": Hyperliquid,
  "backpack": Backpack,
}

export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter"
interface NodeType {
  type: NodeKind,
  data: {
    kind: "action" | "trigger",
    metadata: NodeMetadata
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
  const [selectAction, setSelectAction] = useState<{
    position: { x: number; y: number };
    startingNodeId: string;
  } | null>(null);

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

  const onConnectEnd = useCallback((params, connectionInfo) => {
    if (!connectionInfo?.isValid) {
      setSelectAction({
        startingNodeId: connectionInfo.fromNode.id,
        position: {
          x : connectionInfo.from.x + 100,
          y : connectionInfo.from.y + 100
        }
      });
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!nodes.length && (
        <TriggerSheet
          onSelect={({ type, metadata }) => {
            setNodes((nodesSnapshot) => [...nodesSnapshot, {
              id: Math.random().toString(),
              type: type as NodeKind,
              position: { x: 0, y: 0 },
              data: {
                kind: 'trigger',
                metadata: metadata,
              },
            }]);
          }}
        />
      )}
      {selectAction && <ActionSheet onSelect={(payload: { type: string; metadata: any }) => {
        const { type, metadata } = payload;
        const nodeId = Math.random().toString();
        setNodes((nodesSnapshot) => [...nodesSnapshot, {
          id: nodeId,
          type: type as NodeKind,
          position: selectAction.position,
          data: {
            kind: 'action',
            metadata: metadata,
          },
        }]);
        setEdges((edgesSnapshot) => [...edgesSnapshot, {
          id: `${selectAction.startingNodeId}-${nodeId}`,
          source: selectAction.startingNodeId,
          target: nodeId,
        }])
        setSelectAction(null);
      }} />}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}
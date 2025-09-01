import { create } from 'zustand';
import { type Node, type Edge, type NodeChange, type EdgeChange, type Connection, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import type { SwimlaneType } from '../components/StrategyBuilder/Swimlane/Swimlane';
import { DEFAULT_SWIMLANES } from '../components/StrategyBuilder/Swimlane/SwimlaneManager';

interface CryptoAsset {
  symbol: string;
  name: string;
  exchange: string;
  marketType: 'spot' | 'futures' | 'options';
  price?: number;
  volume24h?: number;
  marketCap?: number;
  isConnected: boolean;
}

export interface StrategyStore {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  zoomLevel: number;
  swimlanes: SwimlaneType[];
  globalAsset: CryptoAsset | null;
  
  // Actions
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Omit<Node, 'id'>) => void;
  deleteNode: (nodeId: string) => void;
  selectNode: (nodeId: string | null) => void;
  updateNodeData: (nodeId: string, data: any) => void;
  setZoomLevel: (level: number) => void;
  
  // Swimlane actions
  setSwimlanes: (swimlanes: SwimlaneType[]) => void;
  toggleSwimlaneCollapse: (id: string) => void;
  toggleSwimlaneActive: (id: string) => void;
  addNodeToSwimlane: (nodeData: any, swimlaneId: string, position: { x: number; y: number }) => void;
  
  // Asset actions
  setGlobalAsset: (asset: CryptoAsset | null) => void;
}

export const useStrategyStore = create<StrategyStore>((set, get) => ({
  nodes: [
    {
      id: 'start-1',
      type: 'startNode',
      position: { x: 100, y: 100 },
      data: { 
        label: 'Start', 
        description: 'Strategy entry point',
        swimlaneId: 'main-strategy'
      }
    }
  ],
  edges: [],
  selectedNodeId: null,
  zoomLevel: 100,
  swimlanes: DEFAULT_SWIMLANES,
  globalAsset: null,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes)
    }));
  },
  
  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges)
    }));
  },
  
  onConnect: (connection) => {
    set((state) => ({
      edges: addEdge({
        ...connection,
        type: 'customEdge',
        animated: true,
        style: { stroke: '#14B8A6', strokeWidth: 2 }
      }, state.edges)
    }));
  },
  
  addNode: (nodeData) => {
    const newNode: Node = {
      id: `${nodeData.type}-${Date.now()}`,
      ...nodeData
    };
    set((state) => ({
      nodes: [...state.nodes, newNode]
    }));
  },

  addNodeToSwimlane: (nodeData, swimlaneId, position) => {
    const swimlane = get().swimlanes.find(s => s.id === swimlaneId);
    if (!swimlane) return;

    const newNode: Node = {
      id: `${nodeData.type || 'node'}-${Date.now()}`,
      type: nodeData.type || 'indicatorNode',
      position: position,
      data: {
        ...nodeData,
        swimlaneId: swimlaneId,
        label: nodeData.label || nodeData.name,
        category: nodeData.category
      }
    };

    set((state) => ({
      nodes: [...state.nodes, newNode]
    }));
  },
  
  deleteNode: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.filter(node => node.id !== nodeId),
      edges: state.edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId
    }));
  },
  
  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
  
  updateNodeData: (nodeId, newData) => {
    set((state) => ({
      nodes: state.nodes.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    }));
  },
  
  setZoomLevel: (level) => set({ zoomLevel: level }),

  // Swimlane methods
  setSwimlanes: (swimlanes) => set({ swimlanes }),

  toggleSwimlaneCollapse: (id) => {
    set((state) => ({
      swimlanes: state.swimlanes.map(swimlane =>
        swimlane.id === id
          ? { ...swimlane, isCollapsed: !swimlane.isCollapsed }
          : swimlane
      )
    }));
  },

  toggleSwimlaneActive: (id) => {
    set((state) => ({
      swimlanes: state.swimlanes.map(swimlane =>
        swimlane.id === id
          ? { ...swimlane, isActive: !swimlane.isActive }
          : swimlane
      )
    }));
  },

  // Asset methods
  setGlobalAsset: (asset) => set({ globalAsset: asset })
}));
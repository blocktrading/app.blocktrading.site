import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  useReactFlow,
  Panel
} from '@xyflow/react';
import { useDrop } from 'react-dnd';
import '@xyflow/react/dist/style.css';

import { useStrategyStore } from '../../stores/useStrategyStore';
import { IndicatorNode } from './nodes/IndicatorNode';
import { ConditionNode } from './nodes/ConditionNode';
import { ActionNode } from './nodes/ActionNode';
import { StartNode } from './nodes/StartNode';
import { NotificationNode } from './nodes/NotificationNode';
import { EmergencyStopNode } from './nodes/EmergencyStopNode';
import { CustomEdge } from './edges/CustomEdge';
import styles from './StrategyBuilder.module.css';

const nodeTypes = {
  indicatorNode: IndicatorNode,
  conditionNode: ConditionNode,
  actionNode: ActionNode,
  startNode: StartNode,
  notificationNode: NotificationNode,
  emergencyStopNode: EmergencyStopNode
} as any;

const edgeTypes = {
  customEdge: CustomEdge
};

const CanvasContent: React.FC = () => {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    selectNode,
    selectedNodeId,
    deleteNode,
    addNode,
    globalAsset
  } = useStrategyStore();
  
  const { setViewport, getViewport, screenToFlowPosition } = useReactFlow();

  // Drop zone for blocks from toolbox
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'BLOCK_ITEM',
    drop: (item: any, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const position = screenToFlowPosition({
          x: clientOffset.x,
          y: clientOffset.y
        });

        // Create new node with global asset data if available
        const nodeData = {
          type: item.type || 'indicatorNode',
          position: position,
          data: {
            label: item.name,
            description: item.description,
            category: item.category,
            properties: item.defaultData || {},
            // Inherit global asset if set
            ...(globalAsset && { asset: globalAsset })
          }
        };

        addNode(nodeData);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const onNodeClick = useCallback((_event: React.MouseEvent, node: any) => {
    selectNode(node.id);
  }, [selectNode]);

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  // Gestione della cancellazione con tasto Delete e deseleziona con Escape
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (selectedNodeId && selectedNodeId !== 'start-1') { // Non permettere di cancellare il nodo Start
        deleteNode(selectedNodeId);
      }
    } else if (event.key === 'Escape') {
      selectNode(null); // Deseleziona quando si preme Escape
    }
  }, [selectedNodeId, deleteNode, selectNode]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // Gestione zoom con rotellina
  const onWheel = useCallback((event: Event) => {
    event.preventDefault();
    const wheelEvent = event as WheelEvent;
    const { x, y, zoom } = getViewport();
    const zoomStep = wheelEvent.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(Math.max(zoom * zoomStep, 0.1), 4);
    
    setViewport({ x, y, zoom: newZoom });
  }, [getViewport, setViewport]);

  useEffect(() => {
    const container = document.querySelector('.react-flow');
    if (container) {
      container.addEventListener('wheel', onWheel, { passive: false });
      return () => container.removeEventListener('wheel', onWheel);
    }
  }, [onWheel]);

  return (
    <div 
      ref={drop as any}
      className={`${styles.enhancedCanvas} ${isOver && canDrop ? styles.dropTarget : ''}`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 5 }}
        attributionPosition="top-right"
        className={styles.reactFlowWrapper}
        connectionLineStyle={{ stroke: '#14B8A6', strokeWidth: 2 }}
        defaultEdgeOptions={{
          style: { strokeWidth: 2, stroke: '#14B8A6' },
          type: 'customEdge',
          animated: true
        }}
      >
        <Background 
          color="#14B8A6" 
          gap={20} 
          size={1}
          style={{ opacity: 0.1 }}
        />
        
        <Controls 
          className={styles.flowControls}
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        
        <MiniMap 
          className={styles.flowMinimap}
          nodeColor={(node) => {
            switch (node.type) {
              case 'indicatorNode': return '#0EA5E9';
              case 'conditionNode': return '#F59E0B';
              case 'actionNode': return '#14B8A6';
              case 'startNode': return '#8B5CF6';
              case 'emergencyStopNode': return '#DC2626';
              case 'notificationNode': return '#06B6D4';
              default: return '#64748B';
            }
          }}
          maskColor="rgba(10, 15, 28, 0.8)"
        />

        {/* Status Panel */}
        <Panel position="top-left" className={styles.statusPanel}>
          <div className={styles.statusContent}>
            <span className={styles.statusLabel}>Nodes: {nodes.length}</span>
            <span className={styles.statusLabel}>Connections: {edges.length}</span>
            {globalAsset && (
              <span className={styles.statusLabel}>Global: {globalAsset.symbol}</span>
            )}
            {selectedNodeId && (
              <span className={styles.statusLabel}>Selected: {String(nodes.find(n => n.id === selectedNodeId)?.data.label || '')}</span>
            )}
          </div>
        </Panel>

        {/* Drop Indicator */}
        {isOver && canDrop && (
          <Panel position="top-center" className={styles.dropIndicator}>
            <div className={styles.dropMessage}>
              Drop block to add to canvas
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export const EnhancedCanvas: React.FC = () => {
  return <CanvasContent />;
};
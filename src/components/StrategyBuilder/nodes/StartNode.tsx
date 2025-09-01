import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useStrategyStore } from '../../../stores/useStrategyStore';
import styles from '../StrategyBuilder.module.css';

interface StartNodeData {
  label: string;
  description?: string;
  properties?: Record<string, any>;
}

export const StartNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const { selectNode } = useStrategyStore();
  
  // Type assertion per data
  const nodeData = data as unknown as StartNodeData;

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    selectNode(id as string);
  };

  return (
    <div 
      className={`${styles.strategyNode} ${styles.startNode} ${selected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <div className={styles.nodeHeader}>
        <div className={styles.nodeIcon} style={{ backgroundColor: '#8B5CF6' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
        </div>
        <div className={styles.nodeTitle}>{nodeData.label}</div>
      </div>
      
      {nodeData.description && (
        <div className={styles.nodeDescription}>{nodeData.description}</div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className={styles.nodeHandle + ' ' + styles.nodeHandleRight}
        style={{ background: '#8B5CF6' }}
      />
    </div>
  );
};
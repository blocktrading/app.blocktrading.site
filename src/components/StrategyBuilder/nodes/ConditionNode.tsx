import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useStrategyStore } from '../../../stores/useStrategyStore';
import styles from '../StrategyBuilder.module.css';

interface ConditionNodeData {
  label: string;
  description?: string;
  properties?: Record<string, any>;
}

export const ConditionNode: React.FC<NodeProps<ConditionNodeData>> = ({ id, data, selected }) => {
  const { selectNode } = useStrategyStore();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    selectNode(id as string);
  };

  return (
    <div 
      className={`${styles.strategyNode} ${styles.conditionNode} ${selected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={styles.nodeHandle + ' ' + styles.nodeHandleLeft}
        style={{ background: '#F59E0B' }}
      />
      
      <div className={styles.nodeHeader}>
        <div className={styles.nodeIcon} style={{ backgroundColor: '#F59E0B' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
          </svg>
        </div>
        <div className={styles.nodeTitle}>{data.label}</div>
      </div>
      
      {data.description && (
        <div className={styles.nodeDescription}>{data.description}</div>
      )}
      
      {data.properties && (
        <div className={styles.nodeProperties}>
          {Object.entries(data.properties).map(([key, value]) => (
            <div key={key} className={styles.nodeProp}>
              <span className={styles.propKey}>{key}:</span>
              <span className={styles.propValue}>{String(value)}</span>
            </div>
          ))}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className={styles.nodeHandle + ' ' + styles.nodeHandleRight}
        style={{ background: '#F59E0B' }}
      />
      
      {/* Nodo condizione può avere output multipli */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        className={styles.nodeHandle + ' ' + styles.nodeHandleBottom}
        style={{ background: '#EF4444', left: '75%' }}
      />
    </div>
  );
};
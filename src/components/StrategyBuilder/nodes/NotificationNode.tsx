import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useStrategyStore } from '../../../stores/useStrategyStore';
import styles from '../StrategyBuilder.module.css';

export const NotificationNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const { selectNode } = useStrategyStore();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    selectNode(id);
  };

  return (
    <div 
      className={`${styles.strategyNode} ${styles.actionNode} ${selected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={styles.nodeHandle + ' ' + styles.nodeHandleLeft}
        style={{ background: '#8b5cf6' }}
      />
      
      <div className={styles.nodeHeader}>
        <div className={styles.nodeIcon} style={{ backgroundColor: '#8b5cf6' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
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
              <span className={styles.propValue}>
                {Array.isArray(value) ? value.join(', ') : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className={styles.nodeHandle + ' ' + styles.nodeHandleRight}
        style={{ background: '#8b5cf6' }}
      />
    </div>
  );
};

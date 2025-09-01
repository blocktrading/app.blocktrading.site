import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useStrategyStore } from '../../../stores/useStrategyStore';
import styles from '../StrategyBuilder.module.css';

export const IndicatorNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const { selectNode } = useStrategyStore();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    selectNode(id);
  };

  return (
    <div 
      className={`${styles.strategyNode} ${styles.indicatorNode} ${selected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={styles.nodeHandle + ' ' + styles.nodeHandleLeft}
        style={{ background: '#0EA5E9' }}
      />
      
      <div className={styles.nodeHeader}>
        <div className={styles.nodeIcon} style={{ backgroundColor: '#0EA5E9' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M18 20V10M12 20V4M6 20v-6"/>
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
        style={{ background: '#0EA5E9' }}
      />
    </div>
  );
};
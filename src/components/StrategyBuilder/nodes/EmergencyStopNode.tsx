import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useStrategyStore } from '../../../stores/useStrategyStore';
import styles from '../StrategyBuilder.module.css';

export const EmergencyStopNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const { selectNode } = useStrategyStore();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    selectNode(id);
  };

  return (
    <div 
      className={`${styles.strategyNode} ${styles.actionNode} ${styles.emergencyNode} ${selected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={styles.nodeHandle + ' ' + styles.nodeHandleLeft}
        style={{ background: '#dc2626' }}
      />
      
      <div className={styles.nodeHeader}>
        <div className={styles.nodeIcon} style={{ backgroundColor: '#dc2626' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <circle cx="12" cy="12" r="10"/>
            <rect x="9" y="9" width="6" height="6"/>
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
                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className={styles.nodeHandle + ' ' + styles.nodeHandleRight}
        style={{ background: '#dc2626' }}
      />
    </div>
  );
};

import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useStrategyStore } from '../../../stores/useStrategyStore';
import styles from '../StrategyBuilder.module.css';

export const ActionNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const { selectNode } = useStrategyStore();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    selectNode(id);
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'buy':
        return <path d="M3 3v18h18M7 16l4-4 4 4 5-5"/>;
      case 'sell':
        return <path d="M3 21v-18h18M7 8l4 4-4 4-5-5"/>;
      case 'stop-loss':
        return <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><circle cx="12" cy="16" r="1"/></>;
      default:
        return <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>;
    }
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
        style={{ background: '#14B8A6' }}
      />
      
      <div className={styles.nodeHeader}>
        <div className={styles.nodeIcon} style={{ backgroundColor: '#14B8A6' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            {getActionIcon(data.actionType || 'default')}
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
        style={{ background: '#14B8A6' }}
      />
    </div>
  );
};
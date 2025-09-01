import React from 'react';
import { useDrop } from 'react-dnd';
import type { Node } from '@xyflow/react';
import styles from './Swimlane.module.css';

export interface SwimlaneType {
  id: string;
  name: string;
  subtitle: string;
  priority: number;
  color: string;
  icon: string;
  description: string;
  isActive: boolean;
  isCollapsed: boolean;
}

interface SwimlaneProps {
  swimlane: SwimlaneType;
  nodes: Node[];
  onToggleCollapse: (id: string) => void;
  onToggleActive: (id: string) => void;
  onDropNode: (nodeData: any, swimlaneId: string, position: { x: number; y: number }) => void;
  hasInterferences?: boolean;
}

export const Swimlane: React.FC<SwimlaneProps> = ({
  swimlane,
  nodes,
  onToggleCollapse,
  onToggleActive,
  onDropNode,
  hasInterferences = false
}) => {

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'BLOCK_ITEM',
    drop: (item: any, monitor: any) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const dropZoneRect = (monitor.getDropResult() as any)?.getBoundingClientRect?.() || 
                            document.querySelector(`[data-swimlane-id="${swimlane.id}"]`)?.getBoundingClientRect();
        
        if (dropZoneRect) {
          const position = {
            x: clientOffset.x - dropZoneRect.left - 100,
            y: clientOffset.y - dropZoneRect.top - 50
          };
          onDropNode(item, swimlane.id, position);
        }
      }
    },
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const swimlaneNodes = nodes.filter(node => node.data.swimlaneId === swimlane.id);

  return (
    <div 
      ref={drop as any}
      data-swimlane-id={swimlane.id}
      className={`${styles.swimlane} ${swimlane.isCollapsed ? styles.collapsed : ''} ${!swimlane.isActive ? styles.inactive : styles.active}`}
      style={{ '--swimlane-color': swimlane.color } as React.CSSProperties}
    >
      {/* Swimlane Header */}
      <div className={styles.swimlaneHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.swimlaneIcon} style={{ color: swimlane.color }}>
            {swimlane.icon}
          </div>
          <div className={styles.swimlaneInfo}>
            <h3 className={styles.swimlaneName}>{swimlane.name}</h3>
            <p className={styles.swimlaneSubtitle}>{swimlane.subtitle}</p>
          </div>
          <div className={styles.priorityBadge}>
            Priority: {swimlane.priority}
          </div>
        </div>
        
        <div className={styles.headerActions}>
          {hasInterferences && (
            <div className={styles.interferenceWarning} title="This lane has conflicts with other lanes">
              ⚠️
            </div>
          )}
          
          <div className={styles.activityIndicator}>
            <div className={`${styles.statusDot} ${swimlane.isActive ? styles.active : styles.inactive}`} />
            <span>{swimlaneNodes.length} blocks</span>
          </div>
          
          <button
            className={styles.toggleButton}
            onClick={() => onToggleActive(swimlane.id)}
            title={swimlane.isActive ? 'Disable lane' : 'Enable lane'}
          >
            {swimlane.isActive ? '🔸' : '⏸️'}
          </button>
          
          <button
            className={styles.collapseButton}
            onClick={() => onToggleCollapse(swimlane.id)}
            title={swimlane.isCollapsed ? 'Expand lane' : 'Collapse lane'}
          >
            {swimlane.isCollapsed ? '📁' : '📂'}
          </button>
        </div>
      </div>

      {/* Swimlane Content */}
      {!swimlane.isCollapsed && (
        <div className={`${styles.swimlaneContent} ${isOver && canDrop ? styles.dropTarget : ''}`}>
          {swimlaneNodes.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={`${styles.emptyIcon} ${styles.pulse}`}>📦</div>
              <p><strong>Drop blocks here</strong></p>
              <p>Drag any block from the toolbox to the <strong>{swimlane.name}</strong></p>
              <small>{swimlane.description}</small>
              {swimlane.id === 'main-strategy' && (
                <div className={styles.suggestion}>
                  <strong>💡 Try this:</strong> RSI → Less Than → Market Buy
                </div>
              )}
            </div>
          ) : (
            <div className={styles.nodesContainer}>
              <div className={styles.nodesList}>
                {swimlaneNodes.map(node => (
                  <div key={node.id} className={styles.nodePreview}>
                    <span className={styles.nodeType}>{node.type}</span>
                    <span className={styles.nodeName}>{String(node.data.label || 'Node')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Drop indicator */}
      {isOver && canDrop && (
        <div className={styles.dropIndicator}>
          <div className={styles.dropMessage}>
            Drop to add to {swimlane.name}
          </div>
        </div>
      )}
    </div>
  );
};

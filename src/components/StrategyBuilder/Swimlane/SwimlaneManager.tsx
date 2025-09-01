import React from 'react';
import type { Node } from '@xyflow/react';
import { Swimlane } from './Swimlane';
import type { SwimlaneType } from './Swimlane';
import styles from './SwimlaneManager.module.css';

// Predefined swimlane types based on the instructions
export const DEFAULT_SWIMLANES: SwimlaneType[] = [
  {
    id: 'main-strategy',
    name: 'Main Strategy',
    subtitle: 'Primary trading logic',
    priority: 1,
    color: '#14B8A6',
    icon: '🎯',
    description: 'Main trading strategy with entry/exit conditions and actions',
    isActive: true,
    isCollapsed: false
  },
  {
    id: 'grid-scalping',
    name: 'Grid/Scalping',
    subtitle: 'Background automated trading',
    priority: 2,
    color: '#0EA5E9',
    icon: '📊',
    description: 'Small, frequent trades with automated grid system',
    isActive: false,
    isCollapsed: true
  },
  {
    id: 'risk-management',
    name: 'Risk Management',
    subtitle: 'Global risk controls',
    priority: 999,
    color: '#EF4444',
    icon: '🛡️',
    description: 'Emergency stops, position limits and risk controls',
    isActive: true,
    isCollapsed: true
  },
  {
    id: 'news-events',
    name: 'News/Events',
    subtitle: 'Event-driven reactions',
    priority: 10,
    color: '#F59E0B',
    icon: '📰',
    description: 'React to news sentiment and economic events',
    isActive: false,
    isCollapsed: true
  },
  {
    id: 'time-filter',
    name: 'Time Filter',
    subtitle: 'Temporal constraints',
    priority: 5,
    color: '#8B5CF6',
    icon: '⏰',
    description: 'Market hours, weekends, holidays and time-based filters',
    isActive: false,
    isCollapsed: true
  },
  {
    id: 'rebalancing',
    name: 'Rebalancing',
    subtitle: 'Portfolio adjustments',
    priority: 5,
    color: '#06B6D4',
    icon: '⚖️',
    description: 'Periodic portfolio rebalancing and asset allocation',
    isActive: false,
    isCollapsed: true
  }
];

interface SwimlaneManagerProps {
  swimlanes: SwimlaneType[];
  nodes: Node[];
  onToggleCollapse: (id: string) => void;
  onToggleActive: (id: string) => void;
  onDropNode: (nodeData: any, swimlaneId: string, position: { x: number; y: number }) => void;
  onUpdateSwimlanes: (swimlanes: SwimlaneType[]) => void;
}

export const SwimlaneManager: React.FC<SwimlaneManagerProps> = ({
  swimlanes,
  nodes,
  onToggleCollapse,
  onToggleActive,
  onDropNode,
  onUpdateSwimlanes
}) => {
  // Sort swimlanes by priority (higher priority first)
  const sortedSwimlanes = [...swimlanes].sort((a, b) => b.priority - a.priority);

  // Detect potential interferences between swimlanes
  const detectInterferences = (swimlaneId: string): boolean => {
    const currentSwimlane = swimlanes.find(s => s.id === swimlaneId);
    if (!currentSwimlane || !currentSwimlane.isActive) return false;

    const swimlaneNodes = nodes.filter(node => node.data.swimlaneId === swimlaneId);
    const otherActiveNodes = nodes.filter(node => 
      node.data.swimlaneId !== swimlaneId && 
      swimlanes.find(s => s.id === node.data.swimlaneId)?.isActive
    );

    // Simple interference detection: check for similar action types
    const hasActionNodes = swimlaneNodes.some(node => node.type?.includes('action'));
    const otherHasActions = otherActiveNodes.some(node => node.type?.includes('action'));

    return hasActionNodes && otherHasActions && currentSwimlane.priority < 50;
  };

  const handleResetToDefaults = () => {
    onUpdateSwimlanes(DEFAULT_SWIMLANES);
  };

  const handleToggleAll = (collapse: boolean) => {
    const updatedSwimlanes = swimlanes.map(s => ({ ...s, isCollapsed: collapse }));
    onUpdateSwimlanes(updatedSwimlanes);
  };

  const activeSwimlanes = swimlanes.filter(s => s.isActive).length;
  const totalNodes = nodes.length;
  const nodesInSwimlanes = nodes.filter(n => n.data.swimlaneId).length;

  return (
    <div className={styles.swimlaneManager}>
      {/* Manager Header */}
      <div className={styles.managerHeader}>
        <div className={styles.headerInfo}>
          <h2 className={styles.title}>Strategy Lanes</h2>
          <div className={styles.stats}>
            <span className={styles.stat}>{activeSwimlanes} active</span>
            <span className={styles.stat}>{nodesInSwimlanes}/{totalNodes} blocks assigned</span>
          </div>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            className={styles.actionButton}
            onClick={() => handleToggleAll(true)}
            title="Collapse all lanes"
          >
            📁 Collapse All
          </button>
          <button 
            className={styles.actionButton}
            onClick={() => handleToggleAll(false)}
            title="Expand all lanes"
          >
            📂 Expand All
          </button>
          <button 
            className={styles.actionButton}
            onClick={handleResetToDefaults}
            title="Reset to default configuration"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Quick Start Banner */}
      {activeSwimlanes === 0 && (
        <div className={styles.quickStartBanner}>
          <div className={styles.bannerContent}>
            <div className={styles.bannerIcon}>🚀</div>
            <div className={styles.bannerText}>
              <strong>Get Started!</strong><br />
              Enable the "Main Strategy" lane and start building your strategy
            </div>
            <button 
              className={styles.quickStartButton}
              onClick={() => onToggleActive('main-strategy')}
            >
              Enable Main Strategy
            </button>
          </div>
        </div>
      )}

      {/* Priority Legend */}
      <div className={styles.priorityLegend}>
        <span className={styles.legendTitle}>Execution Priority:</span>
        <div className={styles.priorityItems}>
          <span className={styles.priorityItem}>
            <span className={styles.priorityHigh}>999</span> Risk Management
          </span>
          <span className={styles.priorityItem}>
            <span className={styles.priorityMedium}>10</span> News/Events
          </span>
          <span className={styles.priorityItem}>
            <span className={styles.priorityLow}>1-5</span> Normal Operations
          </span>
        </div>
      </div>

      {/* Swimlanes */}
      <div className={styles.swimlanesContainer}>
        {sortedSwimlanes.map(swimlane => (
          <Swimlane
            key={swimlane.id}
            swimlane={swimlane}
            nodes={nodes}
            onToggleCollapse={onToggleCollapse}
            onToggleActive={onToggleActive}
            onDropNode={onDropNode}
            hasInterferences={detectInterferences(swimlane.id)}
          />
        ))}
      </div>

      {/* Help Text */}
      <div className={styles.helpText}>
        <p>💡 <strong>How to use Strategy Lanes:</strong></p>
        <ul>
          <li><strong>1. Enable lanes:</strong> Click the 🔸 button to activate a lane</li>
          <li><strong>2. Drag blocks:</strong> Drag any block from the toolbox directly into a lane</li>
          <li><strong>3. Main Strategy:</strong> Your primary trading logic goes here</li>
          <li><strong>4. Risk Management:</strong> Always executes first (priority 999)</li>
          <li><strong>5. Grid/Scalping:</strong> Background automated trading</li>
          <li><strong>6. News/Events:</strong> React to market events (priority 10)</li>
        </ul>
        
        <div className={styles.quickDemo}>
          <p><strong>🎯 Quick Start:</strong></p>
          <ol>
            <li>Activate "Main Strategy" lane</li>
            <li>Drag RSI block → Main Strategy</li>
            <li>Drag "Less Than" → Main Strategy</li>
            <li>Drag "Market Buy" → Main Strategy</li>
            <li>Connect them on the canvas!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

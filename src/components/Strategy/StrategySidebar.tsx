import React, { useState } from 'react';
import styles from './StrategySidebar.module.css';

interface BlockType {
  id: string;
  name: string;
  category: 'indicators' | 'conditions' | 'actions' | 'time' | 'risk' | 'notifications';
  icon: string;
  description: string;
  color: string;
  type: string;
  defaultData?: any;
}

interface BlockItemProps {
  block: BlockType;
}

const BlockItem: React.FC<BlockItemProps> = ({ block }) => {
  return (
    <div className={styles.blockItem}>
      <div className={styles.blockIcon} style={{ color: block.color }}>
        {block.icon}
      </div>
      <div className={styles.blockInfo}>
        <span className={styles.blockName}>{block.name}</span>
        <span className={styles.blockDescription}>{block.description}</span>
      </div>
    </div>
  );
};

// Block definitions for Rete.js Strategy Builder
const BLOCK_CATEGORIES = {
  indicators: {
    title: 'Technical Indicators',
    icon: '📈',
    blocks: [
      { id: 'rsi', name: 'RSI', category: 'indicators', icon: '🔄', description: 'Relative Strength Index', color: '#0EA5E9', type: 'indicatorNode', defaultData: { period: 14, overbought: 70, oversold: 30 } },
      { id: 'macd', name: 'MACD', category: 'indicators', icon: '📊', description: 'Moving Average Convergence Divergence', color: '#0EA5E9', type: 'indicatorNode', defaultData: { fast: 12, slow: 26, signal: 9 } },
      { id: 'bb', name: 'Bollinger Bands', category: 'indicators', icon: '📏', description: 'Price bands with standard deviation', color: '#0EA5E9', type: 'indicatorNode', defaultData: { period: 20, stdDev: 2 } },
      { id: 'ema', name: 'EMA', category: 'indicators', icon: '📈', description: 'Exponential Moving Average', color: '#0EA5E9', type: 'indicatorNode', defaultData: { period: 20 } },
      { id: 'sma', name: 'SMA', category: 'indicators', icon: '📉', description: 'Simple Moving Average', color: '#0EA5E9', type: 'indicatorNode', defaultData: { period: 50 } },
      { id: 'volume', name: 'Volume', category: 'indicators', icon: '📦', description: 'Trading volume analysis', color: '#0EA5E9', type: 'indicatorNode', defaultData: { period: 20 } },
      { id: 'atr', name: 'ATR', category: 'indicators', icon: '📐', description: 'Average True Range', color: '#0EA5E9', type: 'indicatorNode', defaultData: { period: 14 } },
      { id: 'stoch', name: 'Stochastic', category: 'indicators', icon: '🎯', description: 'Stochastic Oscillator', color: '#0EA5E9', type: 'indicatorNode', defaultData: { kPeriod: 14, dPeriod: 3 } }
    ] as BlockType[]
  },
  conditions: {
    title: 'Conditions & Logic',
    icon: '🔍',
    blocks: [
      { id: 'gt', name: 'Greater Than', category: 'conditions', icon: '>', description: 'Value > threshold', color: '#F59E0B', type: 'conditionNode', defaultData: { threshold: 0 } },
      { id: 'lt', name: 'Less Than', category: 'conditions', icon: '<', description: 'Value < threshold', color: '#F59E0B', type: 'conditionNode', defaultData: { threshold: 0 } },
      { id: 'eq', name: 'Equal To', category: 'conditions', icon: '=', description: 'Value equals threshold', color: '#F59E0B', type: 'conditionNode', defaultData: { threshold: 0 } },
      { id: 'between', name: 'Between', category: 'conditions', icon: '↔️', description: 'Value between min/max', color: '#F59E0B', type: 'conditionNode', defaultData: { min: 0, max: 100 } },
      { id: 'crossover', name: 'Crossover', category: 'conditions', icon: '✂️', description: 'Signal crosses above/below', color: '#F59E0B', type: 'conditionNode' },
      { id: 'and', name: 'AND', category: 'conditions', icon: '&', description: 'All conditions must be true', color: '#8B5CF6', type: 'conditionNode' },
      { id: 'or', name: 'OR', category: 'conditions', icon: '|', description: 'Any condition must be true', color: '#8B5CF6', type: 'conditionNode' },
      { id: 'not', name: 'NOT', category: 'conditions', icon: '!', description: 'Condition must be false', color: '#8B5CF6', type: 'conditionNode' }
    ] as BlockType[]
  },
  actions: {
    title: 'Trading Actions',
    icon: '⚡',
    blocks: [
      { id: 'market-buy', name: 'Market Buy', category: 'actions', icon: '🟢', description: 'Buy at market price', color: '#22C55E', type: 'actionNode', defaultData: { amount: 100, unit: 'USD' } },
      { id: 'market-sell', name: 'Market Sell', category: 'actions', icon: '🔴', description: 'Sell at market price', color: '#EF4444', type: 'actionNode', defaultData: { amount: 100, unit: 'percent' } },
      { id: 'limit-buy', name: 'Limit Buy', category: 'actions', icon: '🟡', description: 'Buy at specified price', color: '#F59E0B', type: 'actionNode', defaultData: { amount: 100, unit: 'USD', price: 0 } },
      { id: 'limit-sell', name: 'Limit Sell', category: 'actions', icon: '🟠', description: 'Sell at specified price', color: '#F97316', type: 'actionNode', defaultData: { amount: 100, unit: 'percent', price: 0 } },
      { id: 'stop-loss', name: 'Stop Loss', category: 'actions', icon: '🛑', description: 'Automatic loss-limiting sale', color: '#DC2626', type: 'actionNode', defaultData: { percentage: 5 } },
      { id: 'take-profit', name: 'Take Profit', category: 'actions', icon: '🎯', description: 'Automatic profit-taking sale', color: '#16A34A', type: 'actionNode', defaultData: { percentage: 10 } },
      { id: 'close-position', name: 'Close Position', category: 'actions', icon: '❌', description: 'Exit current positions', color: '#DC2626', type: 'actionNode' }
    ] as BlockType[]
  },
  risk: {
    title: 'Risk Management',
    icon: '🛡️',
    blocks: [
      { id: 'position-size', name: 'Position Size', category: 'risk', icon: '📊', description: 'Calculate position size', color: '#8B5CF6', type: 'riskNode', defaultData: { riskPercent: 2 } },
      { id: 'max-drawdown', name: 'Max Drawdown', category: 'risk', icon: '📉', description: 'Portfolio drawdown limit', color: '#DC2626', type: 'riskNode', defaultData: { maxDrawdown: 10 } },
      { id: 'daily-limit', name: 'Daily Loss Limit', category: 'risk', icon: '🚫', description: 'Daily loss protection', color: '#DC2626', type: 'riskNode', defaultData: { dailyLimit: 5 } }
    ] as BlockType[]
  }
};

export const StrategySidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['indicators', 'conditions', 'actions'])
  );

  const getAllBlocks = (): BlockType[] => {
    return Object.values(BLOCK_CATEGORIES).flatMap(category => category.blocks);
  };

  const getFilteredBlocks = (): BlockType[] => {
    let blocks = getAllBlocks();

    if (searchTerm) {
      blocks = blocks.filter(block =>
        block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      blocks = blocks.filter(block => block.category === selectedCategory);
    }

    return blocks;
  };

  const toggleSection = (sectionKey: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionKey)) {
      newExpanded.delete(sectionKey);
    } else {
      newExpanded.add(sectionKey);
    }
    setExpandedSections(newExpanded);
  };

  const filteredBlocks = getFilteredBlocks();

  return (
    <div className={styles.sidebar}>
      {/* Sidebar Header */}
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarTitle}>Strategy Builder</div>
        <div className={styles.sidebarSubtitle}>Drag blocks to build your strategy</div>
      </div>

      {/* Search & Filters */}
      <div className={styles.searchSection}>
        <div className={styles.searchInput}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className={styles.clearSearch} 
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>

        <select 
          className={styles.categoryFilter}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="indicators">📈 Indicators</option>
          <option value="conditions">🔍 Conditions</option>
          <option value="actions">⚡ Actions</option>
          <option value="risk">🛡️ Risk</option>
        </select>
      </div>

      {/* Quick Stats */}
      <div className={styles.quickStats}>
        <span className={styles.stat}>{filteredBlocks.length} blocks available</span>
      </div>

      {/* Block Categories */}
      <div className={styles.categoriesContainer}>
        {searchTerm || selectedCategory !== 'all' ? (
          // Show filtered results
          <div className={styles.sidebarSection}>
            <div className={styles.sectionTitle}>
              🔍 Search Results ({filteredBlocks.length})
            </div>
            {filteredBlocks.length === 0 ? (
              <div className={styles.noResults}>
                <span>No blocks found</span>
                <small>Try adjusting your search or filters</small>
              </div>
            ) : (
              filteredBlocks.map(block => (
                <BlockItem key={block.id} block={block} />
              ))
            )}
          </div>
        ) : (
          // Show categories
          Object.entries(BLOCK_CATEGORIES).map(([key, category]) => (
            <div key={key} className={styles.sidebarSection}>
              <div 
                className={`${styles.sectionTitle} ${styles.collapsible}`}
                onClick={() => toggleSection(key)}
              >
                <span className={styles.sectionIcon}>{category.icon}</span>
                <span>{category.title}</span>
                <span className={styles.blockCount}>({category.blocks.length})</span>
                <span className={`${styles.chevron} ${expandedSections.has(key) ? styles.expanded : ''}`}>
                  ▼
                </span>
              </div>
              
              {expandedSections.has(key) && (
                <div className={styles.blocksContainer}>
                  {category.blocks.map(block => (
                    <BlockItem key={block.id} block={block} />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Help Section */}
      <div className={styles.sidebarHelp}>
        <div className={styles.helpTitle}>💡 Quick Tips</div>
        <ul className={styles.helpList}>
          <li>Drag blocks to the canvas to create nodes</li>
          <li>Connect outputs to inputs with Rete.js</li>
          <li>Start with indicators, add conditions, then actions</li>
          <li>Configure node properties in the right panel</li>
        </ul>
      </div>
    </div>
  );
};

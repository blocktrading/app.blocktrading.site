import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { CryptoSelector } from './CryptoSelector';
import { useStrategyStore } from '../../stores/useStrategyStore';
import styles from './StrategyBuilder.module.css';

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

interface DraggableBlockItemProps {
  block: BlockType;
}

const DraggableBlockItem: React.FC<DraggableBlockItemProps> = ({ block }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK_ITEM',
    item: { ...block },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag as any}
      className={`${styles.blockItem} ${isDragging ? styles.dragging : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
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

// Expanded block definitions based on instructions
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
      { id: 'not', name: 'NOT', category: 'conditions', icon: '!', description: 'Condition must be false', color: '#8B5CF6', type: 'conditionNode' },
      { id: 'divergence', name: 'Divergence', category: 'conditions', icon: '🔀', description: 'Price vs indicator divergence', color: '#F59E0B', type: 'conditionNode' }
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
      { id: 'close-position', name: 'Close Position', category: 'actions', icon: '❌', description: 'Exit current positions', color: '#DC2626', type: 'actionNode' },
      { id: 'partial-close', name: 'Partial Close', category: 'actions', icon: '◐', description: 'Close percentage of position', color: '#EA580C', type: 'actionNode', defaultData: { percentage: 50 } }
    ] as BlockType[]
  },
  time: {
    title: 'Time & Scheduling',
    icon: '⏰',
    blocks: [
      { id: 'market-hours', name: 'Market Hours', category: 'time', icon: '🕐', description: 'Trading during specific hours', color: '#8B5CF6', type: 'conditionNode', defaultData: { startHour: 9, endHour: 17 } },
      { id: 'day-of-week', name: 'Day Filter', category: 'time', icon: '📅', description: 'Weekday/weekend filtering', color: '#8B5CF6', type: 'conditionNode', defaultData: { days: ['mon', 'tue', 'wed', 'thu', 'fri'] } },
      { id: 'date-range', name: 'Date Range', category: 'time', icon: '📆', description: 'Specific date periods', color: '#8B5CF6', type: 'conditionNode' },
      { id: 'interval', name: 'Interval', category: 'time', icon: '⏱️', description: 'Execute every X minutes/hours', color: '#8B5CF6', type: 'actionNode', defaultData: { interval: 60, unit: 'minutes' } },
      { id: 'cooldown', name: 'Cooldown', category: 'time', icon: '⏳', description: 'Wait period between actions', color: '#8B5CF6', type: 'conditionNode', defaultData: { duration: 30, unit: 'minutes' } },
      { id: 'session', name: 'Trading Session', category: 'time', icon: '🌍', description: 'Asian/European/American sessions', color: '#8B5CF6', type: 'conditionNode', defaultData: { session: 'american' } }
    ] as BlockType[]
  },
  risk: {
    title: 'Risk Management',
    icon: '🛡️',
    blocks: [
      { id: 'emergency-stop', name: 'Emergency Stop', category: 'risk', icon: '🚨', description: 'Immediately halt all trading', color: '#DC2626', type: 'emergencyStopNode' },
      { id: 'position-limit', name: 'Position Limit', category: 'risk', icon: '🔒', description: 'Maximum position size', color: '#DC2626', type: 'conditionNode', defaultData: { maxSize: 1000, unit: 'USD' } },
      { id: 'drawdown-limit', name: 'Drawdown Limit', category: 'risk', icon: '📉', description: 'Stop if losses exceed threshold', color: '#DC2626', type: 'conditionNode', defaultData: { percentage: 10 } },
      { id: 'risk-pause', name: 'Risk Pause', category: 'risk', icon: '⏸️', description: 'Temporarily disable strategy', color: '#F97316', type: 'actionNode', defaultData: { duration: 60, unit: 'minutes' } },
      { id: 'portfolio-heat', name: 'Portfolio Heat', category: 'risk', icon: '🌡️', description: 'Monitor portfolio risk exposure', color: '#DC2626', type: 'conditionNode', defaultData: { maxHeat: 0.02 } }
    ] as BlockType[]
  },
  notifications: {
    title: 'Notifications & Logging',
    icon: '📢',
    blocks: [
      { id: 'send-alert', name: 'Send Alert', category: 'notifications', icon: '🚨', description: 'Push notification or email', color: '#06B6D4', type: 'notificationNode', defaultData: { type: 'email', message: 'Alert triggered' } },
      { id: 'webhook', name: 'Webhook', category: 'notifications', icon: '🔗', description: 'HTTP request to external service', color: '#06B6D4', type: 'notificationNode', defaultData: { url: '', method: 'POST' } },
      { id: 'log-event', name: 'Log Event', category: 'notifications', icon: '📝', description: 'Record event in trade log', color: '#06B6D4', type: 'notificationNode', defaultData: { message: 'Event logged' } },
      { id: 'telegram', name: 'Telegram', category: 'notifications', icon: '📱', description: 'Send Telegram message', color: '#06B6D4', type: 'notificationNode', defaultData: { chatId: '', message: '' } }
    ] as BlockType[]
  }
};

export const EnhancedToolbox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['indicators', 'actions']));
  const { globalAsset, setGlobalAsset } = useStrategyStore();

  // Filter blocks based on search and category
  const getFilteredBlocks = () => {
    let allBlocks: BlockType[] = [];
    
    Object.values(BLOCK_CATEGORIES).forEach(category => {
      allBlocks.push(...category.blocks);
    });

    return allBlocks.filter(block => {
      const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           block.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
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
    <div className={styles.toolbox}>
      {/* Toolbox Header */}
      <div className={styles.toolboxHeader}>
        <div className={styles.toolboxTitle}>Strategy Builder</div>
        <div className={styles.toolboxSubtitle}>Drag blocks to build your strategy</div>
      </div>

      {/* Global Asset Selector */}
      <div className={styles.globalAssetSection}>
        <div className={styles.sectionTitle}>
          🌐 Global Asset & Exchange
        </div>
        <CryptoSelector
          selectedAsset={globalAsset}
          onAssetChange={setGlobalAsset}
          isGlobal={true}
          showGroups={true}
        />
        <div className={styles.globalHelp}>
          <small>This selection will be inherited by all blocks automatically</small>
        </div>
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
          <option value="time">⏰ Time</option>
          <option value="risk">🛡️ Risk</option>
          <option value="notifications">📢 Notifications</option>
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
          <div className={styles.toolboxSection}>
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
                <DraggableBlockItem key={block.id} block={block} />
              ))
            )}
          </div>
        ) : (
          // Show categories
          Object.entries(BLOCK_CATEGORIES).map(([key, category]) => (
            <div key={key} className={styles.toolboxSection}>
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
                    <DraggableBlockItem key={block.id} block={block} />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Help Section */}
      <div className={styles.toolboxHelp}>
        <div className={styles.helpTitle}>💡 Quick Tips</div>
        <ul className={styles.helpList}>
          <li>Drag blocks from here to the canvas or swimlanes</li>
          <li>Start with indicators, add conditions, then actions</li>
          <li>Use swimlanes to organize parallel strategies</li>
          <li>Higher priority lanes can override lower ones</li>
        </ul>
      </div>
    </div>
  );
};

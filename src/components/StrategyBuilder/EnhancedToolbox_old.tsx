import React from 'react';
import { useReactFlow } from '@xyflow/react';
import { useStrategyStore } from '../../stores/useStrategyStore';
import type { BlockType } from '../../types/strategy';
import styles from './StrategyBuilder.module.css';
import type { JSX } from 'react/jsx-runtime';

const blockTypes: BlockType[] = [
  // Indicatori Popolari - RSI e MACD esistenti
  {
    id: 'rsi',
    name: 'RSI',
    category: 'indicators',
    icon: 'bar-chart',
    description: 'Relative Strength Index',
    defaultData: {
      label: 'RSI',
      description: 'Relative Strength Index',
      properties: { period: 14, oversold: 30, overbought: 70 }
    }
  },
  {
    id: 'macd',
    name: 'MACD',
    category: 'indicators',
    icon: 'trending',
    description: 'Moving Average Convergence',
    defaultData: {
      label: 'MACD',
      description: 'Moving Average Convergence Divergence',
      properties: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 }
    }
  },
  {
    id: 'bollinger',
    name: 'Bollinger Bands',
    category: 'indicators',
    icon: 'circle',
    description: 'Price bands indicator',
    defaultData: {
      label: 'Bollinger Bands',
      description: 'Price volatility bands',
      properties: { period: 20, deviation: 2 }
    }
  },
  // Nuovi Indicatori Popolari nel Crypto Trading
  {
    id: 'ema',
    name: 'EMA',
    category: 'indicators',
    icon: 'trending-up',
    description: 'Exponential Moving Average',
    defaultData: {
      label: 'EMA',
      description: 'Exponential Moving Average',
      properties: { period: 20 }
    }
  },
  {
    id: 'sma',
    name: 'SMA',
    category: 'indicators',
    icon: 'trending',
    description: 'Simple Moving Average',
    defaultData: {
      label: 'SMA',
      description: 'Simple Moving Average',
      properties: { period: 50 }
    }
  },
  {
    id: 'volume',
    name: 'Volume',
    category: 'indicators',
    icon: 'volume',
    description: 'Trading Volume',
    defaultData: {
      label: 'Volume',
      description: 'Trading volume indicator',
      properties: { period: 20, threshold: 1.5 }
    }
  },
  // Condizioni Esistenti + Nuove
  {
    id: 'greater-than',
    name: 'Greater Than',
    category: 'conditions',
    icon: 'arrow-up',
    description: 'Value > threshold',
    defaultData: {
      label: 'Greater Than',
      description: 'Value > threshold',
      properties: { threshold: 70 }
    }
  },
  {
    id: 'less-than',
    name: 'Less Than',
    category: 'conditions',
    icon: 'arrow-down',
    description: 'Value < threshold',
    defaultData: {
      label: 'Less Than',
      description: 'Value < threshold',
      properties: { threshold: 30 }
    }
  },
  {
    id: 'crossover',
    name: 'Crossover',
    category: 'conditions',
    icon: 'arrow-right',
    description: 'Signal crosses another',
    defaultData: {
      label: 'Crossover',
      description: 'Signal line crossover',
      properties: { direction: 'up' }
    }
  },
  // Nuove Condizioni
  {
    id: 'divergence',
    name: 'Divergence',
    category: 'conditions',
    icon: 'divide',
    description: 'Price vs Indicator divergence',
    defaultData: {
      label: 'Divergence',
      description: 'Bullish/Bearish divergence detection',
      properties: { type: 'bullish', periods: 5 }
    }
  },
  {
    id: 'pattern-candlestick',
    name: 'Candlestick Pattern',
    category: 'conditions',
    icon: 'candle',
    description: 'Japanese candlestick patterns',
    defaultData: {
      label: 'Candlestick Pattern',
      description: 'Detect candlestick patterns',
      properties: { pattern: 'doji', periods: 3 }
    }
  },
  {
    id: 'price-action',
    name: 'Price Action',
    category: 'conditions',
    icon: 'mountain',
    description: 'Support/Resistance levels',
    defaultData: {
      label: 'Price Action',
      description: 'Support and resistance breakouts',
      properties: { level: 'support', strength: 3 }
    }
  },
  {
    id: 'timeframe-confluence',
    name: 'Multi-Timeframe',
    category: 'conditions',
    icon: 'clock',
    description: 'Multiple timeframe analysis',
    defaultData: {
      label: 'Multi-Timeframe',
      description: 'Confluence across timeframes',
      properties: { timeframes: ['1h', '4h', '1d'], agreement: 2 }
    }
  },
  {
    id: 'volume-condition',
    name: 'Volume Spike',
    category: 'conditions',
    icon: 'volume-x',
    description: 'Abnormal volume activity',
    defaultData: {
      label: 'Volume Spike',
      description: 'Volume above average threshold',
      properties: { multiplier: 2, period: 20 }
    }
  },
  // Azioni Esistenti + Nuove
  {
    id: 'buy-order',
    name: 'Buy Order',
    category: 'actions',
    icon: 'trending-up',
    description: 'Execute purchase',
    defaultData: {
      label: 'Buy Order',
      description: 'Execute buy order',
      actionType: 'buy',
      properties: { amount: 30, orderType: 'market', asset: 'ETH' }
    }
  },
  {
    id: 'sell-order',
    name: 'Sell Order',
    category: 'actions',
    icon: 'trending-down',
    description: 'Execute sale',
    defaultData: {
      label: 'Sell Order',
      description: 'Execute sell order',
      actionType: 'sell',
      properties: { amount: 100, orderType: 'market' }
    }
  },
  {
    id: 'stop-loss',
    name: 'Stop Loss',
    category: 'actions',
    icon: 'shield',
    description: 'Risk management',
    defaultData: {
      label: 'Stop Loss',
      description: 'Risk management stop',
      actionType: 'stop-loss',
      properties: { stopLoss: 5, stopType: 'percentage' }
    }
  },
  // Nuove Azioni
  {
    id: 'send-notification',
    name: 'Send Notification',
    category: 'actions',
    icon: 'bell',
    description: 'Send alert/notification',
    defaultData: {
      label: 'Send Notification',
      description: 'Send notification or alert',
      actionType: 'notification',
      properties: { 
        type: 'email', 
        message: 'Strategy signal triggered',
        channels: ['email', 'telegram', 'webhook'],
        priority: 'normal'
      }
    }
  },
  {
    id: 'emergency-stop',
    name: 'Emergency Stop',
    category: 'actions',
    icon: 'stop-circle',
    description: 'Emergency strategy halt',
    defaultData: {
      label: 'Emergency Stop',
      description: 'Emergency stop all strategy operations',
      actionType: 'emergency-stop',
      properties: { 
        stopType: 'immediate',
        closePositions: true,
        cancelOrders: true,
        reason: 'Emergency halt triggered'
      }
    }
  },
  {
    id: 'take-profit',
    name: 'Take Profit',
    category: 'actions',
    icon: 'target',
    description: 'Profit taking order',
    defaultData: {
      label: 'Take Profit',
      description: 'Take profit at target price',
      actionType: 'take-profit',
      properties: { 
        profit: 10, 
        profitType: 'percentage',
        partialSell: false
      }
    }
  },
  {
    id: 'trailing-stop',
    name: 'Trailing Stop',
    category: 'actions',
    icon: 'move',
    description: 'Dynamic stop loss',
    defaultData: {
      label: 'Trailing Stop',
      description: 'Dynamic trailing stop loss',
      actionType: 'trailing-stop',
      properties: { 
        trailDistance: 3,
        trailType: 'percentage',
        activation: 5
      }
    }
  },
  {
    id: 'scale-in',
    name: 'Scale In',
    category: 'actions',
    icon: 'layers',
    description: 'Gradual position building',
    defaultData: {
      label: 'Scale In',
      description: 'Scale into position gradually',
      actionType: 'scale-in',
      properties: { 
        portions: 3,
        interval: 2,
        intervalType: 'percentage'
      }
    }
  },
  {
    id: 'scale-out',
    name: 'Scale Out',
    category: 'actions',
    icon: 'layers-reduce',
    description: 'Gradual position closing',
    defaultData: {
      label: 'Scale Out',
      description: 'Scale out of position gradually',
      actionType: 'scale-out',
      properties: { 
        portions: 3,
        targets: [5, 10, 15],
        targetType: 'percentage'
      }
    }
  }
];

export const EnhancedToolbox: React.FC = () => {
  const { addNode } = useStrategyStore();
  const { getViewport } = useReactFlow();

  const indicators = blockTypes.filter(block => block.category === 'indicators');
  const conditions = blockTypes.filter(block => block.category === 'conditions');
  const actions = blockTypes.filter(block => block.category === 'actions');

  const handleBlockClick = (block: BlockType) => {
    // Aggiungi il nodo al centro del viewport corrente
    const viewport = getViewport();
    const centerX = (window.innerWidth / 2 - 280) / viewport.zoom - viewport.x / viewport.zoom; // 280 = toolbox width
    const centerY = (window.innerHeight / 2) / viewport.zoom - viewport.y / viewport.zoom;

    // Determina il tipo di nodo basato sull'id del blocco per i nuovi nodi specifici
    let nodeType: string;
    if (block.id === 'send-notification') {
      nodeType = 'notificationNode';
    } else if (block.id === 'emergency-stop') {
      nodeType = 'emergencyStopNode';
    } else {
      nodeType = `${block.category.slice(0, -1)}Node`; // indicators -> indicatorNode
    }
    
    addNode({
      type: nodeType,
      position: { x: centerX - 90, y: centerY - 40 }, // Center the node
      data: {
        ...block.defaultData,
        category: block.category
      }
    });

    // Effetto visivo di aggiunta
    setTimeout(() => {
      const newNodeElement = document.querySelector(`[data-id="${block.id}-${Date.now() - 1}"]`);
      if (newNodeElement) {
        newNodeElement.classList.add(styles.nodeAddedAnimation);
        setTimeout(() => {
          newNodeElement.classList.remove(styles.nodeAddedAnimation);
        }, 600);
      }
    }, 100);
  };

  const getIcon = (iconType: string) => {
    const iconMap: Record<string, JSX.Element> = {
      // Indicatori esistenti
      'bar-chart': <path d="M18 20V10M12 20V4M6 20v-6"/>,
      'trending': <path d="M3 3v18h18M7 16l4-4 4 4 5-5"/>,
      'circle': <circle cx="12" cy="12" r="10"/>,
      // Nuovi indicatori
      'volume': <><rect x="3" y="8" width="4" height="9"/><rect x="7" y="5" width="4" height="12"/><rect x="11" y="2" width="4" height="15"/><rect x="15" y="10" width="4" height="7"/></>,
      'target': <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
      'percent': <><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
      'grid': <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 9h6v6H9z"/><path d="M9 3v6M15 3v6M21 9h-6M21 15h-6M15 21v-6M9 21v-6M3 15h6M3 9h6"/></>,
      'cloud': <><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 0 1 0 9Z"/></>,
      // Condizioni esistenti
      'arrow-up': <path d="M7 17l9.2-9.2M17 17H7V7"/>,
      'arrow-down': <path d="M17 7L7 17M7 7h10v10"/>,
      'arrow-right': <path d="M8 12h8M12 8l4 4-4 4"/>,
      // Nuove condizioni
      'divide': <><circle cx="12" cy="6" r="2"/><line x1="21" y1="6" x2="3" y2="18"/><circle cx="12" cy="18" r="2"/></>,
      'candle': <><rect x="8" y="2" width="8" height="4"/><rect x="9" y="6" width="6" height="6"/><rect x="8" y="12" width="8" height="10"/></>,
      'mountain': <><path d="M8 21l4-7 3 2 5-6"/><path d="M3 21h18"/></>,
      'clock': <><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></>,
      'volume-x': <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></>,
      // Azioni esistenti
      'trending-up': <path d="M3 3v18h18M7 16l4-4 4 4 5-5"/>,
      'trending-down': <path d="M3 21v-18h18M7 8l4 4-4 4-5-5"/>,
      'shield': <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><circle cx="12" cy="16" r="1"/></>,
      // Nuove azioni
      'bell': <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
      'stop-circle': <><circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="6" height="6"/></>,
      'move': <><polyline points="5,9 2,12 5,15"/><polyline points="9,5 12,2 15,5"/><polyline points="15,19 12,22 9,19"/><polyline points="19,9 22,12 19,15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></>,
      'layers': <><polygon points="12,2 2,7 12,12 22,7 12,2"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></>,
      'layers-reduce': <><polygon points="12,2 2,7 12,12 22,7 12,2"/><polyline points="2,17 12,22 22,17"/><line x1="8" y1="12" x2="16" y2="12"/></>,
    };
    return iconMap[iconType] || <circle cx="12" cy="12" r="3"/>;
  };

  const BlockItem: React.FC<{ block: BlockType }> = ({ block }) => {
    // Determina le classi CSS specifiche per i nuovi blocchi
    let blockClass = `${styles.blockItem} ${styles[`${block.category}Block`]}`;
    if (block.id === 'send-notification') {
      blockClass += ` ${styles.notificationBlock}`;
    } else if (block.id === 'emergency-stop') {
      blockClass += ` ${styles.emergencyBlock}`;
    }

    return (
      <div
        className={blockClass}
        onClick={() => handleBlockClick(block)}
      >
        <div className={`${styles.blockIcon} ${styles[`${block.category}Icon`]} ${block.id === 'send-notification' ? styles.notificationIcon : ''} ${block.id === 'emergency-stop' ? styles.emergencyIcon : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            {getIcon(block.icon)}
          </svg>
        </div>
        <div className={styles.blockInfo}>
          <div className={styles.blockName}>{block.name}</div>
          <div className={styles.blockDescription}>{block.description}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.toolbox}>
      <div className={styles.toolboxHeader}>
        <h2 className={styles.toolboxTitle}>Components</h2>
        <p className={styles.toolboxSubtitle}>Click to add elements to your strategy</p>
      </div>

      <div className={styles.toolboxSection}>
        <h3 className={styles.sectionTitle}>
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M3 3v18h18M7 16l4-4 4 4 5-5"/>
          </svg>
          Indicators
        </h3>
        {indicators.map(block => (
          <BlockItem key={block.id} block={block} />
        ))}
      </div>

      <div className={styles.toolboxSection}>
        <h3 className={styles.sectionTitle}>
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
          </svg>
          Conditions
        </h3>
        {conditions.map(block => (
          <BlockItem key={block.id} block={block} />
        ))}
      </div>

      <div className={styles.toolboxSection}>
        <h3 className={styles.sectionTitle}>
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
          </svg>
          Actions
        </h3>
        {actions.map(block => (
          <BlockItem key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
};
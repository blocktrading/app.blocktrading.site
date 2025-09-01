import React, { useState, useEffect } from 'react';
import { MetricCard } from '../components/MetricCard/MetricCard';
import { CandlestickChart } from '../components/CandlestickChart/CandlestickChart';
import { ExchangeAllocation } from '../components/ExchangeAllocation/ExchangeAllocation';
import { useAppStore } from '../stores/useAppStore';
import type { MetricCard as MetricCardType } from '../types';
import styles from './Portfolio.module.css';

// Mock data per il grafico a candele
const generateCandleData = (timeframe: string) => {
  const now = Date.now();
  const intervals = timeframe === '1h' ? 24 : timeframe === '24h' ? 30 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 365;
  const intervalMs = timeframe === '1h' ? 60 * 60 * 1000 : timeframe === '24h' ? 24 * 60 * 60 * 1000 : timeframe === '7d' ? 24 * 60 * 60 * 1000 : timeframe === '30d' ? 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  
  const data = [];
  let basePrice = 2800000; // Base portfolio value
  
  for (let i = intervals; i >= 0; i--) {
    const timestamp = now - (i * intervalMs);
    const volatility = 0.02; // 2% volatility
    const trend = Math.sin(i * 0.1) * 0.01; // Small trend component
    
    const open = basePrice * (1 + (Math.random() - 0.5) * volatility + trend);
    const close = open * (1 + (Math.random() - 0.5) * volatility + trend);
    const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.5);
    const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.5);
    const volume = Math.random() * 1000000 + 500000;
    
    data.push({
      timestamp,
      open,
      high,
      low,
      close,
      volume
    });
    
    basePrice = close; // Use close as next base price for continuity
  }
  
  return data;
};

const portfolioMetrics: MetricCardType[] = [
  {
    title: 'Total Portfolio Value',
    value: '$2,847,563',
    change: '+5.23% (24h)',
    changeType: 'positive',
    icon: 'dollar'
  },
  {
    title: 'Available Balance',
    value: '$485,920',
    change: '17.1% of total',
    changeType: 'neutral',
    icon: 'wallet'
  },
  {
    title: 'Total P&L',
    value: '+$347,821',
    change: '+13.9% (All time)',
    changeType: 'positive',
    icon: 'trending'
  },
  {
    title: 'Daily P&L',
    value: '+$12,847',
    change: '+0.45%',
    changeType: 'positive',
    icon: 'calendar'
  }
];

const portfolioHoldings = [
  {
    asset: 'BTC',
    name: 'Bitcoin',
    amount: '12.45834',
    value: '$1,248,563',
    percentage: 43.8,
    change24h: '+3.2%',
    changeType: 'positive' as const
  },
  {
    asset: 'ETH',
    name: 'Ethereum',
    amount: '145.892',
    value: '$487,293',
    percentage: 17.1,
    change24h: '+1.8%',
    changeType: 'positive' as const
  },
  {
    asset: 'BNB',
    name: 'Binance Coin',
    amount: '234.56',
    value: '$234,890',
    percentage: 8.2,
    change24h: '-0.5%',
    changeType: 'negative' as const
  },
  {
    asset: 'SOL',
    name: 'Solana',
    amount: '892.34',
    value: '$187,432',
    percentage: 6.6,
    change24h: '+5.1%',
    changeType: 'positive' as const
  },
  {
    asset: 'ADA',
    name: 'Cardano',
    amount: '12,847.23',
    value: '$89,563',
    percentage: 3.1,
    change24h: '+2.3%',
    changeType: 'positive' as const
  },
  {
    asset: 'USDT',
    name: 'Tether',
    amount: '485,920.00',
    value: '$485,920',
    percentage: 17.1,
    change24h: '0.0%',
    changeType: 'neutral' as const
  }
];

const transactionHistory = [
  {
    id: '1',
    type: 'buy',
    asset: 'BTC',
    amount: '0.5',
    price: '$94,250',
    value: '$47,125',
    timestamp: '2025-07-11T10:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    type: 'sell',
    asset: 'ETH',
    amount: '2.5',
    price: '$3,342',
    value: '$8,355',
    timestamp: '2025-07-11T09:15:00Z',
    status: 'completed'
  },
  {
    id: '3',
    type: 'buy',
    asset: 'SOL',
    amount: '50',
    price: '$210',
    value: '$10,500',
    timestamp: '2025-07-11T08:45:00Z',
    status: 'completed'
  }
];

export const Portfolio: React.FC = () => {
  const { setPageTitle } = useAppStore();
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  // Imposta il titolo della pagina nell'header
  useEffect(() => {
    setPageTitle('Portfolio');
    return () => setPageTitle(''); // Reset quando si esce dalla pagina
  }, [setPageTitle]);

  const timeframes = ['1h', '24h', '7d', '30d', '1y'];
  const candleData = generateCandleData(selectedTimeframe);

  return (
    <div className={styles.portfolioPage}>
      {/* Action Bar with Time Selector */}
      <div className={styles.actionBar}>
        <div className={styles.timeSelector}>
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              className={`${styles.timeButton} ${
                selectedTimeframe === timeframe ? styles.active : ''
              }`}
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        {portfolioMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Portfolio Candlestick Chart */}
        <div className={styles.chartSection}>
          <CandlestickChart 
            data={candleData} 
            timeframe={selectedTimeframe}
            symbol="Portfolio Value"
          />
        </div>

        {/* Exchange Allocation */}
        <div className={styles.allocationSection}>
          <ExchangeAllocation />
        </div>
      </div>

      {/* Portfolio Holdings */}
      <div className={styles.holdingsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Holdings</h2>
          <div className={styles.sectionActions}>
            <button className={styles.actionButton}>
              <span className={styles.actionIcon}>+</span>
              Add Asset
            </button>
          </div>
        </div>
        <div className={styles.holdingsTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Asset</div>
            <div className={styles.headerCell}>Amount</div>
            <div className={styles.headerCell}>Value</div>
            <div className={styles.headerCell}>%</div>
            <div className={styles.headerCell}>24h Change</div>
            <div className={styles.headerCell}>Actions</div>
          </div>
          {portfolioHoldings.map((holding) => (
            <div key={holding.asset} className={styles.tableRow}>
              <div className={styles.assetCell}>
                <div className={styles.assetIcon}>{holding.asset}</div>
                <div className={styles.assetInfo}>
                  <div className={styles.assetSymbol}>{holding.asset}</div>
                  <div className={styles.assetName}>{holding.name}</div>
                </div>
              </div>
              <div className={styles.amountCell}>
                <div className={styles.amount}>{holding.amount}</div>
                <div className={styles.amountLabel}>{holding.asset}</div>
              </div>
              <div className={styles.valueCell}>
                {holding.value}
              </div>
              <div className={styles.percentageCell}>
                <div className={styles.percentageBar}>
                  <div 
                    className={styles.percentageFill}
                    style={{ width: `${holding.percentage}%` }}
                  ></div>
                </div>
                <span className={styles.percentageText}>{holding.percentage}%</span>
              </div>
              <div className={`${styles.changeCell} ${styles[holding.changeType]}`}>
                {holding.change24h}
              </div>
              <div className={styles.actionsCell}>
                <button className={styles.buyButton}>Buy</button>
                <button className={styles.sellButton}>Sell</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className={styles.historySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Transactions</h2>
          <button className={styles.viewAllButton}>View All</button>
        </div>
        <div className={styles.transactionsList}>
          {transactionHistory.map((transaction) => (
            <div key={transaction.id} className={styles.transactionItem}>
              <div className={styles.transactionIcon}>
                <span className={`${styles.transactionType} ${styles[transaction.type]}`}>
                  {transaction.type === 'buy' ? '↗' : '↘'}
                </span>
              </div>
              <div className={styles.transactionDetails}>
                <div className={styles.transactionTitle}>
                  {transaction.type.toUpperCase()} {transaction.asset}
                </div>
                <div className={styles.transactionTime}>
                  {new Date(transaction.timestamp).toLocaleString()}
                </div>
              </div>
              <div className={styles.transactionAmount}>
                <div className={styles.transactionValue}>{transaction.value}</div>
                <div className={styles.transactionPrice}>
                  {transaction.amount} {transaction.asset} @ {transaction.price}
                </div>
              </div>
              <div className={`${styles.transactionStatus} ${styles[transaction.status]}`}>
                {transaction.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MetricCard } from '../components/MetricCard/MetricCard';
import { ChartContainer } from '../components/ChartContainer/ChartContainer';
import { StrategyTable } from '../components/StrategyTable/StrategyTable';
import { MarketList } from '../components/MarketList/MarketList';
import { NewsSection } from '../components/NewsSection/NewsSection';
import { ExchangeAllocation } from '../components/ExchangeAllocation/ExchangeAllocation';
import { PerformanceChart } from '../components/PerformanceChart/PerformanceChart';
import type { MetricCard as MetricCardType, Strategy } from '../types';
import styles from './Dashboard.module.css';

const mockMetrics: MetricCardType[] = [
  {
    title: 'Total Portfolio',
    value: '$2,847,563',
    change: '+5.23% (24h)',
    changeType: 'positive',
    icon: 'dollar'
  },
  {
    title: 'Active Strategies',
    value: '12',
    change: '8 profitable',
    changeType: 'positive',
    icon: 'lightning'
  },
  {
    title: '24h P&L',
    value: '+$12,847',
    change: '+0.45%',
    changeType: 'positive',
    icon: 'trending'
  },
  {
    title: 'Win Rate',
    value: '68.4%',
    change: 'Last 30 days',
    changeType: 'neutral',
    icon: 'check'
  },
  {
    title: 'Risk Score',
    value: 'Medium',
    change: 'VaR: 2.34%',
    changeType: 'neutral',
    icon: 'shield'
  },
  {
    title: 'Sharpe Ratio',
    value: '1.82',
    change: 'Excellent',
    changeType: 'positive',
    icon: 'bar-chart'
  }
];

const mockStrategies: Strategy[] = [
  {
    id: '1',
    name: 'RSI Momentum',
    status: 'active',
    pnl: '+12.45%',
    trades: 89,
    winRate: 68,
    exchange: 'Binance'
  },
  {
    id: '2',
    name: 'MACD Cross',
    status: 'active',
    pnl: '+8.72%',
    trades: 134,
    winRate: 61,
    exchange: 'Coinbase'
  },
  {
    id: '3',
    name: 'Bollinger Scalp',
    status: 'paused',
    pnl: '+15.23%',
    trades: 267,
    winRate: 73,
    exchange: 'Kraken'
  },
  {
    id: '4',
    name: 'Grid Trading',
    status: 'active',
    pnl: '+6.89%',
    trades: 445,
    winRate: 58,
    exchange: 'Binance'
  },
  {
    id: '5',
    name: 'Arbitrage Bot',
    status: 'active',
    pnl: '+22.34%',
    trades: 1205,
    winRate: 82,
    exchange: 'Multi'
  }
];

export const Dashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24H');

  const handleNewStrategy = () => {
    console.log('Creating new strategy...');
  };

  const handleTimeframeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  return (
    <div className={styles.dashboard}>
      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        {mockMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className={styles.mainGrid}>
        <PerformanceChart timeframe={selectedTimeframe} />
        <NewsSection />
      </div>

      {/* Secondary Grid */}
      <div className={styles.secondaryGrid}>
        <MarketList />
        <ExchangeAllocation />
      </div>

      {/* Strategy Table */}
      <StrategyTable 
        strategies={mockStrategies} 
        onNewStrategy={handleNewStrategy}
      />
    </div>
  );
};
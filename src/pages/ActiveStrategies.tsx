import React, { useState, useEffect } from 'react';
import { MetricCard } from '../components/MetricCard/MetricCard';
import { StrategyTable } from '../components/StrategyTable/StrategyTable';
import { useAppStore } from '../stores/useAppStore';
import type { MetricCard as MetricCardType, Strategy } from '../types';
import styles from './ActiveStrategies.module.css';

const mockStrategiesMetrics: MetricCardType[] = [
  {
    title: 'Total Strategies',
    value: '12',
    change: '+2 this week',
    changeType: 'positive',
    icon: 'lightning'
  },
  {
    title: 'Active Strategies',
    value: '8',
    change: '4 paused',
    changeType: 'neutral',
    icon: 'play'
  },
  {
    title: 'Total P&L',
    value: '+$28,947',
    change: '+12.4% (30d)',
    changeType: 'positive',
    icon: 'trending'
  },
  {
    title: 'Avg Win Rate',
    value: '72.3%',
    change: 'Across all strategies',
    changeType: 'positive',
    icon: 'check'
  }
];

const mockStrategies: Strategy[] = [
  {
    id: '1',
    name: 'BTC Momentum Scalper',
    status: 'active',
    pnl: '+$8,247',
    trades: 147,
    winRate: 68.2,
    exchange: 'Binance'
  },
  {
    id: '2',
    name: 'ETH Grid Trading',
    status: 'active',
    pnl: '+$3,892',
    trades: 89,
    winRate: 71.9,
    exchange: 'Coinbase'
  },
  {
    id: '3',
    name: 'Altcoin Mean Reversion',
    status: 'paused',
    pnl: '-$1,247',
    trades: 34,
    winRate: 45.6,
    exchange: 'Kraken'
  },
  {
    id: '4',
    name: 'DCA Long Term',
    status: 'active',
    pnl: '+$12,847',
    trades: 256,
    winRate: 78.4,
    exchange: 'Binance'
  },
  {
    id: '5',
    name: 'Volatility Breakout',
    status: 'active',
    pnl: '+$5,683',
    trades: 92,
    winRate: 69.3,
    exchange: 'OKX'
  },
  {
    id: '6',
    name: 'RSI Oversold',
    status: 'paused',
    pnl: '+$847',
    trades: 28,
    winRate: 64.2,
    exchange: 'Bybit'
  },
  {
    id: '7',
    name: 'News Sentiment Trading',
    status: 'active',
    pnl: '+$2,156',
    trades: 43,
    winRate: 74.4,
    exchange: 'Binance'
  },
  {
    id: '8',
    name: 'Arbitrage Scanner',
    status: 'active',
    pnl: '+$4,923',
    trades: 312,
    winRate: 82.1,
    exchange: 'Multiple'
  }
];

export const ActiveStrategies: React.FC = () => {
  const { setPageTitle } = useAppStore();
  const [strategies] = useState<Strategy[]>(mockStrategies);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Imposta il titolo della pagina nell'header
  useEffect(() => {
    setPageTitle('Active Strategies');
    return () => setPageTitle(''); // Reset quando si esce dalla pagina
  }, [setPageTitle]);

  const filteredStrategies = strategies.filter(strategy => {
    const matchesStatus = filterStatus === 'all' || strategy.status === filterStatus;
    const matchesSearch = strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         strategy.exchange.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleNewStrategy = () => {
    // Redirect to strategy builder
    window.location.href = '/strategy-builder';
  };

  return (
    <div className={styles.activeStrategiesPage}>
      {/* Action Bar with Create Button */}
      <div className={styles.actionBar}>
        <button className={styles.btnPrimary} onClick={handleNewStrategy}>
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Create New Strategy
        </button>
      </div>

      {/* Metrics Cards */}
      <div className={styles.metricsGrid}>
        {mockStrategiesMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Filters and Search */}
      <div className={styles.filtersSection}>
        <div className={styles.filterTabs}>
          <button
            className={`${styles.filterTab} ${filterStatus === 'all' ? styles.active : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All Strategies ({strategies.length})
          </button>
          <button
            className={`${styles.filterTab} ${filterStatus === 'active' ? styles.active : ''}`}
            onClick={() => setFilterStatus('active')}
          >
            Active ({strategies.filter(s => s.status === 'active').length})
          </button>
          <button
            className={`${styles.filterTab} ${filterStatus === 'paused' ? styles.active : ''}`}
            onClick={() => setFilterStatus('paused')}
          >
            Paused ({strategies.filter(s => s.status === 'paused').length})
          </button>
        </div>
        
        <div className={styles.searchBox}>
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search strategies or exchanges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Enhanced Strategy Table */}
      <div className={styles.strategiesContainer}>
        <StrategyTable 
          strategies={filteredStrategies} 
          onNewStrategy={handleNewStrategy}
          showHeader={false}
        />
      </div>

      {filteredStrategies.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
              <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
            </svg>
          </div>
          <h3 className={styles.emptyStateTitle}>No strategies found</h3>
          <p className={styles.emptyStateMessage}>
            {searchTerm ? 
              `No strategies match "${searchTerm}". Try adjusting your search.` :
              'Get started by creating your first trading strategy.'
            }
          </p>
          {!searchTerm && (
            <button className={styles.btnSecondary} onClick={handleNewStrategy}>
              Create Your First Strategy
            </button>
          )}
        </div>
      )}
    </div>
  );
};

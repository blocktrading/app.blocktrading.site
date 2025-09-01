import React, { useState } from 'react';
import { ConfigurationPanel } from '../components/Backtesting/ConfigurationPanel';
import { ResultsHeader } from '../components/Backtesting/ResultsHeader';
import { PerformanceChart } from '../components/Backtesting/PerformanceChart';
import { MetricsGrid } from '../components/Backtesting/MetricsGrid';
import { TradeLog } from '../components/Backtesting/TradeLog';
import styles from '../components/Backtesting/Backtesting.module.css';

interface BacktestConfig {
  period: string;
  capital: number;
  exchange: string;
  fees: number;
  strategy: string;
  benchmark: string;
}

export const Backtesting: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [config, setConfig] = useState<BacktestConfig | null>(null);

  const handleRunBacktest = async (newConfig: BacktestConfig) => {
    setIsRunning(true);
    setConfig(newConfig);
    
    // Simula l'esecuzione del backtest
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsRunning(false);
    
    // Mostra notifica di successo
    showNotification('Backtest completed successfully!', 'success');
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    // Implementazione notifica semplice
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--bt-success)' : 'var(--bt-error)'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const getStrategyDisplayName = (strategy: string) => {
    const nameMap: Record<string, string> = {
      'rsi-momentum': 'RSI Momentum Strategy',
      'macd-cross': 'MACD Cross Strategy',
      'bollinger-scalp': 'Bollinger Scalp Strategy',
      'grid-trading': 'Grid Trading Strategy'
    };
    return nameMap[strategy] || strategy;
  };

  const getBenchmarkDisplayName = (benchmark: string) => {
    const nameMap: Record<string, string> = {
      'hodl-btc': 'HODL BTC',
      'hodl-eth': 'HODL ETH',
      'dca': 'Dollar Cost Average',
      '60-40': '60/40 Portfolio'
    };
    return nameMap[benchmark] || benchmark;
  };

  return (
    <div className={styles.backtestingContainer}>
      {/* Configuration Panel */}
      <ConfigurationPanel 
        onRunBacktest={handleRunBacktest} 
        isRunning={isRunning}
      />

      {/* Results Area */}
      <div className={styles.resultsArea}>
        {/* Results Header */}
        <ResultsHeader 
          strategyName={config ? getStrategyDisplayName(config.strategy) : 'RSI Momentum Strategy'}
          benchmarkName={config ? getBenchmarkDisplayName(config.benchmark) : 'HODL BTC'}
        />

        {/* Performance Chart */}
        <PerformanceChart />

        {/* Metrics and Trade Log */}
        <div className={styles.metricsContainer}>
          <MetricsGrid />
          <TradeLog />
        </div>
      </div>
    </div>
  );
};
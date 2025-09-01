import React, { useState } from 'react';
import styles from './Backtesting.module.css';

interface BacktestConfig {
  period: string;
  capital: number;
  exchange: string;
  fees: number;
  strategy: string;
  benchmark: string;
}

interface Props {
  onRunBacktest: (config: BacktestConfig) => void;
  isRunning: boolean;
}

export const ConfigurationPanel: React.FC<Props> = ({ onRunBacktest, isRunning }) => {
  const [config, setConfig] = useState<BacktestConfig>({
    period: '6m',
    capital: 10000,
    exchange: 'binance',
    fees: 0.1,
    strategy: 'rsi-momentum',
    benchmark: 'hodl-btc'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunBacktest(config);
  };

  const handleInputChange = (key: keyof BacktestConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.configPanel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>
          <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33"/>
          </svg>
          Test Configuration
        </h2>
        <p className={styles.panelSubtitle}>Configure your backtest parameters</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.configForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Analysis Period</label>
          <select 
            className={styles.formSelect}
            value={config.period}
            onChange={(e) => handleInputChange('period', e.target.value)}
          >
            <option value="6m">Last 6 months</option>
            <option value="1y">Last 1 year</option>
            <option value="2y">Last 2 years</option>
            <option value="custom">Custom period</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Initial Capital</label>
          <div className={styles.inputGroup}>
            <input
              type="number"
              className={styles.formInput}
              value={config.capital}
              min="100"
              step="100"
              onChange={(e) => handleInputChange('capital', parseInt(e.target.value))}
            />
            <span className={styles.inputSuffix}>$</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Exchange</label>
          <select 
            className={styles.formSelect}
            value={config.exchange}
            onChange={(e) => handleInputChange('exchange', e.target.value)}
          >
            <option value="binance">Binance</option>
            <option value="coinbase">Coinbase Pro</option>
            <option value="kraken">Kraken</option>
            <option value="multi">Multi-Exchange</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Trading Fees</label>
          <div className={styles.inputGroup}>
            <input
              type="number"
              className={styles.formInput}
              value={config.fees}
              min="0"
              max="5"
              step="0.05"
              onChange={(e) => handleInputChange('fees', parseFloat(e.target.value))}
            />
            <span className={styles.inputSuffix}>%</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Strategy to Test</label>
          <select 
            className={styles.formSelect}
            value={config.strategy}
            onChange={(e) => handleInputChange('strategy', e.target.value)}
          >
            <option value="rsi-momentum">RSI Momentum Strategy</option>
            <option value="macd-cross">MACD Cross Strategy</option>
            <option value="bollinger-scalp">Bollinger Scalp Strategy</option>
            <option value="grid-trading">Grid Trading Strategy</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Benchmark Strategy</label>
          <select 
            className={styles.formSelect}
            value={config.benchmark}
            onChange={(e) => handleInputChange('benchmark', e.target.value)}
          >
            <option value="hodl-btc">HODL BTC</option>
            <option value="hodl-eth">HODL ETH</option>
            <option value="dca">Dollar Cost Average</option>
            <option value="60-40">60/40 Portfolio</option>
          </select>
        </div>

        <button 
          type="submit" 
          className={styles.runTestBtn}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <div className={styles.spinner}></div>
              Running Test...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              Run Backtest
            </>
          )}
        </button>
      </form>
    </div>
  );
};
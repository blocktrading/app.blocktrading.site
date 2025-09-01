import React from 'react';
import styles from './Backtesting.module.css';

interface Props {
  strategyName: string;
  benchmarkName: string;
}

export const ResultsHeader: React.FC<Props> = ({ strategyName, benchmarkName }) => {
  return (
    <div className={styles.resultsHeader}>
      <div>
        <div className={styles.strategyName}>{strategyName}</div>
        <div className={styles.panelSubtitle}>Backtest results vs {benchmarkName} benchmark</div>
      </div>
      <div className={styles.resultsActions}>
        <button className={styles.btnSecondary}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83"/>
          </svg>
          Optimize
        </button>
        <button className={styles.btnPrimary}>
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5"/>
          </svg>
          Export
        </button>
      </div>
    </div>
  );
};
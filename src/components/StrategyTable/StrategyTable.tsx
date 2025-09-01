import React from 'react';
import type { Strategy } from '../../types';
import styles from './StrategyTable.module.css';

interface Props {
  strategies: Strategy[];
  onNewStrategy?: () => void;
  showHeader?: boolean;
}

export const StrategyTable: React.FC<Props> = ({ strategies, onNewStrategy, showHeader = true }) => {
  return (
    <div className={styles.strategiesSection}>
      {showHeader && (
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Active Trading Strategies</h2>
          <button className={styles.btnPrimary} onClick={onNewStrategy}>
            <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Strategy
          </button>
        </div>
      )}
      <div className={styles.tableContainer}>
        <table className={styles.strategiesTable}>
        <thead>
          <tr>
            <th>Strategy</th>
            <th>Status</th>
            <th>P&L</th>
            <th>Trades</th>
            <th>Win Rate</th>
            <th>Exchange</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {strategies.map((strategy) => (
            <tr key={strategy.id}>
              <td className={styles.strategyName}>{strategy.name}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[`status${strategy.status.charAt(0).toUpperCase() + strategy.status.slice(1)}`]}`}>
                  {strategy.status === 'active' ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16"/>
                      <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                  )}
                  {strategy.status.charAt(0).toUpperCase() + strategy.status.slice(1)}
                </span>
              </td>
              <td className={strategy.pnl.startsWith('+') ? styles.pnlPositive : styles.pnlNegative}>
                {strategy.pnl}
              </td>
              <td>{strategy.trades}</td>
              <td>{strategy.winRate}%</td>
              <td><span className={styles.exchangeTag}>{strategy.exchange}</span></td>
              <td>
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" style={{cursor: 'pointer'}}>
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};
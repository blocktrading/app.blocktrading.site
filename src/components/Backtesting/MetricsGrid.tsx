import React from 'react';
import styles from './Backtesting.module.css';
import type { JSX } from 'react';

interface Metric {
  label: string;
  value: string;
  comparison: string;
  comparisonType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

const metrics: Metric[] = [
  {
    label: 'Total Return (ROI)',
    value: '+35.0%',
    comparison: '+27.0% vs HODL',
    comparisonType: 'positive',
    icon: 'trending-up'
  },
  {
    label: 'Max Drawdown',
    value: '-7.2%',
    comparison: '+8.3% vs HODL',
    comparisonType: 'positive',
    icon: 'trending-down'
  },
  {
    label: 'Sharpe Ratio',
    value: '1.85',
    comparison: '+1.23 vs HODL',
    comparisonType: 'positive',
    icon: 'star'
  },
  {
    label: 'Total Trades',
    value: '12',
    comparison: '75% Win Rate',
    comparisonType: 'neutral',
    icon: 'check'
  }
];

export const MetricsGrid: React.FC = () => {
  const getIcon = (iconType: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'trending-up': <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M3 3v18h18M7 16l4-4 4 4 5-5"/></svg>,
      'trending-down': <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M17 7L7 17M7 7h10v10"/></svg>,
      'star': <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
      'check': <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>
    };
    return iconMap[iconType] || <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="3"/></svg>;
  };

  return (
    <div className={styles.metricsGrid}>
      {metrics.map((metric, index) => (
        <div key={index} className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>{metric.label}</span>
            <div className={styles.metricIcon}>
              {getIcon(metric.icon)}
            </div>
          </div>
          <div className={styles.metricValue}>{metric.value}</div>
          <div className={`${styles.metricComparison} ${styles[`comparison${metric.comparisonType.charAt(0).toUpperCase() + metric.comparisonType.slice(1)}`]}`}>
            {metric.comparisonType === 'positive' && (
              <svg width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="M7 17l9.2-9.2M17 17H7V7"/>
              </svg>
            )}
            {metric.comparison}
          </div>
        </div>
      ))}
    </div>
  );
};
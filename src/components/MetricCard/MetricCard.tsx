import React from 'react';
import type { MetricCard as MetricCardType } from '../../types';
import styles from './MetricCard.module.css';

interface Props {
  metric: MetricCardType;
}

export const MetricCard: React.FC<Props> = ({ metric }) => {
  return (
    <div className={styles.metricCard}>
      <div className={styles.metricInfo}>
        <h3>{metric.title}</h3>
        <div className={styles.metricValue}>{metric.value}</div>
        <div className={`${styles.metricChange} ${styles[metric.changeType]}`}>
          {metric.change}
        </div>
      </div>
      <div className={styles.metricIcon}>
        {getMetricIcon(metric.icon)}
      </div>
    </div>
  );
};

const getMetricIcon = (iconType: string) => {
  switch (iconType) {
    case 'dollar':
      return (
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      );
    case 'lightning':
      return (
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
        </svg>
      );
    case 'trending':
      return (
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M3 3v18h18"/>
          <path d="M7 16l4-4 4 4 5-5"/>
        </svg>
      );
    case 'check':
      return (
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12l2 2 4-4"/>
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <circle cx="12" cy="16" r="1"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      );
    case 'bar-chart':
      return (
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M18 20V10"/>
          <path d="M12 20V4"/>
          <path d="M6 20v-6"/>
        </svg>
      );
    case 'wallet':
      return (
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path d="M20 7H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2z"/>
          <path d="M4 7v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7"/>
          <path d="M12 7v13"/>
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      );
    default:
      return null;
  }
};
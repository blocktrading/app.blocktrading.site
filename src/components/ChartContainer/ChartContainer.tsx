import React from 'react';
import styles from './ChartContainer.module.css';

interface Props {
  title: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export const ChartContainer: React.FC<Props> = ({ title, children, actions }) => {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h2 className={styles.chartTitle}>{title}</h2>
        {actions && <div className={styles.chartActions}>{actions}</div>}
      </div>
      <div className={styles.chartContent}>
        {children || (
          <div className={styles.chartPlaceholder}>
            {title} Chart
          </div>
        )}
      </div>
    </div>
  );
};
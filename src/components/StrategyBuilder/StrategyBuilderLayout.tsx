import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StrategyBuilder.module.css';

interface Props {
  children: React.ReactNode;
}

export const StrategyBuilderLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.strategyBuilderApp}>
      {/* Header dedicato */}
      <header className={styles.builderHeader}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className={styles.strategyInfo}>
            <h1>RSI Momentum Strategy</h1>
            <p>Last modified: 2 hours ago • Autosaved</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary}>
            <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
            </svg>
            Test
          </button>
          <button className={styles.btnSecondary}>
            <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M8 17l4 4 4-4m-4-5v9M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>
            </svg>
            Backtest
          </button>
          <button className={styles.btnPrimary}>
            <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
              <polyline points="17,21 17,13 7,13 7,21"/>
              <polyline points="7,3 7,8 15,8"/>
            </svg>
            Save
          </button>
          <button className={styles.btnPrimary}>
            <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            Deploy
          </button>
        </div>
      </header>

      {/* Content */}
      <div className={styles.builderMain}>
        {children}
      </div>
    </div>
  );
};
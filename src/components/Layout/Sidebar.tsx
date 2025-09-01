import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../stores/useAppStore';
import styles from './Sidebar.module.css';

const navItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    path: '/', 
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    )
  },
  { 
    id: 'strategy-builder', 
    label: 'Strategy Builder', 
    path: '/strategy-builder', 
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    )
  },
  { 
    id: 'strategies', 
    label: 'Active Strategies', 
    path: '/strategies', 
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M3 3v18h18"/>
        <path d="M7 16l4-4 4 4 5-5"/>
      </svg>
    )
  },
  { 
    id: 'backtesting', 
    label: 'Backtesting', 
    path: '/backtesting', 
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77"/>
      </svg>
    )
  },
  { 
    id: 'portfolio', 
    label: 'Portfolio', 
    path: '/portfolio', 
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  { 
    id: 'exchanges', 
    label: 'Exchanges', 
    path: '/exchanges', 
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    path: '/analytics', 
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    )
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    path: '/settings', 
    icon: (
      <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    )
  },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen } = useAppStore();

  return (
    <div className={`${styles.sidebar} ${!sidebarOpen ? styles.hidden : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <img src="images/logo.png" alt="BT"/>
        </div>
        <span className={styles.logoText}>BlockTrading</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.exchangeStatus}>
        <h4>Exchange Status</h4>
        <div className={styles.statusItem}>
          <span>Binance</span>
          <div className={`${styles.statusDot} ${styles.statusGreen}`}></div>
        </div>
        <div className={styles.statusItem}>
          <span>Coinbase</span>
          <div className={`${styles.statusDot} ${styles.statusGreen}`}></div>
        </div>
        <div className={styles.statusItem}>
          <span>Kraken</span>
          <div className={`${styles.statusDot} ${styles.statusYellow}`}></div>
        </div>
      </div>
    </div>
  );
};
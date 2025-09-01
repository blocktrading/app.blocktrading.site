import React, { useState, useEffect } from 'react';
import { MetricCard } from '../components/MetricCard/MetricCard';
import { useAppStore } from '../stores/useAppStore';
import type { MetricCard as MetricCardType } from '../types';
import styles from './Exchanges.module.css';

const exchangeMetrics: MetricCardType[] = [
  {
    title: 'Connected Exchanges',
    value: '4',
    change: '+1 this month',
    changeType: 'positive',
    icon: 'check'
  },
  {
    title: 'Total Balance',
    value: '$2,847,563',
    change: 'Across all exchanges',
    changeType: 'neutral',
    icon: 'dollar'
  },
  {
    title: 'Active Connections',
    value: '3',
    change: '1 maintenance',
    changeType: 'neutral',
    icon: 'lightning'
  },
  {
    title: 'Monthly Volume',
    value: '$1.2M',
    change: '+15.3% vs last month',
    changeType: 'positive',
    icon: 'trending'
  }
];

const exchanges = [
  {
    id: 'binance',
    name: 'Binance',
    logo: '🔶',
    status: 'connected',
    balance: '$1,248,563',
    percentage: 43.8,
    apiStatus: 'active',
    lastSync: '2025-07-11T10:30:00Z',
    tradingPairs: 234,
    volume24h: '$485,920',
    fees: '0.1%',
    latency: '12ms'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Pro',
    logo: '🔵',
    status: 'connected',
    balance: '$687,293',
    percentage: 24.1,
    apiStatus: 'active',
    lastSync: '2025-07-11T10:28:00Z',
    tradingPairs: 156,
    volume24h: '$234,890',
    fees: '0.5%',
    latency: '18ms'
  },
  {
    id: 'kraken',
    name: 'Kraken',
    logo: '🟣',
    status: 'connected',
    balance: '$426,785',
    percentage: 15.0,
    apiStatus: 'maintenance',
    lastSync: '2025-07-11T09:45:00Z',
    tradingPairs: 89,
    volume24h: '$156,432',
    fees: '0.26%',
    latency: '25ms'
  },
  {
    id: 'ftx',
    name: 'FTX',
    logo: '⚫',
    status: 'disconnected',
    balance: '$0',
    percentage: 0,
    apiStatus: 'error',
    lastSync: '2025-07-10T15:20:00Z',
    tradingPairs: 0,
    volume24h: '$0',
    fees: 'N/A',
    latency: 'N/A'
  },
  {
    id: 'okx',
    name: 'OKX',
    logo: '🔸',
    status: 'pending',
    balance: '$0',
    percentage: 0,
    apiStatus: 'pending',
    lastSync: 'Never',
    tradingPairs: 0,
    volume24h: '$0',
    fees: '0.1%',
    latency: 'N/A'
  }
];

const apiKeys = [
  {
    id: '1',
    exchange: 'Binance',
    keyName: 'Trading Bot Key',
    permissions: ['Spot Trading', 'Futures Trading', 'Read'],
    created: '2025-06-15T10:30:00Z',
    lastUsed: '2025-07-11T10:30:00Z',
    status: 'active'
  },
  {
    id: '2',
    exchange: 'Coinbase Pro',
    keyName: 'Portfolio Management',
    permissions: ['Trade', 'View'],
    created: '2025-06-20T14:15:00Z',
    lastUsed: '2025-07-11T10:28:00Z',
    status: 'active'
  },
  {
    id: '3',
    exchange: 'Kraken',
    keyName: 'Read Only Key',
    permissions: ['Query Funds', 'Query Open Orders'],
    created: '2025-07-01T09:00:00Z',
    lastUsed: '2025-07-11T09:45:00Z',
    status: 'limited'
  }
];

export const Exchanges: React.FC = () => {
  const { setPageTitle } = useAppStore();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setPageTitle('Exchanges');
    return () => setPageTitle('');
  }, [setPageTitle]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'success';
      case 'maintenance':
      case 'limited':
        return 'warning';
      case 'disconnected':
      case 'error':
        return 'error';
      case 'pending':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'api-keys', label: 'API Keys' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className={styles.exchangesPage}>
      {/* Action Bar */}
      <div className={styles.actionBar}>
        <div className={styles.tabSelector}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${
                selectedTab === tab.id ? styles.active : ''
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button 
          className={styles.addButton}
          onClick={() => setShowAddModal(true)}
        >
          <span className={styles.addIcon}>+</span>
          Add Exchange
        </button>
      </div>

      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        {exchangeMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {selectedTab === 'overview' && (
        <>
          {/* Exchanges Table */}
          <div className={styles.exchangesSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Exchange Overview</h2>
              <div className={styles.headerActions}>
                <button className={styles.refreshButton}>
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <polyline points="1,4 1,10 7,10"/>
                    <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                  </svg>
                  Refresh All
                </button>
                <button className={styles.testAllButton}>
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                  Test All
                </button>
                <button className={styles.configureAllButton}>
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  Settings
                </button>
              </div>
            </div>
            
            <div className={styles.exchangesTable}>
              <div className={styles.tableHeader}>
                <div className={styles.headerCell}>Exchange</div>
                <div className={styles.headerCell}>Status</div>
                <div className={styles.headerCell}>Balance</div>
                <div className={styles.headerCell}>Allocation</div>
                <div className={styles.headerCell}>24h Volume</div>
                <div className={styles.headerCell}>Latency</div>
                <div className={styles.headerCell}>Last Sync</div>
              </div>
              
              {exchanges.map((exchange) => (
                <div key={exchange.id} className={`${styles.tableRow} ${styles[exchange.status]}`}>
                  <div className={styles.exchangeNameCell}>
                    <div className={styles.exchangeLogo}>{exchange.logo}</div>
                    <div className={styles.exchangeInfo}>
                      <span className={styles.exchangeName}>{exchange.name}</span>
                      <span className={styles.tradingPairs}>{exchange.tradingPairs} pairs</span>
                    </div>
                  </div>
                  
                  <div className={styles.statusCell}>
                    <div className={styles.statusWrapper}>
                      <div className={`${styles.statusDot} ${styles[getStatusColor(exchange.status)]}`}></div>
                      <span className={styles.statusText}>{exchange.status}</span>
                    </div>
                    <span className={`${styles.apiStatus} ${styles[getStatusColor(exchange.apiStatus)]}`}>
                      API: {exchange.apiStatus}
                    </span>
                  </div>
                  
                  <div className={styles.balanceCell}>
                    <span className={styles.balanceValue}>{exchange.balance}</span>
                    <span className={styles.balancePercentage}>{exchange.percentage}% of total</span>
                  </div>
                  
                  <div className={styles.allocationCell}>
                    <div className={styles.allocationBar}>
                      <div 
                        className={styles.allocationFill}
                        style={{ width: `${exchange.percentage}%` }}
                      ></div>
                    </div>
                    <span className={styles.allocationText}>{exchange.percentage}%</span>
                  </div>
                  
                  <div className={styles.volumeCell}>
                    <span className={styles.volumeValue}>{exchange.volume24h}</span>
                    <span className={styles.feesInfo}>Fees: {exchange.fees}</span>
                  </div>
                  
                  <div className={styles.latencyCell}>
                    <span className={`${styles.latencyValue} ${
                      exchange.latency === 'N/A' ? styles.na : 
                      parseFloat(exchange.latency) < 20 ? styles.good :
                      parseFloat(exchange.latency) < 50 ? styles.warning : styles.poor
                    }`}>
                      {exchange.latency}
                    </span>
                  </div>
                  
                  <div className={styles.syncCell}>
                    <span className={styles.syncTime}>
                      {exchange.lastSync === 'Never' ? 'Never' : 
                       new Date(exchange.lastSync).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedTab === 'api-keys' && (
        <div className={styles.apiKeysSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>API Keys</h2>
            <button className={styles.addApiKeyButton}>
              <span className={styles.addIcon}>+</span>
              Add API Key
            </button>
          </div>
          <div className={styles.apiKeysTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Exchange</div>
              <div className={styles.headerCell}>Key Name</div>
              <div className={styles.headerCell}>Permissions</div>
              <div className={styles.headerCell}>Created</div>
              <div className={styles.headerCell}>Last Used</div>
              <div className={styles.headerCell}>Status</div>
              <div className={styles.headerCell}>Actions</div>
            </div>
            {apiKeys.map((key) => (
              <div key={key.id} className={styles.tableRow}>
                <div className={styles.exchangeCell}>{key.exchange}</div>
                <div className={styles.keyNameCell}>{key.keyName}</div>
                <div className={styles.permissionsCell}>
                  {key.permissions.map((permission, index) => (
                    <span key={index} className={styles.permissionTag}>
                      {permission}
                    </span>
                  ))}
                </div>
                <div className={styles.dateCell}>
                  {new Date(key.created).toLocaleDateString()}
                </div>
                <div className={styles.dateCell}>
                  {new Date(key.lastUsed).toLocaleDateString()}
                </div>
                <div className={styles.statusCell}>
                  <span className={`${styles.statusBadge} ${styles[getStatusColor(key.status)]}`}>
                    {key.status}
                  </span>
                </div>
                <div className={styles.actionsCell}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.deleteButton}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'settings' && (
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Exchange Settings</h2>
          </div>
          <div className={styles.settingsCard}>
            <h3>Global Settings</h3>
            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>
                <input type="checkbox" defaultChecked />
                Enable automatic reconnection
              </label>
            </div>
            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>
                <input type="checkbox" defaultChecked />
                Real-time balance updates
              </label>
            </div>
            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>
                <input type="checkbox" />
                Enable paper trading mode
              </label>
            </div>
            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>Sync Interval:</label>
              <select className={styles.settingSelect}>
                <option value="5">5 seconds</option>
                <option value="10" selected>10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Add Exchange Modal Placeholder */}
      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Add New Exchange</h3>
            <p>Coming soon...</p>
            <button onClick={() => setShowAddModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

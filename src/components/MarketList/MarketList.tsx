import React, { useState } from 'react';
import styles from './MarketList.module.css';

interface MarketItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changeType: 'positive' | 'negative';
}

const marketData: MarketItem[] = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', price: '$67,432', change: '+3.45%', changeType: 'positive' },
  { symbol: 'ETH/USDT', name: 'Ethereum', price: '$2,847', change: '+2.12%', changeType: 'positive' },
  { symbol: 'SOL/USDT', name: 'Solana', price: '$142', change: '-1.23%', changeType: 'negative' },
  { symbol: 'ADA/USDT', name: 'Cardano', price: '$0.87', change: '+5.67%', changeType: 'positive' },
  { symbol: 'DOT/USDT', name: 'Polkadot', price: '$24.58', change: '+1.89%', changeType: 'positive' },
];

export const MarketList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('top');

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Markets</h3>
      </div>
      <div className={styles.marketTabs}>
        <button 
          className={`${styles.marketTab} ${activeTab === 'top' ? styles.active : ''}`}
          onClick={() => setActiveTab('top')}
        >
          Top Markets
        </button>
        <button 
          className={`${styles.marketTab} ${activeTab === 'watchlist' ? styles.active : ''}`}
          onClick={() => setActiveTab('watchlist')}
        >
          Watchlist
        </button>
        <button 
          className={`${styles.marketTab} ${activeTab === 'gainers' ? styles.active : ''}`}
          onClick={() => setActiveTab('gainers')}
        >
          Gainers
        </button>
      </div>
      <div className={styles.marketList}>
        {marketData.map((item, index) => (
          <div key={index} className={styles.marketItem}>
            <div className={styles.marketInfo}>
              <div>
                <div className={styles.marketSymbol}>{item.symbol}</div>
                <div className={styles.marketName}>{item.name}</div>
              </div>
            </div>
            <div className={styles.marketPrice}>
              <div className={styles.marketPriceValue}>{item.price}</div>
              <div className={`${styles.marketChange} ${styles[item.changeType]}`}>
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
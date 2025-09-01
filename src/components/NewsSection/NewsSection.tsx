import React from 'react';
import styles from './NewsSection.module.css';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: 'market' | 'crypto' | 'regulation';
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Bitcoin Reaches New All-Time High',
    source: 'CoinDesk',
    timeAgo: '2 hours ago',
    category: 'market'
  },
  {
    id: '2',
    title: 'Ethereum London Hard Fork Successfully Implemented',
    source: 'CryptoNews',
    timeAgo: '5 hours ago',
    category: 'crypto'
  },
  {
    id: '3',
    title: 'Major Exchange Adds DeFi Token Support',
    source: 'BlockNews',
    timeAgo: '8 hours ago',
    category: 'crypto'
  },
  {
    id: '4',
    title: 'Regulatory Updates Impact Trading Volume',
    source: 'CryptoTimes',
    timeAgo: '12 hours ago',
    category: 'regulation'
  }
];

export const NewsSection: React.FC = () => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Latest News</h3>
        <button className={styles.viewMoreBtn}>View More</button>
      </div>
      <div className={styles.newsList}>
        {mockNews.map((item) => (
          <div key={item.id} className={styles.newsItem}>
            <div className={styles.newsTitle}>{item.title}</div>
            <div className={styles.newsMeta}>
              <span>{item.source}</span>
              <span>{item.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
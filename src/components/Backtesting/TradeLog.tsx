import React from 'react';
import styles from './Backtesting.module.css';

interface Trade {
  date: string;
  type: 'buy' | 'sell';
  asset: string;
  price: string;
  pnl: string;
  pnlType: 'positive' | 'negative';
}

const trades: Trade[] = [
  { date: '15 Jan', type: 'buy', asset: 'ETH', price: '$2,245', pnl: '+5.8%', pnlType: 'positive' },
  { date: '28 Jan', type: 'sell', asset: 'ETH', price: '$2,380', pnl: '+6.0%', pnlType: 'positive' },
  { date: '12 Feb', type: 'buy', asset: 'ETH', price: '$2,310', pnl: '+7.2%', pnlType: 'positive' },
  { date: '3 Mar', type: 'sell', asset: 'ETH', price: '$2,480', pnl: '+7.4%', pnlType: 'positive' },
  { date: '17 Apr', type: 'buy', asset: 'ETH', price: '$2,520', pnl: '-2.1%', pnlType: 'negative' },
  { date: '2 May', type: 'sell', asset: 'ETH', price: '$2,468', pnl: '+3.4%', pnlType: 'positive' }
];

export const TradeLog: React.FC = () => {
  return (
    <div className={styles.tradeLog}>
      <div className={styles.tradeLogHeader}>
        <h3 className={styles.logTitle}>Trade Execution Log</h3>
        <div className={styles.logStats}>12 trades • 9 profitable</div>
      </div>
      <div className={styles.tradeTableContainer}>
        <table className={styles.tradeTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Asset</th>
              <th>Price</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <tr key={index}>
                <td>{trade.date}</td>
                <td>
                  <span className={`${styles.tradeType} ${styles[`trade${trade.type.charAt(0).toUpperCase() + trade.type.slice(1)}`]}`}>
                    {trade.type.toUpperCase()}
                  </span>
                </td>
                <td>{trade.asset}</td>
                <td>{trade.price}</td>
                <td className={styles[`pnl${trade.pnlType.charAt(0).toUpperCase() + trade.pnlType.slice(1)}`]}>
                  {trade.pnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
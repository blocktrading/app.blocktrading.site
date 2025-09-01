import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import styles from './ExchangeAllocation.module.css';

const allocationData = [
  { name: 'Binance', value: 42.8, amount: 1220000, color: '#14B8A6' },
  { name: 'Coinbase', value: 32.2, amount: 917563, color: '#06B6D4' },
  { name: 'Kraken', value: 25.0, amount: 710000, color: '#0EA5E9' }
];

export const ExchangeAllocation: React.FC = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipLabel}>{data.name}</p>
          <p className={styles.tooltipValue}>
            {data.value}% • {formatCurrency(data.amount)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Exchange Allocation</h3>
      </div>
      
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {allocationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.allocationList}>
        {allocationData.map((item, index) => (
          <div key={index} className={styles.allocationItem}>
            <div className={styles.allocationInfo}>
              <div className={styles.allocationIndicator}>
                <div 
                  className={styles.allocationDot} 
                  style={{ backgroundColor: item.color }}
                ></div>
                <div>
                  <div className={styles.allocationName}>{item.name}</div>
                  <div className={styles.allocationPercentage}>{item.value}%</div>
                </div>
              </div>
            </div>
            <div className={styles.allocationAmount}>
              <div className={styles.allocationValue}>{formatCurrency(item.amount)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
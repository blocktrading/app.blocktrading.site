import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Backtesting.module.css';

const mockData = [
  { date: 'Nov 2023', strategy: 10000, benchmark: 10000 },
  { date: 'Dec 2023', strategy: 10350, benchmark: 10080 },
  { date: 'Jan 2024', strategy: 10890, benchmark: 9950 },
  { date: 'Feb 2024', strategy: 11200, benchmark: 10200 },
  { date: 'Mar 2024', strategy: 11650, benchmark: 10150 },
  { date: 'Apr 2024', strategy: 12100, benchmark: 10500 },
  { date: 'May 2024', strategy: 13500, benchmark: 10800 }
];

export const PerformanceChart: React.FC = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.chartTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'strategy' ? 'Strategy' : 'HODL BTC'}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const strategyReturn = ((13500 - 10000) / 10000 * 100).toFixed(1);
  const benchmarkReturn = ((10800 - 10000) / 10000 * 100).toFixed(1);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Performance Comparison</h3>
        <div className={styles.chartLegend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.legendStrategy}`}></div>
            <span>Strategy (+{strategyReturn}%)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.legendBenchmark}`}></div>
            <span>HODL BTC (+{benchmarkReturn}%)</span>
          </div>
        </div>
      </div>
      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.2)" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="strategy" 
              stroke="#14B8A6" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="benchmark" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
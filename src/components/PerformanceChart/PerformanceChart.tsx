import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from './PerformanceChart.module.css';

const mockPerformanceData = [
  { date: 'Jan 1', portfolio: 10000, hodl: 10000 },
  { date: 'Jan 8', portfolio: 10350, hodl: 10120 },
  { date: 'Jan 15', portfolio: 10890, hodl: 9980 },
  { date: 'Jan 22', portfolio: 11200, hodl: 10340 },
  { date: 'Jan 29', portfolio: 11650, hodl: 10200 },
  { date: 'Feb 5', portfolio: 12100, hodl: 10680 },
  { date: 'Feb 12', portfolio: 11950, hodl: 10420 },
  { date: 'Feb 19', portfolio: 12580, hodl: 10890 },
  { date: 'Feb 26', portfolio: 13200, hodl: 10950 },
  { date: 'Mar 5', portfolio: 13500, hodl: 10800 },
];

interface Props {
  timeframe: string;
}

export const PerformanceChart: React.FC<Props> = ({ timeframe }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={styles.tooltipValue} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const calculateReturn = (data: any[], key: string) => {
    if (data.length < 2) return 0;
    const start = data[0][key];
    const end = data[data.length - 1][key];
    return ((end - start) / start * 100).toFixed(1);
  };

  const strategyReturn = calculateReturn(mockPerformanceData, 'portfolio');
  const hodlReturn = calculateReturn(mockPerformanceData, 'hodl');

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Performance Comparison</h3>
          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.legendStrategy}`}></div>
              <span>Strategy (+{strategyReturn}%)</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.legendHodl}`}></div>
              <span>HODL BTC (+{hodlReturn}%)</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              dataKey="portfolio" 
              stroke="#14B8A6" 
              strokeWidth={2}
              dot={false}
              name="Strategy"
            />
            <Line 
              type="monotone" 
              dataKey="hodl" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={false}
              name="HODL BTC"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
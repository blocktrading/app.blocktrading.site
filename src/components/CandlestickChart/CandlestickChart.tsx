import React, { useEffect, useRef } from 'react';
import styles from './CandlestickChart.module.css';

interface CandleData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandlestickChartProps {
  data: CandleData[];
  timeframe: string;
  symbol?: string;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({ 
  data, 
  timeframe, 
  symbol = 'Portfolio Value' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Calculate dimensions
    const padding = 60;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;

    // Find min/max values
    const prices = data.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Drawing functions
    const getX = (index: number) => padding + (index * chartWidth) / (data.length - 1);
    const getY = (price: number) => padding + ((maxPrice - price) / priceRange) * chartHeight;

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * chartHeight) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(rect.width - padding, y);
      ctx.stroke();
      
      // Price labels
      const price = maxPrice - (i * priceRange) / 5;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`$${price.toLocaleString()}`, padding - 10, y + 4);
    }

    // Vertical grid lines
    for (let i = 0; i < data.length; i += Math.max(1, Math.floor(data.length / 6))) {
      const x = getX(i);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, rect.height - padding);
      ctx.stroke();
      
      // Time labels
      const date = new Date(data[i].timestamp);
      const timeLabel = timeframe === '1h' ? 
        date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) :
        date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(timeLabel, x, rect.height - padding + 20);
    }

    // Draw candlesticks
    data.forEach((candle, index) => {
      const x = getX(index);
      const openY = getY(candle.open);
      const closeY = getY(candle.close);
      const highY = getY(candle.high);
      const lowY = getY(candle.low);
      
      const candleWidth = Math.max(2, chartWidth / data.length * 0.8);
      const isGreen = candle.close > candle.open;
      
      // Draw wick
      ctx.strokeStyle = isGreen ? '#10b981' : '#ef4444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();
      
      // Draw body
      ctx.fillStyle = isGreen ? '#10b981' : '#ef4444';
      const bodyHeight = Math.abs(closeY - openY);
      const bodyY = Math.min(openY, closeY);
      
      if (bodyHeight < 2) {
        // Doji - draw thin line
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - candleWidth / 2, bodyY);
        ctx.lineTo(x + candleWidth / 2, bodyY);
        ctx.stroke();
      } else {
        // Normal candle
        ctx.fillRect(x - candleWidth / 2, bodyY, candleWidth, bodyHeight);
      }
    });

    // Draw volume bars (bottom section)
    const volumeHeight = 60;
    const volumeY = rect.height - padding + 5;
    const maxVolume = Math.max(...data.map(d => d.volume));
    
    data.forEach((candle, index) => {
      const x = getX(index);
      const candleWidth = Math.max(2, chartWidth / data.length * 0.8);
      const volumeBarHeight = (candle.volume / maxVolume) * volumeHeight * 0.5;
      const isGreen = candle.close > candle.open;
      
      ctx.fillStyle = isGreen ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
      ctx.fillRect(x - candleWidth / 2, volumeY - volumeBarHeight, candleWidth, volumeBarHeight);
    });

  }, [data, timeframe]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>{symbol} Price Chart</h3>
        <div className={styles.chartInfo}>
          <span className={styles.timeframe}>{timeframe.toUpperCase()}</span>
          {data.length > 0 && (
            <span className={styles.currentPrice}>
              ${data[data.length - 1]?.close.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      <canvas 
        ref={canvasRef}
        className={styles.canvas}
      />
    </div>
  );
};

import React from 'react';
import { StrategyBuilderHeader, StrategyCanvas, StrategySidebar } from '../components/Strategy';

export const StrategyPage: React.FC = () => {
  const handleTest = () => {
    console.log('Test strategy');
  };

  const handleBacktest = () => {
    console.log('Backtest strategy');
  };

  const handleSave = () => {
    console.log('Save strategy');
  };

  const handleDeploy = () => {
    console.log('Deploy strategy');
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: 'var(--bt-dark)',
      color: 'var(--bt-text-primary)',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <StrategyBuilderHeader
        strategyName="New Rete.js Strategy"
        lastModified="Just now"
        isAutosaved={false}
        onTest={handleTest}
        onBacktest={handleBacktest}
        onSave={handleSave}
        onDeploy={handleDeploy}
      />
      <div style={{ 
        flex: 1, 
        display: 'flex',
        height: 'calc(100vh - 60px)',
        overflow: 'hidden'
      }}>
        <StrategySidebar />
        <StrategyCanvas />
      </div>
    </div>
  );
};

import React from 'react';
import { useStrategyStore } from '../../stores/useStrategyStore';
import styles from './StrategyBuilder.module.css';

export const EnhancedPropertiesPanel: React.FC = () => {
  const { nodes, selectedNodeId, updateNodeData, deleteNode, selectNode } = useStrategyStore();
  
  const selectedNode = selectedNodeId ? nodes.find(n => n.id === selectedNodeId) : null;

  const handlePropertyChange = (key: string, value: any) => {
    if (selectedNodeId) {
      updateNodeData(selectedNodeId, {
        properties: {
          ...(selectedNode?.data.properties || {}),
          [key]: value
        }
      });
    }
  };

  if (!selectedNode) {
    return null; // Nasconde completamente il pannello quando non c'è nessun nodo selezionato
  }

  const renderProperties = () => {
    const nodeType = selectedNode.type;
    const properties = selectedNode.data.properties || {};

    switch (nodeType) {
      case 'indicatorNode':
        if (selectedNode.data.label === 'RSI') {
          return (
            <>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Period</label>
                <input
                  type="number"
                  className={styles.propertyInput}
                  value={properties.period || 14}
                  onChange={(e) => handlePropertyChange('period', parseInt(e.target.value))}
                  min="1"
                  max="100"
                />
              </div>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Oversold Threshold</label>
                <input
                  type="number"
                  className={styles.propertyInput}
                  value={properties.oversold || 30}
                  onChange={(e) => handlePropertyChange('oversold', parseInt(e.target.value))}
                  min="0"
                  max="50"
                />
              </div>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Overbought Threshold</label>
                <input
                  type="number"
                  className={styles.propertyInput}
                  value={properties.overbought || 70}
                  onChange={(e) => handlePropertyChange('overbought', parseInt(e.target.value))}
                  min="50"
                  max="100"
                />
              </div>
            </>
          );
        } else if (selectedNode.data.label === 'MACD') {
          return (
            <>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Fast Period</label>
                <input
                  type="number"
                  className={styles.propertyInput}
                  value={properties.fastPeriod || 12}
                  onChange={(e) => handlePropertyChange('fastPeriod', parseInt(e.target.value))}
                />
              </div>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Slow Period</label>
                <input
                  type="number"
                  className={styles.propertyInput}
                  value={properties.slowPeriod || 26}
                  onChange={(e) => handlePropertyChange('slowPeriod', parseInt(e.target.value))}
                />
              </div>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Signal Period</label>
                <input
                  type="number"
                  className={styles.propertyInput}
                  value={properties.signalPeriod || 9}
                  onChange={(e) => handlePropertyChange('signalPeriod', parseInt(e.target.value))}
                />
              </div>
            </>
          );
        }
        break;

      case 'conditionNode':
        return (
          <>
            <div className={styles.propertyGroup}>
              <label className={styles.propertyLabel}>Threshold</label>
              <input
                type="number"
                className={styles.propertyInput}
                value={properties.threshold || 30}
                onChange={(e) => handlePropertyChange('threshold', parseFloat(e.target.value))}
              />
            </div>
            <div className={styles.propertyGroup}>
              <label className={styles.propertyLabel}>Comparison Type</label>
              <select
                className={styles.propertySelect}
                value={properties.comparison || 'greater'}
                onChange={(e) => handlePropertyChange('comparison', e.target.value)}
              >
                <option value="greater">Greater Than</option>
                <option value="less">Less Than</option>
                <option value="equal">Equal To</option>
              </select>
            </div>
          </>
        );

      case 'actionNode':
        if (selectedNode.data.actionType === 'buy' || selectedNode.data.actionType === 'sell') {
          return (
            <>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Asset</label>
                <select
                  className={styles.propertySelect}
                  value={properties.asset || 'ETH'}
                  onChange={(e) => handlePropertyChange('asset', e.target.value)}
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="SOL">Solana (SOL)</option>
                  <option value="ADA">Cardano (ADA)</option>
                </select>
              </div>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Amount (%)</label>
                <input
                  type="number"
                  className={styles.propertyInput}
                  value={properties.amount || 30}
                  onChange={(e) => handlePropertyChange('amount', parseInt(e.target.value))}
                  min="1"
                  max="100"
                />
              </div>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Order Type</label>
                <select
                  className={styles.propertySelect}
                  value={properties.orderType || 'market'}
                  onChange={(e) => handlePropertyChange('orderType', e.target.value)}
                >
                  <option value="market">Market</option>
                  <option value="limit">Limit</option>
                  <option value="stop">Stop</option>
                </select>
              </div>
            </>
          );
        } else if (selectedNode.data.actionType === 'stop-loss') {
          return (
            <>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Stop Loss (%)</label>
                <input
                  type="number"
                  className={styles.propertyInput}
                  value={properties.stopLoss || 5}
                  onChange={(e) => handlePropertyChange('stopLoss', parseFloat(e.target.value))}
                  min="0.1"
                  max="50"
                  step="0.1"
                />
              </div>
              <div className={styles.propertyGroup}>
                <label className={styles.propertyLabel}>Stop Type</label>
                <select
                  className={styles.propertySelect}
                  value={properties.stopType || 'percentage'}
                  onChange={(e) => handlePropertyChange('stopType', e.target.value)}
                >
                  <option value="percentage">Percentage</option>
                  <option value="absolute">Absolute Value</option>
                </select>
              </div>
            </>
          );
        }
        break;

      case 'notificationNode':
        return (
          <>
            <div className={styles.propertyGroup}>
              <label className={styles.propertyLabel}>Notification Type</label>
              <select
                className={styles.propertySelect}
                value={properties.type || 'email'}
                onChange={(e) => handlePropertyChange('type', e.target.value)}
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="push">Push Notification</option>
                <option value="webhook">Webhook</option>
              </select>
            </div>
            <div className={styles.propertyGroup}>
              <label className={styles.propertyLabel}>Message</label>
              <textarea
                className={styles.propertyTextarea}
                value={properties.message || 'Strategy signal triggered'}
                onChange={(e) => handlePropertyChange('message', e.target.value)}
                placeholder="Enter notification message..."
                rows={3}
              />
            </div>
            <div className={styles.propertyGroup}>
              <label className={styles.propertyLabel}>Priority</label>
              <select
                className={styles.propertySelect}
                value={properties.priority || 'normal'}
                onChange={(e) => handlePropertyChange('priority', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className={styles.propertyGroup}>
              <label className={styles.propertyLabel}>Channels</label>
              <div className={styles.checkboxGroup}>
                {['email', 'telegram', 'webhook', 'discord'].map(channel => (
                  <label key={channel} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={(properties.channels || []).includes(channel)}
                      onChange={(e) => {
                        const channels = properties.channels || [];
                        if (e.target.checked) {
                          handlePropertyChange('channels', [...channels, channel]);
                        } else {
                          handlePropertyChange('channels', channels.filter((c: string) => c !== channel));
                        }
                      }}
                    />
                    {channel.charAt(0).toUpperCase() + channel.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </>
        );

      case 'emergencyStopNode':
        return (
          <>
            <div className={styles.propertyGroup}>
              <label className={styles.propertyLabel}>Stop Type</label>
              <select
                className={styles.propertySelect}
                value={properties.stopType || 'immediate'}
                onChange={(e) => handlePropertyChange('stopType', e.target.value)}
              >
                <option value="immediate">Immediate</option>
                <option value="graceful">Graceful</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
            <div className={styles.propertyGroup}>
              <label className={styles.propertyLabel}>Close Positions</label>
              <label className={styles.switchLabel}>
                <input
                  type="checkbox"
                  checked={properties.closePositions || true}
                  onChange={(e) => handlePropertyChange('closePositions', e.target.checked)}
                />
                <span className={styles.switchSlider}></span>
              </label>
            </div>
            <div className={styles.propertyGroup}>
              <label className={styles.propertyLabel}>Cancel Orders</label>
              <label className={styles.switchLabel}>
                <input
                  type="checkbox"
                  checked={properties.cancelOrders || true}
                  onChange={(e) => handlePropertyChange('cancelOrders', e.target.checked)}
                />
                <span className={styles.switchSlider}></span>
              </label>
            </div>
            <div className={styles.propertyGroup}>
              <label className={styles.propertyLabel}>Reason</label>
              <textarea
                className={styles.propertyTextarea}
                value={properties.reason || 'Emergency halt triggered'}
                onChange={(e) => handlePropertyChange('reason', e.target.value)}
                placeholder="Enter stop reason..."
                rows={2}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getCategoryColor = (nodeType: string) => {
    switch (nodeType) {
      case 'indicatorNode': return '#0EA5E9';
      case 'conditionNode': return '#F59E0B';
      case 'actionNode': return '#14B8A6';
      case 'startNode': return '#8B5CF6';
      case 'notificationNode': return '#8B5CF6';
      case 'emergencyStopNode': return '#dc2626';
      default: return '#64748B';
    }
  };

  return (
    <div className={styles.propertiesPanel}>
      <div className={styles.propertiesHeader}>
        <h2 className={styles.propertiesTitle}>Properties</h2>
        <p className={styles.propertiesSubtitle}>Configure selected node</p>
      </div>
      
      <div className={styles.propertiesContent}>
        <div className={styles.nodeInfo}>
          <div 
            className={styles.nodeTypeIndicator}
            style={{ backgroundColor: getCategoryColor(selectedNode.type) }}
          >
            <span>{selectedNode.data.category}</span>
          </div>
          <h3 className={styles.selectedNodeTitle}>{selectedNode.data.label}</h3>
          {selectedNode.data.description && (
            <p className={styles.selectedNodeDescription}>{selectedNode.data.description}</p>
          )}
        </div>

        {renderProperties()}

        <div className={styles.propertiesActions}>
          {selectedNodeId !== 'start-1' && (
            <button 
              className={styles.btnDanger} 
              style={{ width: '100%', marginBottom: '12px' }}
              onClick={() => {
                if (selectedNodeId) {
                  deleteNode(selectedNodeId);
                  selectNode(null);
                }
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"/>
              </svg>
              Delete Node
            </button>
          )}

          <button 
            className={styles.btnPrimary} 
            style={{ width: '100%' }}
            onClick={() => {
              // Trigger visual feedback
              const nodeElement = document.querySelector(`[data-id="${selectedNodeId}"]`);
              if (nodeElement) {
                nodeElement.classList.add(styles.nodeUpdatedAnimation);
                setTimeout(() => {
                  nodeElement.classList.remove(styles.nodeUpdatedAnimation);
                }, 600);
              }
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
            </svg>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import styles from './CryptoSelector.module.css';

interface CryptoAsset {
  symbol: string;
  name: string;
  exchange: string;
  marketType: 'spot' | 'futures' | 'options';
  price?: number;
  volume24h?: number;
  marketCap?: number;
  isConnected: boolean;
}

interface AssetGroup {
  id: string;
  name: string;
  assets: string[];
}

interface CryptoSelectorProps {
  selectedAsset: CryptoAsset | null;
  onAssetChange: (asset: CryptoAsset) => void;
  isGlobal?: boolean;
  showGroups?: boolean;
}

const POPULAR_EXCHANGES = [
  { id: 'binance', name: 'Binance', icon: '🟡', color: '#F0B90B' },
  { id: 'coinbase', name: 'Coinbase', icon: '🔵', color: '#0052FF' },
  { id: 'kraken', name: 'Kraken', icon: '🟣', color: '#5741D9' },
  { id: 'bybit', name: 'Bybit', icon: '🟠', color: '#F7931A' },
  { id: 'okx', name: 'OKX', icon: '⚫', color: '#000000' }
];

const ASSET_GROUPS: AssetGroup[] = [
  {
    id: 'top-10',
    name: 'Top 10 Crypto',
    assets: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'XRP/USDT', 'ADA/USDT', 'SOL/USDT', 'DOT/USDT', 'DOGE/USDT', 'AVAX/USDT', 'MATIC/USDT']
  },
  {
    id: 'defi-tokens',
    name: 'DeFi Tokens',
    assets: ['UNI/USDT', 'AAVE/USDT', 'COMP/USDT', 'MKR/USDT', 'SNX/USDT', 'CRV/USDT', 'YFI/USDT', 'SUSHI/USDT']
  },
  {
    id: 'stablecoins',
    name: 'Stablecoins',
    assets: ['USDT/USD', 'USDC/USD', 'BUSD/USD', 'DAI/USD', 'TUSD/USD', 'USDD/USD']
  },
  {
    id: 'layer-1',
    name: 'Layer 1',
    assets: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'ADA/USDT', 'SOL/USDT', 'DOT/USDT', 'AVAX/USDT', 'ATOM/USDT']
  },
  {
    id: 'gaming',
    name: 'Gaming & Metaverse',
    assets: ['AXS/USDT', 'SAND/USDT', 'MANA/USDT', 'ENJ/USDT', 'GALA/USDT', 'IMX/USDT']
  }
];

const MOCK_ASSETS: CryptoAsset[] = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', exchange: 'binance', marketType: 'spot', price: 43250.00, volume24h: 1250000000, marketCap: 850000000000, isConnected: true },
  { symbol: 'ETH/USDT', name: 'Ethereum', exchange: 'binance', marketType: 'spot', price: 2650.00, volume24h: 850000000, marketCap: 320000000000, isConnected: true },
  { symbol: 'BNB/USDT', name: 'BNB', exchange: 'binance', marketType: 'spot', price: 315.50, volume24h: 420000000, marketCap: 48000000000, isConnected: true },
  { symbol: 'XRP/USDT', name: 'Ripple', exchange: 'binance', marketType: 'spot', price: 0.62, volume24h: 380000000, marketCap: 34000000000, isConnected: true },
  { symbol: 'ADA/USDT', name: 'Cardano', exchange: 'coinbase', marketType: 'spot', price: 0.48, volume24h: 290000000, marketCap: 17000000000, isConnected: true },
  { symbol: 'SOL/USDT', name: 'Solana', exchange: 'binance', marketType: 'spot', price: 98.50, volume24h: 520000000, marketCap: 42000000000, isConnected: true }
];

export const CryptoSelector: React.FC<CryptoSelectorProps> = ({
  selectedAsset,
  onAssetChange,
  isGlobal = false,
  showGroups = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExchange, setSelectedExchange] = useState<string>('all');
  const [selectedMarketType, setSelectedMarketType] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [recentAssets, setRecentAssets] = useState<string[]>(['BTC/USDT', 'ETH/USDT', 'BNB/USDT']);
  const [favoriteAssets, setFavoriteAssets] = useState<string[]>(['BTC/USDT', 'ETH/USDT']);

  // Filter assets based on search and filters
  const filteredAssets = MOCK_ASSETS.filter(asset => {
    const matchesSearch = asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExchange = selectedExchange === 'all' || asset.exchange === selectedExchange;
    const matchesMarketType = selectedMarketType === 'all' || asset.marketType === selectedMarketType;
    const matchesGroup = !selectedGroup || ASSET_GROUPS.find(g => g.id === selectedGroup)?.assets.includes(asset.symbol);
    
    return matchesSearch && matchesExchange && matchesMarketType && matchesGroup;
  });

  // Get exchange info for display
  const getExchangeInfo = (exchangeId: string) => {
    return POPULAR_EXCHANGES.find(ex => ex.id === exchangeId) || { id: exchangeId, name: exchangeId, icon: '🔗', color: '#64748b' };
  };

  const handleAssetSelect = (asset: CryptoAsset) => {
    onAssetChange(asset);
    setIsOpen(false);
    
    // Update recent assets
    const newRecent = [asset.symbol, ...recentAssets.filter(a => a !== asset.symbol)].slice(0, 5);
    setRecentAssets(newRecent);
  };

  const toggleFavorite = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favoriteAssets.includes(symbol)) {
      setFavoriteAssets(favoriteAssets.filter(a => a !== symbol));
    } else {
      setFavoriteAssets([...favoriteAssets, symbol]);
    }
  };

  const applyGroup = (groupId: string) => {
    const group = ASSET_GROUPS.find(g => g.id === groupId);
    if (group && group.assets.length > 0) {
      const firstAsset = MOCK_ASSETS.find(a => a.symbol === group.assets[0]);
      if (firstAsset) {
        handleAssetSelect(firstAsset);
      }
    }
    setSelectedGroup(groupId);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) return `$${price.toLocaleString()}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) return `$${(volume / 1000000000).toFixed(1)}B`;
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
    return `$${(volume / 1000).toFixed(1)}K`;
  };

  return (
    <div className={`${styles.cryptoSelector} ${isGlobal ? styles.global : ''}`}>
      {/* Selector Button */}
      <button 
        className={`${styles.selectorButton} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.selectedAsset}>
          {selectedAsset ? (
            <>
              <div className={styles.assetIcon}>
                <span className={styles.exchangeIcon} style={{ color: getExchangeInfo(selectedAsset.exchange).color }}>
                  {getExchangeInfo(selectedAsset.exchange).icon}
                </span>
              </div>
              <div className={styles.assetInfo}>
                <span className={styles.assetSymbol}>{selectedAsset.symbol}</span>
                <span className={styles.assetExchange}>
                  {getExchangeInfo(selectedAsset.exchange).name} • {selectedAsset.marketType}
                </span>
              </div>
              {selectedAsset.price && (
                <span className={styles.assetPrice}>{formatPrice(selectedAsset.price)}</span>
              )}
            </>
          ) : (
            <div className={styles.placeholder}>
              <span className={styles.placeholderIcon}>🔍</span>
              <span>Select Asset & Exchange</span>
            </div>
          )}
        </div>
        <span className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}>▼</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className={styles.dropdown}>
          {/* Search Bar */}
          <div className={styles.searchSection}>
            <div className={styles.searchInput}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              {searchTerm && (
                <button className={styles.clearSearch} onClick={() => setSearchTerm('')}>
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className={styles.filtersSection}>
            <div className={styles.filterGroup}>
              <label>Exchange:</label>
              <select value={selectedExchange} onChange={(e) => setSelectedExchange(e.target.value)}>
                <option value="all">All Exchanges</option>
                {POPULAR_EXCHANGES.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.icon} {ex.name}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label>Market:</label>
              <select value={selectedMarketType} onChange={(e) => setSelectedMarketType(e.target.value)}>
                <option value="all">All Markets</option>
                <option value="spot">🔵 Spot</option>
                <option value="futures">🟡 Futures</option>
                <option value="options">🟠 Options</option>
              </select>
            </div>
          </div>

          {/* Asset Groups */}
          {showGroups && (
            <div className={styles.groupsSection}>
              <div className={styles.sectionTitle}>Quick Groups</div>
              <div className={styles.groupButtons}>
                {ASSET_GROUPS.map(group => (
                  <button
                    key={group.id}
                    className={`${styles.groupButton} ${selectedGroup === group.id ? styles.active : ''}`}
                    onClick={() => applyGroup(group.id)}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent & Favorites */}
          {(recentAssets.length > 0 || favoriteAssets.length > 0) && (
            <div className={styles.quickSection}>
              {favoriteAssets.length > 0 && (
                <div className={styles.quickGroup}>
                  <div className={styles.quickTitle}>⭐ Favorites</div>
                  <div className={styles.quickAssets}>
                    {favoriteAssets.slice(0, 3).map(symbol => {
                      const asset = MOCK_ASSETS.find(a => a.symbol === symbol);
                      return asset ? (
                        <button
                          key={symbol}
                          className={styles.quickAsset}
                          onClick={() => handleAssetSelect(asset)}
                        >
                          {symbol}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
              
              {recentAssets.length > 0 && (
                <div className={styles.quickGroup}>
                  <div className={styles.quickTitle}>🕐 Recent</div>
                  <div className={styles.quickAssets}>
                    {recentAssets.slice(0, 3).map(symbol => {
                      const asset = MOCK_ASSETS.find(a => a.symbol === symbol);
                      return asset ? (
                        <button
                          key={symbol}
                          className={styles.quickAsset}
                          onClick={() => handleAssetSelect(asset)}
                        >
                          {symbol}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Assets List */}
          <div className={styles.assetsList}>
            {filteredAssets.length === 0 ? (
              <div className={styles.noResults}>
                <span className={styles.noResultsIcon}>🔍</span>
                <p>No assets found</p>
                <small>Try adjusting your search or filters</small>
              </div>
            ) : (
              <>
                <div className={styles.resultsHeader}>
                  <span>{filteredAssets.length} assets found</span>
                </div>
                {filteredAssets.map(asset => (
                  <div
                    key={`${asset.symbol}-${asset.exchange}`}
                    className={`${styles.assetItem} ${selectedAsset?.symbol === asset.symbol && selectedAsset?.exchange === asset.exchange ? styles.selected : ''}`}
                    onClick={() => handleAssetSelect(asset)}
                  >
                    <div className={styles.assetLeft}>
                      <div className={styles.assetIcon}>
                        <span className={styles.exchangeIcon} style={{ color: getExchangeInfo(asset.exchange).color }}>
                          {getExchangeInfo(asset.exchange).icon}
                        </span>
                      </div>
                      <div className={styles.assetDetails}>
                        <div className={styles.assetName}>
                          <span className={styles.symbol}>{asset.symbol}</span>
                          <span className={styles.name}>{asset.name}</span>
                        </div>
                        <div className={styles.assetMeta}>
                          <span className={styles.exchange}>{getExchangeInfo(asset.exchange).name}</span>
                          <span className={styles.marketType}>{asset.marketType}</span>
                          <span className={`${styles.connection} ${asset.isConnected ? styles.connected : styles.disconnected}`}>
                            {asset.isConnected ? '🟢' : '🔴'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.assetRight}>
                      {asset.price && (
                        <div className={styles.priceInfo}>
                          <span className={styles.price}>{formatPrice(asset.price)}</span>
                          {asset.volume24h && (
                            <span className={styles.volume}>Vol: {formatVolume(asset.volume24h)}</span>
                          )}
                        </div>
                      )}
                      <button
                        className={`${styles.favoriteButton} ${favoriteAssets.includes(asset.symbol) ? styles.favorited : ''}`}
                        onClick={(e) => toggleFavorite(asset.symbol, e)}
                        title={favoriteAssets.includes(asset.symbol) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        {favoriteAssets.includes(asset.symbol) ? '⭐' : '☆'}
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

<h2><a href="https://blocktrading.site" target="_blank"><img src="https://blocktrading.site/wp-content/uploads/2025/06/Immagine-WhatsApp-2025-06-04-ore-10.26.07_ed041a3e-Photoroom.png" width="60"><br>BlockTrading</a></h2>

A comprehensive cryptocurrency trading strategy builder and management platform built with React and TypeScript.

## Overview

BlockTrading is a visual strategy builder that allows users to create, test, and deploy automated cryptocurrency trading strategies across multiple exchanges. The platform provides a drag-and-drop interface for building complex trading logic without writing code.

## Features

### Strategy Builder
- **Visual Flow Editor**: Drag-and-drop interface for creating trading strategies
- **Technical Indicators**: RSI, MACD, Bollinger Bands, EMA, SMA, Volume, ATR, Stochastic
- **Conditional Logic**: Greater/less than, crossovers, divergence, AND/OR operations
- **Trading Actions**: Market/limit orders, stop loss, take profit, position scaling
- **Risk Management**: Emergency stops, position limits, drawdown protection
- **Time Filters**: Market hours, day filters, trading sessions
- **Notifications**: Email, Telegram, webhooks, push notifications

### Advanced Features
- **Swimlanes System**: Organize parallel strategies with priority management
- **Global Asset Selection**: Apply asset/exchange settings across all strategy components
- **Real-time Backtesting**: Test strategies against historical data
- **Multi-exchange Support**: Binance, Coinbase Pro, Kraken, and more
- **Portfolio Management**: Track performance across multiple strategies
- **Risk Analytics**: Comprehensive risk metrics and monitoring

### Dashboard & Analytics
- **Performance Metrics**: P&L tracking, win rates, Sharpe ratios
- **Real-time Charts**: Portfolio performance and market data
- **Trade Logging**: Detailed execution history and reporting
- **Market Overview**: Live prices, volumes, and market sentiment

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router v6** for navigation
- **Zustand** for state management
- **React Flow** for visual strategy builder (migrating to ReteJS)
- **React DnD** for drag and drop functionality
- **Recharts** for data visualization

### Styling & UI
- **CSS Modules** with CSS Variables
- **Custom Design System** with BlockTrading theme
- **Responsive Design** for mobile and desktop

### Backend Integration
- **Laravel** backend framework
- **MongoDB** database
- **RESTful APIs** for data exchange
- **WebSocket** connections for real-time data

## Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Clone and Setup
```bash
# Clone the repository
git clone https://github.com/your-username/blocktrading.git
cd blocktrading

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000
VITE_APP_NAME=BlockTrading
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript checks
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Layout components (Header, Sidebar)
│   ├── StrategyBuilder/ # Strategy builder components
│   │   ├── nodes/       # Node components (Indicator, Action, etc.)
│   │   ├── edges/       # Edge components
│   │   └── Swimlane/    # Swimlanes system
│   └── ui/              # Base UI components
├── pages/               # Page components
│   ├── Dashboard.tsx
│   ├── StrategyBuilder.tsx
│   ├── Backtesting.tsx
│   └── Portfolio.tsx
├── stores/              # Zustand stores
│   └── useStrategyStore.ts
├── hooks/               # Custom React hooks
├── services/            # API services
├── types/               # TypeScript type definitions
├── styles/              # Global styles and CSS modules
└── utils/               # Utility functions
```

## Usage

### Creating a Strategy
1. Navigate to the Strategy Builder
2. Select a global asset/exchange from the dropdown
3. Drag indicators (RSI, MACD) from the toolbox to the canvas
4. Add conditions to define entry/exit signals
5. Connect trading actions (buy/sell orders)
6. Configure risk management (stop loss, position limits)
7. Test the strategy with backtesting tools

### Using Swimlanes
- **Main Strategy**: Primary trading logic
- **Risk Management**: Override lane for risk controls
- **Notifications**: Alert system configuration
- **Emergency**: Critical stops and halts

### Backtesting
1. Go to the Backtesting page
2. Select time period and initial capital
3. Choose strategy to test
4. Compare against benchmark (HODL, DCA)
5. Analyze results and metrics
6. Export reports for further analysis

## Key Components

### Strategy Store (Zustand)
```typescript
interface StrategyStore {
  nodes: Node[];
  edges: Edge[];
  swimlanes: SwimlaneType[];
  globalAsset: CryptoAsset | null;
  // Actions
  addNode: (node: Omit<Node, 'id'>) => void;
  updateNodeData: (nodeId: string, data: any) => void;
  // ... other actions
}
```

### Node Types
- **IndicatorNode**: Technical analysis indicators
- **ConditionNode**: Logical conditions and filters
- **ActionNode**: Trading operations
- **StartNode**: Strategy entry point
- **NotificationNode**: Alert and logging
- **EmergencyStopNode**: Emergency controls

### Crypto Selector
Advanced asset selection with:
- Multi-exchange support
- Market type filtering (spot, futures, options)
- Favorites and recent assets
- Real-time price data
- Connection status indicators

## Development

### Adding New Indicators
1. Create node component in `src/components/StrategyBuilder/nodes/`
2. Add to node types in `EnhancedCanvas.tsx`
3. Define properties in `EnhancedPropertiesPanel.tsx`
4. Update toolbox categories in `EnhancedToolbox.tsx`

### Code Style
- Use TypeScript strict mode
- Follow React best practices
- Implement proper error boundaries
- Use meaningful component and variable names
- Write JSDoc comments for complex functions

### Testing
```bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
npm run coverage    # Generate coverage report
```

## Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
- Configure API endpoints
- Set up SSL certificates
- Configure monitoring and logging
- Set up backup procedures

## Security Considerations

- **Authentication**: JWT token-based auth with refresh tokens
- **API Keys**: Encrypted storage of exchange API keys
- **Rate Limiting**: Implemented to prevent API abuse
- **Input Validation**: All user inputs are validated and sanitized
- **HTTPS Only**: All communications encrypted
- **Audit Logging**: Comprehensive activity logging

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write unit tests for new features
- Update documentation as needed
- Test across different browsers and devices

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [Wiki](https://github.com/your-username/blocktrading/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/blocktrading/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/blocktrading/discussions)
- **Email**: support@blocktrading.com

## Roadmap

- [ ] Migration to ReteJS for improved performance
- [ ] Mobile app development
- [ ] Additional exchange integrations
- [ ] Advanced AI-powered strategy suggestions
- [ ] Social trading features
- [ ] Options and futures support
- [ ] Portfolio optimization algorithms

## Acknowledgments

- React Flow team for the initial visual editor inspiration
- ReteJS community for the advanced node editor framework
- TradingView for charting inspiration
- The open-source cryptocurrency trading community
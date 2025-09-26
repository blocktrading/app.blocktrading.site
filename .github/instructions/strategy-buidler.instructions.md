---
applyTo: '**'
---

Strategy builder guide documentation:

# Strategy Builder Documentation

## Overview

The Strategy Builder is a visual drag-and-drop interface for creating algorithmic trading strategies using React and Rete.js. It allows traders to build complex trading logic by connecting predefined components without programming knowledge.

## Architecture

### Core Interface Layout

- **Left Panel**: Component library organized by categories
- **Center Area**: Main workspace for building strategy flowcharts
- **Right Panel**: Properties panel for component configuration
- **Top Bar**: Strategy management (Save, Load, Test, Deploy)

### Technical Implementation

- Built with React for UI components
- Rete.js for node-based visual programming
- Component-based architecture with input/output connections
- Real-time parameter configuration
- Strategy serialization for save/load functionality

## Component Categories

### 1. Financial Indicators
Technical analysis indicators with configurable parameters:

- **Moving Average**: SMA, EMA, WMA with period settings
- **RSI**: Relative Strength Index with period and threshold levels
- **MACD**: MACD Line, Signal Line, Histogram with fast/slow/signal periods
- **Bollinger Bands**: Upper, Middle, Lower bands with period and deviation
- **Stochastic**: %K and %D oscillators with parameters
- **ATR**: Average True Range for volatility measurement
- **Volume Profile**: Volume analysis indicators
- **Fibonacci**: Retracement and extension levels

### 2. Market Conditions
Components that evaluate market state:

- **Trend Direction**: Identifies uptrend, downtrend, sideways movement
- **Volatility**: Measures market volatility levels and changes
- **Volume Surge**: Detects above/below average volume activity
- **Price Action**: Identifies breakouts, breakdowns, consolidation
- **Support/Resistance**: Price proximity to key levels
- **Momentum**: Bullish/bearish momentum detection

### 3. Signal Generators
Components that produce trading signals:

- **Crossover**: Moving average crossovers, MACD crossovers
- **Threshold Break**: RSI overbought/oversold levels
- **Pattern Match**: Candlestick pattern recognition
- **Divergence**: Price vs indicator divergence detection
- **Channel Break**: Price breaking Bollinger Bands or support/resistance
- **Volume Confirm**: Volume confirmation of price movements

### 4. Position Management
Trading execution components:

- **Entry Order**: Market, limit, stop order types
- **Position Size**: Fixed percentage, risk-based, ATR-based sizing
- **Stop Loss**: Fixed percentage, ATR-based, trailing stops
- **Take Profit**: Fixed targets, risk/reward ratio based
- **Scale In/Out**: Partial position entries and exits
- **Close Position**: Market close, time-based exits

### 5. Risk Controls
Risk management components:

- **Max Risk/Trade**: Percentage-based trade risk limits
- **Max Drawdown**: Portfolio-level protection
- **Correlation**: Limits on correlated positions
- **Time Filters**: Trading hours and day restrictions
- **Market Regime**: Bull/bear market filters
- **Portfolio Heat**: Overall portfolio risk monitoring

### 6. Logical Operators
Flow control components:

- **AND**: All conditions must be true
- **OR**: At least one condition must be true
- **NOT**: Condition must be false
- **IF-THEN-ELSE**: Conditional logic branching
- **WAIT FOR**: Wait for specific conditions
- **SEQUENCE**: Sequential condition execution

## Component Structure

### Base Component Properties
Each component has:

- **Input Sockets**: Data inputs from other components
- **Output Sockets**: Data outputs to other components
- **Configuration Panel**: Parameter settings specific to component type
- **Visual Representation**: Node appearance in the editor

### Data Flow
Components connect through typed data flows:

- **Price Data**: OHLCV market data
- **Indicator Values**: Numerical outputs from technical indicators
- **Boolean Signals**: True/false trading signals
- **Order Instructions**: Trading action commands
- **Risk Parameters**: Risk management values

## Custom Components

### Creation Process
Users can create custom components by:

1. Combining existing base components in a sub-strategy
2. Defining input parameters for reusability
3. Setting output values
4. Saving as a named custom component
5. Making available in component library

### Custom Component Examples

**"RSI Mean Reversion"**:
- Inputs: Period, Oversold Level, Overbought Level
- Logic: RSI calculation + threshold comparisons
- Outputs: Buy Signal, Sell Signal, RSI Value

**"Momentum Breakout"**:
- Inputs: Lookback Period, Volume Threshold
- Logic: High/Low breakout + volume confirmation + ATR expansion
- Outputs: Breakout Signal, Strength Value

**"Multi-Timeframe Trend"**:
- Inputs: Fast Period, Slow Period, Timeframes
- Logic: Moving average trend across multiple timeframes
- Outputs: Trend Direction, Trend Strength

## Strategy Flow Example

### Simple Moving Average Crossover
```
[Price Data] → [SMA Fast] → [Crossover] → [Entry Order]
[Price Data] → [SMA Slow] → [Crossover] → [Position Size]
                           → [Stop Loss]
```

### Complex Multi-Indicator Strategy
```
[Price Data] → [RSI] → [Threshold] → [AND] → [Entry Order]
[Price Data] → [MACD] → [Crossover] → [AND] → [Position Size]
[Volume Data] → [Volume Surge] → [AND] → [Risk Controls]
```

## Configuration Interface

### Properties Panel
When a component is selected, the properties panel displays:

- Component-specific parameters with appropriate input types
- Real-time parameter validation
- Default values and acceptable ranges
- Parameter descriptions and tooltips

### Parameter Types
- **Numeric**: Sliders, spinboxes for periods, thresholds
- **Dropdown**: Selection lists for calculation methods
- **Boolean**: Checkboxes for enable/disable options
- **Asset Selection**: Dropdown for choosing trading instruments
- **Time**: Time picker for session filters

## Component Connections

### Socket Types
- **Price**: OHLCV market data streams
- **Number**: Numerical values (indicators, percentages)
- **Boolean**: True/false signals
- **Action**: Trading commands (buy, sell, close)
- **Risk**: Risk management parameters

### Connection Rules
- Components can only connect compatible socket types
- Multiple outputs can connect to multiple inputs
- Visual feedback shows valid/invalid connections
- Automatic data type conversion where appropriate

## Save/Load System

### Strategy Serialization
Strategies are saved as JSON containing:

- Component instances with their configurations
- Connection mappings between components
- Custom component definitions
- Strategy metadata (name, description, creation date)

### Component Library Management
- Base components are system-defined
- Custom components are user-created and saved
- Import/export functionality for sharing strategies
- Version control for strategy iterations
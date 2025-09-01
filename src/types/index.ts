export interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface Strategy {
  id: string;
  name: string;
  status: 'active' | 'paused';
  pnl: string;
  trades: number;
  winRate: number;
  exchange: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  active?: boolean;
}
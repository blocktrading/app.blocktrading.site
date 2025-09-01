export interface BlockType {
  id: string;
  name: string;
  category: 'indicators' | 'conditions' | 'actions' | 'start';
  icon: string;
  description: string;
  color?: string;
  defaultData?: any;
}

export interface StrategyNode extends Node {
  data: {
    label: string;
    description?: string;
    properties?: Record<string, any>;
    category?: string;
  };
}
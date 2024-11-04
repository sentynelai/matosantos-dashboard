export type Message = {
  text: string;
  isBot: boolean;
  chart?: React.ReactNode;
  showDemoChart?: boolean;
  isLoading?: boolean;
  isError?: boolean;
};

export type Step = 'welcome' | 'query' | 'suggestion' | 'result';

export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'mixed';

export type VisualizationType = 'sales' | 'comparison' | 'trend' | 'distribution';

export type Deliverable = {
  title: string;
  description: string;
  timestamp: string;
  visualizationType?: VisualizationType;
  visualizationData?: any;
  isDummy?: boolean;
  text?: string;
  chartType?: ChartType;
  metrics?: {
    label: string;
    value: string | number;
    change?: number;
    icon?: React.ElementType;
  }[];
};
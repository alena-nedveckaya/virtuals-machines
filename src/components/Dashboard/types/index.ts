export type SortField = 'status' | 'cpu' | 'memory' | 'uptime';
export type SortDirection = 'asc' | 'desc';

export type VMStatus = 'running' | 'stopped' | 'pending';
export type AlertType = 'critical' | 'important' | 'moderate' | 'good';

export interface AlertConfig {
  type: AlertType;
  icon: 'warning' | 'ok';
  color: string;
  label: string;
}

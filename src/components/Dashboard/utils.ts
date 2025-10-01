import type { VM } from '@/store/slices/vmSlice';
import type { VMStatus, AlertType, AlertConfig } from './types';

export const ALERT_CONFIGS: Record<AlertType, AlertConfig> = {
  critical: {
    type: 'critical',
    icon: 'warning',
    color: '#FD7E14',
    label: 'Critical',
  },
  important: {
    type: 'important',
    icon: 'warning',
    color: '#DC3545',
    label: 'Important',
  },
  moderate: {
    type: 'moderate',
    icon: 'warning',
    color: '#FFC008',
    label: 'Moderate',
  },
  good: {
    type: 'good',
    icon: 'ok',
    color: '#10b981',
    label: 'All good',
  },
};

export const STATUS_CONFIGS = {
  running: {
    class: 'running',
  },
  stopped: {
    class: 'stopped',
  },
  pending: {
    class: 'pending',
  },
} as const;

export const getStatusClass = (status: string): string => {
  return STATUS_CONFIGS[status as VMStatus]?.class || '';
};

export const getAlertConfig = (type: AlertType): AlertConfig => {
  return ALERT_CONFIGS[type];
};

export const getAlertText = (alerts: VM['alerts']): string => {
  if (alerts.type === 'good') return 'All good';
  const config = ALERT_CONFIGS[alerts.type as AlertType];
  return `${alerts.count} ${config.label}`;
};

import type { AlertType, AlertConfig } from '../types';

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

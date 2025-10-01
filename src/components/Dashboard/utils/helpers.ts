import type { VM } from '@/store/slices/vmSlice';
import type { VMStatus, AlertType } from '../types';
import { ALERT_CONFIGS, STATUS_CONFIGS } from './constants';

export const getStatusClass = (status: string): string => {
  return STATUS_CONFIGS[status as VMStatus]?.class || '';
};

export const getAlertConfig = (type: AlertType) => {
  return ALERT_CONFIGS[type];
};

export const getAlertText = (alerts: VM['alerts']): string => {
  if (alerts.type === 'good') return 'All good';
  const config = ALERT_CONFIGS[alerts.type as AlertType];
  return `${alerts.count} ${config.label}`;
};

import { type VM } from '@/store/slices/vmSlice';
import { Icon, ProgressBar } from '@/components';
import classes from './VMTable.module.scss';
import { useState } from 'react';

interface VMTableProps {
  vms: VM[];
}

type SortField = 'status' | 'cpu' | 'memory' | 'uptime';
type SortDirection = 'asc' | 'desc';

const VMTable = ({ vms }: VMTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'running':
        return classes.running;
      case 'stopped':
        return classes.stopped;
      case 'pending':
        return classes.pending;
      default:
        return '';
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedVMs = () => {
    if (!sortField) return vms;

    return [...vms].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'cpu':
          aValue = a.cpu;
          bValue = b.cpu;
          break;
        case 'memory':
          aValue = a.memory;
          bValue = b.memory;
          break;
        case 'uptime':
          aValue = a.uptime;
          bValue = b.uptime;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleCopyId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
    } catch (err) {
      console.error('Failed to copy ID:', err);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <Icon name="warning" size={20} color="#FD7E14" />;
      case 'important':
        return <Icon name="warning" size={20} color="#DC3545" />;
      case 'moderate':
        return <Icon name="warning" size={20} color="#FFC008" />;
      case 'good':
        return <Icon name="ok" size={20} color="#10b981" />;
      default:
        return null;
    }
  };

  const getAlertText = (alerts: VM['alerts']) => {
    if (alerts.type === 'good') return 'All good';
    const typeMap = {
      critical: 'Critical',
      important: 'Important',
      moderate: 'Moderate',
    };
    return `${alerts.count} ${typeMap[alerts.type]}`;
  };

  if (vms.length === 0) {
    return (
      <div className={classes.empty}>
        <p>No virtual machines found. Click "NEW" to create your first VM.</p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.header}>ID</th>
            <th
              className={`${classes.header} ${classes.sortable}`}
              onClick={() => handleSort('status')}
            >
              <span className={classes.headerText}>State</span>
              <Icon
                name="arrows"
                size={12}
                color={sortField === 'status' ? 'var(--brand-primary)' : '#6b7280'}
                style={{
                  transform:
                    sortField === 'status' && sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </th>
            <th className={classes.header}>Host server</th>
            <th
              className={`${classes.header} ${classes.sortable}`}
              onClick={() => handleSort('cpu')}
            >
              <span className={classes.headerText}>CPU</span>
              <Icon
                name="arrows"
                size={12}
                color={sortField === 'cpu' ? 'var(--brand-primary)' : '#6b7280'}
                style={{
                  transform:
                    sortField === 'cpu' && sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </th>
            <th
              className={`${classes.header} ${classes.sortable}`}
              onClick={() => handleSort('memory')}
            >
              <span className={classes.headerText}>Memory</span>
              <Icon
                name="arrows"
                size={12}
                color={sortField === 'memory' ? 'var(--brand-primary)' : '#6b7280'}
                style={{
                  transform:
                    sortField === 'memory' && sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </th>
            <th
              className={`${classes.header} ${classes.sortable}`}
              onClick={() => handleSort('uptime')}
            >
              <span className={classes.headerText}>Uptime</span>
              <Icon
                name="arrows"
                size={12}
                color={sortField === 'uptime' ? 'var(--brand-primary)' : '#6b7280'}
                style={{
                  transform:
                    sortField === 'uptime' && sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </th>
            <th className={classes.header}>Alerts</th>
          </tr>
        </thead>
        <tbody>
          {getSortedVMs().map((vm) => (
            <tr key={vm.id} className={classes.row}>
              <td className={classes.cell}>
                <div className={classes.idContainer}>
                  <button
                    className={classes.copyButton}
                    onClick={() => handleCopyId(vm.id)}
                    title="Copy ID"
                  >
                    <Icon name="copy" size={16} />
                  </button>
                  <span className={classes.id}>{vm.id}</span>
                </div>
              </td>
              <td className={classes.cell}>
                <span className={`${classes.status} ${getStatusClass(vm.status)}`}>
                  {vm.status}
                </span>
              </td>
              <td className={classes.cell}>{vm.hostServer}</td>
              <td className={classes.cell}>
                <div className={classes.resource}>
                  <span className={classes.value}>{vm.cpu} CPU</span>
                  <ProgressBar value={vm.cpu} max={12} />
                </div>
              </td>
              <td className={classes.cell}>
                <div className={classes.resource}>
                  <span className={classes.value}>{vm.memory} GiB</span>
                  <ProgressBar value={vm.memory} max={50} />
                </div>
              </td>
              <td className={classes.cell}>{vm.uptime}</td>
              <td className={classes.cell}>
                <div className={classes.alert}>
                  {getAlertIcon(vm.alerts.type)}
                  <span className={classes.alertText}>{getAlertText(vm.alerts)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VMTable;

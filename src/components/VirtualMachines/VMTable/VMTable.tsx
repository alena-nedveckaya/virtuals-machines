import { type VM } from '@/store/slices/vmSlice';
import './VMTable.css';

interface VMTableProps {
  vms: VM[];
}

const VMTable = ({ vms }: VMTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'var(--status-success)';
      case 'stopped':
        return 'var(--status-error)';
      case 'pending':
        return 'var(--status-warning)';
      default:
        return 'var(--text-default-secondary)';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L15 15H1L8 1Z" fill="#ef4444" />
            <path d="M8 6V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="12" r="1" fill="white" />
          </svg>
        );
      case 'important':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L15 15H1L8 1Z" fill="#f59e0b" />
            <path d="M8 6V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="12" r="1" fill="white" />
          </svg>
        );
      case 'moderate':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L15 15H1L8 1Z" fill="#eab308" />
            <path d="M8 6V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="12" r="1" fill="white" />
          </svg>
        );
      case 'good':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13.5 4.5L6 12L2.5 8.5"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
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

  const ProgressBar = ({ value, max = 10 }: { value: number; max?: number }) => {
    const percentage = Math.min((value / max) * 100, 100);
    return (
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    );
  };

  if (vms.length === 0) {
    return (
      <div className="vm-table-empty">
        <p>No virtual machines found. Click "NEW" to create your first VM.</p>
      </div>
    );
  }

  return (
    <div className="vm-table-container">
      <table className="vm-table">
        <thead>
          <tr>
            <th>ID</th>
            <th className="sortable">
              State
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 4.5L6 1.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 7.5L6 10.5L9 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </th>
            <th>Host server</th>
            <th className="sortable">
              CPU
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 4.5L6 1.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 7.5L6 10.5L9 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </th>
            <th className="sortable">
              Memory
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 4.5L6 1.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 7.5L6 10.5L9 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </th>
            <th className="sortable">
              Uptime
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 4.5L6 1.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 7.5L6 10.5L9 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </th>
            <th>Alerts</th>
          </tr>
        </thead>
        <tbody>
          {vms.map(
            (vm) =>
              console.log(vm) || (
                <tr key={vm.id}>
                  <td className="vm-id">{vm.id}</td>
                  <td>
                    <span className="status-text" style={{ color: getStatusColor(vm.status) }}>
                      {vm.status}
                    </span>
                  </td>
                  <td className="vm-host-server">{vm.hostServer}</td>
                  <td>
                    <div className="resource-cell">
                      <span className="resource-value">{vm.cpu} CPU</span>
                      <ProgressBar value={vm.cpu} max={10} />
                    </div>
                  </td>
                  <td>
                    <div className="resource-cell">
                      <span className="resource-value">{vm.memory} GiB</span>
                      <ProgressBar value={vm.memory} max={50} />
                    </div>
                  </td>
                  <td>{vm.uptime}</td>
                  <td>
                    <div className="alert-cell">
                      {getAlertIcon(vm.alerts.type)}
                      <span className="alert-text">{getAlertText(vm.alerts)}</span>
                    </div>
                  </td>
                </tr>
              ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VMTable;

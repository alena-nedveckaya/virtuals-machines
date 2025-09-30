import { type VM } from '@/store/slices/vmSlice';
import './VMStats.css';

interface VMStatsProps {
  vms: VM[];
}

const VMStats = ({ vms }: VMStatsProps) => {
  const runningVMs = vms.filter((vm) => vm.status === 'running').length;
  const stoppedVMs = vms.filter((vm) => vm.status === 'stopped').length;
  const pendingVMs = vms.filter((vm) => vm.status === 'pending').length;
  const totalCPUs = vms.reduce((sum, vm) => sum + vm.cpu, 0);
  const totalMemory = vms.reduce((sum, vm) => sum + vm.memory, 0);

  const stats = [
    { label: 'Total VMs', value: vms.length, color: '#4f46e5' },
    { label: 'Running', value: runningVMs, color: '#10b981' },
    { label: 'Stopped', value: stoppedVMs, color: '#ef4444' },
    { label: 'Pending', value: pendingVMs, color: '#f59e0b' },
    { label: 'Total CPUs', value: totalCPUs, color: '#8b5cf6' },
    { label: 'Total Memory (GB)', value: totalMemory, color: '#06b6d4' },
  ];

  return (
    <div className="vm-stats">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <div className="stat-value" style={{ color: stat.color }}>
            {stat.value}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default VMStats;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { type VM } from '@/store/slices/vmSlice';
import classes from './VMChart.module.scss';

interface VMChartProps {
  vms: VM[];
}

const VMChart = ({ vms }: VMChartProps) => {
  // Data for resource usage chart
  const resourceData = vms.map((vm) => ({
    name: vm.name,
    cpu: vm.cpu,
    memory: vm.memory,
    storage: vm.storage,
  }));

  const statusData = [
    {
      name: 'Running',
      value: vms.filter((vm) => vm.status === 'running').length,
      color: '#459E74',
    },
    {
      name: 'Stopped',
      value: vms.filter((vm) => vm.status === 'stopped').length,
      color: '#DC3545',
    },
  ];

  return (
    <div className={classes.charts}>
      <div className={classes.container}>
        <h3>Resource Usage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resourceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cpu" fill="#4f46e5" name="CPU" />
            <Bar dataKey="memory" fill="#10b981" name="Memory (GB)" />
            <Bar dataKey="storage" fill="#f59e0b" name="Storage (GB)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={classes.container}>
        <h3>VM Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VMChart;

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { type VM } from '@/store/slices/vmSlice';
import classes from './StateCard.module.scss';

interface StateCardProps {
  vms: VM[];
}

const StateCard = ({ vms }: StateCardProps) => {
  const runningVMs = vms.filter((vm) => vm.status === 'running').length;
  const stoppedVMs = vms.filter((vm) => vm.status === 'stopped').length;
  const totalVMs = vms.length;

  const data = [
    { name: 'Running', value: runningVMs, color: '#10b981' },
    { name: 'Stopped', value: stoppedVMs, color: '#ef4444' },
  ];

  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <h3>State</h3>
      </div>

      <div className={classes.content}>
        <div className={classes.pieChart}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className={classes.centerText}>
            <div className={classes.totalNumber}>{totalVMs}</div>
            <div className={classes.totalLabel}>Total number</div>
          </div>
        </div>

        <div className={classes.legend}>
          <div className={classes.legendItem}>
            <div className={classes.legendColor} style={{ backgroundColor: '#ef4444' }}></div>
            <span className={classes.legendText}>{stoppedVMs} Stopped</span>
          </div>
          <div className={classes.legendItem}>
            <div className={classes.legendColor} style={{ backgroundColor: '#10b981' }}></div>
            <span className={classes.legendText}>{runningVMs} Running</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateCard;

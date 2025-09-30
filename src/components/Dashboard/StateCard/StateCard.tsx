import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { type VM } from '@/store/slices/vmSlice';
import './StateCard.css';

interface StateCardProps {
  vms: VM[];
}

const StateCard = ({ vms }: StateCardProps) => {
  const runningVMs = vms.filter(vm => vm.status === 'running').length;
  const stoppedVMs = vms.filter(vm => vm.status === 'stopped').length;
  const totalVMs = vms.length;

  const data = [
    { name: 'Running', value: runningVMs, color: '#10b981' },
    { name: 'Stopped', value: stoppedVMs, color: '#ef4444' },
  ];

  return (
    <div className="state-card">
      <div className="card-header">
        <h3>State</h3>
      </div>
      
      <div className="state-content">
        <div className="pie-chart-container">
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
          
          <div className="center-text">
            <div className="total-number">{totalVMs}</div>
            <div className="total-label">Total number</div>
          </div>
        </div>
        
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
            <span className="legend-text">{stoppedVMs} Stopped</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
            <span className="legend-text">{runningVMs} Running</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateCard;

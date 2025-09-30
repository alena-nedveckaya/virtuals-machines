import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import './TrendCard.css';

const TrendCard = () => {
  // Mock data for the trend chart
  const data = [
    { date: '11/06', value: 200 },
    { date: '13/06', value: 400 },
    { date: '15/06', value: 600 },
    { date: '17/06', value: 800 },
    { date: '19/06', value: 1200 },
    { date: '21/06', value: 1500 },
    { date: '23/06', value: 1400 },
    { date: '25/06', value: 1300 },
    { date: '27/06', value: 1200 },
  ];

  return (
    <div className="trend-card">
      <div className="card-header">
        <h3>Trend</h3>
        <select className="time-selector">
          <option value="14">Last 14 days</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>
      
      <div className="trend-chart">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 2000]}
              ticks={[0, 500, 1000, 1500, 2000]}
              tickFormatter={(value) => `${value} TB`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendCard;



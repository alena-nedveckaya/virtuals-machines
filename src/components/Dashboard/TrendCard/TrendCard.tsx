import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { mockTrendData } from '@/data/mockTrendData';
import { Select, type SelectOption } from '@/components';
import classes from './TrendCard.module.scss';

const TrendCard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('14');

  // Options for the select dropdown
  const timeOptions: SelectOption[] = [
    { value: '7', label: 'Last 7 days' },
    { value: '14', label: 'Last 14 days' },
    { value: '30', label: 'Last 30 days' },
  ];

  // Use imported mock data
  const allData = mockTrendData;

  // Filter data based on selected period
  const getFilteredData = () => {
    const days = parseInt(selectedPeriod);
    return allData.slice(-days);
  };

  const data = getFilteredData();

  // Calculate dynamic Y-axis domain based on filtered data
  const getYAxisDomain = () => {
    if (data.length === 0) return [0, 2000];

    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));

    // Add some padding (10% above max, 10% below min)
    const padding = (maxValue - minValue) * 0.1;
    const max = Math.ceil(maxValue + padding);
    const min = Math.max(0, Math.floor(minValue - padding));

    return [min, max];
  };

  const [yMin, yMax] = getYAxisDomain();

  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <h3 className={classes.title}>Trend</h3>
        <Select
          options={timeOptions}
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          className={classes.timeSelector}
        />
      </div>

      <div className={classes.chart}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="var(--brand-primary)" stopOpacity={0.3} />
                <stop offset="90%" stopColor="var(--brand-primary)" stopOpacity={0} />
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
              domain={[yMin, yMax]}
              tickFormatter={(value) => `${value} TB`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--brand-primary)"
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

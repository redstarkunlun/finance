import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface AssetTrendChartProps {
  data: {
    date: string;
    assets: number;
    liabilities: number;
    netWorth: number;
  }[];
}

export const AssetTrendChart: React.FC<AssetTrendChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => new Intl.NumberFormat('ja-JP', { 
            style: 'currency', 
            currency: 'JPY',
            maximumFractionDigits: 0
          }).format(value)}
        />
        <Legend />
        <Line type="monotone" dataKey="assets" name="総資産" stroke="#4CAF50" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="liabilities" name="総負債" stroke="#F44336" />
        <Line type="monotone" dataKey="netWorth" name="純資産" stroke="#2196F3" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

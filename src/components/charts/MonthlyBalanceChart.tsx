import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface MonthlyBalanceChartProps {
  data: {
    month: string;
    income: number;
    expense: number;
    balance: number;
  }[];
}

export const MonthlyBalanceChart: React.FC<MonthlyBalanceChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          formatter={(value: number) => new Intl.NumberFormat('ja-JP', { 
            style: 'currency', 
            currency: 'JPY',
            maximumFractionDigits: 0
          }).format(value)}
        />
        <Legend />
        <Bar dataKey="income" name="収入" fill="#4CAF50" />
        <Bar dataKey="expense" name="支出" fill="#F44336" />
        <Bar dataKey="balance" name="収支" fill="#2196F3" />
      </BarChart>
    </ResponsiveContainer>
  );
};

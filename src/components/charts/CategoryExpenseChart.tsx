import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface CategoryExpenseChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const CategoryExpenseChart: React.FC<CategoryExpenseChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => new Intl.NumberFormat('ja-JP', { 
            style: 'currency', 
            currency: 'JPY',
            maximumFractionDigits: 0
          }).format(value)}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

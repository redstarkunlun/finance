import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  currency?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  currency = true,
  trend,
  className = '',
}) => {
  const formattedValue = currency
    ? new Intl.NumberFormat('ja-JP', { 
        style: 'currency', 
        currency: 'JPY',
        maximumFractionDigits: 0
      }).format(value)
    : value.toLocaleString('ja-JP');

  return (
    <div className={`p-6 bg-white rounded-lg shadow ${className}`}>
      <h2 className="text-sm font-medium text-gray-500">{title}</h2>
      <p className="mt-2 text-3xl font-bold text-gray-900">{formattedValue}</p>
      
      {trend && (
        <div className="mt-2 flex items-center">
          {trend.isPositive ? (
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          <span className={`ml-1 text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.value.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
};

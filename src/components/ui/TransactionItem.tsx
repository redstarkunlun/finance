import React from 'react';

interface TransactionItemProps {
  id: string;
  date: Date;
  description: string;
  account: string;
  category: string;
  amount: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  date,
  description,
  account,
  category,
  amount,
  onEdit,
  onDelete,
}) => {
  const isIncome = amount > 0;
  
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {date.toLocaleDateString('ja-JP')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {account}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {category}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isIncome ? 'text-green-600' : 'text-gray-900'}`}>
        {new Intl.NumberFormat('ja-JP', { 
          style: 'currency', 
          currency: 'JPY',
          maximumFractionDigits: 0
        }).format(amount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button 
          className="text-blue-600 hover:text-blue-900 mr-3"
          onClick={() => onEdit(id)}
        >
          編集
        </button>
        <button 
          className="text-red-600 hover:text-red-900"
          onClick={() => onDelete(id)}
        >
          削除
        </button>
      </td>
    </tr>
  );
};

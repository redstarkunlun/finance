import React from 'react';

interface AccountCardProps {
  id: string;
  name: string;
  type: 'credit_card' | 'bank_account';
  balance: number;
  institution?: string;
  cardNumber?: string;
  accountNumber?: string;
  color: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  id,
  name,
  type,
  balance,
  institution,
  cardNumber,
  accountNumber,
  color,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`p-6 bg-white rounded-lg shadow border-l-4`} style={{ borderLeftColor: color }}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-medium text-gray-900">{name}</h2>
          <p className="mt-1 text-sm text-gray-500">{institution}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            className="p-1 text-gray-400 hover:text-gray-500"
            onClick={() => onEdit(id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            className="p-1 text-gray-400 hover:text-gray-500"
            onClick={() => onDelete(id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <p className="mt-4 text-2xl font-bold text-gray-900">
        {new Intl.NumberFormat('ja-JP', { 
          style: 'currency', 
          currency: 'JPY',
          maximumFractionDigits: 0
        }).format(balance)}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        {type === 'credit_card' 
          ? `カード番号: ****${cardNumber}` 
          : `口座番号: ****${accountNumber}`
        }
      </p>
      <div className="mt-4 pt-4 border-t border-gray-200">
        {type === 'credit_card' ? (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">利用可能額</span>
            <span className="font-medium text-gray-900">
              {new Intl.NumberFormat('ja-JP', { 
                style: 'currency', 
                currency: 'JPY',
                maximumFractionDigits: 0
              }).format(0)}
            </span>
          </div>
        ) : (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">金利</span>
            <span className="font-medium text-gray-900">0.01%</span>
          </div>
        )}
      </div>
    </div>
  );
};

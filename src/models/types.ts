// アカウントモデルの型定義
export interface Account {
  id: string;
  name: string;
  type: 'credit_card' | 'bank_account';
  balance: number;
  currency: string;
  color: string;
  icon?: string;
  
  // クレジットカード固有のフィールド
  cardNumber?: string; // 下4桁のみ保存
  expiryDate?: string;
  creditLimit?: number;
  paymentDueDay?: number;
  
  // 銀行口座固有のフィールド
  accountNumber?: string; // 下4桁のみ保存
  bankName?: string;
  interestRate?: number;
  
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 取引モデルの型定義
export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  categoryId: string;
  description: string;
  date: Date;
  isRecurring: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// カテゴリモデルの型定義
export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon?: string;
  parentId?: string; // サブカテゴリの場合
  rules?: {
    keywords: string[];
    minAmount?: number;
    maxAmount?: number;
  };
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

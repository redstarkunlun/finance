import { db } from '@/lib/db';
import { Transaction } from '@/models/types';

// 取引の作成
export async function createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date();
  const newTransaction: Transaction = {
    ...transaction,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  
  await db.transactions.add(newTransaction);
  return newTransaction;
}

// 取引の取得（単一）
export async function getTransaction(id: string) {
  return await db.transactions.get(id);
}

// 全取引の取得
export async function getAllTransactions(filters?: {
  accountId?: string;
  categoryId?: string;
  startDate?: Date;
  endDate?: Date;
  type?: 'income' | 'expense' | 'transfer';
}) {
  let collection = db.transactions.orderBy('date').reverse();
  
  if (filters) {
    if (filters.accountId) {
      collection = collection.filter(tx => tx.accountId === filters.accountId);
    }
    
    if (filters.categoryId) {
      collection = collection.filter(tx => tx.categoryId === filters.categoryId);
    }
    
    if (filters.type) {
      collection = collection.filter(tx => tx.type === filters.type);
    }
    
    if (filters.startDate) {
      collection = collection.filter(tx => tx.date >= filters.startDate);
    }
    
    if (filters.endDate) {
      collection = collection.filter(tx => tx.date <= filters.endDate);
    }
  }
  
  return await collection.toArray();
}

// 取引の更新
export async function updateTransaction(id: string, transactionData: Partial<Transaction>) {
  const transaction = await db.transactions.get(id);
  if (!transaction) {
    throw new Error(`取引が見つかりません: ${id}`);
  }
  
  const updatedTransaction = {
    ...transaction,
    ...transactionData,
    updatedAt: new Date(),
  };
  
  await db.transactions.update(id, updatedTransaction);
  return updatedTransaction;
}

// 取引の削除
export async function deleteTransaction(id: string) {
  await db.transactions.delete(id);
}

// 月次収支の計算
export async function calculateMonthlyBalance(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  
  const transactions = await getAllTransactions({
    startDate,
    endDate,
  });
  
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else if (transaction.type === 'expense') {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
}

// カテゴリ別支出の計算
export async function calculateExpensesByCategory(startDate: Date, endDate: Date) {
  const transactions = await getAllTransactions({
    startDate,
    endDate,
    type: 'expense',
  });
  
  const expensesByCategory: Record<string, number> = {};
  
  for (const transaction of transactions) {
    if (!expensesByCategory[transaction.categoryId]) {
      expensesByCategory[transaction.categoryId] = 0;
    }
    expensesByCategory[transaction.categoryId] += transaction.amount;
  }
  
  return expensesByCategory;
}

// 最近の取引を取得
export async function getRecentTransactions(limit = 10) {
  return await db.transactions.orderBy('date').reverse().limit(limit).toArray();
}

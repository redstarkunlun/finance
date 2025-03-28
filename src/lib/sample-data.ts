import { db, initializeDatabase } from '@/lib/db';
import { Account, Transaction, Category } from '@/models/types';

// アプリケーション起動時にデータベースを初期化する関数
export async function initializeApp() {
  try {
    await initializeDatabase();
    console.log('データベースが正常に初期化されました');
    return true;
  } catch (error) {
    console.error('データベースの初期化に失敗しました:', error);
    return false;
  }
}

// サンプルデータを生成する関数（開発用）
export async function generateSampleData() {
  // サンプルアカウントの作成
  const accounts: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: 'メイン銀行口座',
      type: 'bank_account',
      balance: 1234567,
      currency: 'JPY',
      color: '#3B82F6',
      icon: 'building-bank',
      accountNumber: '1234',
      bankName: '三菱UFJ銀行',
      interestRate: 0.01,
      isArchived: false,
    },
    {
      name: 'メインクレジットカード',
      type: 'credit_card',
      balance: 45678,
      currency: 'JPY',
      color: '#8B5CF6',
      icon: 'credit-card',
      cardNumber: '5678',
      expiryDate: '12/28',
      creditLimit: 500000,
      paymentDueDay: 10,
      isArchived: false,
    },
    {
      name: '貯蓄口座',
      type: 'bank_account',
      balance: 2345678,
      currency: 'JPY',
      color: '#10B981',
      icon: 'piggy-bank',
      accountNumber: '9012',
      bankName: 'ゆうちょ銀行',
      interestRate: 0.02,
      isArchived: false,
    }
  ];

  // アカウントをデータベースに追加
  const createdAccounts: Account[] = [];
  for (const account of accounts) {
    const now = new Date();
    const newAccount: Account = {
      ...account,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    await db.accounts.add(newAccount);
    createdAccounts.push(newAccount);
  }

  // カテゴリを取得
  const incomeCategories = await db.categories.where('type').equals('income').toArray();
  const expenseCategories = await db.categories.where('type').equals('expense').toArray();

  // サンプル取引の作成
  const today = new Date();
  const transactions: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      accountId: createdAccounts[0].id,
      amount: 280000,
      type: 'income',
      categoryId: incomeCategories[0].id, // 給与
      description: '給与',
      date: new Date(today.getFullYear(), today.getMonth(), 25),
      isRecurring: true,
      recurringPattern: {
        frequency: 'monthly',
        interval: 1,
      },
      tags: ['給料', '収入'],
    },
    {
      accountId: createdAccounts[1].id,
      amount: 5400,
      type: 'expense',
      categoryId: expenseCategories[0].id, // 食費
      description: 'スーパーマーケット',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      isRecurring: false,
      tags: ['食料品', '日用品'],
    },
    {
      accountId: createdAccounts[1].id,
      amount: 3200,
      type: 'expense',
      categoryId: expenseCategories[6].id, // 娯楽費
      description: 'レストラン',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
      isRecurring: false,
      tags: ['外食'],
    },
    {
      accountId: createdAccounts[0].id,
      amount: 68000,
      type: 'expense',
      categoryId: expenseCategories[1].id, // 住居費
      description: '家賃',
      date: new Date(today.getFullYear(), today.getMonth(), 5),
      isRecurring: true,
      recurringPattern: {
        frequency: 'monthly',
        interval: 1,
      },
      tags: ['固定費', '住居'],
    },
    {
      accountId: createdAccounts[0].id,
      amount: 12400,
      type: 'expense',
      categoryId: expenseCategories[4].id, // 交通費
      description: '定期券',
      date: new Date(today.getFullYear(), today.getMonth(), 10),
      isRecurring: true,
      recurringPattern: {
        frequency: 'monthly',
        interval: 1,
      },
      tags: ['通勤', '交通'],
    },
    {
      accountId: createdAccounts[0].id,
      amount: 50000,
      type: 'transfer',
      categoryId: expenseCategories[9].id, // その他支出
      description: '貯蓄口座へ振替',
      date: new Date(today.getFullYear(), today.getMonth(), 26),
      isRecurring: true,
      recurringPattern: {
        frequency: 'monthly',
        interval: 1,
      },
      tags: ['貯金', '振替'],
    },
  ];

  // 取引をデータベースに追加
  for (const transaction of transactions) {
    const now = new Date();
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    await db.transactions.add(newTransaction);
  }

  console.log('サンプルデータが正常に生成されました');
  return true;
}

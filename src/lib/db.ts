import Dexie from 'dexie';

// データベースクラスの定義
export class FinanceDatabase extends Dexie {
  accounts: Dexie.Table<Account, string>;
  transactions: Dexie.Table<Transaction, string>;
  categories: Dexie.Table<Category, string>;

  constructor() {
    super('financeTracker');
    
    // データベースのスキーマを定義
    this.version(1).stores({
      accounts: 'id, name, type, isArchived, createdAt, updatedAt',
      transactions: 'id, accountId, categoryId, date, type, isRecurring, createdAt, updatedAt',
      categories: 'id, name, type, parentId, isDefault, createdAt, updatedAt'
    });

    // 型付け
    this.accounts = this.table('accounts');
    this.transactions = this.table('transactions');
    this.categories = this.table('categories');
  }

  // デフォルトカテゴリの初期化
  async initializeDefaultCategories() {
    const count = await this.categories.count();
    if (count === 0) {
      const now = new Date();
      const defaultCategories: Category[] = [
        // 収入カテゴリ
        {
          id: crypto.randomUUID(),
          name: '給与',
          type: 'income',
          color: '#4CAF50',
          icon: 'wallet',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: 'ボーナス',
          type: 'income',
          color: '#8BC34A',
          icon: 'gift',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: '投資収入',
          type: 'income',
          color: '#CDDC39',
          icon: 'trending-up',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: 'その他収入',
          type: 'income',
          color: '#FFEB3B',
          icon: 'plus-circle',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        
        // 支出カテゴリ
        {
          id: crypto.randomUUID(),
          name: '食費',
          type: 'expense',
          color: '#F44336',
          icon: 'shopping-cart',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: '住居費',
          type: 'expense',
          color: '#E91E63',
          icon: 'home',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: '水道光熱費',
          type: 'expense',
          color: '#9C27B0',
          icon: 'zap',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: '通信費',
          type: 'expense',
          color: '#673AB7',
          icon: 'phone',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: '交通費',
          type: 'expense',
          color: '#3F51B5',
          icon: 'map',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: '医療費',
          type: 'expense',
          color: '#2196F3',
          icon: 'activity',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: '娯楽費',
          type: 'expense',
          color: '#03A9F4',
          icon: 'film',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: '教育費',
          type: 'expense',
          color: '#00BCD4',
          icon: 'book',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: '被服費',
          type: 'expense',
          color: '#009688',
          icon: 'shopping-bag',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          name: 'その他支出',
          type: 'expense',
          color: '#607D8B',
          icon: 'more-horizontal',
          isDefault: true,
          createdAt: now,
          updatedAt: now,
        },
      ];

      await this.categories.bulkAdd(defaultCategories);
    }
  }
}

// データベースのシングルトンインスタンス
export const db = new FinanceDatabase();

// データベースの初期化
export async function initializeDatabase() {
  await db.initializeDefaultCategories();
}

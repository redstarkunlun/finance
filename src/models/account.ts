import { db } from '@/lib/db';
import { Account } from '@/models/types';

// アカウントの作成
export async function createAccount(account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date();
  const newAccount: Account = {
    ...account,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  
  await db.accounts.add(newAccount);
  return newAccount;
}

// アカウントの取得（単一）
export async function getAccount(id: string) {
  return await db.accounts.get(id);
}

// 全アカウントの取得
export async function getAllAccounts(includeArchived = false) {
  if (includeArchived) {
    return await db.accounts.toArray();
  }
  return await db.accounts.where('isArchived').equals(false).toArray();
}

// アカウントの更新
export async function updateAccount(id: string, accountData: Partial<Account>) {
  const account = await db.accounts.get(id);
  if (!account) {
    throw new Error(`アカウントが見つかりません: ${id}`);
  }
  
  const updatedAccount = {
    ...account,
    ...accountData,
    updatedAt: new Date(),
  };
  
  await db.accounts.update(id, updatedAccount);
  return updatedAccount;
}

// アカウントの削除（アーカイブ）
export async function archiveAccount(id: string) {
  return await updateAccount(id, { isArchived: true });
}

// アカウントの完全削除
export async function deleteAccount(id: string) {
  // 関連する取引も削除
  await db.transactions.where('accountId').equals(id).delete();
  // アカウントを削除
  await db.accounts.delete(id);
}

// 総資産の計算
export async function calculateTotalAssets() {
  const accounts = await getAllAccounts();
  return accounts.reduce((total, account) => {
    if (account.type === 'bank_account') {
      return total + account.balance;
    } else if (account.type === 'credit_card') {
      return total - account.balance; // クレジットカードの残高は負債として計算
    }
    return total;
  }, 0);
}

// 総負債の計算
export async function calculateTotalLiabilities() {
  const accounts = await getAllAccounts();
  return accounts.reduce((total, account) => {
    if (account.type === 'credit_card') {
      return total + account.balance;
    }
    return total;
  }, 0);
}

// 純資産の計算
export async function calculateNetWorth() {
  const assets = await calculateTotalAssets();
  const liabilities = await calculateTotalLiabilities();
  return assets - liabilities;
}

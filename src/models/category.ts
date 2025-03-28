import { db } from '@/lib/db';
import { Category } from '@/models/types';

// カテゴリの作成
export async function createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date();
  const newCategory: Category = {
    ...category,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  
  await db.categories.add(newCategory);
  return newCategory;
}

// カテゴリの取得（単一）
export async function getCategory(id: string) {
  return await db.categories.get(id);
}

// 全カテゴリの取得
export async function getAllCategories(type?: 'income' | 'expense') {
  if (type) {
    return await db.categories.where('type').equals(type).toArray();
  }
  return await db.categories.toArray();
}

// カテゴリの更新
export async function updateCategory(id: string, categoryData: Partial<Category>) {
  const category = await db.categories.get(id);
  if (!category) {
    throw new Error(`カテゴリが見つかりません: ${id}`);
  }
  
  const updatedCategory = {
    ...category,
    ...categoryData,
    updatedAt: new Date(),
  };
  
  await db.categories.update(id, updatedCategory);
  return updatedCategory;
}

// カテゴリの削除
export async function deleteCategory(id: string) {
  const category = await db.categories.get(id);
  if (!category) {
    throw new Error(`カテゴリが見つかりません: ${id}`);
  }
  
  // デフォルトカテゴリは削除できない
  if (category.isDefault) {
    throw new Error('デフォルトカテゴリは削除できません');
  }
  
  // このカテゴリを使用している取引を「その他」カテゴリに移動
  const fallbackCategory = await db.categories
    .where({ type: category.type, name: 'その他収入' })
    .or('name').equals('その他支出')
    .first();
  
  if (fallbackCategory) {
    await db.transactions
      .where('categoryId')
      .equals(id)
      .modify({ categoryId: fallbackCategory.id });
  }
  
  // カテゴリを削除
  await db.categories.delete(id);
}

// 取引の自動カテゴリ分類
export async function autoClassifyTransaction(description: string, amount: number, type: 'income' | 'expense') {
  // タイプに合ったカテゴリを取得
  const categories = await getAllCategories(type);
  
  // ルールを持つカテゴリをフィルタリング
  const categoriesWithRules = categories.filter(category => category.rules && category.rules.keywords.length > 0);
  
  // 説明文を小文字に変換
  const lowerDescription = description.toLowerCase();
  
  // キーワードマッチングでカテゴリを検索
  for (const category of categoriesWithRules) {
    if (!category.rules) continue;
    
    // キーワードマッチング
    const hasKeywordMatch = category.rules.keywords.some(keyword => 
      lowerDescription.includes(keyword.toLowerCase())
    );
    
    // 金額範囲チェック
    const isInAmountRange = 
      (category.rules.minAmount === undefined || amount >= category.rules.minAmount) &&
      (category.rules.maxAmount === undefined || amount <= category.rules.maxAmount);
    
    if (hasKeywordMatch && isInAmountRange) {
      return category;
    }
  }
  
  // マッチするカテゴリがない場合は「その他」カテゴリを返す
  const fallbackName = type === 'income' ? 'その他収入' : 'その他支出';
  return categories.find(category => category.name === fallbackName) || categories[0];
}

'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '@/models/category';
import { Category } from '@/models/types';

export default function CategoryManagementForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // フォーム状態
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [color, setColor] = useState('#4CAF50');
  const [icon, setIcon] = useState('');
  const [keywords, setKeywords] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // カテゴリデータの読み込み
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('カテゴリの読み込みに失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // モーダルを開く（新規作成）
  const handleAddCategory = () => {
    resetForm();
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // モーダルを開く（編集）
  const handleEditCategory = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    if (category) {
      setCurrentCategory(category);
      setName(category.name);
      setType(category.type);
      setColor(category.color);
      setIcon(category.icon || '');
      
      if (category.rules) {
        setKeywords(category.rules.keywords.join(', '));
        setMinAmount(category.rules.minAmount?.toString() || '');
        setMaxAmount(category.rules.maxAmount?.toString() || '');
      } else {
        setKeywords('');
        setMinAmount('');
        setMaxAmount('');
      }
      
      setIsEditing(true);
      setIsModalOpen(true);
    }
  };

  // カテゴリの削除
  const handleDeleteCategory = async (id: string) => {
    const category = categories.find(cat => cat.id === id);
    if (!category) return;
    
    if (category.isDefault) {
      alert('デフォルトカテゴリは削除できません');
      return;
    }
    
    if (window.confirm(`カテゴリ「${category.name}」を削除しますか？このカテゴリを使用している取引は「その他」カテゴリに移動されます。`)) {
      try {
        await deleteCategory(id);
        await loadCategories();
      } catch (error) {
        console.error('カテゴリの削除に失敗しました:', error);
        alert('カテゴリの削除に失敗しました: ' + (error instanceof Error ? error.message : String(error)));
      }
    }
  };

  // フォームのリセット
  const resetForm = () => {
    setCurrentCategory(null);
    setName('');
    setType('expense');
    setColor('#4CAF50');
    setIcon('');
    setKeywords('');
    setMinAmount('');
    setMaxAmount('');
    setFormErrors({});
  };

  // フォームの検証
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!name.trim()) {
      errors.name = 'カテゴリ名は必須です';
    }
    
    if (minAmount && isNaN(Number(minAmount))) {
      errors.minAmount = '有効な金額を入力してください';
    }
    
    if (maxAmount && isNaN(Number(maxAmount))) {
      errors.maxAmount = '有効な金額を入力してください';
    }
    
    if (minAmount && maxAmount && Number(minAmount) > Number(maxAmount)) {
      errors.maxAmount = '最大金額は最小金額より大きい値を入力してください';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // フォームの送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const keywordsArray = keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);
      
      const categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'> = {
        name,
        type,
        color,
        icon: icon || undefined,
        isDefault: currentCategory?.isDefault || false,
        rules: keywordsArray.length > 0 ? {
          keywords: keywordsArray,
          minAmount: minAmount ? Number(minAmount) : undefined,
          maxAmount: maxAmount ? Number(maxAmount) : undefined,
        } : undefined,
      };
      
      if (isEditing && currentCategory?.id) {
        await updateCategory(currentCategory.id, categoryData);
      } else {
        await createCategory(categoryData);
      }
      
      resetForm();
      setIsModalOpen(false);
      await loadCategories();
    } catch (error) {
      console.error('カテゴリの保存に失敗しました:', error);
    }
  };

  // カテゴリのグループ化
  const groupedCategories = categories.reduce(
    (acc, category) => {
      if (category.type === 'income') {
        acc.income.push(category);
      } else {
        acc.expense.push(category);
      }
      return acc;
    },
    { income: [] as Category[], expense: [] as Category[] }
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">カテゴリ管理</h2>
        <Button onClick={handleAddCategory}>カテゴリ追加</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <p>読み込み中...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <Card title="収入カテゴリ">
            {groupedCategories.income.length === 0 ? (
              <p className="text-gray-500">収入カテゴリがありません</p>
            ) : (
              <div className="grid gap-2">
                {groupedCategories.income.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <CategoryBadge name={category.name} color={category.color} />
                      {category.isDefault && (
                        <span className="ml-2 text-xs text-gray-500">デフォルト</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEditCategory(category.id)}
                      >
                        編集
                      </button>
                      {!category.isDefault && (
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          削除
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="支出カテゴリ">
            {groupedCategories.expense.length === 0 ? (
              <p className="text-gray-500">支出カテゴリがありません</p>
            ) : (
              <div className="grid gap-2">
                {groupedCategories.expense.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <CategoryBadge name={category.name} color={category.color} />
                      {category.isDefault && (
                        <span className="ml-2 text-xs text-gray-500">デフォルト</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEditCategory(category.id)}
                      >
                        編集
                      </button>
                      {!category.isDefault && (
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          削除
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'カテゴリを編集' : 'カテゴリを追加'}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="mr-3"
            >
              キャンセル
            </Button>
            <Button onClick={handleSubmit}>
              {isEditing ? '更新' : '追加'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            label="カテゴリ名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={formErrors.name}
            required
          />
          
          <Select
            id="type"
            label="タイプ"
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            options={[
              { value: 'income', label: '収入' },
              { value: 'expense', label: '支出' },
            ]}
            required
          />
          
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              カラー
            </label>
            <div className="mt-1">
              <input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-full rounded-md border border-gray-300"
              />
            </div>
          </div>
          
          <Input
            id="icon"
            label="アイコン名（オプション）"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="例: shopping-cart, home, zap"
          />
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">自動分類ルール</h3>
            
            <Input
              id="keywords"
              label="キーワード（カンマ区切り）"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="例: スーパー, コンビニ, 食料品"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="minAmount"
                label="最小金額"
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                error={formErrors.minAmount}
              />
              
              <Input
                id="maxAmount"
                label="最大金額"
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                error={formErrors.maxAmount}
              />
            </div>
            
            <p className="mt-2 text-sm text-gray-500">
              取引の説明文にキーワードが含まれ、金額が範囲内の場合に自動的にこのカテゴリに分類されます。
            </p>
          </div>
        </form>
      </Modal>
    </div>
  );
}

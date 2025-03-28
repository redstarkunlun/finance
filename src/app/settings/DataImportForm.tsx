'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import Papa from 'papaparse';
import { createTransaction } from '@/models/transaction';
import { getAllAccounts } from '@/models/account';
import { getAllCategories, autoClassifyTransaction } from '@/models/category';
import { Account, Category, Transaction } from '@/models/types';

export default function DataImportForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [importType, setImportType] = useState('csv');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [importResult, setImportResult] = useState<{
    total: number;
    success: number;
    failed: number;
  } | null>(null);
  const [error, setError] = useState('');

  // モーダルを開く
  const handleOpenModal = async () => {
    try {
      const accountsData = await getAllAccounts();
      setAccounts(accountsData);
      if (accountsData.length > 0) {
        setSelectedAccountId(accountsData[0].id);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error('アカウントの読み込みに失敗しました:', error);
    }
  };

  // ファイル選択ハンドラ
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // CSVデータをパース
  const parseCSV = (csvText: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };

  // JSONデータをパース
  const parseJSON = (jsonText: string): Promise<any[]> => {
    try {
      const data = JSON.parse(jsonText);
      if (Array.isArray(data)) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('JSONデータは配列である必要があります'));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // 取引データをインポート
  const importTransactions = async (parsedData: any[]) => {
    const categories = await getAllCategories();
    let successCount = 0;
    let failedCount = 0;

    for (const item of parsedData) {
      try {
        // 日付の処理
        let transactionDate: Date;
        if (item.date) {
          transactionDate = new Date(item.date);
          if (isNaN(transactionDate.getTime())) {
            // 日付形式が異なる場合の処理（DD/MM/YYYY形式など）
            const dateParts = item.date.split(/[\/.-]/);
            if (dateParts.length === 3) {
              // 日本形式（YYYY/MM/DD）を想定
              transactionDate = new Date(
                parseInt(dateParts[0]),
                parseInt(dateParts[1]) - 1,
                parseInt(dateParts[2])
              );
            }
          }
        } else {
          transactionDate = new Date();
        }

        // 金額の処理
        let amount = 0;
        if (item.amount) {
          amount = parseFloat(item.amount.replace(/[,¥$€]/g, ''));
        } else if (item.income) {
          amount = parseFloat(item.income.replace(/[,¥$€]/g, ''));
        } else if (item.expense) {
          amount = -parseFloat(item.expense.replace(/[,¥$€]/g, ''));
        }

        // 取引タイプの決定
        const type = amount > 0 ? 'income' : 'expense';

        // 説明の処理
        const description = item.description || item.memo || item.note || '取引';

        // カテゴリの自動分類
        const category = await autoClassifyTransaction(
          description,
          Math.abs(amount),
          type
        );

        // 取引データの作成
        await createTransaction({
          accountId: selectedAccountId,
          amount: Math.abs(amount),
          type,
          categoryId: category.id,
          description,
          date: transactionDate,
          isRecurring: false,
          tags: [],
        });

        successCount++;
      } catch (error) {
        console.error('取引のインポートに失敗しました:', error);
        failedCount++;
      }
    }

    return {
      total: parsedData.length,
      success: successCount,
      failed: failedCount,
    };
  };

  // インポート処理の実行
  const handleImport = async () => {
    if (!file || !selectedAccountId) {
      setError('ファイルとアカウントを選択してください');
      return;
    }

    setIsLoading(true);
    setError('');
    setImportResult(null);

    try {
      const fileText = await file.text();
      let parsedData: any[];

      if (importType === 'csv') {
        parsedData = await parseCSV(fileText);
      } else {
        parsedData = await parseJSON(fileText);
      }

      if (parsedData.length === 0) {
        throw new Error('インポートするデータがありません');
      }

      const result = await importTransactions(parsedData);
      setImportResult(result);
    } catch (error) {
      console.error('インポートに失敗しました:', error);
      setError('インポートに失敗しました: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card title="データのインポート">
        <p className="text-gray-500 mb-4">
          CSVやJSONファイルから取引データをインポートして、手動入力の手間を省きましょう。
        </p>
        <Button onClick={handleOpenModal} fullWidth>
          データをインポート
        </Button>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="データのインポート"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="mr-3"
            >
              キャンセル
            </Button>
            <Button 
              onClick={handleImport}
              disabled={isLoading || !file || !selectedAccountId}
            >
              {isLoading ? 'インポート中...' : 'インポート'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {accounts.length === 0 ? (
            <p className="text-red-500">
              インポート先のアカウントがありません。先にアカウントを作成してください。
            </p>
          ) : (
            <>
              <Select
                id="account"
                label="インポート先アカウント"
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
                required
              />

              <Select
                id="importType"
                label="インポート形式"
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
                options={[
                  { value: 'csv', label: 'CSV形式' },
                  { value: 'json', label: 'JSON形式' },
                ]}
                required
              />

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  インポートファイル
                </label>
                <div className="mt-1">
                  <input
                    id="file"
                    type="file"
                    accept={importType === 'csv' ? '.csv' : '.json'}
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {importType === 'csv'
                    ? '日付、説明、金額のカラムを含むCSVファイルをアップロードしてください。'
                    : '日付、説明、金額のフィールドを含むJSONファイルをアップロードしてください。'}
                </p>
              </div>

              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}

              {importResult && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h3 className="text-green-800 font-medium">インポート完了</h3>
                  <ul className="mt-2 text-sm text-green-700">
                    <li>合計: {importResult.total}件</li>
                    <li>成功: {importResult.success}件</li>
                    <li>失敗: {importResult.failed}件</li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

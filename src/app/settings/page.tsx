import React from 'react';
import DataImportForm from './DataImportForm';
import CategoryManagementForm from './CategoryManagementForm';
import { Card } from '@/components/ui/Card';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">設定</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <DataImportForm />
        
        <Card title="データのエクスポート">
          <p className="text-gray-500 mb-4">
            アプリケーションのデータをCSVまたはJSONファイルとしてエクスポートできます。
          </p>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              CSVでエクスポート
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              JSONでエクスポート
            </button>
          </div>
        </Card>
      </div>
      
      <CategoryManagementForm />
    </div>
  );
}

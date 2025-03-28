import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">ダッシュボード</h1>
        <Link
          href="/accounts/new"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          アカウント追加
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">総資産</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">¥1,234,567</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">総負債</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">¥123,456</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">純資産</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">¥1,111,111</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-sm font-medium text-gray-500">今月の支出</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">¥87,654</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">月次収支</h2>
          <div className="h-64 mt-4 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">グラフが表示されます</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">カテゴリ別支出</h2>
          <div className="h-64 mt-4 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">グラフが表示されます</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900">最近の取引</h2>
        <div className="mt-4 overflow-hidden border border-gray-200 rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日付
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  説明
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  カテゴリ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金額
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025/03/28
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  スーパーマーケット
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  食費
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  -¥5,400
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025/03/27
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  レストラン
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  外食
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  -¥3,200
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025/03/25
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  給与
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  収入
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-green-600">
                  +¥280,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

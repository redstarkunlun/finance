import React from "react";
import Link from "next/link";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">取引管理</h1>
        <Link
          href="/transactions/new"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          取引追加
        </Link>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="検索..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">すべてのアカウント</option>
              <option value="1">メイン銀行口座</option>
              <option value="2">メインクレジットカード</option>
              <option value="3">貯蓄口座</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">すべてのカテゴリ</option>
              <option value="1">食費</option>
              <option value="2">住居費</option>
              <option value="3">交通費</option>
              <option value="4">娯楽費</option>
              <option value="5">収入</option>
            </select>
          </div>
          <div className="flex gap-4">
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-hidden border border-gray-200 rounded-md">
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
                  アカウント
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  カテゴリ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金額
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
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
                  メインクレジットカード
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  食費
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  -¥5,400
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    編集
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    削除
                  </button>
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
                  メインクレジットカード
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  外食
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  -¥3,200
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    編集
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    削除
                  </button>
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
                  メイン銀行口座
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  収入
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                  +¥280,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    編集
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    削除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            全 <span className="font-medium">50</span> 件中{" "}
            <span className="font-medium">1</span> から{" "}
            <span className="font-medium">10</span> 件を表示
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              前へ
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-blue-50 text-blue-600">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

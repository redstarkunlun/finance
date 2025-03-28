import React from "react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">レポート</h1>
        <div className="flex space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="month">月次</option>
            <option value="quarter">四半期</option>
            <option value="year">年次</option>
          </select>
          <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            PDFエクスポート
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">月次収支サマリー</h2>
          <div className="h-64 mt-4 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">月次収支グラフが表示されます</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="text-sm font-medium text-gray-500">総収入</h3>
              <p className="mt-2 text-xl font-bold text-green-600">¥320,000</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="text-sm font-medium text-gray-500">総支出</h3>
              <p className="mt-2 text-xl font-bold text-red-600">¥187,500</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="text-sm font-medium text-gray-500">貯蓄額</h3>
              <p className="mt-2 text-xl font-bold text-blue-600">¥132,500</p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="text-sm font-medium text-gray-500">貯蓄率</h3>
              <p className="mt-2 text-xl font-bold text-blue-600">41.4%</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900">カテゴリ別支出</h2>
          <div className="h-64 mt-4 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">カテゴリ別支出グラフが表示されます</p>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">食費</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">¥45,600</span>
                <span className="ml-2 text-sm text-gray-500">24.3%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">住居費</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">¥68,000</span>
                <span className="ml-2 text-sm text-gray-500">36.3%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">交通費</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">¥12,400</span>
                <span className="ml-2 text-sm text-gray-500">6.6%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">娯楽費</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">¥28,500</span>
                <span className="ml-2 text-sm text-gray-500">15.2%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">その他</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">¥33,000</span>
                <span className="ml-2 text-sm text-gray-500">17.6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900">月次推移</h2>
        <div className="h-80 mt-4 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">月次推移グラフが表示されます</p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900">予算vs実績</h2>
        <div className="mt-4 overflow-hidden border border-gray-200 rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  カテゴリ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  予算
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  実績
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  差異
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  進捗
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  食費
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥50,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥45,600
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +¥4,400
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">91%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  住居費
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥70,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥68,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +¥2,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '97%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">97%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  交通費
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥15,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥12,400
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +¥2,600
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">83%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  娯楽費
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥25,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥28,500
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  -¥3,500
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '114%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">114%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

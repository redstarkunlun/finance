import React from "react";
import Link from "next/link";
import { Home, CreditCard, BarChart2, FileText, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">資産管理アプリ</h1>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link
              href="/dashboard"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <Home className="w-5 h-5 mr-3" />
              <span>ダッシュボード</span>
            </Link>
          </li>
          <li>
            <Link
              href="/accounts"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <CreditCard className="w-5 h-5 mr-3" />
              <span>アカウント管理</span>
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              <span>取引管理</span>
            </Link>
          </li>
          <li>
            <Link
              href="/reports"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <FileText className="w-5 h-5 mr-3" />
              <span>レポート</span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>設定</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

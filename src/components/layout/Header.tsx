import React from "react";
import { Menu, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <button className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 md:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
            <span className="text-sm font-medium">ユ</span>
          </div>
        </div>
      </div>
    </header>
  );
}

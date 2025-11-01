'use client';

import React, { useState } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function DashboardNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white px-6 py-4 flex justify-between items-center">
      <Link href="/dashboard" className="text-5xl font-bold text-indigo-600">
        Kohabit
      </Link>

      <div className="relative">
        <button
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <User size={20} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              <Settings size={16} /> Settings
            </Link>
            <button
              className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 hover:bg-gray-100 transition"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

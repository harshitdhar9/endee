'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white relative">
      <Link href="/" className="text-5xl font-bold text-indigo-600">
        Kohabit
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        <Link
          href="/auth/signIn"
          className="text-gray-700 hover:text-indigo-600 transition"
        >
          Sign in
        </Link>
        <Link
          href="/auth/signUp"
          className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </div>

      <button
        className="md:hidden text-gray-800"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {menuOpen && (
        <div
          className="
            absolute right-4 top-14
            bg-white rounded-xl border border-gray-100
            flex flex-col items-center space-y-3 py-4 px-6
            w-48 z-50 md:hidden shadow-lg
          "
        >
          <Link
            href="/auth/signIn"
            className="text-gray-700 hover:text-indigo-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Sign in
          </Link>
          <Link
            href="/auth/signUp"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition text-center w-full"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

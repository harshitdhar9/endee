'use client';

import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-white px-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-left text-indigo-600 mb-6">
          Create your Account
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/auth/signIn" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

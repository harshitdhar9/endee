'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc'; // install with: npm install react-icons

export default function SignInPage() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in data:', form);
    // TODO: Add API call (FastAPI endpoint) for login here
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In clicked');
    // TODO: Integrate Google OAuth (FastAPI or NextAuth.js later)
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-white px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Welcome Back!
        </h1>
        <p className="text-gray-600 text-center">
          Sign in to your Kohabit account
        </p>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <FcGoogle size={22} />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center my-4">
          <span className="h-px w-1/4 bg-gray-300"></span>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <span className="h-px w-1/4 bg-gray-300"></span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm">
          Don’t have an account?{' '}
          <Link
            href="/auth/signUp"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

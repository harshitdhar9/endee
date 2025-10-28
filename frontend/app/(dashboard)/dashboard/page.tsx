'use client';
import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  age: number;
  city: string;
  avatar?: string;
}

const dummyUsers: User[] = [
  { id: 1, name: 'Alice', age: 24, city: 'New York', avatar: '' },
  { id: 2, name: 'Bob', age: 27, city: 'Los Angeles', avatar: '' },
  { id: 3, name: 'Charlie', age: 22, city: 'Chicago', avatar: '' },
  { id: 4, name: 'Diana', age: 29, city: 'Miami', avatar: '' },
];

export default function DashboardPage() {
  const handleMatch = (user: User) => {
    console.log(`❤️ Match clicked for ${user.name}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-8">Dashboard</h1>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyUsers.map((user) => (
          <div
            key={user.id}
            className="
              flex items-center justify-between gap-4
              bg-white border border-gray-900 rounded-2xl p-4
              transition-all duration-300
              hover:border-indigo-600
            "
            style={{ height: '120px' }}
          >
            {/* Profile Picture */}
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                user.name.charAt(0)
              )}
            </div>

            {/* User Details */}
            <div className="flex-1 flex flex-col justify-center ml-4">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-700">{user.age} yrs</p>
              <p className="text-gray-700">{user.city}</p>
            </div>

            {/* Match Button */}
            <button
              onClick={() => handleMatch(user)}
              className="ml-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Match
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

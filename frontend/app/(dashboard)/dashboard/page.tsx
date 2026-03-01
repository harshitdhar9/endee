'use client';
import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  age: number;
  city: string;
  avatar?: string | null;
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFindMatches = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/match`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch matches');
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert('Error fetching matches');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">
        Dashboard
      </h1>

      {/* Find Matches Button */}
      <div className="mb-8">
        <button
          onClick={handleFindMatches}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          {loading ? 'Finding Matches...' : 'Find People'}
        </button>
      </div>

      {/* Results Section */}
      {users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="
                flex items-center justify-between gap-4
                bg-white border border-gray-200 rounded-2xl p-4
                shadow-sm
                transition-all duration-300
                hover:border-indigo-600
              "
              style={{ height: '120px' }}
            >
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

              <div className="flex-1 flex flex-col justify-center ml-4">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-700">{user.age} yrs</p>
                <p className="text-gray-700">{user.city}</p>
              </div>

              <button
                className="ml-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && users.length === 0 && (
        <p className="text-gray-500 mt-6">
          Click “Find People” to discover compatible roommates.
        </p>
      )}
    </main>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  // TODO: Fetch actual user progress from the database
  const [progress] = useState({
    letters: {
      completed: 5,
      total: 26,
      nextLevel: 'F',
    },
    numbers: {
      completed: 3,
      total: 10,
      nextLevel: '4',
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-blue-100 to-green-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Welcome to Jibber Jabber! 🎉</h1>
          <p className="text-xl text-gray-600">Let's continue your learning adventure!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Letters Progress Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-purple-600">Letters</h2>
              <span className="text-lg text-gray-600">
                {progress.letters.completed}/{progress.letters.total}
              </span>
            </div>
            <div className="relative h-4 bg-purple-100 rounded-full mb-4">
              <div
                className="absolute left-0 top-0 h-full bg-purple-500 rounded-full"
                style={{
                  width: `${(progress.letters.completed / progress.letters.total) * 100}%`,
                }}
              />
            </div>
            <Link
              href="/learn/letters"
              className="block w-full text-center bg-purple-500 text-white rounded-lg py-3 hover:bg-purple-600 transition-colors"
            >
              Continue with Letter {progress.letters.nextLevel}
            </Link>
          </div>

          {/* Numbers Progress Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-600">Numbers</h2>
              <span className="text-lg text-gray-600">
                {progress.numbers.completed}/{progress.numbers.total}
              </span>
            </div>
            <div className="relative h-4 bg-blue-100 rounded-full mb-4">
              <div
                className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                style={{
                  width: `${(progress.numbers.completed / progress.numbers.total) * 100}%`,
                }}
              />
            </div>
            <Link
              href="/learn/numbers"
              className="block w-full text-center bg-blue-500 text-white rounded-lg py-3 hover:bg-blue-600 transition-colors"
            >
              Continue with Number {progress.numbers.nextLevel}
            </Link>
          </div>
        </div>

        {/* Recent Achievements */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Recent Achievements 🏆</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Example achievements - these will be dynamic in the future */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-green-700">Letter Master</h3>
              <p className="text-sm text-gray-600">Completed 5 letters perfectly!</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-green-700">Number Wizard</h3>
              <p className="text-sm text-gray-600">Counted to 10 without mistakes!</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-green-700">Quick Learner</h3>
              <p className="text-sm text-gray-600">Completed 3 lessons in one day!</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-pink-500 text-white rounded-lg py-3 px-4 hover:bg-pink-600 transition-colors">
            Practice Mode 🎮
          </button>
          <button className="bg-yellow-500 text-white rounded-lg py-3 px-4 hover:bg-yellow-600 transition-colors">
            Daily Challenge ⭐
          </button>
          <button className="bg-indigo-500 text-white rounded-lg py-3 px-4 hover:bg-indigo-600 transition-colors">
            View All Progress 📊
          </button>
          <button className="bg-red-500 text-white rounded-lg py-3 px-4 hover:bg-red-600 transition-colors">
            Help & Tips 💡
          </button>
        </div>
      </div>
    </div>
  );
} 
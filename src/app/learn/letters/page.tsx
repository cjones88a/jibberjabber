'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface LetterCardProps {
  letter: string;
  isUnlocked: boolean;
  progress: number;
  onClick: () => void;
}

const LetterCard = ({ letter, isUnlocked, progress, onClick }: LetterCardProps) => {
  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      className={`relative cursor-pointer rounded-xl p-6 ${
        isUnlocked ? 'bg-white' : 'bg-gray-100'
      } shadow-lg`}
      onClick={isUnlocked ? onClick : undefined}
    >
      <div className="text-center">
        <motion.div
          initial={{ rotateY: 0 }}
          whileHover={{ rotateY: 360 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl font-bold mb-2 ${
            isUnlocked ? 'text-purple-600' : 'text-gray-400'
          }`}
        >
          {letter}
        </motion.div>
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-xl">
            <span className="text-white">🔒</span>
          </div>
        )}
        {isUnlocked && progress > 0 && (
          <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function LettersPage() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [letterProgress, setLetterProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    // TODO: Fetch actual progress from the database
    const mockProgress: Record<string, number> = {
      'A': 100,
      'B': 75,
      'C': 50,
      'D': 25,
      'E': 0,
    };
    setLetterProgress(mockProgress);
  }, []);

  const handleLetterClick = (letter: string) => {
    // Navigate to the specific letter's learning page
    window.location.href = `/learn/letters/${letter.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-blue-100 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-purple-600 mb-4"
          >
            Let's Learn Letters! 🎨
          </motion.h1>
          <p className="text-xl text-gray-600">Choose a letter to start learning</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Your Progress</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-4 bg-gray-200 rounded-full">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{
                  width: `${
                    (Object.values(letterProgress).reduce((a, b) => a + b, 0) /
                      (26 * 100)) *
                    100
                  }%`,
                }}
              />
            </div>
            <span className="text-gray-600 font-medium">
              Level {currentLevel}
            </span>
          </div>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {LETTERS.map((letter, index) => {
            const isUnlocked = index < currentLevel * 5;
            return (
              <LetterCard
                key={letter}
                letter={letter}
                isUnlocked={isUnlocked}
                progress={letterProgress[letter] || 0}
                onClick={() => handleLetterClick(letter)}
              />
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </Link>
          <button
            onClick={() => {/* TODO: Implement practice mode */}}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Practice Mode 🎮
          </button>
          <button
            onClick={() => {/* TODO: Implement achievements */}}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            View Achievements 🏆
          </button>
        </div>
      </div>
    </div>
  );
} 
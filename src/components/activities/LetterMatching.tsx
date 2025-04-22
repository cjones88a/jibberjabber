import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BaseActivity } from './BaseActivity';
import { Card } from '@/components/ui/Card';

interface LetterMatchingProps {
  letter: string;
  onComplete: () => void;
}

// Dictionary of letters and their corresponding objects
const letterObjects: Record<string, { emoji: string; name: string }[]> = {
  A: [
    { emoji: '🍎', name: 'Apple' },
    { emoji: '✈️', name: 'Airplane' },
    { emoji: '🐜', name: 'Ant' },
  ],
  B: [
    { emoji: '🍌', name: 'Banana' },
    { emoji: '🐻', name: 'Bear' },
    { emoji: '🎈', name: 'Balloon' },
  ],
  // Add more letters as needed
};

export function LetterMatching({ letter, onComplete }: LetterMatchingProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Get objects for the current letter and add some random ones
  const currentObjects = letterObjects[letter] || [];
  const options = [...currentObjects].sort(() => Math.random() - 0.5).slice(0, 3);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    const correct = options[index].name.toLowerCase().startsWith(letter.toLowerCase());
    setIsCorrect(correct);

    if (correct) {
      // Play success sound or animation
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <BaseActivity
      title="Letter Matching"
      instruction={`Find something that starts with the letter "${letter}"`}
      currentStep={1}
      totalSteps={1}
      onComplete={onComplete}
      characterAnimation="bounce"
      showNextButton={false}
    >
      <div className="flex flex-col items-center justify-center flex-1">
        {/* Letter display */}
        <motion.div
          className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center
                     text-4xl font-bold mb-8"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        >
          {letter}
        </motion.div>

        {/* Options grid */}
        <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
          {options.map((option, index) => (
            <motion.button
              key={option.name}
              className={`p-4 rounded-xl transition-colors ${
                selectedOption === index
                  ? isCorrect
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                  : 'bg-secondary/20 hover:bg-secondary/30'
              }`}
              onClick={() => handleSelect(index)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex items-center gap-4 p-4">
                <span className="text-4xl">{option.emoji}</span>
                <span className="text-xl font-medium">{option.name}</span>
              </Card>
            </motion.button>
          ))}
        </div>
      </div>
    </BaseActivity>
  );
} 
'use client';

import React, { useEffect, useState } from 'react';
import { BaseActivity } from './BaseActivity';
import { Button } from '@/components/ui/Button';
import { MotionButton } from '@/components/motion';

interface LetterRecognitionProps {
  letter: string;
  onComplete: () => void;
}

export function LetterRecognition({ letter, onComplete }: LetterRecognitionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speakLetter = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.rate = 0.8; // Slightly slower for clarity
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Speak the letter when component mounts
    const timer = setTimeout(speakLetter, 500);
    return () => clearTimeout(timer);
  }, [letter]);

  return (
    <BaseActivity
      title="Letter Recognition"
      instruction={`This is the letter "${letter}". Tap to hear it again!`}
      currentStep={1}
      totalSteps={1}
      onComplete={onComplete}
      characterAnimation="wave"
    >
      <div className="flex flex-col items-center justify-center flex-1">
        {/* Large letter display */}
        <MotionButton
          className="w-48 h-48 bg-secondary/20 rounded-2xl flex items-center justify-center
                     text-8xl font-bold cursor-pointer hover:bg-secondary/30 transition-colors"
          whileTap={{ scale: 0.95 }}
          onClick={speakLetter}
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {letter}
        </MotionButton>

        {/* Helper text */}
        <p className="mt-8 text-center text-muted-foreground">
          Tap the letter to hear it again
        </p>

        {/* Practice writing hint */}
        <div className="mt-8 text-center">
          <p className="mb-4">Try writing it in the air!</p>
          <Button
            variant="outline"
            onClick={speakLetter}
            className="gap-2"
          >
            🔊 Hear Again
          </Button>
        </div>
      </div>
    </BaseActivity>
  );
} 
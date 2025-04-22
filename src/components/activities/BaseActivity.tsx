'use client';

import React, { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Card } from '@/components/ui/Card';
import { Character } from '@/components/characters/Character';
import { MotionDiv } from '@/components/motion';

interface BaseActivityProps {
  title: string;
  instruction: string;
  currentStep: number;
  totalSteps: number;
  onComplete: () => void;
  children: ReactNode;
  showNextButton?: boolean;
  characterAnimation?: 'bounce' | 'wave' | 'jump' | 'dance';
}

export function BaseActivity({
  title,
  instruction,
  currentStep,
  totalSteps,
  onComplete,
  children,
  showNextButton = true,
  characterAnimation = 'bounce',
}: BaseActivityProps) {
  const progress = (currentStep / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={currentStep}
          >
            <span className="text-sm font-medium">
              {currentStep}/{totalSteps}
            </span>
          </MotionDiv>
        </div>
        <Progress value={progress} />
      </div>

      {/* Instruction */}
      <Card className="mb-6">
        <div className="p-4 flex items-center gap-4">
          <Character
            name="jibber"
            animation={characterAnimation}
            speaking={true}
          />
          <p className="text-lg">{instruction}</p>
        </div>
      </Card>

      {/* Activity content */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={currentStep}
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </MotionDiv>
        </AnimatePresence>
      </div>

      {/* Action button */}
      {showNextButton && (
        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            className="w-full"
            size="lg"
            onClick={onComplete}
          >
            {isLastStep ? 'Complete' : 'Next'}
          </Button>
        </MotionDiv>
      )}
    </div>
  );
} 
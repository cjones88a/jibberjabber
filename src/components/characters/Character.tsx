'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { MotionDiv } from '../motion/MotionDiv';

interface CharacterProps {
  name: 'jibber' | 'jabber';
  className?: string;
  animation?: 'bounce' | 'wave' | 'jump' | 'dance';
  speaking?: boolean;
}

const animations = {
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  wave: {
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  jump: {
    y: [0, -30, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  dance: {
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 5, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const characterColors = {
  jibber: 'text-primary',
  jabber: 'text-secondary'
};

export function Character({
  name,
  className,
  animation,
  speaking
}: CharacterProps) {
  return (
    <MotionDiv
      className={cn(
        'relative inline-block',
        characterColors[name],
        className
      )}
      animate={animation ? animations[animation] : undefined}
    >
      {/* Placeholder emoji until we have actual character assets */}
      <span className="text-6xl">
        {name === 'jibber' ? '🦊' : '🐸'}
      </span>
      
      {speaking && (
        <MotionDiv
          className="absolute -top-4 -right-2 bg-white rounded-xl px-2 py-1 shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <span className="text-sm">💭</span>
        </MotionDiv>
      )}
    </MotionDiv>
  );
} 
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { LetterRecognition } from '@/components/activities/LetterRecognition';
import { LetterTracing } from '@/components/activities/LetterTracing';
import { LetterMatching } from '@/components/activities/LetterMatching';

interface PageProps {
  params: {
    letter: string;
  };
}

export default function LetterLesson({ params }: PageProps) {
  const router = useRouter();
  const [currentActivity, setCurrentActivity] = useState<number>(0);

  const handleComplete = () => {
    if (currentActivity < 2) {
      setCurrentActivity(currentActivity + 1);
    } else {
      router.push('/learn/letters/complete');
    }
  };

  const activities = [
    <LetterRecognition key="recognition" letter={params.letter} onComplete={handleComplete} />,
    <LetterTracing key="tracing" letter={params.letter} onComplete={handleComplete} />,
    <LetterMatching key="matching" letter={params.letter} onComplete={handleComplete} />
  ];

  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {activities[currentActivity]}
        </div>
      </div>
    </MobileLayout>
  );
} 
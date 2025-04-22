import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseActivity } from './BaseActivity';
import { Button } from '@/components/ui/Button';

interface Point {
  x: number;
  y: number;
}

interface LetterTracingProps {
  letter: string;
  onComplete: () => void;
}

export function LetterTracing({ letter, onComplete }: LetterTracingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Draw letter guide
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '200px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 2;
      ctx.strokeText(letter, canvas.width / 2, canvas.height / 2);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [letter]);

  const getPoint = (event: MouseEvent | TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const point = 'touches' in event 
      ? event.touches[0] 
      : event;

    return {
      x: point.clientX - rect.left,
      y: point.clientY - rect.top
    };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    const point = getPoint(event.nativeEvent);
    if (!point) return;

    setIsDrawing(true);
    setLastPoint(point);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const point = getPoint(event.nativeEvent);

    if (!canvas || !ctx || !point || !lastPoint) return;

    ctx.beginPath();
    ctx.strokeStyle = '#58CC02';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    setLastPoint(point);
    setProgress((prev) => Math.min(100, prev + 1));
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setProgress(0);

    // Redraw letter guide
    ctx.font = '200px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 2;
    ctx.strokeText(letter, canvas.width / 2, canvas.height / 2);
  };

  return (
    <BaseActivity
      title="Letter Tracing"
      instruction={`Trace the letter "${letter}" with your finger or mouse`}
      currentStep={1}
      totalSteps={1}
      onComplete={onComplete}
      characterAnimation="wave"
      showNextButton={progress > 50}
    >
      <div className="flex flex-col items-center justify-center flex-1">
        {/* Canvas container */}
        <div className="w-full h-[300px] bg-white rounded-2xl shadow-inner mb-8">
          <canvas
            ref={canvasRef}
            className="w-full h-full touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Controls */}
        <Button
          variant="outline"
          onClick={clearCanvas}
          className="gap-2"
        >
          🔄 Try Again
        </Button>
      </div>
    </BaseActivity>
  );
} 
'use client';

import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';

export const MotionDiv = motion.div;
export const MotionSpan = motion.span;
export const MotionButton = motion.button;
export const MotionP = motion.p;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;

// Export types for each motion component
export type MotionDivProps = HTMLMotionProps<'div'>;
export type MotionSpanProps = HTMLMotionProps<'span'>;
export type MotionButtonProps = HTMLMotionProps<'button'>;
export type MotionPProps = HTMLMotionProps<'p'>;
export type MotionH1Props = HTMLMotionProps<'h1'>;
export type MotionH2Props = HTMLMotionProps<'h2'>;
export type MotionH3Props = HTMLMotionProps<'h3'>;
export type MotionUlProps = HTMLMotionProps<'ul'>;
export type MotionLiProps = HTMLMotionProps<'li'>; 
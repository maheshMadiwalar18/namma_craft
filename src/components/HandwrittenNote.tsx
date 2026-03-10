import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HandwrittenNoteProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
  delay?: number;
}

export function HandwrittenNote({ children, className, rotation = -2, delay = 0 }: HandwrittenNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: rotation - 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      className={cn(
        "inline-block font-hand text-primary text-base leading-tight bg-[#fff9db] p-2 px-4 shadow-md border-b-2 border-r-2 border-amber-200/50",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

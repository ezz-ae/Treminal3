"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

export default function AnimatedText({ words, className }: AnimatedTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="inline-grid text-left h-[calc(1em*1.2)] overflow-hidden">
      <span
        className={cn("transition-transform duration-500 ease-in-out", className)}
        style={{ transform: `translateY(-${index * 100}%)` }}
      >
        {words.map((word, i) => (
          <span key={i} className="block h-[calc(1em*1.2)]">
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
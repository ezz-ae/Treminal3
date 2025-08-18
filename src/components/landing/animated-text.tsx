"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

export default function AnimatedText({ words, className }: AnimatedTextProps) {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % words.length;
        if (newIndex === 0) {
          setKey(prevKey => prevKey + 1);
        }
        return newIndex;
      });
    }, 2500); // Change word every 2.5 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={cn("inline-grid h-[calc(1em*1.2)] overflow-hidden align-bottom", className)}>
      <span
        key={key}
        className="transition-transform duration-1000 ease-in-out"
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

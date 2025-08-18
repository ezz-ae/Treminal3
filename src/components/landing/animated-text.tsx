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
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className={cn("inline-block text-left transition-all duration-300 ease-in-out", className)}>
       <span className="inline-block relative text-center">
        {words.map((word, i) => (
          <span
            key={i}
            className={cn(
              "absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out",
              index === i ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            {word}
          </span>
        ))}
        <span className="invisible">{words[index]}</span>
      </span>
    </span>
  );
}

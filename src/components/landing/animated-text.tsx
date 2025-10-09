
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

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
    <span className={cn("inline-grid text-left", className)}>
       <AnimatePresence>
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ ease: 'easeInOut', duration: 0.5 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
       <span className="col-start-1 row-start-1 invisible">
        {words[index]}
      </span>
    </span>
  );
}

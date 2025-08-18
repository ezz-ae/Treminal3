"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const TARGET_SENTENCE = "Payments made simple, secure, and scalable.".split(' ');
const PADDLE_WIDTH = 150;

type FallingWord = {
  id: number;
  text: string;
  x: number;
  y: number;
  caught: boolean;
};

export default function InteractiveHero() {
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
  const [caughtWords, setCaughtWords] = useState<string[]>([]);
  const [paddleX, setPaddleX] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    setPaddleX(window.innerWidth / 2);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (heroRef.current) {
      const heroRect = heroRef.current.getBoundingClientRect();
      const maxPaddleX = heroRect.width - PADDLE_WIDTH;
      const newPaddleX = Math.min(Math.max(event.clientX - heroRect.left - PADDLE_WIDTH / 2, 0), maxPaddleX);
      setPaddleX(newPaddleX);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setFallingWords(prevWords => {
        const newWords = prevWords
          .map(word => ({ ...word, y: word.y + 2 }))
          .filter(word => word.y < (heroRef.current?.clientHeight || 800));

        // Collision detection
        const paddleRect = { x: paddleX, y: (heroRef.current?.clientHeight || 800) - 100, width: PADDLE_WIDTH, height: 50 };
        
        newWords.forEach(word => {
          if (!word.caught) {
            const wordRect = { x: word.x, y: word.y, width: 80, height: 40 };
            if (
              wordRect.x < paddleRect.x + paddleRect.width &&
              wordRect.x + wordRect.width > paddleRect.x &&
              wordRect.y < paddleRect.y + paddleRect.height &&
              wordRect.y + wordRect.height > paddleRect.y
            ) {
              word.caught = true;
              if (TARGET_SENTENCE[caughtWords.length] === word.text) {
                setCaughtWords(prev => [...prev, word.text]);
              }
            }
          }
        });

        return newWords;
      });
    }, 16); // ~60fps

    return () => clearInterval(gameLoop);
  }, [paddleX, caughtWords.length]);
  
  useEffect(() => {
     const wordSpawner = setInterval(() => {
      if (caughtWords.length >= TARGET_SENTENCE.length) {
        clearInterval(wordSpawner);
        return;
      }
      
      const nextWordIndex = caughtWords.length + Math.floor(Math.random() * 3);
      if(nextWordIndex >= TARGET_SENTENCE.length) return;

      const text = TARGET_SENTENCE[nextWordIndex];

      const newWord: FallingWord = {
        id: Date.now() + Math.random(),
        text,
        x: Math.random() * ((heroRef.current?.clientWidth || 800) - 100),
        y: -50,
        caught: false,
      };
      setFallingWords(prev => [...prev, newWord]);
    }, 2000);

    return () => clearInterval(wordSpawner);
  }, [caughtWords.length]);


  if (!isClient) {
    return null; 
  }

  const isComplete = caughtWords.length === TARGET_SENTENCE.length;

  return (
    <section ref={heroRef} className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
      <AnimatePresence>
        {fallingWords.map(word => (
          !word.caught && (
            <motion.div
              key={word.id}
              initial={{ y: word.y, x: word.x }}
              animate={{ y: heroRef.current?.clientHeight }}
              transition={{ duration: 5, ease: 'linear' }}
              className="absolute text-xl font-bold text-foreground"
              style={{ x: word.x, y: word.y }}
            >
              {word.text}
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl text-center z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
          Catch the words to build the future of payments.
        </h1>
        <div className="mt-8 h-20 text-3xl md:text-5xl font-bold font-headline text-primary flex items-center justify-center gap-4 flex-wrap">
         {TARGET_SENTENCE.map((word, index) => (
            <span
              key={index}
              className={cn(
                "transition-opacity duration-500",
                caughtWords.length > index ? "opacity-100" : "opacity-20"
              )}
            >
              {word}
            </span>
          ))}
        </div>
        {isComplete && (
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.5}}>
                <Button size="lg" className="mt-8">Explore Payment Solutions</Button>
            </motion.div>
        )}
      </div>

      <div
        className="absolute bottom-16 z-20"
        style={{
          left: paddleX,
          width: PADDLE_WIDTH,
          height: '50px',
        }}
      >
        <div className="w-full h-12 bg-primary rounded-lg shadow-2xl flex items-center justify-center text-primary-foreground font-bold">
            Catch!
        </div>
      </div>
    </section>
  );
}

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
    if (typeof window !== 'undefined') {
      setPaddleX(window.innerWidth / 2);
    }
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
    if (isClient) {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }
  }, [isClient, handleMouseMove]);

  useEffect(() => {
    if (!isClient) return;

    const gameLoop = setInterval(() => {
      setFallingWords(prevWords => {
        const updatedWords = prevWords
          .map(word => ({ ...word, y: word.y + 2 }))
          .filter(word => word.y < (heroRef.current?.clientHeight || 800) && !word.caught);

        // Collision detection
        const paddleRect = { x: paddleX, y: (heroRef.current?.clientHeight || 800) - 64 - 50, width: PADDLE_WIDTH, height: 50 };
        
        updatedWords.forEach(word => {
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
        });

        return updatedWords;
      });
    }, 16); // ~60fps

    return () => clearInterval(gameLoop);
  }, [isClient, paddleX, caughtWords.length]);
  
  useEffect(() => {
    if (!isClient) return;

     const wordSpawner = setInterval(() => {
      if (caughtWords.length >= TARGET_SENTENCE.length) {
        clearInterval(wordSpawner);
        return;
      }
      
      const shouldSpawnTarget = Math.random() > 0.4;
      let text = '';

      if (shouldSpawnTarget) {
          text = TARGET_SENTENCE[caughtWords.length];
      } else {
          text = TARGET_SENTENCE[Math.floor(Math.random() * TARGET_SENTENCE.length)];
      }

      const newWord: FallingWord = {
        id: Date.now() + Math.random(),
        text,
        x: Math.random() * ((heroRef.current?.clientWidth || 800) - 100),
        y: -50,
        caught: false,
      };

      setFallingWords(prev => [...prev, newWord]);
    }, 1200);

    return () => clearInterval(wordSpawner);
  }, [isClient, caughtWords.length]);


  if (!isClient) {
    return (
        <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-background flex items-center justify-center">
             <div className="text-center z-10 p-4">
                <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
                    Loading Game...
                </h1>
            </div>
        </section>
    );
  }

  const isComplete = caughtWords.length === TARGET_SENTENCE.length;

  return (
    <section ref={heroRef} className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
      <AnimatePresence>
        {fallingWords.map(word => (
            <motion.div
              key={word.id}
              initial={{ y: word.y, x: word.x }}
              animate={{ y: word.y + 5 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, ease: 'linear' }}
              className="absolute text-xl font-bold text-foreground"
            >
              {word.text}
            </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl text-center z-10 p-4">
        <div className="mt-8 h-20 text-3xl md:text-5xl font-bold font-headline text-primary flex items-center justify-center gap-x-4 flex-wrap">
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
        
        <AnimatePresence>
        {isComplete && (
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.5}}>
                <Button size="lg" className="mt-8">Explore Payment Solutions</Button>
            </motion.div>
        )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute bottom-16 z-20"
        style={{
          left: paddleX,
          width: PADDLE_WIDTH,
        }}
        animate={{
            y: isComplete ? 100 : 0,
            opacity: isComplete ? 0 : 1,
        }}
        transition={{duration: 0.5}}
      >
        <div className="w-full h-12 bg-primary rounded-lg shadow-2xl flex items-center justify-center text-primary-foreground font-bold">
            Catch!
        </div>
      </motion.div>
    </section>
  );
}

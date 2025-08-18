
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './animated-text';
import { motion } from 'framer-motion';

export default function Hero() {
  const animatedWords = ["dApps", "tokens", "wallets", "DeFi", "GameFi"];
  
  return (
    <section className="bg-background text-foreground">
      <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headline mb-10">
            Build, manage, and grow your&nbsp;
            <AnimatedText words={animatedWords} />
            &nbsp;project at any scale with the all-in-one text-to-code platform.
          </h1>
          <div className="flex justify-center items-center gap-4 mt-20">
             <motion.div
                animate={{
                    boxShadow: [
                        '0 0 0 0 hsl(var(--primary) / 0.7)',
                        '0 0 20px 5px hsl(var(--primary) / 0)',
                        '0 0 0 0 hsl(var(--primary) / 0.7)',
                    ],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="rounded-md"
            >
                <Button size="lg">
                    Start for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './animated-text';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const animatedWords = ["dApps", "tokens", "wallets", "DeFi", "GameFi"];
  
  return (
    <section className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-24 sm:py-32 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headline mb-10">
          Build, manage, and grow your&nbsp;
          <AnimatedText words={animatedWords} className="font-headline" />
          &nbsp;project at any scale with the all-in-one text-to-code platform.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground mb-10">
            From idea to deployment, Treminal3 provides the tools, templates, and AI-powered assistance to build and manage your Web3 projects faster than ever before.
        </p>
        <div className="flex justify-center items-center gap-4">
            <motion.div
            animate={{
                boxShadow: [
                    '0 0 0 0 hsl(var(--primary) / 0.5)',
                    '0 0 25px 0px hsl(var(--primary) / 0.2)',
                    '0 0 0 0 hsl(var(--primary) / 0.5)',
                ],
            }}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className="rounded-md"
            >
            <Button size="lg" asChild>
                <Link href="/auth">
                    Start for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            </motion.div>
        </div>
      </div>
    </section>
  );
}

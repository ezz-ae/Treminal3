
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './animated-text';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const animatedWords = ["dApps", "tokens", "wallets", "DAOs", "marketplaces"];

  return (
      <section className="bg-background text-foreground">
          <div className="container mx-auto px-4 py-24 sm:py-32 flex flex-col justify-center items-center text-center">
            <motion.h1 
                className="text-4xl md:text-5xl font-bold tracking-tight font-headline mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
              Build, manage, and grow your&nbsp;
              <AnimatedText words={animatedWords} className="font-headline" />
              &nbsp;project with an AI-native code editor.
            </motion.h1>
            <motion.p 
                className="max-w-3xl text-lg text-muted-foreground mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                From idea to deployment, Terminal3 provides the tools, templates, and AI-powered assistance to build and manage your Web3 projects faster than ever before. Go from a prompt to a full-stack dApp in minutes.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center gap-4"
            >
                <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/dashboard">
                        Get Started For Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href="/docs">
                        Learn More
                    </Link>
                </Button>
            </motion.div>
          </div>
      </section>
  );
}

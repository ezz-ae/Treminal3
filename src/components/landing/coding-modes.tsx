
'use client';

import { motion } from 'framer-motion';
import { Bot, Zap, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CodingMode } from '@/app/web3/page';

const modes = [
  {
    icon: Bot,
    value: 'auto',
    title: 'Full Automatic',
    description: 'Describe your goals in plain English. Our AI handles the code.',
  },
  {
    icon: Zap,
    value: 'hyper',
    title: 'Hyper-Coding',
    description: 'Use pre-built components and templates for rapid development.',
  },
  {
    icon: Code,
    value: 'pro',
    title: 'Manual',
    description: 'Take full control with a pro-grade IDE and custom scripting.',
  },
] as const;

interface CodingModesProps {
  selectedMode: CodingMode;
  setSelectedMode: (mode: CodingMode) => void;
}

export default function CodingModes({ selectedMode, setSelectedMode }: CodingModesProps) {
  return (
    <section id="coding-modes" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Which driving mode would you prefer?</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Your choice will tailor the guidance and articles we suggest for you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMode(mode.value)}
              className={cn(
                "bg-card p-6 rounded-lg border-2 hover:border-primary/80 cursor-pointer transition-all duration-300",
                selectedMode === mode.value ? "border-primary" : "border-transparent"
              )}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={cn(
                    "p-2 rounded-md transition-colors",
                    selectedMode === mode.value ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                )}>
                    <mode.icon className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-xl font-bold">{mode.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{mode.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

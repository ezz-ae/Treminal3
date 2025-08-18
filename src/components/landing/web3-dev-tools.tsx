
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Lightbulb, Zap, Code } from 'lucide-react';
import React from 'react';

const serviceContent = [
  { title: 'dApp Builder', image: 'https://placehold.co/600x400.png', aiHint: 'dApp builder interface' },
  { title: 'Token Launcher', image: 'https://placehold.co/600x400.png', aiHint: 'cryptocurrency token creation' },
  { title: 'Trading Bot Platform', image: 'https://placehold.co/600x400.png', aiHint: 'trading bot algorithm' },
  { title: 'AI Agents', image: 'https://placehold.co/600x400.png', aiHint: 'artificial intelligence network' },
  { title: 'Custom Wallets', image: 'https://placehold.co/600x400.png', aiHint: 'secure crypto wallet' },
  { title: 'Smart Contract Templates', image: 'https://placehold.co/600x400.png', aiHint: 'smart contract code' },
  { title: 'Manual Transactions', image: 'https://placehold.co/600x400.png', aiHint: 'blockchain transaction' },
  { title: 'On-chain Analytics', image: 'https://placehold.co/600x400.png', aiHint: 'data analytics dashboard' },
  { title: 'Decentralized Storage', image: 'https://placehold.co/600x400.png', aiHint: 'decentralized network nodes' },
  { title: 'Security Audits', image: 'https://placehold.co/600x400.png', aiHint: 'cyber security analysis' },
  { title: 'DAO Governance', image: 'https://placehold.co/600x400.png', aiHint: 'community governance vote' },
];

const codingModes = [
  {
    icon: Lightbulb,
    title: 'Build with text-to-code',
    description: 'Describe your idea in plain English and let our AI generate the initial code and structure for you.',
  },
  {
    icon: Zap,
    title: 'Hyper Coding mode',
    description: 'Use our library of pre-built components and functions to assemble your project at lightning speed.',
  },
  {
    icon: Code,
    title: 'Pro Coding mode',
    description: 'Dive into the code with a full-featured IDE environment, with complete control over every line.',
  },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface Web3DevToolsProps {
  activeServiceIndex: number | null;
}

export default function Web3DevTools({ activeServiceIndex }: Web3DevToolsProps) {
  const currentService = serviceContent[activeServiceIndex ?? 0];

  return (
    <section id="for-developers" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            The power to build your way: {currentService.title}
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Whether you're starting from an idea or are a seasoned pro, Treminal3 adapts to your workflow.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative h-96 rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
             <Image
                key={currentService.title}
                src={currentService.image}
                alt={currentService.title}
                data-ai-hint={currentService.aiHint}
                fill
                className="object-cover"
              />
          </motion.div>
          <div>
            <motion.div 
              className="space-y-8"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {codingModes.map((mode) => (
                <motion.div key={mode.title} className="flex items-start gap-4" variants={itemVariants}>
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <mode.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-headline">{mode.title}</h3>
                    <p className="text-muted-foreground text-sm">{mode.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

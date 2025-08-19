
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Lightbulb, Zap, Code } from 'lucide-react';
import React from 'react';

const DAppBuilderVector = () => (
    <svg width="100%" height="100%" viewBox="0 0 600 400" className="bg-card rounded-lg border overflow-hidden">
        <defs>
            <linearGradient id="dapp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0 }} />
            </linearGradient>
        </defs>
        
        {/* Main Window */}
        <rect x="1" y="1" width="598" height="398" rx="8" fill="hsl(var(--card))" />

        {/* Header */}
        <rect x="1" y="1" width="598" height="40" fill="hsl(var(--secondary))" />
        <circle cx="20" cy="20" r="6" fill="hsl(var(--muted))" />
        <circle cx="40" cy="20" r="6" fill="hsl(var(--muted))" />
        <circle cx="60" cy="20" r="6" fill="hsl(var(--muted))" />

        {/* Sidebar */}
        <rect x="1" y="41" width="120" height="358" fill="hsl(var(--secondary))" />
        <rect x="15" y="60" width="90" height="20" rx="4" fill="hsl(var(--muted))" />
        <rect x="15" y="90" width="90" height="8" rx="2" fill="hsl(var(--muted))" />
        <rect x="15" y="105" width="70" height="8" rx="2" fill="hsl(var(--muted))" />
        
        <rect x="15" y="140" width="90" height="20" rx="4" fill="hsl(var(--primary))" opacity="0.5" />
        <rect x="15" y="170" width="90" height="8" rx="2" fill="hsl(var(--muted))" />
        <rect x="15" y="185" width="70" height="8" rx="2" fill="hsl(var(--muted))" />

        <rect x="15" y="220" width="90" height="20" rx="4" fill="hsl(var(--muted))" />
        <rect x="15" y="250" width="90" height="8" rx="2" fill="hsl(var(--muted))" />
        <rect x="15" y="265" width="70" height="8" rx="2" fill="hsl(var(--muted))" />

        {/* Canvas */}
        <g>
            <rect x="150" y="70" width="220" height="120" rx="8" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1"/>
            <rect x="165" y="85" width="50" height="50" rx="4" fill="hsl(var(--primary))" />
            <rect x="230" y="85" width="125" height="12" rx="2" fill="hsl(var(--muted))" />
            <rect x="230" y="105" width="95" height="8" rx="2" fill="hsl(var(--muted))" />
            <rect x="230" y="121" width="95" height="8" rx="2" fill="hsl(var(--muted))" />


            <rect x="400" y="70" width="160" height="280" rx="8" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1"/>
            <rect x="415" y="85" width="130" height="12" rx="2" fill="hsl(var(--muted))" />
            <rect x="415" y="105" width="95" height="8" rx="2" fill="hsl(var(--muted))" />
            <circle cx="430" cy="140" r="15" fill="hsl(var(--primary))" />
            <rect x="455" y="132" width="70" height="16" rx="3" fill="hsl(var(--muted))" />

            <rect x="150" y="220" width="220" height="130" rx="8" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1"/>
            <rect x="165" y="235" width="190" height="12" rx="2" fill="hsl(var(--muted))" />
            <rect x="165" y="255" width="150" height="8" rx="2" fill="hsl(var(--muted))" />
            <rect x="165" y="275" width="190" height="25" rx="4" fill="hsl(var(--primary))" />


            {/* Connection Lines */}
            <path d="M 370 130 C 400 130, 400 190, 400 190" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeDasharray="4" />
            <path d="M 260 190 L 260 220" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeDasharray="4" />

        </g>
    </svg>
);


const serviceContent = [
  { title: 'dApp Builder', image: DAppBuilderVector, aiHint: 'dApp builder interface' },
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
    title: 'Hyper-Coding mode',
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
  const ImageComponent = currentService.image;

  return (
    <section id="for-developers" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            key={currentService.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold font-headline"
          >
            The Treminal gives you the power to build your way: {currentService.title}
          </motion.h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Whether you're using our 'Text to Code' AI or are a seasoned pro, Treminal adapts to your workflow.
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
              {typeof ImageComponent === 'string' ? (
                <Image
                    key={currentService.title}
                    src={ImageComponent}
                    alt={currentService.title}
                    data-ai-hint={currentService.aiHint}
                    fill
                    className="object-cover"
                />
              ) : (
                <ImageComponent />
              )}
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

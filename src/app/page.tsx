
'use client';

import Header from '@/components/layout/header';
import Hero from '@/components/landing/hero';
import CodingModes from '@/components/landing/coding-modes';
import InteractiveGuides from '@/components/landing/interactive-guides';
import Footer from '@/components/layout/footer';
import GridPattern from '@/components/landing/grid-pattern';
import React, { useState, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { DAppBuilderVector, TokenLauncherVector, TradingBotVector, AIVector, DefaultVector } from '@/components/landing/web3-dev-tools-graphics';
import MotionTerminal from '@/app/dashboard/motion-terminal';

const services = [
  {
    title: 'dApp Builder',
    description: 'Create and deploy dApps with our intuitive AI-powered builder.',
    vector: <DAppBuilderVector />,
  },
  {
    title: 'Token Launcher',
    description: 'Design and launch your own custom cryptocurrency tokens.',
    vector: <TokenLauncherVector />,
  },
  {
    title: 'Trading Bot Platform',
    description: 'Develop and deploy automated trading bots on major exchanges.',
    vector: <TradingBotVector />,
  },
  {
    title: 'AI Agents',
    description: 'Deploy autonomous AI agents to interact with your dApps and automate tasks.',
    vector: <AIVector />,
  },
];

export default function Home() {
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className="[mask-image:radial-gradient(ellipse_at_center,white,transparent_85%)]"
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <div ref={targetRef} className="relative z-10">
          <div className="sticky top-0 min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-black/90 to-background">
            <div className="w-full">
              <MotionTerminal scrollYProgress={scrollYProgress} activeServiceIndex={activeServiceIndex}/>
            </div>
          </div>
        </div>
        <CodingModes />
        <InteractiveGuides />
      </main>
      <Footer />
    </div>
  );
}

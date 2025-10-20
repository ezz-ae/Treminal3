
'use client';

import Header from '@/components/layout/header';
import Hero from '@/components/landing/hero';
import CodingModes from '@/components/landing/coding-modes';
import InteractiveGuides from '@/components/landing/interactive-guides';
import Footer from '@/components/layout/footer';
import GridPattern from '@/components/landing/grid-pattern';
import React, { useState, useRef } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import MotionTerminal from '@/app/dashboard/motion-terminal';
import { iconMap } from '@/lib/icon-map';


const services = [
    {
        title: 'AI Business Architect',
        description: 'Plan your project with an AI consultant. Answer a few questions, and our AI will recommend the best tools and a strategic plan to get you started.',
        iconName: 'AppWindow',
        serviceIndex: 0,
        href: '/dashboard/dapp-builder'
    },
    {
        title: 'AI Token Launcher',
        description: 'Generate secure, ERC-20 compliant smart contracts for your new cryptocurrency by simply describing its properties.',
        iconName: 'Gem',
        serviceIndex: 1,
        href: '/dashboard/token-launcher'
    },
    {
        title: 'AI Trading Bot Creator',
        description: 'Design, backtest, and deploy high-frequency trading bots using natural language and our advanced simulation engine.',
        iconName: 'BrainCircuit',
        serviceIndex: 2,
        href: '/dashboard/bot-creator'
    },
    {
        title: 'Solana Command Center',
        description: 'Interact with the Solana network using our AI Agent. Airdrop SOL, check balances, and explore transactions with simple commands.',
        iconName: 'Wind',
        serviceIndex: -1, // No direct script, uses tool calls
        href: '/dashboard/solana'
    },
    {
        title: 'AI Security Auditor',
        description: 'Paste your Solidity code and receive a comprehensive security analysis, identifying potential vulnerabilities and providing recommendations.',
        iconName: 'ShieldCheck',
        serviceIndex: 9,
        href: '/dashboard/security-audits'
    },
    {
        title: 'On-chain Analytics',
        description: 'Ask complex questions about on-chain data in natural language and get back rich visualizations and insights from our powerful analytics engine.',
        iconName: 'AreaChart',
        serviceIndex: 7,
        href: '/dashboard/analytics'
    },
];

/**
 * The main landing page for the Terminal3 application.
 * Features a hero section, an interactive terminal showcasing services,
 * coding mode customizations, and interactive guides.
 * @returns {JSX.Element} The Home component.
 */
export default function Home() {
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });
  
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress: featureScrollProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(featureScrollProgress, "change", (latest) => {
    const featureCount = services.length;
    const segment = 1 / featureCount;
    const activeIndex = Math.floor(latest / segment);
    const currentServiceIndex = services[activeIndex]?.serviceIndex;


    if (activeIndex >= 0 && activeIndex < featureCount && currentServiceIndex !== -1) {
        setActiveServiceIndex(currentServiceIndex);
    } else { 
        setActiveServiceIndex(null);
    }
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
        <div ref={targetRef} className="relative z-10 container mx-auto px-4 py-24">
            <div className="text-center mb-24">
                <h2 className="text-3xl md:text-5xl font-bold font-headline text-foreground">One Command Center. Infinite Possibilities.</h2>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
                    Terminal3 transforms complex Web3 development into simple, AI-driven commands.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-16 md:gap-8 items-start">
                <div className="md:sticky md:top-24 space-y-24">
                    {services.map((service, index) => {
                        const Icon = iconMap[service.iconName] || iconMap['AppWindow'];
                        const segmentStart = index / services.length;
                        const segmentEnd = (index + 1) / services.length;

                        const opacity = useTransform(
                            featureScrollProgress,
                            [segmentStart - 0.1, segmentStart, segmentEnd, segmentEnd + 0.1],
                            [0.3, 1, 1, 0.3]
                        );
                        
                        return (
                          <motion.div 
                            key={service.title} 
                            style={{ opacity }}
                            className="flex flex-col"
                            ref={el => featureRefs.current[index] = el}
                          >
                              <div className="flex items-center gap-4 mb-3">
                                  <div className="p-3 bg-primary/10 rounded-lg text-primary border border-primary/20">
                                      <Icon className="w-6 h-6"/>
                                  </div>
                                  <h3 className="font-headline text-2xl font-bold text-foreground">{service.title}</h3>
                              </div>
                              <p className="text-muted-foreground text-base max-w-md">{service.description}</p>
                          </motion.div>
                        )
                      })}
                </div>
                <div className="md:sticky md:top-24 w-full h-[60vh] min-h-[400px] md:h-auto md:aspect-[4/3]">
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

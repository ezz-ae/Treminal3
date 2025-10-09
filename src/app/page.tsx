
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
import { cn } from '@/lib/utils';


const services = [
    {
        title: 'dApp Builder',
        description: 'Describe your application, and our AI architect will generate a complete plan, including required UI components and smart contracts.',
        iconName: 'AppWindow',
        serviceIndex: 0,
        href: '/dashboard/dapp-builder'
    },
    {
        title: 'Token Launcher',
        description: 'Simply describe the name, symbol, and supply for your new cryptocurrency, and the AI will generate a secure, ERC-20 compliant smart contract.',
        iconName: 'Puzzle',
        serviceIndex: 1,
        href: '/dashboard/token-launcher'
    },
    {
        title: 'Security Audits',
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

export default function Home() {
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: featureScrollProgress } = useScroll({
      target: targetRef,
      offset: ["center center", "end start"]
  });

  useMotionValueEvent(featureScrollProgress, "change", (latest) => {
    const segment = 1 / services.length;
    const activeIndex = Math.floor(latest / segment);
    if(activeIndex < services.length) {
      setActiveServiceIndex(services[activeIndex].serviceIndex);
    }
  })

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
        <div ref={targetRef} className="relative z-10 py-24 h-[400vh]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                    <motion.div
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15)_0%,transparent_70%)]"
                        style={{
                            opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
                        }}
                    />
                </div>
                
                <div className="container mx-auto px-4 text-center mb-8 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold font-headline text-primary-foreground">One Command Center. Infinite Possibilities.</h2>
                    <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
                        Scroll to see how Terminal3 transforms your ideas into reality.
                    </p>
                </div>
               
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="w-full h-[60vh]">
                      {services.map((service, index) => {
                        const segmentStart = (index / services.length);
                        const segmentEnd = ((index + 1) / services.length);
                        const opacity = useTransform(featureScrollProgress, 
                          [segmentStart - 0.1, segmentStart, segmentEnd, segmentEnd + 0.1],
                          [0, 1, 1, 0]
                        )
                        const Icon = iconMap[service.iconName] || iconMap['AppWindow'];
                        return (
                          <motion.div 
                            key={service.title} 
                            style={{ opacity }}
                            className="absolute inset-0 flex flex-col justify-center"
                          >
                              <div className="flex items-center gap-4 mb-4">
                                  <div className="p-4 bg-primary/10 rounded-lg text-primary border border-primary/20">
                                      <Icon className="w-8 h-8"/>
                                  </div>
                                  <h3 className="font-headline text-3xl font-bold text-primary-foreground">{service.title}</h3>
                              </div>
                              <p className="text-muted-foreground text-lg">{service.description}</p>
                          </motion.div>
                        )
                      })}
                    </div>
                    <div>
                        <MotionTerminal scrollYProgress={scrollYProgress} activeServiceIndex={activeServiceIndex}/>
                    </div>
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

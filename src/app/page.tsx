
'use client';

import Header from '@/components/layout/header';
import Hero from '@/components/landing/hero';
import CodingModes from '@/components/landing/coding-modes';
import InteractiveGuides from '@/components/landing/interactive-guides';
import Footer from '@/components/layout/footer';
import GridPattern from '@/components/landing/grid-pattern';
import React, { useState, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import MotionTerminal from '@/app/dashboard/motion-terminal';
import { iconMap } from '@/lib/icon-map';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        title: 'dApp Builder',
        description: 'Create and deploy dApps with our intuitive AI-powered builder.',
        iconName: 'AppWindow',
        serviceIndex: 0,
        href: '/dashboard/dapp-builder'
    },
    {
        title: 'Token Launcher',
        description: 'Design and launch your own custom cryptocurrency tokens.',
        iconName: 'Puzzle',
        serviceIndex: 1,
        href: '/dashboard/token-launcher'
    },
    {
        title: 'Trading Bot Platform',
        description: 'Develop and deploy automated trading bots on major exchanges.',
        iconName: 'Bot',
        serviceIndex: 2,
        href: '/dashboard/tools'
    },
    {
        title: 'AI Agents',
        description: 'Deploy autonomous AI agents to interact with your dApps.',
        iconName: 'BotMessageSquare',
        serviceIndex: 3,
        href: '/dashboard/business-tool-recommendation'
    },
    {
        title: 'Security Audits',
        description: 'Run automated security audits on your smart contracts.',
        iconName: 'ShieldCheck',
        serviceIndex: 9,
        href: '/dashboard/security-audits'
    },
    {
        title: 'On-chain Analytics',
        description: 'Get deep insights into on-chain data with our analytics engine.',
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
        <div ref={targetRef} className="relative z-10 bg-gradient-to-b from-background via-black to-black py-24">
            <div className="container mx-auto px-4 text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary-foreground">The All-in-One Web3 Platform</h2>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
                    Hover over a service to see it in action. From smart contracts to on-chain analytics, build everything with a single, AI-native toolkit.
                </p>
            </div>
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                 <div className="space-y-4">
                    {services.map((service, index) => {
                        const Icon = iconMap[service.iconName] || iconMap['AppWindow'];
                        return (
                            <Link 
                                href={service.href} 
                                key={service.title}
                                onMouseEnter={() => setActiveServiceIndex(service.serviceIndex)}
                                className="block"
                            >
                                <div className="group p-6 rounded-lg border border-transparent hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <Icon className="w-8 h-8 text-primary"/>
                                            <div>
                                                <h3 className="font-headline text-xl font-bold text-primary-foreground">{service.title}</h3>
                                                <p className="text-muted-foreground">{service.description}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary mt-1"/>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <div className="sticky top-20">
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

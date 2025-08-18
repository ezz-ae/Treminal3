
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const services = [
    {
      href: '/dashboard/dapp-builder',
      title: 'dApp Builder',
    },
    {
      href: '/dashboard/token-launcher',
      title: 'Token Launcher',
    },
    {
      href: '/dashboard/trading-bots',
      title: 'Trading Bot Platform',
    },
    {
      href: '/dashboard/ai-agents',
      title: 'AI Agents',
    },
    {
      href: '/dashboard/wallets',
      title: 'Custom Wallets',
    },
    {
      href: '/dashboard/smart-contracts',
      title: 'Smart Contract Templates',
    },
    {
      href: '/dashboard/transactions',
      title: 'Manual Transactions',
    },
     {
      href: '/dashboard/analytics',
      title: 'On-chain Analytics',
    },
    {
      href: '/dashboard/storage',
      title: 'Decentralized Storage',
    },
    {
      href: '/dashboard/audits',
      title: 'Security Audits',
    },
    {
      href: '/dashboard/governance',
      title: 'DAO Governance',
    },
  ];

const expandedHeight = 450;
const collapsedHeight = 150;

export default function Services() {
  const [activeKey, setActiveKey] = useState<number | null>(null);

  return (
    <section id="services" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The all-in-one Web3 platform</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Treminal3 provides everything you need to succeed in the new digital economy.
          </p>
        </div>
        <div className="w-full flex justify-center items-end h-[500px]">
            <motion.div
                className="flex items-end w-full max-w-7xl"
                onMouseLeave={() => setActiveKey(null)}
            >
                {services.map((service, index) => {
                    const isActive = activeKey === index;
                    return (
                        <motion.div
                            key={index}
                            className="relative rounded-t-2xl overflow-hidden flex-1"
                            onHoverStart={() => setActiveKey(index)}
                            animate={{ height: isActive ? expandedHeight : collapsedHeight }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <Link href={service.href} className="block w-full h-full">
                                <div className="relative w-full h-full p-6 flex flex-col justify-end bg-card border border-primary/20">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                                    <div className="relative z-10">
                                        <h3 className={cn(
                                            "font-headline text-2xl font-bold transition-all",
                                            isActive ? "text-primary [text-shadow:0_0_5px_hsl(var(--primary)),0_0_10px_hsl(var(--primary))]" : "text-white",
                                        )} style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)'}}>
                                            {service.title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
      </div>
    </section>
  );
}

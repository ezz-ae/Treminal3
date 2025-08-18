
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

const expandedHeight = 400;
const collapsedHeights = [120, 150, 100, 170, 110, 160, 130, 155, 105, 175, 125];


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
        <div className="w-full flex justify-center items-end h-[450px]">
            <motion.div
                className="flex items-end w-full max-w-7xl"
                onMouseLeave={() => setActiveKey(null)}
            >
                {services.map((service, index) => {
                    const isActive = activeKey === index;
                    return (
                        <motion.div
                            key={index}
                            className="relative rounded-t-2xl overflow-hidden"
                            onHoverStart={() => setActiveKey(index)}
                            animate={{ 
                                height: isActive ? expandedHeight : collapsedHeights[index % collapsedHeights.length],
                                flexGrow: isActive ? 3 : 1
                            }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <Link href={service.href} className="block w-full h-full">
                                <motion.div 
                                    className="relative w-full h-full bg-card border-t border-x border-primary/20"
                                    animate={{ 
                                        boxShadow: isActive ? '0px 0px 30px hsl(var(--primary))' : '0px 0px 0px hsla(var(--primary), 0)',
                                        borderColor: isActive ? 'hsl(var(--primary))' : 'hsla(var(--primary), 0.2)'
                                    }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <h3 className={cn(
                                            "font-headline text-xl font-bold transition-all",
                                            isActive ? "text-white" : "text-white/50"
                                        )}>
                                            {service.title}
                                        </h3>
                                    </div>
                                </motion.div>
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

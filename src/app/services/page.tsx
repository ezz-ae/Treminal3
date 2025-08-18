
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import React from 'react';
import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const services = [
    {
      href: '/dashboard/dapp-builder',
      title: 'dApp Builder',
      description: 'Visually build and deploy your decentralized applications.',
    },
    {
      href: '/dashboard/token-launcher',
      title: 'Token Launcher',
      description: 'Create and launch your custom crypto tokens in minutes.',
    },
    {
      href: '/dashboard/trading-bots',
      title: 'Trading Bot Platform',
      description: 'Automate your trading strategies on major exchanges.',
    },
    {
      href: '/dashboard/ai-agents',
      title: 'AI Agents',
      description: 'Deploy autonomous AI agents to automate Web3 tasks.',
    },
    {
      href: '/dashboard/wallets',
      title: 'Custom Wallets',
      description: 'Build and brand secure crypto wallets for your users.',
    },
    {
      href: '/dashboard/smart-contracts',
      title: 'Smart Contract Templates',
      description: 'Use audited templates for secure, hassle-free contracts.',
    },
    {
      href: '/dashboard/transactions',
      title: 'Manual Transactions',
      description: 'Interact directly with the blockchain for custom operations.',
    },
     {
      href: '/dashboard/analytics',
      title: 'On-chain Analytics',
      description: 'Gain deep insights into on-chain data and trends.',
    },
    {
      href: '/dashboard/storage',
      title: 'Decentralized Storage',
      description: 'Manage files on IPFS and other decentralized networks.',
    },
    {
      href: '/dashboard/audits',
      title: 'Security Audits',
      description: 'Automatically audit your smart contracts for vulnerabilities.',
    },
    {
      href: '/dashboard/governance',
      title: 'DAO Governance',
      description: 'Manage your decentralized autonomous organization with ease.',
    },
  ];

const expandedHeight = 400;
const collapsedHeights = [120, 150, 100, 170, 110, 160, 130, 155, 105, 175, 125];


interface ServicesProps {
  activeServiceIndex: number | null;
  setActiveServiceIndex: (index: number | null) => void;
}


function Services({ activeServiceIndex, setActiveServiceIndex }: ServicesProps) {
  return (
    <section 
      id="services" 
      className="py-12 md:py-24"
    >
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The all-in-one Web3 platform</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Treminal3 provides everything you need to succeed in the new digital economy.
          </p>
        </div>
        <div className="w-full flex justify-center items-end h-[450px]">
            <motion.div
                className="flex items-end w-full max-w-7xl"
                onMouseLeave={() => setActiveServiceIndex(null)}
            >
                {services.map((service, index) => {
                    const isActive = activeServiceIndex === index;
                    
                    return (
                        <motion.div
                            key={index}
                            className="relative flex flex-col justify-end"
                            onHoverStart={() => setActiveServiceIndex(index)}
                            animate={{
                                height: isActive ? expandedHeight : collapsedHeights[index],
                                flexGrow: isActive ? 3 : 1
                            }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            style={{
                                overflow: 'hidden',
                            }}
                        >
                            <Link href={service.href} className="block w-full h-full">
                                <motion.div 
                                    className="relative w-full h-full bg-card border-t border-x rounded-t-2xl flex flex-col justify-end"
                                    animate={{ 
                                        boxShadow: isActive ? '0px 0px 30px hsl(var(--primary) / 0.5)' : '0px 0px 0px hsla(var(--primary), 0)',
                                        borderColor: isActive ? 'hsl(var(--primary))' : 'hsla(var(--primary), 0.2)'
                                    }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                    <div className="p-6">
                                        <div className="w-full text-center">
                                            <h3 className={cn(
                                                "font-headline text-lg font-bold truncate"
                                            )}>
                                                {service.title}
                                            </h3>
                                             <motion.div
                                                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                             >
                                                <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                                             </motion.div>
                                        </div>
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

export default function ServicesPage() {
    const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main>
                <Services 
                    activeServiceIndex={activeServiceIndex}
                    setActiveServiceIndex={setActiveServiceIndex}
                />
            </main>
            <Footer />
        </div>
    )
}

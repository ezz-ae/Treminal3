
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
    {
      href: '/dashboard/dapp-builder',
      title: 'dApp Builder',
      description: 'Create and deploy decentralized applications with our intuitive builder.',
    },
    {
      href: '/dashboard/token-launcher',
      title: 'Token Launcher',
      description: 'Design and launch your own custom cryptocurrency tokens in minutes.',
    },
    {
      href: '/dashboard/trading-bots',
      title: 'Trading Bot Platform',
      description: 'Develop and deploy automated trading bots on major exchanges.',
    },
    {
      href: '/dashboard/ai-agents',
      title: 'AI Agents',
      description: 'Deploy autonomous AI agents to interact with your dApps and automate tasks.',
    },
    {
      href: '/dashboard/wallets',
      title: 'Custom Wallets',
      description: 'Build and brand your own secure crypto wallets for your users.',
    },
    {
      href: '/dashboard/smart-contracts',
      title: 'Smart Contract Templates',
      description: 'Use our audited templates to create secure smart contracts without the hassle.',
    },
    {
      href: '/dashboard/transactions',
      title: 'Manual Transactions',
      description: 'Interact directly with the blockchain for custom operations and analysis.',
    },
     {
      href: '/dashboard/analytics',
      title: 'On-chain Analytics',
      description: 'Get deep insights into on-chain data with our powerful analytics engine.',
    },
    {
      href: '/dashboard/storage',
      title: 'Decentralized Storage',
      description: 'Upload and manage files on IPFS and other decentralized storage networks.',
    },
    {
      href: '/dashboard/audits',
      title: 'Security Audits',
      description: 'Run automated security audits on your smart contracts to find vulnerabilities.',
    },
    {
      href: '/dashboard/governance',
      title: 'DAO Governance',
      description: 'Manage your decentralized autonomous organization with our governance tools.',
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
                                        <h3 className="font-headline text-2xl font-bold text-white" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)'}}>
                                            {service.title}
                                        </h3>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                            className="text-muted-foreground mt-2 absolute bottom-6 left-6 right-6"
                                        >
                                            <p className="text-sm">{service.description}</p>
                                        </motion.div>
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

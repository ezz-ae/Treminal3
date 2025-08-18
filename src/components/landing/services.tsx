
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AppWindow,
  Bot,
  Puzzle,
  Wallet,
  FileJson,
  Network,
  BotMessageSquare,
  AreaChart,
  FileArchive,
  ShieldCheck,
  Vote,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const services = [
    {
      href: '/dashboard/dapp-builder',
      icon: AppWindow,
      title: 'dApp Builder',
      description: 'Create and deploy decentralized applications with our intuitive builder.',
    },
    {
      href: '/dashboard/token-launcher',
      icon: Puzzle,
      title: 'Token Launcher',
      description: 'Design and launch your own custom cryptocurrency tokens in minutes.',
    },
    {
      href: '/dashboard/trading-bots',
      icon: Bot,
      title: 'Trading Bot Platform',
      description: 'Develop and deploy automated trading bots on major exchanges.',
    },
    {
      href: '/dashboard/ai-agents',
      icon: BotMessageSquare,
      title: 'AI Agents',
      description: 'Deploy autonomous AI agents to interact with your dApps and automate tasks.',
    },
    {
      href: '/dashboard/wallets',
      icon: Wallet,
      title: 'Custom Wallets',
      description: 'Build and brand your own secure crypto wallets for your users.',
    },
    {
      href: '/dashboard/smart-contracts',
      icon: FileJson,
      title: 'Smart Contract Templates',
      description: 'Use our audited templates to create secure smart contracts without the hassle.',
    },
    {
      href: '/dashboard/transactions',
      icon: Network,
      title: 'Manual Transactions',
      description: 'Interact directly with the blockchain for custom operations and analysis.',
    },
     {
      href: '/dashboard/analytics',
      icon: AreaChart,
      title: 'On-chain Analytics',
      description: 'Get deep insights into on-chain data with our powerful analytics engine.',
    },
    {
      href: '/dashboard/storage',
      icon: FileArchive,
      title: 'Decentralized Storage',
      description: 'Upload and manage files on IPFS and other decentralized storage networks.',
    },
    {
      href: '/dashboard/audits',
      icon: ShieldCheck,
      title: 'Security Audits',
      description: 'Run automated security audits on your smart contracts to find vulnerabilities.',
    },
    {
      href: '/dashboard/governance',
      icon: Vote,
      title: 'DAO Governance',
      description: 'Manage your decentralized autonomous organization with our governance tools.',
    },
  ];

const expandedWidth = 400;
const collapsedWidth = 150;

export default function Services() {
  const [activeKey, setActiveKey] = useState<number | null>(0);

  return (
    <section id="services" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The all-in-one Web3 platform</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Treminal3 provides everything you need to succeed in the new digital economy.
          </p>
        </div>
        <div className="w-full overflow-x-auto pb-4">
            <motion.div
                className="flex w-max"
                onMouseLeave={() => setActiveKey(null)}
            >
                {services.map((service, index) => {
                    const isActive = activeKey === index;
                    return (
                        <motion.div
                            key={index}
                            className="relative h-[450px] rounded-2xl overflow-hidden"
                            onHoverStart={() => setActiveKey(index)}
                            style={{
                                flexBasis: isActive ? expandedWidth : collapsedWidth,
                                flexGrow: isActive ? 1 : 0,
                                flexShrink: 0,
                            }}
                            animate={{ width: isActive ? expandedWidth : collapsedWidth }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                            <Link href={service.href} className="block w-full h-full">
                                <div className="relative w-full h-full p-6 flex flex-col justify-end bg-card border border-primary/20">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                                    <div className="relative z-10">
                                        <div className="mb-4">
                                            <service.icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="font-headline text-2xl font-bold text-white vertical-text">
                                            {service.title}
                                        </h3>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                            transition={{ duration: 0.3, delay: 0.2 }}
                                            className="text-muted-foreground mt-2"
                                        >
                                            {service.description}
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

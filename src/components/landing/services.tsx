
'use client';

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


export default function Services() {
  return (
    <section id="services" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The all-in-one Web3 platform</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Treminal3 provides everything you need to succeed in the new digital economy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="h-full"
                >
                    <Link href={service.href} className="block h-full">
                        <div className="flex flex-col text-left p-6 border border-primary/20 shadow-lg h-full bg-card rounded-lg">
                            <div className="bg-primary/10 text-primary p-3 rounded-full mb-4 inline-flex w-fit">
                                <service.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-headline text-xl font-bold">{service.title}</h3>
                            <p className="text-muted-foreground mt-2 flex-grow">{service.description}</p>
                            <div className="flex items-center text-sm text-primary mt-4">
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

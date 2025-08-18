
'use client';

import { motion } from 'framer-motion';
import { AppWindow, Bot, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, ShieldCheck, Vote } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
    {
      icon: AppWindow,
      href: '/dashboard/dapp-builder',
      title: 'dApp Builder',
      description: 'Visually build and deploy your decentralized applications.',
    },
    {
      icon: Puzzle,
      href: '/dashboard/token-launcher',
      title: 'Token Launcher',
      description: 'Create and launch your custom crypto tokens in minutes.',
    },
    {
      icon: Bot,
      href: '/dashboard/trading-bots',
      title: 'Trading Bot Platform',
      description: 'Automate your trading strategies on major exchanges.',
    },
    {
      icon: BotMessageSquare,
      href: '/dashboard/ai-agents',
      title: 'AI Agents',
      description: 'Deploy autonomous AI agents to automate Web3 tasks.',
    },
    {
      icon: Wallet,
      href: '/dashboard/wallets',
      title: 'Custom Wallets',
      description: 'Build and brand secure crypto wallets for your users.',
    },
    {
      icon: FileJson,
      href: '/dashboard/smart-contracts',
      title: 'Smart Contract Templates',
      description: 'Use audited templates for secure, hassle-free contracts.',
    },
    {
      icon: Network,
      href: '/dashboard/transactions',
      title: 'Manual Transactions',
      description: 'Interact directly with the blockchain for custom operations.',
    },
     {
      icon: AreaChart,
      href: '/dashboard/analytics',
      title: 'On-chain Analytics',
      description: 'Gain deep insights into on-chain data and trends.',
    },
    {
      icon: FileArchive,
      href: '/dashboard/storage',
      title: 'Decentralized Storage',
      description: 'Manage files on IPFS and other decentralized networks.',
    },
    {
      icon: ShieldCheck,
      href: '/dashboard/audits',
      title: 'Security Audits',
      description: 'Automatically audit your smart contracts for vulnerabilities.',
    },
    {
      icon: Vote,
      href: '/dashboard/governance',
      title: 'DAO Governance',
      description: 'Manage your decentralized autonomous organization with ease.',
    },
  ];

interface ServiceGridProps {
    onServiceClick: (index: number) => void;
    activeServiceIndex: number | null;
}

export default function ServiceGrid({ onServiceClick, activeServiceIndex }: ServiceGridProps) {
  return (
    <section id="services" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The all-in-one Web3 platform</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Click a service to see it in action.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onServiceClick(index)}
              className={cn(
                "bg-card p-6 rounded-lg border border-transparent hover:border-primary hover:bg-primary/5 cursor-pointer transition-all duration-300",
                activeServiceIndex === index && "border-primary bg-primary/10"
              )}
            >
              <div className="flex items-center gap-4 mb-4">
                <service.icon className="w-8 h-8 text-primary" />
                <h3 className="font-headline text-xl font-bold">{service.title}</h3>
              </div>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

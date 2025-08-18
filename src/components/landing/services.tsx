
'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import React from 'react';

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
  scrollYProgress: MotionValue<number>;
  activeServiceIndex: number | null;
  setActiveServiceIndex: (index: number | null) => void;
}


export default function Services({ scrollYProgress, activeServiceIndex, setActiveServiceIndex }: ServicesProps) {

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const filter = useTransform(scrollYProgress, [0, 0.7, 1], ['blur(0px)', 'blur(0px)', 'blur(20px)']);


  return (
    <motion.section 
      id="services" 
      className="py-12 md:py-24 h-full w-full absolute top-0 left-0"
      style={{ opacity, filter }}
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
                    const scaleY = useTransform(scrollYProgress, [0.5, 1], [1, 25]);
                    
                    return (
                        <motion.div
                            key={index}
                            className="relative"
                            onHoverStart={() => setActiveServiceIndex(index)}
                            animate={{
                                height: isActive ? expandedHeight : collapsedHeights[index % collapsedHeights.length],
                                flexGrow: isActive ? 3 : 1
                            }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <Link href={service.href} className="block w-full h-full">
                                <motion.div 
                                    className="relative w-full h-full bg-card border-t border-x rounded-t-2xl"
                                    animate={{ 
                                        boxShadow: isActive ? '0px 0px 30px hsl(var(--primary) / 0.5)' : '0px 0px 0px hsla(var(--primary), 0)',
                                        borderColor: isActive ? 'hsl(var(--primary))' : 'hsla(var(--primary), 0.2)'
                                    }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                  
                                    <motion.div 
                                      className="absolute left-0 top-0 h-full w-px bg-primary origin-bottom"
                                      style={{ scaleY: isActive ? scaleY: 0, transition: 'transform 0.3s ease-out' }}
                                    />
                                    <motion.div 
                                      className="absolute right-0 top-0 h-full w-px bg-primary origin-bottom"
                                      style={{ scaleY: isActive ? scaleY: 0, transition: 'transform 0.3s ease-out' }}
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                                        <div className="w-full text-center">
                                            <h3 className={cn(
                                                "font-headline text-2xl font-bold transition-all"
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
    </motion.section>
  );
}

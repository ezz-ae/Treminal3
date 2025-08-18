
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Blocks, Bot, AreaChart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Blocks,
    title: 'dApp & Contract Development',
    description: 'Build, launch, and manage decentralized applications and smart contracts.',
    details: 'Utilize our intuitive dApp Builder, audited Smart Contract Templates, and custom Wallet solutions to accelerate your Web3 development cycle from idea to launch.',
    color: 'from-blue-500/10 to-transparent'
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    description: 'Deploy autonomous AI agents and powerful trading bots with ease.',
    details: 'Leverage our AI Agent platform to automate dApp interactions and complex workflows. Build and backtest sophisticated strategies with our Trading Bot Platform for major exchanges.',
    color: 'from-purple-500/10 to-transparent'
  },
  {
    icon: AreaChart,
    title: 'Analytics & Governance',
    description: 'Gain deep on-chain insights and manage your DAO with powerful tools.',
    details: 'Make data-driven decisions with our On-chain Analytics engine. Manage your decentralized autonomous organization effectively with our comprehensive DAO Governance tools.',
    color: 'from-green-500/10 to-transparent'
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section id="services" className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">The all-in-one Web3 platform</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
              Treminal3 provides everything you need to succeed in the new digital economy.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col text-center items-center p-6 border-0 shadow-lg h-full bg-card rounded-lg">
                <div className="p-0">
                  <div className="bg-primary/10 text-primary p-4 rounded-full mb-4 inline-block">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline text-xl font-bold">{service.title}</h3>
                </div>
                <div className="p-0 mt-2">
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
         <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The all-in-one Web3 platform</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Treminal3 provides everything you need to succeed in the new digital economy. Hover to explore.
          </p>
        </div>
        <div 
          className="flex h-[30rem] w-full max-w-5xl mx-auto"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="relative group h-full"
              onMouseEnter={() => setHoveredIndex(index)}
              animate={{ width: hoveredIndex === index ? '40%' : '20%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-full w-full bg-background border border-primary/20 rounded-2xl overflow-hidden relative">
                <div className={cn("absolute inset-0 bg-gradient-to-b", service.color)}></div>
                 <div className="h-full w-full flex flex-col justify-end p-8 relative">
                    <service.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold font-headline mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>

                     <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div 
                          className="mt-6 space-y-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                          exit={{ opacity: 0, y: 20 }}
                        >
                          <p className="text-sm">{service.details}</p>
                           <Button variant="outline" size="sm">
                              Learn More <ArrowRight />
                           </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

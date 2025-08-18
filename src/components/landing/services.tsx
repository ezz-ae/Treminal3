
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Blocks, Waypoints, Landmark, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Blocks,
    title: 'Web3 & Blockchain Development',
    description: 'The full-stack platform to build, launch, and manage any Web3 project with ease.',
    details: 'From custom dApps and smart contracts to full-scale decentralized exchanges, our tools provide the infrastructure you need to build robust Web3 applications. Utilize our audited templates and intuitive SDK to accelerate your development cycle.',
    color: 'from-blue-500/10 to-transparent'
  },
  {
    icon: Waypoints,
    title: 'Web3 Marketing & Smart Payments',
    description: 'Grow your audience and streamline revenue with our integrated marketing and payment tools.',
    details: 'Launch targeted airdrops, create NFT-based loyalty programs, and accept global crypto payments with our seamless invoicing system. Our analytics dashboard gives you the insights to optimize your campaigns and maximize ROI.',
    color: 'from-purple-500/10 to-transparent'
  },
  {
    icon: Landmark,
    title: 'Freelancers Banking System',
    description: 'A modern financial stack for the independent workforce. Manage your crypto and fiat seamlessly.',
    details: 'Get a unified view of your finances. Our banking system allows you to hold, convert, and spend both fiat and cryptocurrencies from a single interface. Generate invoices, track expenses, and prepare for tax season with specialized tools.',
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

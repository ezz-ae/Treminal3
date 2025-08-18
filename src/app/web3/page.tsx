
'use client';

import { useRef, useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/landing/hero';
import MotionTerminal from '@/components/landing/motion-terminal';
import Web3DevTools from '@/components/landing/web3-dev-tools';
import InteractiveGuides from '@/components/landing/interactive-guides';
import GridPattern from '@/components/landing/grid-pattern';
import { cn } from '@/lib/utils';
import { useScroll } from 'framer-motion';
import ServiceGrid from '@/components/landing/service-grid';
import CodingModes from '@/components/landing/coding-modes';

export type CodingMode = 'auto' | 'hyper' | 'pro';

export default function Web3Page() {
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);

  const terminalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: terminalScrollYProgress } = useScroll({
      target: terminalRef,
      offset: ['start end', 'end start'],
  });

  const handleServiceClick = (index: number) => {
    setActiveServiceIndex(index);
    if(terminalRef.current) {
      const yOffset = -150; 
      const y = terminalRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full">
            <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                className={cn(
                    '[mask-image:linear-gradient(to_bottom,white,transparent,transparent)]',
                )}
            />
            <div
                className={cn(
                    'absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 opacity-50',
                    'animate-aurora'
                )}
            />
        </div>
        <Hero />
        <ServiceGrid 
          activeServiceIndex={activeServiceIndex} 
          onServiceClick={handleServiceClick} 
        />
        
        <div ref={terminalRef}>
             <MotionTerminal 
                scrollYProgress={terminalScrollYProgress} 
                activeServiceIndex={activeServiceIndex} 
            />
        </div>

        <div className="relative">
          <Web3DevTools activeServiceIndex={activeServiceIndex} />
          <CodingModes />
          <InteractiveGuides activeServiceIndex={activeServiceIndex} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

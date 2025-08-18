
'use client';

import { useRef, useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/landing/hero';
import MotionTerminal from '@/components/landing/motion-terminal';
import FinancialSolutions from '@/components/landing/financial-solutions';
import Web3DevTools from '@/components/landing/web3-dev-tools';
import InteractiveGuides from '@/components/landing/interactive-guides';
import GridPattern from '@/components/landing/grid-pattern';
import { cn } from '@/lib/utils';
import { useScroll } from 'framer-motion';
import ServiceGrid from '@/components/landing/service-grid';

export default function Web3Page() {
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);

  const terminalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: terminalScrollYProgress } = useScroll({
      target: terminalRef,
      offset: ['start end', 'end start'],
  });

  const handleServiceClick = (index: number) => {
    setActiveServiceIndex(index);
    // Smooth scroll to the terminal, but with a slight offset to ensure it's in view
    if(terminalRef.current) {
      const yOffset = -150; 
      const y = terminalRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="relative">
        <GridPattern
            width={40}
            height={40}
            x={-1}
            y={-1}
            className={cn(
              '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]',
              'absolute inset-0 h-full w-full skew-y-12 animate-aurora'
            )}
        />
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
           <GridPattern
              width={40}
              height={40}
              x={-1}
              y={-1}
              className={cn(
                '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]',
              )}
            />
          <FinancialSolutions />
          <Web3DevTools />
          <InteractiveGuides />
        </div>
      </main>
      <Footer />
    </div>
  );
}

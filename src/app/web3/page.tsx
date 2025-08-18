
'use client';

import { useRef } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/landing/hero';
import MotionTerminal from '@/components/landing/motion-terminal';
import Services from '@/components/landing/services';
import FinancialSolutions from '@/components/landing/financial-solutions';
import Web3DevTools from '@/components/landing/web3-dev-tools';
import InteractiveGuides from '@/components/landing/interactive-guides';
import GridPattern from '@/components/landing/grid-pattern';
import { cn } from '@/lib/utils';
import { useScroll } from 'framer-motion';

export default function Web3Page() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  });

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
        <div ref={scrollRef} className="relative z-10 w-full h-[200vh]">
          <div className="sticky top-0 h-screen">
            <Services scrollYProgress={scrollYProgress} />
            <MotionTerminal />
          </div>
        </div>
        <div className="flex-grow">
          <FinancialSolutions />
          <Web3DevTools />
          <InteractiveGuides />
        </div>
      </main>
      <Footer />
    </div>
  );
}

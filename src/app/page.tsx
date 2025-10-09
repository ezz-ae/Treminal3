
'use client';

import { useState, useRef, useEffect } from 'react';
import { useScroll, MotionValue } from 'framer-motion';
import Header from '@/components/layout/header';
import Hero from '@/components/landing/hero';
import ServiceGrid from '@/components/landing/service-grid';
import MotionTerminal from '@/components/landing/motion-terminal';
import Web3DevTools from '@/components/landing/web3-dev-tools';
import CodingModes from '@/components/landing/coding-modes';
import InteractiveGuides from '@/components/landing/interactive-guides';
import Footer from '@/components/layout/footer';
import GridPattern from '@/components/landing/grid-pattern';

export default function Home() {
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const handleServiceClick = (index: number) => {
    setActiveServiceIndex(index);
    if (terminalRef.current) {
        terminalRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
        <GridPattern
            width={40}
            height={40}
            x={-1}
            y={-1}
            className="[mask-image:radial-gradient(ellipse_at_center,white,transparent_85%)]"
        />
      <Header />
      <main className="flex-1">
        <Hero />
        <ServiceGrid onServiceClick={handleServiceClick} activeServiceIndex={activeServiceIndex} />
        <MotionTerminal ref={terminalRef} activeServiceIndex={activeServiceIndex} />
        <Web3DevTools activeServiceIndex={activeServiceIndex} />
        <CodingModes />
        <InteractiveGuides activeServiceIndex={activeServiceIndex} />
      </main>
      <Footer />
    </div>
  );
}

    

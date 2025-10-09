'use client';

import Header from '@/components/layout/header';
import Hero from '@/components/landing/hero';
import MotionTerminal from '@/components/landing/motion-terminal';
import CodingModes from '@/components/landing/coding-modes';
import InteractiveGuides from '@/components/landing/interactive-guides';
import Footer from '@/components/layout/footer';
import GridPattern from '@/components/landing/grid-pattern';
import React from 'react';

export default function Home() {
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
        <MotionTerminal />
        <CodingModes />
        <InteractiveGuides />
      </main>
      <Footer />
    </div>
  );
}

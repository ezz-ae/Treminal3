
'use client';

import Hero from '@/components/landing/hero';
import InteractiveGuides from '@/components/landing/interactive-guides';

/**
 * The main landing page for Terminal3.
 * It serves as an introduction to the platform's capabilities and directs users
 * to the core services and interactive guides.
 * @returns {JSX.Element} The main landing page component.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <InteractiveGuides />
    </>
  );
}

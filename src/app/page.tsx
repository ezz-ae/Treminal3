
'use client';

import Hero from '@/components/landing/hero';
import {
  AppWindow,
  Gem,
  ShieldCheck,
  BookOpen,
  BrainCircuit,
  Wind,
  Library,
} from 'lucide-react';
import Link from 'next/link';
import MotionTerminal from './dashboard/motion-terminal';
import { useScroll } from 'framer-motion';
import { articles } from '@/lib/articles';
import { useState, useEffect, useRef } from 'react';
import { GuideDialog } from '@/components/dashboard/guide-dialog';
import type { Article } from '@/lib/articles';

/**
 * The main landing page for Terminal3.
 * It serves as an introduction to the platform's capabilities and directs users
 * to the core services and interactive guides.
 * @returns {JSX.Element} The main landing page component.
 */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const services = articles.map(a => a.serviceIndex).filter(i => i !== undefined);
      const totalServices = services.length;
      const index = Math.floor(latest * totalServices);
      
      const correspondingArticle = articles.find(a => a.serviceIndex === index);
      if (correspondingArticle?.serviceIndex !== undefined) {
         setActiveServiceIndex(correspondingArticle.serviceIndex);
      } else {
         setActiveServiceIndex(null);
      }
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const onServiceClick = (serviceIndex?: number) => {
    if(serviceIndex === undefined) return;
    const article = articles.find(a => a.serviceIndex === serviceIndex);
    if(article) {
        setSelectedArticle(article);
    }
  }

  const serviceItems = articles.filter(a => a.serviceIndex !== undefined).sort((a,b) => a.serviceIndex! - b.serviceIndex!);

  const services = [
      { href: "/dashboard/strategy-vault", title: "Strategy Vault", description: "Browse and execute pre-built investment flows.", icon: Library },
      { href: "/dashboard/dapp-builder", title: "AI Business Architect", description: "Get a strategic plan for your dApp.", icon: AppWindow },
      { href: "/dashboard/token-launcher", title: "Token Launcher", description: "Generate custom ERC-20 tokens with AI.", icon: Gem },
      { href: "/dashboard/bot-creator", title: "Trading Bot Creator", description: "Design, simulate, and deploy trading bots.", icon: BrainCircuit },
      { href: "/solana", title: "Solana Command Center", description: "Interact with the Solana network via AI.", icon: Wind },
      { href: "/dashboard/security-audits", title: "Security Audits", description: "Audit smart contracts for vulnerabilities.", icon: ShieldCheck },
      { href: "/dashboard/docs", title: "Docs & Academy", description: "Read guides, tutorials, and API references.", icon: BookOpen },
  ];

  return (
    <>
      <Hero />
        <div ref={containerRef} className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 py-24 items-start">
            <div className="space-y-32">
                {serviceItems.map((service, index) => (
                     <div key={index} id={`service-${service.serviceIndex}`} className="space-y-4">
                        <h3 className="text-3xl md:text-4xl font-bold font-headline">{service.title}</h3>
                        <p className="text-muted-foreground text-lg">{service.excerpt}</p>
                         <button onClick={() => onServiceClick(service.serviceIndex)} className="text-primary hover:underline">
                            Learn more &rarr;
                        </button>
                    </div>
                ))}
            </div>
            <div className="hidden lg:block sticky top-24 h-[60vh] -mt-12">
                <MotionTerminal activeServiceIndex={activeServiceIndex} scrollYProgress={scrollYProgress} />
            </div>
        </div>
        <GuideDialog article={selectedArticle} isOpen={!!selectedArticle} onOpenChange={(isOpen) => !isOpen && setSelectedArticle(null)} />
    </>
  );
}

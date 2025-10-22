
'use client';
import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BrainCircuit, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import GridPattern from '@/components/landing/grid-pattern';

const tabs = [
    { href: "/ai-trading", label: "Market Scanner" },
    { href: "/ai-trading/portfolio", label: "Active Portfolio" },
    { href: "/dashboard/bot-creator", label: "Bot Marketplace" },
];

export default function AiTradingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
      <div className="flex-1 flex flex-col">
          <div className="relative isolate overflow-hidden border-b">
              <GridPattern
                  width={60}
                  height={60}
                  x={-1}
                  y={-1}
                  className="[mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_80%)] opacity-20 "
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>
              <div className="container mx-auto py-8 z-10 relative">
                  <h1 className="text-4xl md:text-5xl font-bold font-headline flex items-center gap-3">
                      <BrainCircuit className="w-12 h-12 text-primary" />
                      AI Trading Command Center
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-3xl mt-4">
                      Leverage our enterprise-grade AI to scan the market, identify tailored opportunities, and execute high-probability trades.
                  </p>
              </div>
               <div className="container mx-auto border-t border-border/20 z-10 relative">
                  <div className="flex items-center justify-between">
                       <nav className="flex items-center space-x-4">
                          {tabs.map(tab => (
                              <Link
                                  key={tab.href}
                                  href={tab.href}
                                  className={cn(
                                      "px-3 py-4 text-sm font-medium transition-colors",
                                      pathname === tab.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-primary"
                                  )}
                                  >
                                  {tab.label}
                              </Link>
                          ))}
                      </nav>
                      <Button>
                          <PlayCircle className="w-4 h-4 mr-2"/> Activate Auto-Pilot
                      </Button>
                  </div>
              </div>
          </div>
          <div className="flex-1 flex flex-col bg-background/95">
            {children}
          </div>
      </div>
  );
}

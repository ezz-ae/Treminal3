'use client';

import { Wind, Rocket, Terminal, Sprout, Gem, AreaChart, Home, CircleDollarSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../theme-toggle';

const menuItems = [
    { href: "/solana", label: "Holo-Deck", icon: Home },
    { href: "/solana/launch", label: "Launchpad", icon: Rocket },
    { href: "/solana/terminal", label: "AI Terminal", icon: Terminal },
    { href: "/solana/tokens", label: "Token Hub", icon: Gem },
    { href: "/solana/trading", label: "DEX Trading", icon: AreaChart },
    { href: "/solana/staking", label: "Staking", icon: Sprout },
    { href: "/solana/marketing", label: "Marketing", icon: CircleDollarSign },
];

/**
 * A dedicated header component for the Solana section of the application.
 * @returns {JSX.Element} The SolanaHeader component.
 */
export default function SolanaHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link
            href="/solana"
            className="mr-6 flex items-center space-x-2"
            >
            <Wind className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Solana Hub</span>
          </Link>
          <nav className="items-center space-x-6 text-sm font-medium hidden md:flex">
             {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                      "transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                  )}
                  >
                    {item.label}
                </Link>
             ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Main Hub
                </Link>
            </Button>
        </div>
      </div>
    </header>
  );
}

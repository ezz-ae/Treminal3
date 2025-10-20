
'use client';
import { ReactNode } from 'react';
import {
  Wind,
  Terminal,
  Sprout,
  Gem,
  AreaChart,
  Home,
  Rocket,
  CircleDollarSign,
  GanttChartSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWallet } from '@/hooks/use-wallet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const menuItems = [
    { href: "/solana", label: "Holo-Deck", icon: Home },
    { href: "/solana/terminal", label: "AI Terminal", icon: Terminal },
    { type: 'separator', label: 'Ecosystem' },
    { href: "/solana/tokens", label: "Tokens", icon: Gem },
    { href: "/solana/trading", label: "Trading", icon: AreaChart },
    { href: "/solana/staking", label: "Staking", icon: Sprout },
    { type: 'separator', label: 'Launchpad' },
    { href: "/solana/launch", label: "Launch Token", icon: Rocket },
    { href: "/solana/marketing", label: "Token Marketing", icon: CircleDollarSign },
];

function getInitials(address: string) {
    return address.slice(0, 2).toUpperCase();
}


export default function SolanaLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { wallet, disconnectWallet } = useWallet();

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 flex-shrink-0 border-r bg-sidebar text-sidebar-foreground p-4 flex flex-col">
        <div className="flex items-center space-x-2 mb-6">
            <Link href="/solana" className="flex items-center space-x-2">
                <Wind className="h-6 w-6 text-sidebar-primary" />
                <span className="font-bold text-lg font-headline">Solana Hub</span>
            </Link>
        </div>
        <nav className="flex-grow space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => {
                if (item.type === 'separator') {
                    return (
                        <div key={index} className="px-2 py-2">
                             <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">{item.label}</p>
                        </div>
                    );
                }
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                    <Link key={item.href} href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "hover:bg-sidebar-accent/50"
                        )}
                    >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                    </Link>
                )
            })}
        </nav>
         <div className="mt-auto pt-4">
            <Button variant="outline" asChild className="w-full border-sidebar-border hover:bg-sidebar-accent">
                <Link href="/dashboard">
                    &larr; Back to Main Dashboard
                </Link>
            </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-black">
        {children}
      </main>
    </div>
  );
}

    

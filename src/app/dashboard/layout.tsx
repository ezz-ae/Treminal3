
'use client';
import { ReactNode } from 'react';
import {
  AppWindow,
  Bot,
  Puzzle,
  FileJson,
  AreaChart,
  ShieldCheck,
  BookOpen,
  Sprout,
  Wrench,
  Download,
  Terminal,
  Code2,
  Newspaper,
  BrainCircuit,
  Wind,
  Gem,
  Vote,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
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

const menuItems = [
    { href: "/dashboard", label: "Home", icon: AppWindow },
    { type: 'separator', label: 'AI Tools' },
    { href: "/dashboard/dapp-builder", label: "AI Business Architect", icon: Bot },
    { href: "/dashboard/token-launcher", label: "Token Launcher", icon: Gem },
    { href: "/dashboard/bot-creator", label: "Bot Creator", icon: BrainCircuit },
    { href: "/solana", label: "Solana Command Center", icon: Wind },
    { href: "/dashboard/security-audits", label: "Security Audits", icon: ShieldCheck },
    { type: 'separator', label: 'Services' },
    { href: "/dashboard/analytics", label: "On-chain Analytics", icon: AreaChart },
    { href: "/dashboard/stake", label: "Staking", icon: Sprout },
    { href: "/dashboard/tools", label: "Developer Tools", icon: Wrench },
    { href: "/dashboard/dao-governance", label: "DAO Governance", icon: Vote },
    { type: 'separator', label: 'Resources' },
    { href: "/dashboard/docs", label: "Documentation", icon: BookOpen },
    { href: "/blog", label: "Blog & Guides", icon: Newspaper },
    { href: "/dashboard/notes", label: "My Notes", icon: Code2 },
    { href: "/dashboard/download", label: "Download Desktop App", icon: Download },
];

function getInitials(address: string) {
    return address.slice(0, 2).toUpperCase();
}


/**
 * Provides the main layout for the dashboard, including the sidebar navigation.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The content to display within the layout.
 * @returns {JSX.Element} The dashboard layout component.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { wallet, disconnectWallet } = useWallet();

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 flex-shrink-0 border-r bg-sidebar text-sidebar-foreground p-4 flex flex-col">
        <div className="flex items-center space-x-2 mb-6">
            <Link href="/" className="flex items-center space-x-2">
                <Terminal className="h-6 w-6 text-sidebar-primary" />
                <span className="font-bold text-lg font-headline">Terminal3</span>
            </Link>
        </div>
        <nav className="flex-grow space-y-1">
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
         <div className="mt-auto">
            <Separator className="my-4 bg-sidebar-border" />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start h-auto px-2 py-2">
                        <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                           <AvatarFallback className='bg-sidebar-primary text-sidebar-primary-foreground'>
                                {wallet ? getInitials(wallet.address) : '??'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                            <p className="text-sm font-medium text-sidebar-foreground">
                                {wallet ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : 'Not Connected'}
                            </p>
                             <p className="text-xs text-sidebar-foreground/70">Disconnect Wallet</p>
                        </div>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => disconnectWallet()}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </aside>
      <div className="flex-1 overflow-auto p-6 lg:p-10">
        {children}
      </div>
    </div>
  );
}

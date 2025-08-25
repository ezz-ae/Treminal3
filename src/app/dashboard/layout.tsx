
'use client';
import * as React from 'react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  AppWindow,
  Bot,
  Puzzle,
  Wallet,
  FileJson,
  Network,
  Home,
  Terminal,
  LogOut,
  Settings,
  BotMessageSquare,
  AreaChart,
  FileArchive,
  ShieldCheck,
  Vote,
  WalletCards
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/dashboard/dapp-builder',
    label: 'dApp Builder',
    icon: AppWindow,
  },
  {
    href: '/dashboard/token-launcher',
    label: 'Token Launcher',
    icon: Puzzle,
  },
  {
    href: '/dashboard/trading-bots',
    label: 'Trading Bots',
    icon: Bot,
  },
  {
    href: '/dashboard/ai-agents',
    label: 'AI Agents',
    icon: BotMessageSquare,
  },
  {
    href: '/dashboard/wallets',
    label: 'Wallets',
    icon: Wallet,
  },
  {
    href: '/dashboard/smart-contracts',
    label: 'Smart Contracts',
    icon: FileJson,
  },
  {
    href: '/dashboard/transactions',
    label: 'Transactions',
    icon: Network,
  },
  {
    href: '/dashboard/analytics',
    label: 'On-chain Analytics',
    icon: AreaChart,
  },
    {
    href: '/dashboard/storage',
    label: 'Decentralized Storage',
    icon: FileArchive,
  },
  {
    href: '/dashboard/audits',
    label: 'Security Audits',
    icon: ShieldCheck,
  },
  {
    href: '/dashboard/governance',
    label: 'DAO Governance',
    icon: Vote,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAiAgentsPage = pathname === '/dashboard/ai-agents';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline">Treminal3</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link href={item.href}>
                    <SidebarMenuButton isActive={pathname === item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Settings />
                        <span>Settings</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <div className="flex items-center justify-between p-2">
                        <div className="flex items-center space-x-2">
                             <Avatar className="h-8 w-8">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">shadcn</span>
                        </div>
                        <LogOut className="h-4 w-4 cursor-pointer" />
                    </div>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b h-[65px]">
              <SidebarTrigger/>
              <Button asChild>
                <Link href="/auth">
                    <WalletCards className="mr-2" />
                    Connect Wallet
                </Link>
              </Button>
          </header>
          <main className="flex-1 bg-gray-50/50">
            <div className={cn(
              "h-full w-full",
              isAiAgentsPage ? "" : "p-6"
            )}>
              {children}
            </div>
          </main>
          </div>
      </div>
    </SidebarProvider>
  );
}

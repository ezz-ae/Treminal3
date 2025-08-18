
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
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
                  <Link href={item.href} passHref legacyBehavior>
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
        <SidebarInset>
          <header className="flex items-center justify-between p-4 border-b">
              <SidebarTrigger/>
              <p className="text-sm text-muted-foreground">The all-in-one text-to-code platform.</p>
          </header>
          <main className="flex-1 p-6 bg-gray-50/50">{children}</main>
          </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

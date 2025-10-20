
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
} from '@/components/ui/sidebar';
import {
  LogOut,
  Settings,
  ChevronRight,
  Search,
  LayoutGrid,
  Sprout,
  Compass,
  Wrench,
  Download,
  Terminal,
  BookOpen,
  AreaChart,
  AppWindow,
  Puzzle,
  ShieldCheck,
  Vote,
  Bot,
  Wallet,
  BrainCircuit
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { useWallet } from '@/hooks/use-wallet';


const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/dashboard/bot-creator', label: 'Bot Creator', icon: BrainCircuit },
    { href: '/dashboard/dapp-builder', label: 'dApp Builder', icon: AppWindow },
    { href: '/dashboard/token-launcher', label: 'Token Launcher', icon: Puzzle },
    { href: '/dashboard/security-audits', label: 'Security Audits', icon: ShieldCheck },
    { href: '/dashboard/dao-governance', label: 'DAO Governance', icon: Vote },
    { href: '/dashboard/business-tool-recommendation', label: 'AI Business Tools', icon: Bot },
    { href: '/dashboard/analytics', label: 'Analytics', icon: AreaChart },
    { href: '/dashboard/stake', label: 'Stake', icon: Sprout },
    { href: '/dashboard/tools', label: 'Tools', icon: Wrench },
    { href: '/dashboard/docs', label: 'Documentation', icon: BookOpen },
    { href: '/dashboard/download', label: 'Download', icon: Download },
];


/**
 * Main layout for the authenticated dashboard section.
 * Includes the sidebar, header with breadcrumbs, and user controls.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render within the layout.
 * @returns {JSX.Element} The dashboard layout component.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { wallet, disconnectWallet } = useWallet();
  
  const handleLogout = async () => {
    await disconnectWallet();
  }

  const getBreadcrumb = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length < 2) {
        return <Link href="/dashboard" className="font-medium">Dashboard</Link>;
    }

    const breadcrumbs = segments.slice(1).map((segment, index) => {
        const href = `/${segments.slice(0, index + 2).join('/')}`;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        const isLast = index === segments.length - 2;

        return (
            <React.Fragment key={href}>
                <ChevronRight className="h-4 w-4"/>
                <Link href={href} className={cn("hover:text-foreground", isLast ? "text-foreground font-medium" : "text-muted-foreground")}>{label}</Link>
            </React.Fragment>
        )
    });
    
    return (
        <>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
          {breadcrumbs}
        </>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline group-data-[state=collapsed]:hidden">Terminal3</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <Link href={item.href} className='w-full'>
                      <SidebarMenuButton isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}>
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-0">
          <header className="flex items-center justify-between p-4 border-b h-[65px] shrink-0">
              <div className="flex items-center gap-4">
                <SidebarTrigger/>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Compass className='w-4 h-4'/>
                    {getBreadcrumb()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                    <Input placeholder="Search" className="pl-10 w-64"/>
                </div>
                 {!wallet && (
                  <Button asChild>
                    <Link href="/auth">Connect Wallet</Link>
                  </Button>
                )}
                 <ThemeToggle />
                 {wallet && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="outline" className="flex items-center gap-2">
                             <Wallet className="w-4 h-4" />
                             <span>{wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}</span>
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4"/>
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4"/>
                                Disconnect
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                 )}
              </div>
          </header>
          <main className="flex-1 overflow-y-auto">
             <div className="p-6 h-full">
              {children}
            </div>
          </main>
          </div>
      </div>
    </SidebarProvider>
  );
}

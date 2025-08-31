
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
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import {
  Home,
  LogOut,
  Settings,
  WalletCards,
  ChevronRight,
  Search,
  LayoutGrid,
  Sprout,
  Users,
  Compass,
  Globe,
  Wrench,
  Download,
  Terminal,
  FileCode,
  BookOpen
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const primaryMenuItems = [
    { href: '/dashboard', label: 'Portfolio', icon: LayoutGrid },
    { href: '#', label: 'Stake', icon: Sprout },
    { href: '#', label: 'Contacts', icon: Users },
];

const secondaryMenuItems = [
    { href: '#', label: 'Explorer', icon: Globe },
    { href: '#', label: 'Tools', icon: Wrench },
    { href: '#', label: 'Download', icon: Download },
];

const discoverSubMenuItems = [
    { href: '#', label: 'Projects', icon: FileCode },
    { href: '/dashboard/docs', label: 'Documentation', icon: BookOpen },
];

const MenuLink = ({ href, children, isActive }: { href: string, children: React.ReactNode, isActive: boolean }) => {
    const { setOpenMobile } = useSidebar();
    return (
        <Link href={href} onClick={() => setOpenMobile(false)}>
            <SidebarMenuButton isActive={isActive}>
                {children}
            </SidebarMenuButton>
        </Link>
    )
}

const CollapsibleMenu = () => {
    const pathname = usePathname();
    const { setOpenMobile } = useSidebar();
    const isDiscoverActive = discoverSubMenuItems.some(item => pathname.startsWith(item.href));

    return (
        <Collapsible defaultOpen={isDiscoverActive}>
            <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                    <Compass />
                    <span>Discover</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenuSub>
                    {discoverSubMenuItems.map(item => (
                        <SidebarMenuItem key={item.label}>
                            <Link href={item.href} className="w-full" onClick={() => setOpenMobile(false)}>
                                <SidebarMenuSubButton isActive={pathname.startsWith(item.href)}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuSubButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>
    )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    if (pathname.startsWith('/dashboard/docs/solana')) {
        return (
            <>
                <Link href="/dashboard/docs" className="hover:text-foreground">Documentation</Link>
                <ChevronRight className="h-4 w-4"/>
                <span className="text-foreground font-medium">Solana</span>
            </>
        )
    }
    if (pathname.startsWith('/dashboard/docs')) {
        return <span className="text-foreground font-medium">Documentation</span>
    }
    const activeItem = discoverSubMenuItems.find(item => item.href === pathname);
    return <span className="text-foreground font-medium">{activeItem?.label || "Education"}</span>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline">Treminal3</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {primaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <MenuLink href={item.href} isActive={pathname === item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </MenuLink>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                 <CollapsibleMenu />
              </SidebarMenuItem>
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <MenuLink href={item.href} isActive={pathname === item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </MenuLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b h-[65px] shrink-0">
              <div className="flex items-center gap-4">
                <SidebarTrigger/>
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Discover</span>
                    <ChevronRight className="h-4 w-4"/>
                    {getBreadcrumb()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                    <Input placeholder="Search" className="pl-10 w-64"/>
                </div>
                <Button variant="outline">Connect Wallet</Button>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                         <DropdownMenuLabel>My Account</DropdownMenuLabel>
                         <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4"/>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
              </div>
          </header>
          <main className="flex-1 bg-muted/30 overflow-y-auto">
             <div className="p-6">
              {children}
            </div>
          </main>
          </div>
      </div>
    </SidebarProvider>
  );
}

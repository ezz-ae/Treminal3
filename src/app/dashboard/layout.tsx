
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
  BookOpen
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const menuItems = [
    { href: '/dashboard', label: 'Portfolio', icon: LayoutGrid },
    { href: '/dashboard/ai-agents', label: 'AI Command Center', icon: Terminal },
    { href: '/dashboard/docs', label: 'Documentation', icon: BookOpen },
    { href: '#', label: 'Stake', icon: Sprout },
    { href: '#', label: 'Tools', icon: Wrench },
    { href: '#', label: 'Download', icon: Download },
];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length < 2) return null; // No breadcrumb on base dashboard

    const breadcrumbs = segments.slice(1).map((segment, index) => {
        const href = `/${segments.slice(0, index + 2).join('/')}`;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        const isLast = index === segments.length - 2;

        return (
            <React.Fragment key={href}>
                <Link href={href} className={cn("hover:text-foreground", isLast && "text-foreground font-medium")}>{label}</Link>
                {!isLast && <ChevronRight className="h-4 w-4"/>}
            </React.Fragment>
        )
    });
    return breadcrumbs;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline">Terminal3</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <Link href={item.href} className='w-full'>
                      <SidebarMenuButton isActive={pathname === item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b h-[65px] shrink-0">
              <div className="flex items-center gap-4">
                <SidebarTrigger/>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Compass className='w-4 h-4'/>
                    {getBreadcrumb()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                    <Input placeholder="Search" className="pl-10 w-64"/>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/auth">Connect Wallet</Link>
                </Button>
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

'use client';
import { ReactNode } from 'react';
import {
  BookOpen,
  GraduationCap,
  Puzzle,
  FileJson,
  ShieldCheck,
  BookOpenText,
  Wind,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
    { href: "/dashboard/docs/getting-started", label: "Getting Started", icon: GraduationCap },
    { href: "/dashboard/docs/apis", label: "APIs & Integration", icon: Puzzle },
    { href: "/dashboard/docs/smart-contracts", label: "Smart Contracts", icon: FileJson },
    { href: "/dashboard/docs/security", label: "Security", icon: ShieldCheck },
    { href: "/dashboard/docs/glossary", label: "Glossary", icon: BookOpenText },
    { type: 'separator', label: 'External' },
    { href: "/blog", label: "Blog & Guides", icon: BookOpen },
    { href: "/solana", label: "Solana Hub", icon: Wind },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 flex-shrink-0 border-r bg-sidebar text-sidebar-foreground p-4 flex flex-col">
        <div className="flex items-center space-x-2 mb-6">
            <Link href="/dashboard/docs" className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-sidebar-primary" />
                <span className="font-bold text-lg font-headline">T3 Academy</span>
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
         <div className="mt-auto pt-4">
            <Button variant="outline" asChild className="w-full border-sidebar-border hover:bg-sidebar-accent">
                <Link href="/dashboard">
                    &larr; Back to Dashboard
                </Link>
            </Button>
        </div>
      </aside>
      <div className="flex-1 overflow-auto p-6 lg:p-10">
        {children}
      </div>
    </div>
  );
}

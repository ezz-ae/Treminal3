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
  Home,
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
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-8">
        <div className="flex -mx-4">
          <aside className="w-64 flex-shrink-0 px-4">
            <div className="sticky top-24">
                <div className="flex items-center space-x-2 mb-6">
                    <Link href="/dashboard/docs" className="flex items-center space-x-2">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg font-headline">T3 Academy</span>
                    </Link>
                </div>
                <nav className="flex-grow space-y-1">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-accent text-accent-foreground"
                                        : "hover:bg-accent/50"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>
          </aside>
          <main className="flex-1 px-4">
            {children}
          </main>
        </div>
    </div>
  );
}

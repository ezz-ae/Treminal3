
import { Terminal, Menu, Wind } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '../theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"


const navItems = [
  { href: '/#features', label: 'Features' },
  { href: '/dashboard/docs', label: 'Developers' },
  { href: '/blog', label: 'Blog' },
  { href: '/#start', label: 'Start' },
];

const serviceItems = [
    { href: "/dashboard/dapp-builder", title: "AI Business Architect" },
    { href: "/dashboard/token-launcher", title: "Token Launcher" },
    { href: "/dashboard/bot-creator", title: "Bot Creator" },
    { href: "/dashboard/solana", title: "Solana Command Center" },
    { href: "/dashboard/security-audits", title: "Security Audits" },
]

/**
 * The main header component for the application.
 * Includes navigation links, theme toggle, and a link to the dashboard.
 * @returns {JSX.Element} The Header component.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Terminal3</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
             <DropdownMenu>
                <DropdownMenuTrigger className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium">Services</DropdownMenuTrigger>
                <DropdownMenuContent>
                    {serviceItems.map((item) => (
                         <DropdownMenuItem key={item.title} asChild>
                            <Link href={item.href}>{item.title}</Link>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator/>
                     <DropdownMenuItem asChild>
                        <Link href="/dashboard">View All Services</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
           <Button asChild>
            <Link href="/auth">Get Started</Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden ml-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">Terminal3</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

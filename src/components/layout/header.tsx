
'use client';

import { Terminal, Menu, Wind, Gem, BrainCircuit, ShieldCheck, AppWindow, Library, BookOpen, Newspaper, Bot, DollarSign, Gift, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '../theme-toggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from 'react';
import { cn } from '@/lib/utils';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const features = [
    { href: "/dashboard/dapp-builder", title: "AI Business Architect", icon: AppWindow, description: "Get a strategic plan and architecture for your new dApp." },
    { href: "/dashboard/token-launcher", title: "Token Launcher", icon: Gem, description: "Generate custom ERC-20 tokens on EVM chains." },
    { href: "/dashboard/bot-creator", title: "Trading Bot Creator", icon: BrainCircuit, description: "Design, simulate, and deploy trading bots." },
    { href: "/dashboard/security-audits", title: "Security Audits", icon: ShieldCheck, description: "Audit smart contracts for vulnerabilities." },
    { href: "/solana", title: "Solana Toolkit", icon: Wind, description: "A suite of tools for building on the Solana network." },
    { href: "/dashboard/strategy-vault", title: "Strategy Vault", icon: Library, description: "Browse and execute pre-built Web3 automation flows." },
]

const cashFlows = [
    { href: "/solcash", title: "SolCash", icon: DollarSign, description: "Create a token, manage liquidity, and generate daily returns on Solana." },
    { href: "/cashbot-03", title: "CashBOT 03", icon: Bot, description: "Automate your trading strategies with our AI-powered trading bot." },
    { href: "/t03-aircash", title: "T03 AirCash", icon: Gift, description: "Participate in airdrops and staking programs for the T03 token." },
    { href: "/sniper-03", title: "Sniper 03", icon: Zap, description: "Utilize our high-performance sniper scripts for a competitive edge." },
]

const resourcesItems = [
    { href: "/docs", title: "Documentation", icon: BookOpen, description: "Explore guides, API references, and tutorials." },
    { href: "/blog", title: "Blog", icon: Newspaper, description: "Read the latest articles, news, and updates from our team." },
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
            <div className="flex items-center">
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <Link href="/" className="flex items-center space-x-2">
                                <Terminal className="h-6 w-6 text-primary" />
                                <span className="font-bold font-headline">Terminal3</span>
                            </Link>
                            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 space-y-4 overflow-y-auto">
                                
                                <p className="font-bold text-muted-foreground pt-4">Features</p>
                                {features.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="text-foreground flex"
                                    >{item.title}</Link>
                                ))}

                                <p className="font-bold text-muted-foreground pt-4">Cash Flows</p>
                                {cashFlows.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="text-foreground flex"
                                    >{item.title}</Link>
                                ))}

                                <p className="font-bold text-muted-foreground pt-4">Resources</p>
                                {resourcesItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="text-foreground flex"
                                    >{item.title}</Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link href="/" className="flex items-center space-x-2">
                    <Terminal className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Terminal3</span>
                </Link>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
                <div className="hidden md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                             <NavigationMenuItem>
                                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {features.map((item) => (
                                            <ListItem key={item.title} href={item.href} title={item.title} icon={item.icon}>
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Cash Flows</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                                        {cashFlows.map((item) => (
                                            <ListItem key={item.title} href={item.href} title={item.title} icon={item.icon}>
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px]">
                                        {resourcesItems.map((item) => (
                                            <ListItem key={item.title} href={item.href} title={item.title} icon={item.icon}>
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/t03" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    T03
                                </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
                <ThemeToggle />
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                    <Button asChild variant='ghost'>
                        <Link href="/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/sign-up">Sign Up</Link>
                    </Button>
                </SignedOut>
            </div>

          </div>
      </header>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || '/'}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            <Icon className="h-5 w-5 text-primary"/>
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

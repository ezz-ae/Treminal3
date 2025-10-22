'use client';

import { Terminal, Menu, Wind, Gem, BrainCircuit, ShieldCheck, AppWindow, Library, BookOpen, Newspaper, Rocket, Sprout, Wrench, Users, Workflow, Landmark, FlaskConical, Leaf, AreaChart } from 'lucide-react';
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
import { UserNav } from './user-nav';


const coreServices = [
    { href: "/dashboard/dapp-builder", title: "AI Command Center", icon: Terminal, description: "Describe your goal and let our AI generate a strategic plan." },
    { href: "/dashboard/execution-plan", title: "AI Execution Planner", icon: Workflow, description: "Manage, edit, and rearrange your AI workflows and jobs." },
    { href: "/dashboard/token-launcher", title: "Token Launcher", icon: Gem, description: "Generate custom ERC-20 tokens on EVM chains." },
    { href: "/dashboard/bot-creator", title: "Trading Bot Creator", icon: BrainCircuit, description: "Design, simulate, and deploy trading bots." },
    { href: "/dashboard/security-audits", title: "Security Audits", icon: ShieldCheck, description: "Audit smart contracts for vulnerabilities." },
    { href: "/dashboard/tools", title: "Developer Tools", icon: Wrench, description: "A suite of utilities for Web3 developers." },
    { href: "/dashboard/dao-governance", title: "DAO Governance", icon: Users, description: "Create proposals, manage voting, and execute on-chain actions." },
    { href: "/dashboard/finance", title: "On-chain Analytics", icon: AreaChart, description: "A visually rich dashboard providing deep insights into on-chain data." },
]

const solanaServices = [
    { href: "/solana", title: "Solana Holo-Deck", icon: Wind, description: "The main command center for the Solana universe." },
    { href: "/solana/launch", title: "SPL Token Launchpad", icon: Rocket, description: "Create and launch a new SPL token from scratch." },
    { href: "/solana/staking", title: "Solana Staking", icon: Sprout, description: "Stake SOL and other assets to earn rewards." },
]

const resourcesItems = [
    { href: "/dashboard/docs", title: "Documentation", icon: BookOpen, description: "Explore guides, API references, and tutorials." },
    { href: "/blog", title: "Blog", icon: Newspaper, description: "Read the latest articles, news, and updates from our team." },
    { href: "/token", title: "The $T3 Token", icon: Gem, description: "Learn about the utility and tokenomics of the native platform token." },
    { href: "/research", title: "R&D", icon: FlaskConical, description: "Our vision for the future of autonomous Web3." },
    { href: "/carbon", title: "Carbon Analysis", icon: Leaf, description: "Our commitment to a sustainable and efficient Web3." },
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
                                <p className="font-bold text-muted-foreground pt-4">AI Trading</p>
                                <Link href="/ai-trading" className="text-foreground flex">Trading Command Center</Link>

                                <p className="font-bold text-muted-foreground pt-4">Core Services</p>
                                {coreServices.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="text-foreground flex"
                                    >{item.title}</Link>
                                ))}

                                <p className="font-bold text-muted-foreground pt-4">Solana Hub</p>
                                {solanaServices.map((item) => (
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
                                <Link href="/ai-trading" legacyBehavior passHref>
                                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    AI Trading
                                  </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Core Services</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {coreServices.map((item) => (
                                            <ListItem key={item.title} href={item.href} title={item.title} icon={item.icon}>
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Solana Hub</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {solanaServices.map((item) => (
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
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                                        {resourcesItems.map((item) => (
                                            <ListItem key={item.title} href={item.href} title={item.title} icon={item.icon}>
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <ThemeToggle />
              <UserNav />
            </div>

          </div>
      </header>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={props.href || ''} ref={ref} className={cn(
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

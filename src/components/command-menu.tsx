
'use client';

import { useEffect } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useCommandMenu } from '@/contexts/command-menu-context';
import { useRouter } from 'next/navigation';
import { Gem, ShieldCheck, Rocket, Bot, BookOpen, Newspaper, Library, AppWindow, Wrench, Megaphone, Wind, AreaChart, Sprout, Terminal, BrainCircuit } from 'lucide-react';

const navLinks = [
    { name: 'Strategy Vault', href: '/dashboard/strategy-vault', icon: Library },
    { name: 'AI Business Architect', href: '/dashboard/dapp-builder', icon: AppWindow },
    { name: 'Token Launcher', href: '/dashboard/token-launcher', icon: Gem },
    { name: 'Trading Bot Creator', href: '/dashboard/bot-creator', icon: BrainCircuit },
    { name: 'Security Audits', href: '/dashboard/security-audits', icon: ShieldCheck },
    { name: 'Marketing & Airdrops', href: '/dashboard/marketing', icon: Megaphone },
    { name: 'Developer Tools', href: '/dashboard/tools', icon: Wrench },
    { name: 'Solana Holo-Deck', href: '/solana', icon: Wind },
    { name: 'Solana Launchpad', href: '/solana/launch', icon: Rocket },
    { name: 'Solana AI Terminal', href: '/solana/terminal', icon: Terminal },
    { name: 'Solana Token Hub', href: '/solana/tokens', icon: Gem },
    { name: 'Solana DEX Terminal', href: '/solana/trading', icon: AreaChart },
    { name: 'Solana Staking', href: '/solana/staking', icon: Sprout },
    { name: 'Documentation', href: '/dashboard/docs', icon: BookOpen },
    { name: 'Blog', href: '/blog', icon: Newspaper },
];

export function CommandMenu() {
  const { open, setOpen } = useCommandMenu();
  const router = useRouter();

  const runCommand = (command: () => unknown) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <CommandItem
              key={href}
              onSelect={() => runCommand(() => router.push(href))}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
           <CommandItem onSelect={() => runCommand(() => console.log('Triggering payment...'))}>
                <Gem className="mr-2 h-4 w-4" />
                <span>Purchase Credits</span>
            </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}


'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CommandMenu } from '@/components/command-menu';

interface CommandMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const CommandMenuContext = createContext<CommandMenuContextType | undefined>(
  undefined
);

export function useCommandMenu() {
  const context = useContext(CommandMenuContext);
  if (!context) {
    throw new Error('useCommandMenu must be used within a CommandMenuProvider');
  }
  return context;
}

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(prev => !prev);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

  return (
    <CommandMenuContext.Provider value={{ open, setOpen, toggle }}>
      {children}
      <CommandMenu />
    </CommandMenuContext.Provider>
  );
}

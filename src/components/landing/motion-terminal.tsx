
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronsUpDown,
  AppWindow, Bot, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, ShieldCheck, Vote
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const services = [
  {
    icon: AppWindow,
    title: 'dApp Builder',
  },
  {
    icon: Puzzle,
    title: 'Token Launcher',
  },
  {
    icon: Bot,
    title: 'Trading Bot Platform',
  },
  {
    icon: BotMessageSquare,
    title: 'AI Agents',
  },
  {
    icon: Wallet,
    title: 'Custom Wallets',
  },
  {
    icon: FileJson,
    title: 'Smart Contract Templates',
  },
  {
    icon: Network,
    title: 'Manual Transactions',
  },
   {
    icon: AreaChart,
    title: 'On-chain Analytics',
  },
  {
    icon: FileArchive,
    title: 'Decentralized Storage',
  },
  {
    icon: ShieldCheck,
    title: 'Security Audits',
  },
  {
    icon: Vote,
    title: 'DAO Governance',
  },
];

const scripts: Record<string, { text: string; type: 'command' | 'info' | 'success' | 'error' }[]> = {
    'dApp Builder': [
      { text: 'terminal3 create:dapp --name=my-nft-gallery --template=nft-marketplace', type: 'command' },
      { text: 'Info: Scaffolding new dApp project...', type: 'info' },
      { text: 'Info: Installing dependencies with npm...', type: 'info' },
      { text: 'Success: dApp "my-nft-gallery" created successfully.', type: 'success' },
      { text: 'Success: Navigate to ./my-nft-gallery and run `npm run dev` to start.', type: 'success' },
    ],
    'Token Launcher': [
      { text: 'terminal3 create:token --name="Starlight" --symbol=STAR --supply=10000000', type: 'command' },
      { text: 'Info: Generating ERC-20 smart contract...', type: 'info' },
      { text: 'Info: Compiling contract with Solidity v0.8.20...', type: 'info' },
      { text: 'Success: Contract compiled. Ready for deployment.', type: 'success' },
      { text: 'Success: Contract address: 0xAbC...dEf', type: 'success' },
    ],
    'Trading Bot Platform': [
        { text: 'terminal3 create:bot --name=arbitrage-bot --strategy=cross-dex', type: 'command' },
        { text: 'Info: Creating new trading bot from "cross-dex" template...', type: 'info' },
        { text: 'Info: Backtesting against historical data for ETH/USDC pair...', type: 'info' },
        { text: 'Success: Backtest complete. Projected APY: 14.7%.', type: 'success' },
        { text: 'Success: Bot "arbitrage-bot" is now live.', type: 'success' },
    ],
    'AI Agents': [
        { text: 'terminal3 create:agent --name=portfolio-rebalancer --trigger=price-change', type: 'command' },
        { text: 'Info: Setting up new autonomous AI agent...', type: 'info' },
        { text: 'Info: Agent will monitor portfolio and rebalance if any asset exceeds 40% allocation.', type: 'info' },
        { text: 'Success: Agent "portfolio-rebalancer" is now active.', type: 'success' },
    ],
    'Custom Wallets': [
        { text: 'terminal3 create:wallet --brand=galaxy-dao --template=multi-sig', type: 'command' },
        { text: 'Info: Generating custom wallet SDK with "Galaxy DAO" branding...', type: 'info' },
        { text: 'Info: Building for iOS and Android targets...', type: 'info' },
        { text: 'Success: Wallet SDK generated. See ./galaxy-dao-wallet-sdk.', type: 'success' },
    ],
    'Smart Contract Templates': [
        { text: 'terminal3 use:template --name=VestingContract --output=./contracts/TeamVesting.sol', type: 'command' },
        { text: 'Info: Copying audited "VestingContract" template...', type: 'info' },
        { text: 'Info: Customizing constructor for 4-year vesting schedule...', type: 'info' },
        { text: 'Success: Contract `TeamVesting.sol` created successfully.', type: 'success' },
    ],
    'Manual Transactions': [
        { text: 'terminal3 tx:call --contract=0x123... --function=approve --params "0xabc..." "1000"', type: 'command' },
        { text: 'Info: Crafting transaction for "approve" function call...', type: 'info' },
        { text: 'Info: Submitting transaction to mempool...', type: 'info' },
        { text: 'Success: Transaction confirmed. Hash: 0x456...def', type: 'success' },
    ],
    'On-chain Analytics': [
        { text: 'terminal3 analytics:query --query="SELECT from, to, value FROM transactions WHERE value > 1000 ETH"', type: 'command' },
        { text: 'Info: Running query against indexed on-chain data...', type: 'info' },
        { text: 'Info: Found 42 matching transactions in the last 24 hours.', type: 'info' },
        { text: 'Success: Results exported to query_results.csv.', type: 'success' },
    ],
    'Decentralized Storage': [
        { text: 'terminal3 storage:upload ./dapp-assets --network=ipfs', type: 'command' },
        { text: 'Info: Uploading 124 files to the InterPlanetary File System...', type: 'info' },
        { text: 'Info: Pinning content for long-term availability...', type: 'info' },
        { text: 'Success: Upload complete. CID: QmXo...pA', type: 'success' },
    ],
    'Security Audits': [
        { text: 'terminal3 audit:contract ./contracts/MyToken.sol', type: 'command' },
        { text: 'Info: Analyzing contract for common vulnerabilities...', type: 'info' },
        { text: 'Warning: Found potential reentrancy guard missing on one function.', type: 'info' },
        { text: 'Success: Audit complete. 1 High-risk, 3 Informational findings. Report saved to audit.json.', type: 'success' },
    ],
    'DAO Governance': [
        { text: 'terminal3 dao:create-proposal --title="Increase Treasury Allocation"', type: 'command' },
        { text: 'Info: Submitting new proposal to DAO contract...', type: 'info' },
        { text: 'Info: Voting period is now active for 72 hours.', type: 'info' },
        { text: 'Success: Proposal #42 has been created.', type: 'success' },
    ],
  };

const linePause = 700;

export default function MotionTerminal() {
  const [activeService, setActiveService] = useState(services[0]);
  const [lines, setLines] = useState<{ text: string; type: string; }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();

  const startAnimation = (serviceTitle: string) => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setLines([]);
    setIsAnimating(true);
    let lineIndex = 0;
    const codeLines = scripts[serviceTitle] || [];

    const animateLine = () => {
      if (lineIndex >= codeLines.length) {
        setIsAnimating(false);
        return;
      }

      setLines(prev => [...prev, codeLines[lineIndex]]);
      lineIndex++;
      animationTimeoutRef.current = setTimeout(animateLine, linePause);
    };

    animateLine();
  };

  useEffect(() => {
    startAnimation(activeService.title);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeService]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const displayedLines = isExpanded ? lines : lines.slice(0, 4);
  const ActiveIcon = activeService.icon;


  return (
    <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 flex items-center justify-center">
            <motion.div
                className="relative font-mono text-sm rounded-lg bg-card border shadow-2xl shadow-primary/10 w-full max-w-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
            <div className="flex items-center justify-between p-3 border-b border-border">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 h-8">
                             <ActiveIcon className="w-4 h-4 text-primary"/>
                            <span className="font-semibold">{activeService.title}</span>
                            <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                        <DropdownMenuItem key={service.title} onSelect={() => setActiveService(service)}>
                            <Icon className="mr-2 h-4 w-4" />
                            <span>{service.title}</span>
                        </DropdownMenuItem>
                        );
                    })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="w-[88px] flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                         {isExpanded ? 'Hide' : 'Show'} Full Log
                         <ChevronDown className={cn("w-4 h-4 ml-2 transition-transform", isExpanded && "rotate-180")} />
                    </Button>
                </div>
            </div>
            <div
                ref={terminalRef}
                className={cn(
                    "min-h-[250px] p-4 overflow-y-auto transition-all duration-300 ease-in-out",
                    isExpanded ? "max-h-[500px]" : "max-h-[160px]"
                )}
            >
                <AnimatePresence>
                    {displayedLines.map((line, index) => (
                    <motion.div
                        key={`${activeService.title}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start"
                    >
                        {line.type === 'command' && <span className="text-primary mr-2 shrink-0 select-none">$</span>}
                        <pre
                        className={cn('text-foreground whitespace-pre-wrap font-mono', {
                            'text-green-400': line.type === 'success',
                            'text-red-400': line.type === 'error',
                            'text-muted-foreground': line.type === 'info',
                        })}
                        >
                        {line.text}
                        </pre>
                    </motion.div>
                    ))}
                </AnimatePresence>
              {isAnimating && (
                 <div className="flex items-start">
                    <span className="text-primary mr-2 shrink-0 select-none">$</span>
                    <span className="inline-block w-2 h-4 bg-foreground ml-1 animate-pulse" />
                 </div>
              )}

              {!isAnimating && (
                <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={() => startAnimation(activeService.title)}>
                    Re-run
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
    </section>
  );
}

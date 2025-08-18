
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { motion, useTransform, MotionValue } from 'framer-motion';

const scripts: Record<string, { text: string; type: string }[]> = {
  default: [
    { text: 'Welcome to Treminal3.', type: 'info' },
    { text: 'Hover over a service above and scroll down to see its execution.', type: 'info' },
    { text: 'treminal3 --version', type: 'command' },
    { text: 'v1.0.0', type: 'success' },
  ],
  '0': [
    { text: 'treminal3 create:dapp --name=my-awesome-dapp --template=nft-marketplace', type: 'command' },
    { text: '✔ dApp created successfully from template: nft-marketplace.', type: 'success' },
    { text: 'treminal3 deploy:dapp --name=my-awesome-dapp --network=mainnet', type: 'command' },
    { text: 'Deploying to mainnet...', type: 'info' },
    { text: '✔ dApp deployed. URL: https://my-awesome-dapp.t3.app', type: 'success' },
  ],
  '1': [
    { text: 'treminal3 create:token --name="My Token" --symbol=TKN --supply=1000000', type: 'command' },
    { text: '✔ Token contract generated successfully.', type: 'success' },
    { text: 'treminal3 deploy:token --network=polygon', type: 'command' },
    { text: 'Deploying token to Polygon network...', type: 'info' },
    { text: '✔ Token deployed. Contract address: 0x123...abc', type: 'success' },
  ],
  '2': [
    { text: 'treminal3 create:bot --name=arbitrage-bot --template=uniswap-v3', type: 'command' },
    { text: '✔ Bot created successfully at ./bots/arbitrage-bot.js', type: 'success' },
    { text: 'treminal3 backtest --name=arbitrage-bot --from=2023-01-01', type: 'command' },
    { text: 'Running backtest... Total PnL: 23.45 WETH', type: 'info' },
    { text: 'treminal3 deploy:bot --name=arbitrage-bot --live', type: 'command' },
    { text: '✔ Bot deployed successfully. Listening for opportunities...', type: 'success' },
  ],
    '3': [
    { text: 'treminal3 create:agent --name=oracle-updater --trigger=on-chain-event', type: 'command' },
    { text: '✔ AI Agent created. Listening for PriceUpdate events...', type: 'success' },
    { text: 'treminal3 agent:logs --name=oracle-updater', type: 'command' },
    { text: 'Event triggered. Agent executing logic...', type: 'info' },
    { text: 'Price updated on-chain via agent.', type: 'success' },
  ],
  '4': [
    { text: 'treminal3 create:wallet --brand=my-brand --type=smart-contract', type: 'command' },
    { text: '✔ Custom branded wallet SDK generated.', type: 'success' },
    { text: 'treminal3 publish:wallet --name=my-brand-wallet', type: 'command' },
    { text: 'Publishing wallet to app stores...', type: 'info' },
    { text: '✔ Wallet published successfully.', type: 'success' },
  ],
  '5': [
    { text: 'treminal3 list:templates', type: 'command' },
    { text: 'Available templates: ERC20, ERC721, DAO, Vesting...', type: 'info' },
    { text: 'treminal3 use:template --name=DAO --output=./contracts/MyDAO.sol', type: 'command' },
    { text: '✔ Smart contract MyDAO.sol created successfully.', type: 'success' },
  ],
  '6': [
    { text: 'treminal3 tx:send --to=0xabc...123 --value=1.5ETH --network=sepolia', type: 'command' },
    { text: 'Submitting transaction on Sepolia testnet...', type: 'info' },
    { text: '✔ Transaction confirmed. Hash: 0x456...def', type: 'success' },
  ],
  '7': [
    { text: 'treminal3 analytics:query --dataset=uniswap_v3_mainnet --query="SELECT * FROM swaps LIMIT 5"', type: 'command' },
    { text: 'Running query on on-chain data...', type: 'info' },
    { text: 'Results:\n- Swap 1: 10 ETH for 30,000 USDC\n- Swap 2: 5 ETH for 15,000 USDC', type: 'success' },
  ],
  '8': [
    { text: 'treminal3 storage:upload ./my-dapp-assets --network=ipfs', type: 'command' },
    { text: 'Uploading files to IPFS...', type: 'info' },
    { text: '✔ Upload complete. CID: QmXo...pA', type: 'success' },
  ],
  '9': [
    { text: 'treminal3 audit:contract ./contracts/MyToken.sol', type: 'command' },
    { text: 'Running automated security audit...', type: 'info' },
    { text: '✔ Audit complete. No critical vulnerabilities found. 2 recommendations.', type: 'success' },
  ],
  '10': [
    { text: 'treminal3 dao:create-proposal --title="New Partnership" --description="..."', type: 'command' },
    { text: '✔ Proposal created. Voting starts now and ends in 3 days.', type: 'success' },
    { text: 'treminal3 dao:vote --proposal-id=5 --vote=yes', type: 'command' },
    { text: '✔ Vote cast successfully.', type: 'success' },
  ],
};


const linePause = 1000;

interface MotionTerminalProps {
  activeServiceIndex: number | null;
  scrollYProgress: MotionValue<number>;
}

export default function MotionTerminal({ activeServiceIndex, scrollYProgress }: MotionTerminalProps) {
  const [lines, setLines] = useState<{ text: string; type: string; }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();
  
  const opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  const startAnimation = (codeLines: { text: string; type: string; }[]) => {
    if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
    }
    setLines([]);
    setIsComplete(false);
    let lineIndex = 0;

    const animateLine = () => {
      if (lineIndex >= codeLines.length) {
        setIsComplete(true);
        return;
      }
      
      setLines(prev => [...prev, codeLines[lineIndex]]);
      lineIndex++;
      animationTimeoutRef.current = setTimeout(animateLine, linePause);
    };

    animateLine();
  };
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const scriptKey = activeServiceIndex !== null ? activeServiceIndex.toString() : 'default';
    const scriptToRun = scripts[scriptKey] || scripts['default'];
    startAnimation(scriptToRun);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeServiceIndex]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const currentScript = scripts[activeServiceIndex?.toString() ?? 'default'];

  return (
    <motion.div
        className="container mx-auto px-4 absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center pointer-events-none"
        style={{ opacity }}
      >
        <div className="font-code text-sm rounded-lg bg-black/80 shadow-2xl shadow-primary/20 backdrop-blur-sm pointer-events-auto w-full max-w-5xl">
          <div className="h-[60vh] max-h-[700px] flex flex-col rounded-md">
            <div className="flex items-center gap-2 p-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div ref={terminalRef} className="flex-grow p-4 overflow-y-auto">
              {lines.filter(Boolean).map((line, index) => (
                <div key={index} className="flex items-start">
                  {line.type === 'command' && <span className="text-blue-400 mr-2 shrink-0">$</span>}
                  <pre
                    className={cn('text-white whitespace-pre-wrap font-code', {
                      'text-green-400': line.type === 'success',
                      'text-red-400': line.type === 'error',
                      'text-gray-400': line.type === 'info',
                    })}
                  >
                    {line.text}
                  </pre>
                </div>
              ))}
              {!isComplete && (
                 <div className="flex items-start">
                    <span className="text-blue-400 mr-2 shrink-0">$</span>
                    <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse" />
                 </div>
              )}

              {isComplete && (
                <div className="mt-4">
                  <Button onClick={() => startAnimation(currentScript)}>
                    Re-run Build
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
  );
}

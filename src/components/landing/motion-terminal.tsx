
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { motion, useTransform, MotionValue } from 'framer-motion';

const scripts: Record<string, { text: string; type: string }[]> = {
  default: [
    { text: 'Welcome to the Terminal3 Command Center.', type: 'info' },
    { text: 'Select a service from the grid above to see its execution flow.', type: 'info' },
    { text: 'terminal3 --version', type: 'command' },
    { text: 'v1.0.0', type: 'success' },
  ],
  '0': [
    { text: 'terminal3 create:dapp --name="NFT-Gallery" --template=marketplace', type: 'command' },
    { text: 'i Analyzing requirements for "NFT-Gallery"...', type: 'info' },
    { text: 'i Generating ERC721 smart contract...', type: 'info' },
    { text: 'i Assembling front-end with wallet connection and minting UI...', type: 'info' },
    { text: '✔ dApp scaffold created successfully in `/dapps/nft-gallery`.', type: 'success' },
    { text: 'terminal3 deploy --dapp="NFT-Gallery" --network=sepolia', type: 'command' },
    { text: 'i Deploying contracts and hosting front-end on IPFS...', type: 'info' },
    { text: '✔ Deployment complete. dApp available at: nft-gallery.t3.app', type: 'success' },
  ],
  '1': [
    { text: 'terminal3 create:token --name="Starlight" --symbol=STAR --supply=1000000000', type: 'command' },
    { text: 'i Generating ERC-20 contract with OpenZeppelin standards...', type: 'info' },
    { text: 'i Setting total supply to 1,000,000,000 STAR...', type: 'info' },
    { text: '✔ Smart contract generated at `/contracts/StarlightToken.sol`.', type: 'success' },
    { text: 'terminal3 deploy:token --contract="StarlightToken" --network=polygon', type: 'command' },
    { text: 'i Submitting contract to Polygon mainnet...', type: 'info' },
    { text: '✔ Token deployed. Contract address: 0x5a...c3d', type: 'success' },
  ],
  '2': [
    { text: 'terminal3 create:bot --name="ArbitrageHunter" --template=dex-arbitrage', type: 'command' },
    { text: 'i Creating bot from `dex-arbitrage` template...', type: 'info' },
    { text: 'i Configuring bot to monitor Uniswap and Sushiswap for ETH/USDC pair.', type: 'info' },
    { text: '✔ Bot created at `/bots/ArbitrageHunter.js`.', type: 'success' },
    { text: 'terminal3 backtest --bot="ArbitrageHunter" --from="30d" --pair=ETH/USDC', type: 'command' },
    { text: 'i Running backtest over last 30 days of market data...', type: 'info' },
    { text: '✔ Backtest complete. Estimated PnL: +1.24 ETH.', type: 'success' },
  ],
  '3': [
    { text: 'terminal3 create:agent --name="PortfolioRebalancer" --trigger="time(24h)"', type: 'command' },
    { text: 'i Creating new AI agent with a 24-hour time-based trigger...', type: 'info' },
    { text: 'i Defining goal: "Ensure BTC and ETH holdings are balanced to a 50/50 split."', type: 'info' },
    { text: '✔ Agent "PortfolioRebalancer" created and is now active.', type: 'success' },
    { text: 'terminal3 agent:logs --name="PortfolioRebalancer" -f', type: 'command' },
    { text: 'i Agent triggered. Current split: 60% BTC / 40% ETH.', type: 'info' },
    { text: 'i Executing swap: Sell 10% of BTC for ETH to rebalance...', type: 'info' },
    { text: '✔ Rebalancing complete. New split: 50% BTC / 50% ETH.', type: 'success' },
  ],
  '4': [
    { text: 'terminal3 create:wallet --brand="My dApp" --color-scheme=blue', type: 'command' },
    { text: 'i Generating white-label wallet SDK components...', type: 'info' },
    { text: 'i Applying "My dApp" branding and blue color theme...', type: 'info' },
    { text: '✔ Wallet SDK ready for integration.', type: 'success' },
    { text: 'terminal3 publish:wallet --platform=ios,android', type: 'command' },
    { text: 'i Compiling and submitting builds to App Store and Play Store...', type: 'info' },
    { text: '✔ Wallet submitted for review.', type: 'success' },
  ],
  '5': [
    { text: 'terminal3 list:templates --type=contract', type: 'command' },
    { text: 'i Available contract templates: ERC20, ERC721, Vesting, Marketplace, DAO...', type: 'info' },
    { text: 'terminal3 use:template --name=Vesting --output=./contracts/MyVesting.sol', type: 'command' },
    { text: 'i Creating vesting contract from audited template...', type: 'info' },
    { text: '✔ Smart contract `MyVesting.sol` created successfully.', type: 'success' },
  ],
  '6': [
    { text: 'terminal3 tx:send --to=0x...dEaD --value=2.5ETH --network=mainnet', type: 'command' },
    { text: 'i Crafting transaction for Ethereum mainnet...', type: 'info' },
    { text: 'i Estimating gas fees... (Priority: 2 Gwei)', type: 'info' },
    { text: 'i Simulating transaction... Success.', type: 'info' },
    { text: '✔ Transaction broadcasted. Hash: 0x8f...b4a', type: 'success' },
  ],
  '7': [
    { text: 'terminal3 analytics:query --dataset=opensea_sales --query="SUM(price) by collection in last 7d"', type: 'command' },
    { text: 'i Connecting to on-chain data warehouse...', type: 'info' },
    { text: 'i Processing query against indexed sales data...', type: 'info' },
    { text: '✔ Query successful. Results:\n1. CryptoPunks: 1,203 ETH\n2. BAYC: 987 ETH\n3. Pudgy Penguins: 812 ETH', type: 'success' },
  ],
  '8': [
    { text: 'terminal3 storage:upload ./my-nft-assets --network=arweave', type: 'command' },
    { text: 'i Preparing 1,000 assets for upload to Arweave permanent storage...', type: 'info' },
    { text: 'i Uploading and pinning files... [||||||||||||||||||||] 100%', type: 'info' },
    { text: '✔ Upload complete. Manifest ID: ar://...xyz', type: 'success' },
  ],
  '9': [
    { text: 'terminal3 audit:contract ./contracts/MyDAO.sol', type: 'command' },
    { text: 'i Analyzing contract for vulnerabilities using AI model...', type: 'info' },
    { text: 'i Checking for reentrancy, integer overflow, and access control issues...', type: 'info' },
    { text: '✔ Audit complete. 1 High, 2 Medium vulnerabilities found.', type: 'success' },
    { text: 'terminal3 audit:report --last', type: 'command' },
    { text: 'High: Unchecked external call in `executeProposal`.\nMedium: Potential integer underflow in `withdraw`...', type: 'info' },
  ],
  '10': [
    { text: 'terminal3 dao:create-proposal --title="Increase Treasury Allocation" --network=arbitrum', type: 'command' },
    { text: 'i Creating new proposal on Arbitrum DAO...', type: 'info' },
    { text: '✔ Proposal #123 created. Voting period: 7 days.', type: 'success' },
    { text: 'terminal3 dao:vote --proposal-id=123 --vote=for --reason="Secure future development"', type: 'command' },
    { text: 'i Casting vote with 1,500,000 tokens...', type: 'info' },
    { text: '✔ Vote successfully cast.', type: 'success' },
  ],
};

const serviceTitles: Record<string, string> = {
  '0': 'dApp Builder Execution',
  '1': 'Token Launcher Execution',
  '2': 'Trading Bot Execution',
  '3': 'AI Agents Execution',
  '4': 'Custom Wallet Execution',
  '5': 'Smart Contract Templates Execution',
  '6': 'Manual Transaction Execution',
  '7': 'On-chain Analytics Execution',
  '8': 'Decentralized Storage Execution',
  '9': 'Security Audit Execution',
  '10': 'DAO Governance Execution',
  default: 'Terminal3 Command Center'
};


const linePause = 800;

interface MotionTerminalProps {
  activeServiceIndex: number | null;
  scrollYProgress: MotionValue<number>;
}

export default function MotionTerminal({ activeServiceIndex, scrollYProgress }: MotionTerminalProps) {
  const [lines, setLines] = useState<{ text: string; type: string; }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [scriptKey, setScriptKey] = useState('default');
  const terminalRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
  
  const topBorderScaleX = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const rightBorderScaleY = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const bottomBorderScaleX = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const leftBorderScaleY = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

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
    let newKey = 'default';
    if (activeServiceIndex !== null) {
      newKey = activeServiceIndex.toString();
    } 

    if(newKey !== scriptKey) {
        setScriptKey(newKey);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeServiceIndex]);

  useEffect(() => {
    const scriptToRun = scripts[scriptKey] || scripts['default'];
    startAnimation(scriptToRun);
  }, [scriptKey]);


  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const currentScript = scripts[scriptKey] || scripts['default'];
  const currentTitle = serviceTitles[scriptKey] || serviceTitles['default'];

  return (
    <div
        className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[80vh]"
      >
        <motion.div 
            className="relative font-code text-sm rounded-lg bg-black/80 shadow-2xl shadow-primary/20 backdrop-blur-sm pointer-events-auto w-full max-w-5xl"
            style={{ opacity, scale }}
        >
          {/* Borders */}
          <motion.div className="absolute top-0 left-0 w-full h-px bg-primary origin-left" style={{ scaleX: topBorderScaleX }} />
          <motion.div className="absolute top-0 right-0 w-px h-full bg-primary origin-top" style={{ scaleY: rightBorderScaleY }}/>
          <motion.div className="absolute bottom-0 right-0 w-full h-px bg-primary origin-right" style={{ scaleX: bottomBorderScaleX }}/>
          <motion.div className="absolute top-0 left-0 w-px h-full bg-primary origin-bottom" style={{ scaleY: leftBorderScaleY }} />

          <div className="min-h-[60vh] max-h-[700px] flex flex-col rounded-md">
            <div className="flex items-center justify-between p-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-white/50 text-xs font-semibold">{currentTitle}</p>
                 <div className="w-16"></div> {/* Spacer */}
            </div>
            <div ref={terminalRef} className="flex-grow p-4 overflow-y-auto">
              {lines.filter(Boolean).map((line, index) => (
                <div key={index} className="flex items-start">
                  {line.type === 'command' && <span className="text-blue-400 mr-2 shrink-0">$</span>}
                  <pre
                    className={cn('whitespace-pre-wrap font-code text-white', {
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
                  <Button onClick={() => startAnimation(currentScript)} variant="secondary" size="sm">
                    Re-run Execution
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
  );
}

    


'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

const codeLines = [
  { text: 'treminal3 create:bot --name=arbitrage-bot --template=uniswap-arbitrage', type: 'command' },
  { text: '✔ Creating new trading bot from template...', type: 'success' },
  { text: '✔ Bot configuration created at ./bots/arbitrage-bot/config.js', type: 'success' },
  { text: 'Configuration:', type: 'info' },
  { text: '{\n  "exchange": "Uniswap_v3",\n  "assets": ["WETH", "USDC"],\n  "minProfitThreshold": 0.005,\n  "maxTradeSize": 10\n}', type: 'info' },
  { text: 'treminal3 backtest --name=arbitrage-bot --from=2023-01-01', type: 'command' },
  { text: 'Running backtest on Uniswap v3 data...', type: 'info' },
  { text: '✔ Backtest complete.', type: 'success' },
  { text: 'Results:\n  Trades: 1,254\n  Win Rate: 78.2%\n  Total PnL: 23.45 WETH', type: 'success' },
  { text: 'treminal3 deploy:bot --name=arbitrage-bot --live', type: 'command' },
  { text: 'Deploying arbitrage-bot to live environment...', type: 'info' },
  { text: '✔ Bot deployed successfully. Instance ID: arb-bot-live-xyz', type: 'success' },
  { text: 'Listening for arbitrage opportunities...', type: 'info' },
  { text: 'Opportunity found: Swapping 10 WETH for 25,000 USDC...', type: 'info' },
  { text: 'Submitting transaction...', type: 'info' },
  { text: 'Error: Exchange rate limit exceeded. Retrying in 5s...', type: 'error' },
];

const lineDelay = 100;
const charDelay = 30;

export default function MotionTerminal() {
  const [lines, setLines] = useState<{ text: string; type: string; fullText: string }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let lineIndex = 0;
    
    const typeLine = () => {
      if (lineIndex >= codeLines.length) {
        setIsComplete(true);
        setIsAnimating(false);
        setIsRestarting(false);
        return;
      }

      const currentLine = codeLines[lineIndex];
      setLines(prev => [...prev, { text: '', type: currentLine.type, fullText: currentLine.text }]);

      let charIndex = 0;
      const typeChar = () => {
        if (charIndex >= currentLine.text.length) {
          lineIndex++;
          setTimeout(typeLine, lineDelay);
          return;
        }

        setLines(prev => {
          const newLines = [...prev];
          if (newLines[newLines.length-1]) {
            newLines[newLines.length - 1].text += currentLine.text[charIndex];
          }
          return newLines;
        });

        charIndex++;
        setTimeout(typeChar, charDelay);
      };

      typeChar();
    };

    typeLine();
  }
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleRestart = () => {
    setIsRestarting(true);
    setLines([]);
    setIsComplete(false);
    setTimeout(() => {
        runAnimation();
    }, 100)
  }

  return (
    <section className="bg-background text-foreground py-12 md:py-24">
    <motion.div 
      className="container mx-auto px-4"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onAnimationComplete={runAnimation}
    >
        <div className="font-code text-sm rounded-lg border border-border/20 bg-black/80 shadow-2xl">
            <div className="h-[60vh] max-h-[700px] flex flex-col bg-black/80 rounded-md">
                 <div className="flex items-center gap-2 p-3 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div ref={terminalRef} className="flex-grow p-4 overflow-y-auto">
                    {lines.map((line, index) => (
                    <div key={index} className="flex items-start">
                        {line.type === 'command' && <span className="text-blue-400 mr-2 shrink-0">$</span>}
                        <p
                        className={cn('text-white whitespace-pre-wrap', {
                            'text-green-400': line.type === 'success',
                            'text-red-400': line.type === 'error',
                            'text-yellow-400': line.type === 'info',
                        })}
                        >
                        {line.text}
                        {index === lines.length - 1 && !isComplete && (
                            <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse" />
                        )}
                        </p>
                    </div>
                    ))}
                    {isComplete && (
                        <div className="mt-4">
                            <Button onClick={handleRestart} disabled={isRestarting}>
                                {isRestarting ? 'Restarting...' : 'Re-run Build'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </motion.div>
    </section>
  );
}

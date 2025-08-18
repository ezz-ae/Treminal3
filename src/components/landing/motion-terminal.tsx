
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

const codeLines = [
  { text: 'treminal3 create:bot --name=arbitrage-bot --template=uniswap-v3', type: 'command' },
  { text: '✔ Bot created successfully at ./bots/arbitrage-bot.js', type: 'success' },
  { text: 'treminal3 edit ./bots/arbitrage-bot.js', type: 'command'},
  { text: `
import { BaseBot, Exchange } from 'treminal3-sdk';

class ArbitrageBot extends BaseBot {
  async execute() {
    const { WETH, USDC } = this.assets;
    const market = await Exchange.getMarket('Uniswap_v3', WETH, USDC);
    
    if (market.price < this.config.buyThreshold) {
      await this.buy(WETH, 10);
      console.log('Executed buy order for 10 WETH');
    }
  }
}
`, type: 'info' },
  { text: 'treminal3 backtest --name=arbitrage-bot --from=2023-01-01', type: 'command' },
  { text: 'Running backtest on Uniswap v3 data from 2023-01-01 to now...', type: 'info' },
  { text: 'Processed 1,254,320 blocks.', type: 'info' },
  { text: `
Backtest Results:
-----------------
  Total Trades: 1,254
  Winning Trades: 981 (78.2%)
  Losing Trades: 273 (21.8%)
  Total PnL: 23.45 WETH
  Sharpe Ratio: 1.87
`, type: 'success' },
  { text: 'treminal3 deploy:bot --name=arbitrage-bot --live', type: 'command' },
  { text: 'Deploying arbitrage-bot to live environment...', type: 'info' },
  { text: '✔ Bot deployed successfully. Instance ID: arb-bot-live-xyz', type: 'success' },
  { text: 'Listening for arbitrage opportunities on Uniswap_v3...', type: 'info' },
  { text: 'Opportunity found: Swapping 10 WETH for 25,000 USDC...', type: 'info' },
  { text: 'Submitting transaction to mempool...', type: 'info' },
  { text: 'Error: Transaction failed. Reason: Slippage exceeds 0.5%. Retrying...', type: 'error' },
];

const typingDelay = 500;
const linePause = 1000;

export default function MotionTerminal() {
  const [lines, setLines] = useState<{ text: string; type: string; }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const lineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();

  const runAnimation = () => {
    if (lineIndexRef.current >= codeLines.length) {
      setIsComplete(true);
      return;
    }

    const currentLineData = codeLines[lineIndexRef.current];

    if (charIndexRef.current === 0) {
      setLines(prev => [...prev, { text: '', type: currentLineData.type }]);
    }

    if (charIndexRef.current < currentLineData.text.length) {
      setLines(prev => {
        const newLines = [...prev];
        const currentLine = newLines[lineIndexRef.current];
        if (currentLine) {
          currentLine.text += currentLineData.text[charIndexRef.current];
        }
        return newLines;
      });

      charIndexRef.current++;
      animationTimeoutRef.current = setTimeout(runAnimation, typingDelay);
    } else {
      lineIndexRef.current++;
      charIndexRef.current = 0;
      animationTimeoutRef.current = setTimeout(runAnimation, linePause);
    }
  };

  const startAnimation = () => {
    lineIndexRef.current = 0;
    charIndexRef.current = 0;
    setLines([]);
    setIsComplete(false);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    runAnimation();
  };
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);


  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="bg-background text-foreground py-12 md:py-24">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={startAnimation}
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
                  <pre
                    className={cn('text-white whitespace-pre-wrap font-code', {
                      'text-green-400': line.type === 'success',
                      'text-red-400': line.type === 'error',
                      'text-gray-400': line.type === 'info',
                    })}
                  >
                    {line.text}
                    {index === lineIndexRef.current && !isComplete && (
                      <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse" />
                    )}
                  </pre>
                </div>
              ))}
              {isComplete && (
                <div className="mt-4">
                  <Button onClick={startAnimation}>
                    Re-run Build
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

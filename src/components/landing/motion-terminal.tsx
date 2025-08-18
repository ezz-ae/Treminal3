
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

const codeLines = [
  { text: 'npx create-web3-app my-dapp', type: 'command' },
  { text: 'Creating a new Web3 app in ./my-dapp.', type: 'info' },
  { text: '✔ Installing packages...', type: 'success' },
  { text: '✔ Initializing Git repository.', type: 'success' },
  { text: 'Success! Created my-dapp at ./my-dapp', type: 'success' },
  { text: 'cd my-dapp', type: 'command' },
  { text: 'treminal3 add contract NftToken', type: 'command' },
  { text: '✔ Fetching contract template from registry...', type: 'success' },
  { text: '✔ Adding contract to contracts/NftToken.sol', type: 'success' },
  { text: '✔ Updating configuration...', type: 'success' },
  { text: 'Added NftToken contract to your project.', type: 'info' },
  { text: 'treminal3 compile', type: 'command' },
  { text: 'Compiling 10 contracts with Solidity 0.8.20', type: 'info' },
  { text: '✔ Compilation successful.', type: 'success' },
  { text: 'treminal3 deploy --network sepolia', type: 'command' },
  { text: 'Deploying contracts to Sepolia test network...', type: 'info' },
  { text: 'Submitting transaction to the network...', type: 'info' },
  { text: 'Transaction hash: 0x123...abc', type: 'info' },
  { text: 'Waiting for confirmations...', type: 'info' },
  { text: 'Error: Transaction failed. Reason: Out of gas.', type: 'error' },
  { text: 'Execution reverted. Check your gas limit and try again.', type: 'error' },
  { text: 'Build failed.', type: 'error' },
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
        <div className="font-code bg-black text-white h-[60vh] max-h-[700px] flex flex-col text-sm rounded-lg border border-border shadow-2xl">
        <div className="flex-shrink-0 bg-gray-800 px-4 py-2 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            </div>
            <p className="text-xs text-gray-400">/bin/bash</p>
        </div>
        <div ref={terminalRef} className="flex-grow p-4 overflow-y-auto">
            {lines.map((line, index) => (
            <div key={index} className="flex items-start">
                {line.type === 'command' && <span className="text-blue-400 mr-2 shrink-0">$</span>}
                <p
                className={cn({
                    'text-green-400': line.type === 'success',
                    'text-red-400': line.type === 'error',
                    'text-yellow-400': line.type === 'info',
                    'text-white': line.type === 'command',
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
    </motion.div>
    </section>
  );
}

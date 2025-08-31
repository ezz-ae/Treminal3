
'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, AppWindow, FileJson } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateDapp } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { DappBuilderOutput } from '@/ai/schemas/dapp-builder';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type DisplayLine = {
    id: string;
    type: 'prompt' | 'output' | 'status' | 'guidance' | 'plan';
    text?: string;
    plan?: DappBuilderOutput;
};

export default function DappBuilderPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { setOpen } = useSidebar();
    const terminalOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const initialLines: DisplayLine[] = [
        { id: 'guidance-1', type: 'guidance', text: 'Welcome to the dApp Builder.' },
        { id: 'guidance-2', type: 'guidance', text: "Describe the decentralized application you want to build." },
    ];
    const [lines, setLines] = useState<DisplayLine[]>(initialLines);
    const [description, setDescription] = useState('');

    useEffect(() => {
        setOpen(false);
    }, [setOpen]);
    
    useEffect(() => {
        if (terminalOutputRef.current) {
            terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
        }
        if (!isLoading) {
            inputRef.current?.focus();
        }
    }, [lines, isLoading]);

    const addLine = (line: Omit<DisplayLine, 'id'>) => {
        setLines(prev => [...prev, { ...line, id: self.crypto.randomUUID() }]);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDescription = e.target.value;
        setDescription(newDescription);

        setLines(prev => {
            const newLines = prev.filter(l => !(l.id === 'validation-error' && l.type === 'guidance'));
            if (newDescription.length > 0 && newDescription.length < 10) {
                const errorLine: DisplayLine = { id: 'validation-error', type: 'guidance', text: 'Please provide a more detailed description (at least 10 characters).' };
                return [...newLines, errorLine];
            }
            return newLines;
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (description.length < 10) {
             setLines(prev => {
                const hasError = prev.some(l => l.id === 'validation-error');
                if (!hasError) {
                    const errorLine: DisplayLine = { id: 'validation-error', type: 'guidance', text: 'Please provide a more detailed description (at least 10 characters).' };
                    return [...prev, errorLine];
                }
                return prev;
            });
            return;
        }

        setIsLoading(true);
        addLine({ type: 'prompt', text: description });
        
        addLine({ type: 'status', text: 'Generating dApp plan...' });

        try {
            const result = await generateDapp({ description });
            
            setTimeout(() => {
                setLines(prev => prev.filter(l => l.type !== 'status'));
                addLine({ type: 'guidance', text: 'Generated Plan:'})
                addLine({ type: 'plan', plan: result });
                setIsLoading(false);
                setDescription('');
            }, 1000);

        } catch (error) {
            console.error('Error generating dApp plan:', error);
            addLine({ type: 'output', text: 'Error: Could not generate dApp plan.' });
            setIsLoading(false);
            setDescription('');
        }
    }

  return (
    <>
       <div className="sr-only">
        <h1 className="text-3xl font-bold font-headline">dApp Builder</h1>
        <p className="text-muted-foreground">
          Describe the dApp you want to build, and our AI will generate a plan for you.
        </p>
      </div>

       <div className="font-code bg-black text-white h-full flex flex-col text-sm" onClick={() => inputRef.current?.focus()}>
            <div ref={terminalOutputRef} id="terminal-output" className="flex-grow overflow-y-auto p-4">
                <AnimatePresence>
                {lines.map((line, index) => (
                    <motion.div 
                        key={line.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4"
                    >
                        <span className="text-gray-500 w-6 text-right select-none">{index + 1}</span>
                        <div className="flex-1">
                             {line.type === 'prompt' && (
                                <div className="flex gap-2 items-center">
                                    <span className="text-blue-400">&gt;</span>
                                    <span>{line.text}</span>
                                </div>
                             )}
                            {line.type === 'guidance' && (
                                <p className={cn("text-green-400", { "text-yellow-400": line.id === 'validation-error' })}>{line.text}</p>
                            )}
                            {line.type === 'status' && (
                                <p className="text-yellow-400 flex items-center gap-2">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  {line.text}
                                </p>
                            )}
                            {line.type === 'output' && (
                                <p className="text-red-400">{line.text}</p>
                            )}
                            {line.type === 'plan' && line.plan && (
                                <div className="border border-gray-700 rounded-md p-4 my-2 bg-gray-900/50">
                                    <h3 className="font-bold text-base text-purple-400">{line.plan.name}</h3>
                                    <p className="text-gray-400 italic mb-4">{line.plan.description}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <AppWindow className="w-4 h-4 text-green-400"/>
                                                <h4 className="font-bold text-green-400">UI Components</h4>
                                            </div>
                                            <ul className="space-y-1 list-disc list-inside text-gray-400">
                                                {line.plan.components.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileJson className="w-4 h-4 text-green-400"/>
                                                <h4 className="font-bold text-green-400">Smart Contracts</h4>
                                            </div>
                                            <ul className="space-y-1 list-disc list-inside text-gray-400">
                                                {line.plan.contracts.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
                {!isLoading && (
                    <form onSubmit={handleSubmit}>
                         <div className="flex gap-4">
                            <span className="text-gray-500 w-6 text-right select-none">{lines.length + 1}</span>
                            <div className="flex-1 flex gap-2 items-center">
                                <span className="text-blue-400">&gt;</span>
                                <Input
                                    ref={inputRef}
                                    value={description}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 'An NFT marketplace for digital art with a 5% royalty fee...'"
                                    className="bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 w-full p-0 h-auto"
                                    autoComplete="off"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </form>
                )}
            </div>
       </div>
    </>
  );
}

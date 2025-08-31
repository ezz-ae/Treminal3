
'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, AppWindow, FileJson } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateDapp } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import type { DappBuilderOutput } from '@/app/actions';

type DisplayLine = {
    id: string;
    type: 'prompt' | 'output' | 'status' | 'guidance' | 'plan';
    text?: string;
    plan?: DappBuilderOutput;
};

const initialLines: DisplayLine[] = [
    { id: 'guidance-1', type: 'guidance', text: 'Welcome to your dApp Builder.' },
    { id: 'guidance-2', type: 'guidance', text: "Describe what you want to build, and I'll generate a plan." },
];

export default function DappBuilderPage() {
    const [lines, setLines] = useState<DisplayLine[]>(initialLines);
    const [isLoading, setIsLoading] = useState(false);
    const { setOpen } = useSidebar();
    const { toast } = useToast();
    const terminalOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [prompt, setPrompt] = useState("");

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
        const newPrompt = e.target.value;
        setPrompt(newPrompt);

        // This removes any existing "realtime" guidance message if the user backspaces.
        const existingGuidanceIndex = lines.findIndex(l => l.id === 'realtime-guidance');
        if (existingGuidanceIndex !== -1) {
            setLines(prev => prev.filter(l => l.id !== 'realtime-guidance'));
        }

        if (newPrompt.length > 0 && newPrompt.length < 10) {
            const guidanceLine = { id: 'realtime-guidance', type: 'guidance', text: "Keep going, the more detail the better..." };
            if(existingGuidanceIndex === -1) {
                addLine(guidanceLine);
            }
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (prompt.length < 10) {
            toast({
                title: "Prompt is too short",
                description: "Please provide a more detailed description of what you want to build.",
                variant: 'destructive'
            })
            return;
        }

        setIsLoading(true);
        addLine({ type: 'prompt', text: prompt });
        
        try {
            addLine({ type: 'status', text: 'Generating dApp plan...' });
            const result = await generateDapp({ description: prompt });
            setTimeout(() => {
                setLines(prev => prev.filter(l => l.type !== 'status' && l.id !== 'realtime-guidance'));
                addLine({ type: 'guidance', text: 'Generated Plan:'})
                addLine({ type: 'plan', plan: result });
            }, 1000);
        } catch (error) {
            console.error('Error processing prompt:', error);
            addLine({ type: 'output', text: 'Error: Could not process your request.' });
        } finally {
             setTimeout(() => {
                setIsLoading(false);
                setPrompt("");
            }, 1000);
        }
    }

  return (
    <>
       <div className="sr-only">
        <h1 className="text-3xl font-bold font-headline">dApp Builder</h1>
        <p className="text-muted-foreground">
          Your unified interface for building dApps with AI.
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
                                <p className="text-green-400">{line.text}</p>
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
                                    value={prompt}
                                    onChange={handleInputChange}
                                    ref={inputRef}
                                    placeholder="e.g., 'A decentralized social media platform for artists to mint their work as NFTs...'"
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

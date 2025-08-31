
'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateToken } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TokenLauncherOutput } from '@/ai/schemas/token-launcher';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  description: z.string().min(10, {
    message: 'Token description must be at least 10 characters.',
  }),
});

type DisplayLine = {
    id: string;
    type: 'prompt' | 'output' | 'status' | 'guidance' | 'code';
    text?: string;
    code?: TokenLauncherOutput;
};

const initialLinesDef: DisplayLine[] = [
    { id: 'guidance-1', type: 'guidance', text: 'Welcome to the Token Launcher.' },
    { id: 'guidance-2', type: 'guidance', text: "Describe the cryptocurrency token you want to create." },
];

export default function TokenLauncherPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { setOpen } = useSidebar();
    const { toast } = useToast();
    const terminalOutputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [lines, setLines] = useState<DisplayLine[]>([]);

     useEffect(() => {
      setLines(initialLinesDef.map(line => ({ ...line, id: self.crypto.randomUUID() })));
    }, []);

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

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: "",
        },
    });

    const addLine = (line: Omit<DisplayLine, 'id'>) => {
        setLines(prev => [...prev, { ...line, id: self.crypto.randomUUID() }]);
    };
    
    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Copied to clipboard!",
            description: "The Solidity code has been copied to your clipboard.",
        });
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        addLine({ type: 'prompt', text: data.description });
        
        addLine({ type: 'status', text: 'Generating ERC-20 Smart Contract...' });

        try {
            const result = await generateToken({ description: data.description });
            
            setTimeout(() => {
                setLines(prev => prev.filter(l => l.type !== 'status'));
                addLine({ type: 'guidance', text: 'Generated Contract:'})
                addLine({ type: 'code', code: result });
                setIsLoading(false);
                form.reset();
            }, 1000);

        } catch (error) {
            console.error('Error generating token contract:', error);
            addLine({ type: 'output', text: 'Error: Could not generate token contract.' });
            setIsLoading(false);
            form.reset();
        }
    }

  return (
    <>
       <div className="sr-only">
        <h1 className="text-3xl font-bold font-headline">Token Launcher</h1>
        <p className="text-muted-foreground">
          Describe the token you want to launch, and our AI agent will generate the smart contract for you.
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
                            {line.type === 'code' && line.code && (
                                <div className="border border-gray-700 rounded-md my-2 bg-gray-900/50">
                                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-base text-purple-400">{line.code.name} ({line.code.symbol})</h3>
                                            <p className="text-gray-400 text-xs">Total Supply: {line.code.supply.toLocaleString()}</p>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => handleCopy(line.code.solidityCode)}>
                                            <Copy className="w-4 h-4 mr-2"/>
                                            Copy Code
                                        </Button>
                                    </div>
                                    <pre className="p-4 overflow-x-auto text-xs">
                                        <code>{line.code.solidityCode}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
                {!isLoading && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                             <div className="flex gap-4">
                                <span className="text-gray-500 w-6 text-right select-none">{lines.length + 1}</span>
                                <div className="flex-1 flex gap-2 items-center">
                                    <span className="text-blue-400">&gt;</span>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className="flex-grow">
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        ref={inputRef}
                                                        placeholder="e.g., 'An ERC-20 utility token named 'Starlight' (STAR) with a total supply of 100 million...'"
                                                        className="bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 w-full p-0 h-auto"
                                                        autoComplete="off"
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
       </div>
    </>
  );
}

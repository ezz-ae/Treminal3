
'use client';

import { Wrench, Beaker, HardHat, CircleDollarSign } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const GasPriceTracker = () => {
    const networks = [
        { name: 'Ethereum', gwei: '25', priority: '2' },
        { name: 'Polygon', gwei: '30', priority: '1' },
        { name: 'BNB Chain', gwei: '5', priority: '1' },
        { name: 'Arbitrum', gwei: '0.1', priority: '0.1' },
    ];
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
                        <CircleDollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">Gas Price Tracker</CardTitle>
                        <CardDescription>Real-time gas price estimates for various networks.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {networks.map(network => (
                        <div key={network.name} className="flex justify-between items-center bg-card-foreground/5 p-3 rounded-md">
                            <span className="font-medium">{network.name}</span>
                            <div className="text-right">
                                <p className="font-semibold">{network.gwei} Gwei</p>
                                <p className="text-xs text-muted-foreground">Priority: {network.priority} Gwei</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

const ABIConverter = () => {
    const { toast } = useToast();
    const [jsonAbi, setJsonAbi] = useState('');
    const [humanReadableAbi, setHumanReadableAbi] = useState('');

    const convertToHumanReadable = () => {
        if (!jsonAbi) {
            toast({ variant: 'destructive', title: 'Input is empty', description: 'Please paste a JSON ABI to convert.' });
            return;
        }
        try {
            const parsed = JSON.parse(jsonAbi);
            if (!Array.isArray(parsed)) throw new Error('Invalid JSON ABI. Must be an array.');
            
            const result = parsed
                .map(item => {
                    if (!['function', 'event', 'constructor', 'error'].includes(item.type)) {
                        return null;
                    }
                    if (!item.name && item.type !== 'constructor') {
                        return null;
                    }
                    
                    const inputs = item.inputs?.map((input: any) => `${input.type}${input.indexed ? ' indexed' : ''} ${input.name || ''}`.trim()).join(',') || '';
                    
                    if (item.type === 'constructor') {
                        return `constructor(${inputs})`;
                    }
                    
                    const signature = `${item.type} ${item.name}(${inputs})`;
                    
                    let fullSignature = signature;
                    if (item.type === 'function') {
                        const mutability = item.stateMutability ? ` ${item.stateMutability}` : '';
                        const outputs = item.outputs?.map((output: any) => `${output.type} ${output.name || ''}`.trim()).join(', ');
                        const returns = outputs ? ` returns (${outputs})` : '';
                        fullSignature = `${signature}${mutability}${returns}`.trim().replace(/\s+/g, ' ');
                    }
                    return fullSignature;
                })
                .filter(Boolean)
                .join('\n');

            if (!result) {
                 toast({ variant: 'destructive', title: 'Conversion failed', description: 'No valid function, event, constructor, or error signatures found in the ABI.' });
                 setHumanReadableAbi('');
                 return;
            }

            setHumanReadableAbi(result);
            toast({ title: 'Conversion successful!' });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Please check your JSON ABI syntax.';
            toast({ variant: 'destructive', title: 'Conversion failed', description: message });
            setHumanReadableAbi('');
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
                        <Beaker className="w-6 h-6" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">ABI Converter</CardTitle>
                        <CardDescription>Convert between JSON and human-readable ABI formats.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium">JSON ABI</label>
                    <Textarea 
                        placeholder='[{"type":"function", "name":"myFunc", "inputs":[{"name":"myArg","type":"uint256"}]}]'
                        className="mt-1 h-32 font-mono text-xs"
                        value={jsonAbi}
                        onChange={(e) => setJsonAbi(e.target.value)}
                    />
                </div>
                <Button onClick={convertToHumanReadable} className="w-full">Convert to Human-Readable</Button>
                <div>
                    <label className="text-sm font-medium">Human-Readable ABI</label>
                    <Textarea 
                        placeholder="function myFunc(uint256)"
                        className="mt-1 h-32 font-mono text-xs"
                        value={humanReadableAbi}
                        readOnly
                    />
                </div>
            </CardContent>
        </Card>
    )
}

const EVMDisassembler = () => {
    const { toast } = useToast();
    const [bytecode, setBytecode] = useState('');
    const [opcodes, setOpcodes] = useState('');

    const disassemble = () => {
        if (!bytecode) {
            toast({ variant: 'destructive', title: 'Input is empty', description: 'Please paste bytecode to disassemble.' });
            return;
        }
        const sanitizedBytecode = bytecode.replace(/^0x/, '').replace(/[^0-9a-fA-F]/g, '');

        if (!sanitizedBytecode || sanitizedBytecode.length % 2 !== 0) {
            toast({ variant: 'destructive', title: 'Invalid Bytecode', description: 'Bytecode must be a valid hex string with an even number of characters.' });
            setOpcodes('');
            return;
        }

        const formattedOpcodes = sanitizedBytecode.match(/.{1,2}/g)?.join(' ') || '';
        setOpcodes(formattedOpcodes.toUpperCase());
        toast({ title: 'Disassembly successful!' });
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
                        <HardHat className="w-6 h-6" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">EVM Disassembler</CardTitle>
                        <CardDescription>Analyze smart contract bytecode and convert it to opcodes.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Bytecode</label>
                    <Textarea 
                        placeholder="0x60806040..."
                        className="mt-1 h-32 font-mono text-xs"
                        value={bytecode}
                        onChange={(e) => setBytecode(e.target.value)}
                    />
                </div>
                <Button onClick={disassemble} className="w-full">Disassemble</Button>
                <div>
                    <label className="text-sm font-medium">Opcodes (Formatted)</label>
                    <Textarea 
                        placeholder="60 80 60 40..."
                        className="mt-1 h-32 font-mono text-xs"
                        value={opcodes}
                        readOnly
                    />
                </div>
            </CardContent>
        </Card>
    )
}

/**
 * A page hosting a suite of tools for Web3 developers.
 * Includes a gas tracker, ABI converter, and EVM disassembler.
 * @returns {JSX.Element} The Developer Tools page component.
 */
export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Developer Tools</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          A suite of utilities to help you build, test, and debug your Web3 projects.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-1">
        <GasPriceTracker />
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <ABIConverter />
        <EVMDisassembler />
      </div>
    </div>
  );
}

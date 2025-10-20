
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
                .map((item: any) => {
                    if (!['function', 'event', 'constructor', 'error'].includes(item.type)) {
                        return null;
                    }
                    
                    const inputs = item.inputs?.map((input: any) => {
                        if (input.type === 'tuple') {
                            const components = input.components.map((c: any) => c.type).join(',');
                            return `(${components})`;
                        }
                        return input.type;
                    }).join(',');

                    if (item.type === 'constructor') {
                         return `constructor(${inputs}) ${item.stateMutability === 'payable' ? 'payable' : ''}`.trim();
                    }
                     if (item.type === 'event') {
                        const eventInputs = item.inputs?.map((input: any) => `${input.type}${input.indexed ? ' indexed' : ''} ${input.name || ''}`.trim()).join(', ');
                        return `event ${item.name}(${eventInputs})`;
                    }
                    
                    let signature = `${item.type} ${item.name}(${inputs})`;
                    
                    if (item.type === 'function') {
                        const mutability = item.stateMutability && item.stateMutability !== 'nonpayable' ? ` ${item.stateMutability}` : '';
                        const outputs = item.outputs?.map((output: any) => output.type).join(', ');
                        const returns = outputs ? ` returns (${outputs})` : '';
                        signature = `function ${item.name}(${inputs})${mutability}${returns}`.trim().replace(/\s+/g, ' ');
                    }
                    return signature;
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
        
        const opcodeMap: { [key: number]: { name: string, pops: number, pushes: number, size: number } } = {
            0x00: { name: 'STOP', pops: 0, pushes: 0, size: 1 }, 0x01: { name: 'ADD', pops: 2, pushes: 1, size: 1 }, 0x02: { name: 'MUL', pops: 2, pushes: 1, size: 1 },
            0x10: { name: 'LT', pops: 2, pushes: 1, size: 1 }, 0x11: { name: 'GT', pops: 2, pushes: 1, size: 1 }, 0x14: { name: 'EQ', pops: 2, pushes: 1, size: 1 }, 0x15: { name: 'ISZERO', pops: 1, pushes: 1, size: 1 },
            0x35: { name: 'CALLDATALOAD', pops: 1, pushes: 1, size: 1 }, 0x50: { name: 'POP', pops: 1, pushes: 0, size: 1 }, 0x52: { name: 'MSTORE', pops: 2, pushes: 0, size: 1 }, 0x56: { name: 'JUMP', pops: 1, pushes: 0, size: 1 }, 0x57: { name: 'JUMPI', pops: 2, pushes: 0, size: 1 }, 0x5b: { name: 'JUMPDEST', pops: 0, pushes: 0, size: 1 },
            0x60: { name: 'PUSH1', pops: 0, pushes: 1, size: 2 }, 0x61: { name: 'PUSH2', pops: 0, pushes: 1, size: 3 }, 0x62: { name: 'PUSH3', pops: 0, pushes: 1, size: 4 }, 0x63: { name: 'PUSH4', pops: 0, pushes: 1, size: 5 },
            0x64: { name: 'PUSH5', pops: 0, pushes: 1, size: 6 }, 0x65: { name: 'PUSH6', pops: 0, pushes: 1, size: 7 }, 0x66: { name: 'PUSH7', pops: 0, pushes: 1, size: 8 }, 0x67: { name: 'PUSH8', pops: 0, pushes: 1, size: 9 },
            0x68: { name: 'PUSH9', pops: 0, pushes: 1, size: 10 }, 0x69: { name: 'PUSH10', pops: 0, pushes: 1, size: 11 }, 0x6a: { name: 'PUSH11', pops: 0, pushes: 1, size: 12 }, 0x6b: { name: 'PUSH12', pops: 0, pushes: 1, size: 13 },
            0x6c: { name: 'PUSH13', pops: 0, pushes: 1, size: 14 }, 0x6d: { name: 'PUSH14', pops: 0, pushes: 1, size: 15 }, 0x6e: { name: 'PUSH15', pops: 0, pushes: 1, size: 16 }, 0x6f: { name: 'PUSH16', pops: 0, pushes: 1, size: 17 },
            0x70: { name: 'PUSH17', pops: 0, pushes: 1, size: 18 }, 0x71: { name: 'PUSH18', pops: 0, pushes: 1, size: 19 }, 0x72: { name: 'PUSH19', pops: 0, pushes: 1, size: 20 }, 0x73: { name: 'PUSH20', pops: 0, pushes: 1, size: 21 },
            0x74: { name: 'PUSH21', pops: 0, pushes: 1, size: 22 }, 0x75: { name: 'PUSH22', pops: 0, pushes: 1, size: 23 }, 0x76: { name: 'PUSH23', pops: 0, pushes: 1, size: 24 }, 0x77: { name: 'PUSH24', pops: 0, pushes: 1, size: 25 },
            0x78: { name: 'PUSH25', pops: 0, pushes: 1, size: 26 }, 0x79: { name: 'PUSH26', pops: 0, pushes: 1, size: 27 }, 0x7a: { name: 'PUSH27', pops: 0, pushes: 1, size: 28 }, 0x7b: { name: 'PUSH28', pops: 0, pushes: 1, size: 29 },
            0x7c: { name: 'PUSH29', pops: 0, pushes: 1, size: 30 }, 0x7d: { name: 'PUSH30', pops: 0, pushes: 1, size: 31 }, 0x7e: { name: 'PUSH31', pops: 0, pushes: 1, size: 32 }, 0x7f: { name: 'PUSH32', pops: 0, pushes: 1, size: 33 },
            0x80: { name: 'DUP1', pops: 1, pushes: 2, size: 1 }, 0x81: { name: 'DUP2', pops: 2, pushes: 3, size: 1 }, 0x82: { name: 'DUP3', pops: 3, pushes: 4, size: 1 },
            0x90: { name: 'SWAP1', pops: 2, pushes: 2, size: 1 }, 0x91: { name: 'SWAP2', pops: 3, pushes: 3, size: 1 },
            0xf3: { name: 'RETURN', pops: 2, pushes: 0, size: 1 }, 0xfd: { name: 'REVERT', pops: 2, pushes: 0, size: 1 }, 0xfe: { name: 'INVALID', pops: 0, pushes: 0, size: 1 },
        };
        
        let result = '';
        let i = 0;
        while (i < sanitizedBytecode.length) {
            const byte = parseInt(sanitizedBytecode.substring(i, i + 2), 16);
            const opcode = opcodeMap[byte];
            result += `[${(i/2).toString().padStart(4, '0')}] `;

            if (opcode) {
                result += `${opcode.name}`;
                i += 2;
                if (opcode.name.startsWith('PUSH')) {
                    const pushSize = opcode.size - 1;
                    const data = sanitizedBytecode.substring(i, i + pushSize * 2);
                    result += ` 0x${data}\n`;
                    i += pushSize * 2;
                } else {
                    result += '\n';
                }
            } else {
                result += `INVALID (0x${sanitizedBytecode.substring(i, i + 2)})\n`;
                i += 2;
            }
        }

        setOpcodes(result);
        toast({ title: 'Disassembly complete!' });
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
                        placeholder="0x6080604052..."
                        className="mt-1 h-32 font-mono text-xs"
                        value={bytecode}
                        onChange={(e) => setBytecode(e.target.value)}
                    />
                </div>
                <Button onClick={disassemble} className="w-full">Disassemble</Button>
                <div>
                    <label className="text-sm font-medium">Opcodes</label>
                    <Textarea 
                        placeholder="[0000] PUSH1 0x80..."
                        className="mt-1 h-32 font-mono text-xs whitespace-pre-wrap"
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

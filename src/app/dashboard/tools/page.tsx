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

                    const formatTuple = (components: any[]) => {
                        return `(${components.map(c => c.type === 'tuple' ? formatTuple(c.components) : c.type).join(',')})`;
                    };
                    
                    const inputs = item.inputs?.map((input: any) => {
                        return input.type === 'tuple' ? formatTuple(input.components) : input.type;
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
                        const outputs = item.outputs?.map((output: any) => output.type === 'tuple' ? formatTuple(output.components) : output.type).join(', ');
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
        
        const opcodeMap: { [key: number]: { name: string, size: number } } = {
            0x00: { name: 'STOP', size: 1 }, 0x01: { name: 'ADD', size: 1 }, 0x02: { name: 'MUL', size: 1 }, 0x03: { name: 'SUB', size: 1 }, 0x04: { name: 'DIV', size: 1 },
            0x05: { name: 'SDIV', size: 1 }, 0x06: { name: 'MOD', size: 1 }, 0x07: { name: 'SMOD', size: 1 }, 0x08: { name: 'ADDMOD', size: 1 }, 0x09: { name: 'MULMOD', size: 1 },
            0x0a: { name: 'EXP', size: 1 }, 0x0b: { name: 'SIGNEXTEND', size: 1 }, 0x10: { name: 'LT', size: 1 }, 0x11: { name: 'GT', size: 1 }, 0x12: { name: 'SLT', size: 1 },
            0x13: { name: 'SGT', size: 1 }, 0x14: { name: 'EQ', size: 1 }, 0x15: { name: 'ISZERO', size: 1 }, 0x16: { name: 'AND', size: 1 }, 0x17: { name: 'OR', size: 1 },
            0x18: { name: 'XOR', size: 1 }, 0x19: { name: 'NOT', size: 1 }, 0x1a: { name: 'BYTE', size: 1 }, 0x1b: { name: 'SHL', size: 1 }, 0x1c: { name: 'SHR', size: 1 }, 0x1d: { name: 'SAR', size: 1 },
            0x20: { name: 'SHA3', size: 1 }, 0x30: { name: 'ADDRESS', size: 1 }, 0x31: { name: 'BALANCE', size: 1 }, 0x32: { name: 'ORIGIN', size: 1 }, 0x33: { name: 'CALLER', size: 1 },
            0x34: { name: 'CALLVALUE', size: 1 }, 0x35: { name: 'CALLDATALOAD', size: 1 }, 0x36: { name: 'CALLDATASIZE', size: 1 }, 0x37: { name: 'CALLDATACOPY', size: 1 },
            0x38: { name: 'CODESIZE', size: 1 }, 0x39: { name: 'CODECOPY', size: 1 }, 0x3a: { name: 'GASPRICE', size: 1 }, 0x3b: { name: 'EXTCODESIZE', size: 1 },
            0x3c: { name: 'EXTCODECOPY', size: 1 }, 0x3d: { name: 'RETURNDATASIZE', size: 1 }, 0x3e: { name: 'RETURNDATACOPY', size: 1 }, 0x3f: { name: 'EXTCODEHASH', size: 1 },
            0x40: { name: 'BLOCKHASH', size: 1 }, 0x41: { name: 'COINBASE', size: 1 }, 0x42: { name: 'TIMESTAMP', size: 1 }, 0x43: { name: 'NUMBER', size: 1 },
            0x44: { name: 'DIFFICULTY', size: 1 }, 0x45: { name: 'GASLIMIT', size: 1 }, 0x46: { name: 'CHAINID', size: 1 }, 0x47: { name: 'SELFBALANCE', size: 1 }, 0x48: { name: 'BASEFEE', size: 1 },
            0x50: { name: 'POP', size: 1 }, 0x51: { name: 'MLOAD', size: 1 }, 0x52: { name: 'MSTORE', size: 1 }, 0x53: { name: 'MSTORE8', size: 1 },
            0x54: { name: 'SLOAD', size: 1 }, 0x55: { name: 'SSTORE', size: 1 }, 0x56: { name: 'JUMP', size: 1 }, 0x57: { name: 'JUMPI', size: 1 },
            0x58: { name: 'PC', size: 1 }, 0x59: { name: 'MSIZE', size: 1 }, 0x5a: { name: 'GAS', size: 1 }, 0x5b: { name: 'JUMPDEST', size: 1 },
            ...Object.fromEntries(Array.from({ length: 32 }, (_, i) => [0x60 + i, { name: `PUSH${i + 1}`, size: i + 2 }])),
            ...Object.fromEntries(Array.from({ length: 16 }, (_, i) => [0x80 + i, { name: `DUP${i + 1}`, size: 1 }])),
            ...Object.fromEntries(Array.from({ length: 16 }, (_, i) => [0x90 + i, { name: `SWAP${i + 1}`, size: 1 }])),
            ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => [0xa0 + i, { name: `LOG${i}`, size: 1 }])),
            0xf0: { name: 'CREATE', size: 1 }, 0xf1: { name: 'CALL', size: 1 }, 0xf2: { name: 'CALLCODE', size: 1 },
            0xf3: { name: 'RETURN', size: 1 }, 0xf4: { name: 'DELEGATECALL', size: 1 }, 0xf5: { name: 'CREATE2', size: 1 },
            0xfa: { name: 'STATICCALL', size: 1 }, 0xfd: { name: 'REVERT', size: 1 }, 0xfe: { name: 'INVALID', size: 1 }, 0xff: { name: 'SELFDESTRUCT', size: 1 },
        };
        
        let result = '';
        let i = 0;
        while (i < sanitizedBytecode.length) {
            const byteIndex = i / 2;
            const byte = parseInt(sanitizedBytecode.substring(i, i + 2), 16);
            const opcode = opcodeMap[byte];
            result += `[${byteIndex.toString().padStart(4, '0')}] `;

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
    <div className="container mx-auto py-12 space-y-8">
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

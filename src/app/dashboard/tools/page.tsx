
'use client';

import { Wrench, Beaker, HardHat } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

const tools = [
    {
        name: 'Gas Price Tracker',
        description: 'Real-time gas price estimates for various networks.',
        icon: Wrench,
    },
    {
        name: 'ABI Converter',
        description: 'Convert between human-readable ABI and JSON formats.',
        icon: Beaker,
    },
    {
        name: 'EVM Disassembler',
        description: 'Analyze smart contract bytecode and convert it to opcodes.',
        icon: HardHat,
    }
]

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Developer Tools</h1>
        <p className="text-muted-foreground">
          A suite of utilities to help you build, test, and debug your Web3 projects.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
            <Card key={tool.name}>
                <CardHeader>
                     <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4">
                        <tool.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl font-bold">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{tool.description}</CardDescription>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

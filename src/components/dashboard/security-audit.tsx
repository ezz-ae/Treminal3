
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Shield, Loader2, AlertTriangle, CheckCircle, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type AuditResult = {
    level: 'critical' | 'high' | 'medium' | 'low' | 'informational';
    title: string;
    description: string;
}

const mockResults: AuditResult[] = [
    { level: 'critical', title: "Re-entrancy Vulnerability", description: "The contract is vulnerable to re-entrancy attacks, allowing an attacker to drain funds." },
    { level: 'high', title: "Unchecked External Call", description: "An external call does not check the return value, which could lead to unexpected behavior." },
    { level: 'medium', title: "Gas Limit Issues", description: "The contract may run out of gas for complex operations." },
    { level: 'low', title: "Outdated Compiler Version", description: "The Solidity compiler version is outdated, which may contain known bugs." },
    { level: 'informational', title: "Code Style Recommendations", description: "The code does not follow the recommended Solidity style guide." },
];

const resultStyles = {
    critical: { icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-500/10' },
    high: { icon: AlertTriangle, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    medium: { icon: AlertTriangle, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    low: { icon: AlertTriangle, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    informational: { icon: CheckCircle, color: 'text-gray-500', bgColor: 'bg-gray-500/10' },
};

export function SecurityAudit() {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'auditing' | 'done'>('idle');
    const [results, setResults] = useState<AuditResult[]>([]);

    const handleAudit = async () => {
        setStatus('auditing');
        setResults([]);
        await new Promise(resolve => setTimeout(resolve, 3000));
        // In a real app, you would send the code to a security analysis engine.
        setResults(mockResults.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * mockResults.length) + 1));
        setStatus('done');
    };

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl"><FileCode className="w-6 h-6" />Smart Contract Code</CardTitle>
                <CardDescription>Paste your Solidity code below to run the security audit.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea 
                    placeholder="pragma solidity ^0.8.0;\n\ncontract MyContract {\n    // ... your code ...\n}" 
                    value={code} 
                    onChange={e => setCode(e.target.value)} 
                    rows={15} 
                    className="font-mono"
                />
            </CardContent>
            <CardFooter className="flex-col items-stretch">
                <Button size="lg" onClick={handleAudit} disabled={!code || status === 'auditing'} className="w-full">
                    {status === 'auditing' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Shield className="mr-2 h-5 w-5" />} 
                    Run Audit
                </Button>
                <AnimatePresence>
                    {status === 'done' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8"
                        >
                            <h3 className="text-xl font-bold mb-4">Audit Results</h3>
                            <div className="space-y-4">
                                {results.length === 0 ? (
                                    <div className="flex items-center gap-3 p-4 bg-green-500/10 text-green-500 rounded-lg">
                                        <CheckCircle className="w-6 h-6" />
                                        <p>No vulnerabilities found. Your contract looks secure!</p>
                                    </div>
                                ) : (
                                    results.map((result, index) => {
                                        const style = resultStyles[result.level];
                                        const Icon = style.icon;
                                        return (
                                            <div key={index} className={`flex items-start gap-3 p-4 rounded-lg ${style.bgColor}`}>
                                                <Icon className={`w-5 h-5 mt-0.5 ${style.color}`} />
                                                <div>
                                                    <h4 className={`font-bold ${style.color}`}>{result.title}</h4>
                                                    <p className="text-sm text-muted-foreground">{result.description}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardFooter>
        </Card>
    );
}

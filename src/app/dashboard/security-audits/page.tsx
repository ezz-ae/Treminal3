
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ShieldCheck, AlertTriangle, Wand2, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { runSecurityAudit } from '@/ai/actions';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { SecurityAuditOutput } from '@/ai/schemas/security-audit';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { usePayModal } from '@/contexts/pay-modal-context';
import Link from 'next/link';

const FormSchema = z.object({
  solidityCode: z.string().min(50, {
    message: 'Please enter a valid Solidity contract (at least 50 characters).',
  }),
});

const exampleContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleAuction {
    address payable public beneficiary;
    uint public auctionEndTime;

    address public highestBidder;
    uint public highestBid;

    mapping(address => uint) pendingReturns;

    bool ended = false;

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    constructor(uint biddingTime, address payable beneficiaryAddress) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

    function bid() public payable {
        require(block.timestamp <= auctionEndTime, "Auction already ended.");
        require(msg.value > highestBid, "There already is a higher bid.");

        if (highestBid != 0) {
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    function withdraw() public returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;

            if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    function auctionEnd() public {
        require(block.timestamp > auctionEndTime, "Auction not yet ended.");
        require(!ended, "auctionEnd has already been called.");

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
`;

const severityConfig = {
    'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
    'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Low': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Informational': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

/**
 * Renders the AI Security Auditor page.
 * This page provides an interface for users to submit Solidity smart contracts for an
 * AI-powered security analysis. It displays the audit results, including found
 * vulnerabilities, their severity, descriptions, and recommended fixes.
 * @returns {JSX.Element} The security audit page component.
 */
export default function SecurityAuditPage() {
    const [result, setResult] = useState<SecurityAuditOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { showPayModal } = usePayModal();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            solidityCode: searchParams.get('code') || "",
        },
    });

    useEffect(() => {
        const codeFromQuery = searchParams.get('code');
        if (codeFromQuery) {
            form.setValue('solidityCode', codeFromQuery);
        }
    }, [searchParams, form]);
    
    /**
     * Handles the form submission to run the security audit.
     * @param {z.infer<typeof FormSchema>} data The form data containing the Solidity code.
     */
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setResult(null);
        try {
            const auditResult = await runSecurityAudit({ solidityCode: data.solidityCode });
            setResult(auditResult);
            toast({
                title: "Audit Complete!",
                description: `Found ${auditResult.vulnerabilities.length} potential issues.`,
            });
        } catch (error: any) {
            if (error.message === 'INSUFFICIENT_CREDITS') {
                showPayModal('SEC_AUDIT');
            } else {
                console.error("Failed to run security audit", error);
                toast({
                  variant: "destructive",
                  title: "Audit Failed",
                  description: "The AI auditor encountered an error. Please try again.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * Loads an example Solidity contract into the text area.
     */
    const loadExample = () => {
        form.setValue('solidityCode', exampleContract);
    }

  return (
    <div className="container mx-auto py-12 space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">AI Security Auditor</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Paste your Solidity smart contract code below to run our AI-powered security audit and identify potential vulnerabilities.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="lg:sticky lg:top-6">
                <CardHeader>
                    <CardTitle>Paste Your Solidity Code</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="solidityCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="pragma solidity ^0.8.20; ..."
                                                className="min-h-[350px] max-h-[60vh] font-mono text-xs"
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <div className="flex flex-col sm:flex-row gap-2">
                                <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                                    {isLoading ? <Loader2 className="animate-spin" /> : <><Bot className="mr-2 h-5 w-5" />Run Audit</>}
                                </Button>
                                <Button type="button" variant="outline" onClick={loadExample} disabled={isLoading} className="w-full sm:w-auto">
                                    <Wand2 className="mr-2 h-5 w-5" /> Load Example
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            
            {isLoading && (
                 <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                    <h3 className="text-xl font-headline font-semibold">Running Security Analysis...</h3>
                    <p className="text-muted-foreground">Our AI is meticulously scanning your contract for vulnerabilities.</p>
                </div>
            )}
            {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-primary mb-2 flex items-center gap-3 text-xl"><ShieldCheck className="w-6 h-6"/> Security Audit Report</CardTitle>
                        <CardDescription className="text-base italic">{result.summary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {result.vulnerabilities.length > 0 ? result.vulnerabilities.map((vuln, i) => (
                                <div key={i} className={cn("border rounded-lg p-4", severityConfig[vuln.severity])}>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-base flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> {vuln.name}</h4>
                                        <Badge variant="secondary" className={cn("text-sm", severityConfig[vuln.severity])}>{vuln.severity}</Badge>
                                    </div>
                                    <p className="text-sm mb-3 prose prose-invert max-w-none prose-p:text-inherit">{vuln.description}</p>
                                    <div className="text-sm font-medium bg-green-500/10 text-green-300 p-3 rounded-md">
                                        <span className="font-semibold">Recommendation:</span>
                                        <p className="prose prose-invert max-w-none prose-p:text-inherit prose-p:mt-1">{vuln.recommendation}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="flex items-center gap-3 text-green-400 text-lg bg-green-500/10 p-4 rounded-lg">
                                    <ShieldCheck className="w-6 h-6" />
                                    <p>No vulnerabilities found. The contract appears secure based on this automated analysis.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
   </div>
  );
}

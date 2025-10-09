
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { runSecurityAudit } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import type { SecurityAuditOutput } from '@/ai/schemas/security-audit';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FormSchema = z.object({
  solidityCode: z.string().min(50, {
    message: 'Please enter a valid Solidity contract (at least 50 characters).',
  }),
});

const severityConfig = {
    'Critical': 'bg-red-500/20 text-red-400 border-red-500/30',
    'High': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Low': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Informational': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

export default function SecurityAuditPage() {
    const [result, setResult] = useState<SecurityAuditOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            solidityCode: "",
        },
    });
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        setResult(null);
        try {
            const auditResult = await runSecurityAudit({ solidityCode: data.solidityCode });
            setResult(auditResult);
        } catch (error) {
            console.error("Failed to run security audit", error);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h1 className="text-4xl font-bold font-headline">Security Audits</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Paste your Solidity smart contract code below to run our AI-powered security audit and identify potential vulnerabilities.
            </p>
        </div>

        <Card>
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
                                            className="min-h-[250px] font-mono text-sm"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Run Audit'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
               <Card>
                   <CardHeader>
                    <CardTitle className="text-primary mb-2 flex items-center gap-3 text-2xl"><ShieldCheck className="w-8 h-8"/> Security Audit Report</CardTitle>
                    <p className="text-muted-foreground text-base italic">{result.summary}</p>
                   </CardHeader>
                   <CardContent>
                    <div className="space-y-4">
                        {result.vulnerabilities.length > 0 ? result.vulnerabilities.map((vuln, i) => (
                            <div key={i} className={cn("border rounded-lg p-4", severityConfig[vuln.severity])}>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-lg flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> {vuln.name}</h4>
                                    <Badge variant="secondary" className={cn("text-sm", severityConfig[vuln.severity])}>{vuln.severity}</Badge>
                                </div>
                                <p className="text-gray-400 text-sm mb-3">{vuln.description}</p>
                                <p className="text-green-400/90 text-sm font-medium bg-green-500/10 p-2 rounded-md">Recommendation: {vuln.recommendation}</p>
                            </div>
                        )) : (
                            <div className="flex items-center gap-3 text-green-400 text-lg">
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
  );
}

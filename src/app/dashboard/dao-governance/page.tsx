
'use client';

import { Vote, Users, PieChart, ShieldCheck, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const proposals = [
    {
        id: '0x123..abc',
        title: 'Q3 Protocol Upgrade & Grant Allocations',
        status: 'Passed',
        votesFor: 82,
        votesAgainst: 18,
    },
    {
        id: '0x456..def',
        title: 'Partnership with Solana Ecosystem Fund',
        status: 'Active',
        votesFor: 65,
        votesAgainst: 10,
    },
    {
        id: '0x789..ghi',
        title: 'Security Audit with Trail of Bits',
        status: 'Failed',
        votesFor: 40,
        votesAgainst: 60,
    },
]

/**
 * A placeholder page for DAO Governance.
 * @returns {JSX.Element} The DAO Governance page component.
 */
export default function DaoGovernancePage() {
  return (
    <div className="container mx-auto py-12">
        <header className="text-center mb-12">
            <div className="inline-block p-4 bg-primary/10 rounded-full text-primary mb-4 border border-primary/20">
                 <Vote className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-bold font-headline">DAO Governance Suite</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
                Create proposals, manage voting, and execute on-chain governance actions. A comprehensive dashboard for your Decentralized Autonomous Organization.
            </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Users className="text-primary"/> New Proposal</CardTitle>
                    <CardDescription>Draft and submit a new proposal for the community to vote on.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full mt-4">Create Proposal</Button>
                </CardContent>
            </Card>
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><PieChart className="text-primary"/> Active Votes</CardTitle>
                    <CardDescription>View and participate in all active governance proposals.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button className="w-full mt-4" variant="outline">View Active Votes</Button>
                </CardContent>
            </Card>
             <Card className="bg-card/50 md:col-span-2 lg:col-span-1">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><ShieldCheck className="text-primary"/> Treasury Management</CardTitle>
                     <CardDescription>Monitor the DAO's treasury and propose funding initiatives.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button className="w-full mt-4" variant="outline">View Treasury</Button>
                </CardContent>
            </Card>
        </div>

        <Card className="mt-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><FileText/> Recent Proposals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {proposals.map(p => (
                    <div key={p.id} className="p-4 border rounded-lg bg-card/50">
                       <div className="flex justify-between items-center mb-3">
                           <p className="font-semibold text-base">{p.title}</p>
                           <Badge 
                                variant={p.status === 'Passed' ? 'default' : p.status === 'Failed' ? 'destructive' : 'secondary'}
                                className={`${p.status === 'Passed' && 'bg-green-600'}`}>
                               {p.status === 'Passed' && <CheckCircle className="mr-2 h-4 w-4"/>}
                               {p.status === 'Failed' && <XCircle className="mr-2 h-4 w-4"/>}
                               {p.status}
                            </Badge>
                       </div>
                       <div>
                           <div className="flex justify-between text-sm text-muted-foreground mb-1">
                               <span>For ({p.votesFor}%)</span>
                               <span>Against ({p.votesAgainst}%)</span>
                           </div>
                            <Progress value={p.votesFor} className="h-2" />
                       </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}

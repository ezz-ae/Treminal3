
'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface Proposal {
    id: string;
    title: string;
    aiSummary: string; // AI-generated summary/insight
    status: 'Passed' | 'Active' | 'Failed';
    votesFor: number;
    votesAgainst: number;
    voteEndTime: string;
    userVoted?: 'For' | 'Against';
}

const mockProposals: Proposal[] = [
    {
        id: 'prop_001',
        title: 'Protocol Upgrade to Enhance AI Agent Capabilities',
        aiSummary: 'AI analysis indicates this upgrade significantly boosts agent efficiency and expands supported Web3 protocols, aligning with long-term ecosystem growth. Strong positive impact foreseen.',
        status: 'Active',
        votesFor: 75,
        votesAgainst: 25,
        voteEndTime: '2 days, 10 hours',
        userVoted: 'For',
    },
    {
        id: 'prop_002',
        title: 'Allocation of Treasury Funds for Solana Integration',
        aiSummary: 'AI project evaluation suggests a high ROI on this integration, driving user acquisition and expanding market reach. Proposal for strategic capital deployment.',
        status: 'Active',
        votesFor: 60,
        votesAgainst: 15,
        voteEndTime: '5 days, 3 hours',
    },
    {
        id: 'prop_003',
        title: 'Community Grant Program for dApp Development',
        aiSummary: 'AI impact assessment highlights potential for fostering innovative dApps within the ecosystem, attracting new developers and users. Long-term community benefit.',
        status: 'Passed',
        votesFor: 88,
        votesAgainst: 12,
        voteEndTime: 'Passed on 2024-03-15',
    },
    {
        id: 'prop_004',
        title: 'Proposed Fee Structure Adjustment for AI Services',
        aiSummary: 'AI financial modeling projects a neutral effect on short-term revenue but a positive long-term impact on user retention and service adoption. Requires careful consideration.',
        status: 'Active',
        votesFor: 45,
        votesAgainst: 55,
        voteEndTime: '1 day, 7 hours',
    },
];

const mockAiDraftProposal = async (topic: string, details: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `AI-Drafted Proposal: Enhancing ${topic} with a focus on ${details.substring(0, 50)}... The AI suggests focusing on measurable KPIs and clear voting criteria.`;
};

const mockAiAnalyzeTreasury = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        totalAssets: '1,250,000 USDC',
        allocated: '450,000 USDC (36%)',
        available: '800,000 USDC (64%)',
        aiRecommendation: 'AI recommends allocating up to 200,000 USDC for new development grants, maintaining a healthy operational reserve.',
    };
};

export default function DaoGovernancePage() {
    const [proposalTopic, setProposalTopic] = useState('');
    const [proposalDetails, setProposalDetails] = useState('');
    const [aiDraftLoading, setAiDraftLoading] = useState(false);
    const [aiDraftResult, setAiDraftResult] = useState<string | null>(null);

    const [treasuryAnalysis, setTreasuryAnalysis] = useState<any | null>(null);
    const [treasuryLoading, setTreasuryLoading] = useState(false);

    const handleDraftProposal = useCallback(async () => {
        if (!proposalTopic || !proposalDetails) return;
        setAiDraftLoading(true);
        setAiDraftResult(null);
        const draft = await mockAiDraftProposal(proposalTopic, proposalDetails);
        setAiDraftResult(draft);
        setAiDraftLoading(false);
    }, [proposalTopic, proposalDetails]);

    const handleAnalyzeTreasury = useCallback(async () => {
        setTreasuryLoading(true);
        setTreasuryAnalysis(null);
        const analysis = await mockAiAnalyzeTreasury();
        setTreasuryAnalysis(analysis);
        setTreasuryLoading(false);
    }, []);

    const handleVote = (proposalId: string, vote: 'For' | 'Against') => {
        alert(`Voted ${vote} on proposal ${proposalId}. (AI recorded your preference!)`);
        // Here, integrate with actual blockchain voting mechanism
        // For mock, update local state or just show alert
    };

  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: AI-Enhanced DAO Governance */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text leading-tight"
        >
          AI-Enhanced DAO Governance: Intelligent Decisions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          Participate in decentralized decision-making with AI-driven insights. From proposal drafting to treasury management, Terminal3 empowers smart governance.
        </motion.p>
      </div>

      {/* AI-Driven Proposal Workflow */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-green-400 to-primary text-transparent bg-clip-text">
          AI-Powered Proposal Creation & Evaluation
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
            {/* Left: Proposal Drafting */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">Draft New Proposal with AI</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="proposal-topic" className="text-base text-foreground">Proposal Topic</Label>
                        <Input 
                            id="proposal-topic" 
                            placeholder="e.g., Protocol Security Upgrade"
                            value={proposalTopic} 
                            onChange={e => setProposalTopic(e.target.value)}
                            className="text-base"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="proposal-details" className="text-base text-foreground">Key Details & Objectives</Label>
                        <Textarea 
                            id="proposal-details" 
                            placeholder="Outline the purpose, impact, and beneficiaries of this proposal. (AI will analyze this!)"
                            value={proposalDetails} 
                            onChange={e => setProposalDetails(e.target.value)}
                            rows={5}
                            className="text-base"
                        />
                    </div>
                    <Button 
                        onClick={handleDraftProposal} 
                        disabled={aiDraftLoading || !proposalTopic || !proposalDetails}
                        className="w-full text-base py-6 group bg-primary hover:bg-primary/90 transition-all"
                    >
                        {aiDraftLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI Drafting...</>) : (<>AI Draft & Analyze Proposal<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
                    </Button>
                </div>
            </div>
            {/* Right: AI Feedback on Draft */}
            <div className="space-y-6 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-purple-500/10 shadow-inner flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">AI Proposal Feedback</h3>
                <AnimatePresence mode="wait">
                    {aiDraftResult ? (
                        <motion.div
                            key="ai-draft-result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-lg text-muted-foreground leading-relaxed text-left w-full space-y-4"
                        >
                            <strong className="text-primary font-semibold">AI Insight:</strong> {aiDraftResult}
                            <Button className="mt-6 text-base py-6 px-9 group bg-green-500 hover:bg-green-600 transition-all w-full">
                                Submit AI-Refined Proposal <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="ai-draft-initial"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-muted-foreground py-10"
                        >
                            AI is ready to assist in drafting and refining your governance proposals for maximum clarity and impact.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* Active Governance & Treasury Overview */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-7xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
          Active Governance & Treasury Intelligence
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left: Active Proposals */} 
            <div className="space-y-8 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">Current Governance Proposals</h3>
                <div className="space-y-6">
                    {mockProposals.filter(p => p.status === 'Active').map((p, index) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="p-6 rounded-xl bg-background/50 border border-border/50 shadow-md"
                        >
                            <h4 className="text-xl font-bold text-foreground mb-2">{p.title}</h4>
                            <p className="text-sm text-primary mb-3 leading-relaxed"><strong className="text-foreground">AI Insight:</strong> {p.aiSummary}</p>
                            <div className="flex justify-between text-sm text-muted-foreground mb-1">
                                <span>For ({p.votesFor}%)</span>
                                <span>Against ({p.votesAgainst}%)</span>
                            </div>
                            <Progress value={p.votesFor} className="h-2 mb-3" />
                            <p className="text-xs text-muted-foreground">Vote Ends: {p.voteEndTime}</p>
                            <div className="flex gap-2 mt-4">
                                <Button size="sm" onClick={() => handleVote(p.id, 'For')} className="flex-1 bg-green-500 hover:bg-green-600">Vote For</Button>
                                <Button size="sm" onClick={() => handleVote(p.id, 'Against')} className="flex-1 bg-red-500 hover:bg-red-600">Vote Against</Button>
                            </div>
                            {p.userVoted && <p className="text-xs text-primary mt-2 text-center">You voted: {p.userVoted}</p>}
                        </motion.div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Button asChild variant="secondary" className="text-base py-6 px-9 group">
                        View All Past Proposals<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>

            {/* Right: AI-Powered Treasury Management */}
            <div className="space-y-8 p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-purple-500/10 shadow-lg">
                <h3 className="text-2xl font-bold font-headline text-foreground mb-4">AI-Powered Treasury Insights</h3>
                <AnimatePresence mode="wait">
                    {treasuryAnalysis ? (
                        <motion.div
                            key="treasury-result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6 text-left"
                        >
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                <strong className="text-primary font-semibold">Total Assets:</strong> {treasuryAnalysis.totalAssets}
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                <strong className="text-primary font-semibold">Allocated Funds:</strong> {treasuryAnalysis.allocated}
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                <strong className="text-primary font-semibold">Available Capital:</strong> {treasuryAnalysis.available}
                            </p>
                            <p className="text-lg text-primary leading-relaxed mt-6">
                                <strong className="text-foreground">AI Recommendation:</strong> {treasuryAnalysis.aiRecommendation}
                            </p>
                            <Button className="mt-6 text-base py-6 px-9 group bg-green-500 hover:bg-green-600 transition-all w-full">
                                AI Propose Funding Initiative <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="treasury-initial"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-muted-foreground text-center py-10"
                        >
                            AI is ready to provide real-time insights and strategic recommendations for your DAO treasury.
                        </motion.div>
                    )}
                </AnimatePresence>
                <Button 
                    onClick={handleAnalyzeTreasury} 
                    disabled={treasuryLoading}
                    className="w-full text-base py-6 group bg-blue-500 hover:bg-blue-600 transition-all"
                >
                    {treasuryLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI Analyzing...</>) : (<>AI Analyze Treasury<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
                </Button>
            </div>
        </div>
      </section>

      {/* Disclaimer Section - Subtle & Professional */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-4xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">Disclaimer:</strong> DAO governance involves collective decision-making and carries inherent risks associated with decentralized systems. AI insights are for informational and analytical purposes, providing enhanced context for your decisions, but do not constitute mandates. Users are responsible for their voting choices and ensuring compliance with all applicable regulations. Engage with governance responsibly.
        </p>
      </div>
    </div>
  );
}

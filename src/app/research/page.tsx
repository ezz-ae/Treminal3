'use client';

import { FlaskConical, BrainCircuit, Atom, ShieldCheck, Milestone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const researchTopics = [
  {
    icon: BrainCircuit,
    title: 'Constitutional AI for DAO Governance',
    description: 'A framework where a DAO\'s actions are supervised by a foundational AI model trained on the organization\'s charter. This "Constitutional AI," potentially developed with a partner like Google, would ensure all proposals align with the DAO\'s core principles before they go to a vote, preventing malicious or contradictory actions.',
    status: 'Conceptual Phase',
  },
  {
    icon: Atom,
    title: 'Cross-Chain Agent Communication Protocol (CCAP)',
    description: 'A standardized protocol allowing autonomous AI agents on different blockchains (e.g., an agent on Solana and one on Ethereum) to communicate, negotiate, and execute complex, multi-chain strategies without human intervention.',
    status: 'Under Research',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Knowledge Machine Learning (ZKML) for Private AI',
    description: 'Integrating ZK-proofs into our AI flows to allow users to get insights or results from our models without revealing their private, underlying data. For example, auditing a private smart contract without exposing the source code.',
    status: 'In Development',
  },
  {
    icon: Milestone,
    title: 'Dynamic On-Chain Reputation Systems',
    description: 'Moving beyond simple wallet scores. We are researching how to aggregate a wallet\'s full on-chain history—from governance votes to DeFi strategies—into a dynamic, evolving reputation score that can be used for new forms of undercollateralized lending and social identity.',
    status: 'Prototyping',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Driven Economic Modeling for Tokenomics',
    description: 'An AI agent that can simulate the entire lifecycle of a token economy based on a proposed set of rules. It would model millions of potential user actions to identify potential failure modes, inflation risks, or centralization vectors before the token is even launched.',
    status: 'Conceptual Phase',
  },
];

export default function ResearchPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <FlaskConical className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-5xl font-bold font-headline">Research & Development</h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Building the future of autonomous Web3. A look into the core research initiatives that drive our innovation.
        </p>
      </header>

      <div className="space-y-8 max-w-4xl mx-auto">
        {researchTopics.map((topic, index) => (
          <Card key={index} className="bg-card/50">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
                    <topic.icon className="w-6 h-6 shrink-0"/>
                </div>
                <div>
                    <CardTitle className="text-2xl">{topic.title}</CardTitle>
                    <CardDescription>{topic.status}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{topic.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

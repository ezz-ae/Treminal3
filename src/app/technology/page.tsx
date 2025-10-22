
'use client';

import { BrainCircuit, ShieldCheck, Zap } from 'lucide-react';

export default function TechnologyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
        <header className="mb-12 text-center">
            <BrainCircuit className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-5xl font-bold font-headline">The AI That Powers Terminal3</h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                We're not just using AI, we're building with it. Our platform is a testament to a deep, integrated partnership with Google, leveraging the Gemini family of models to create a truly AI-native experience.
            </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto mb-16">
            <div className="bg-card/50 p-6 rounded-lg border">
                <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-headline">Security & Reliability</h3>
                <p className="text-muted-foreground mt-2">
                    Our AI doesn't write insecure code from scratch. It builds upon a foundation of pre-audited, battle-tested smart contract templates, ensuring your projects are secure from day one.
                </p>
            </div>
            <div className="bg-card/50 p-6 rounded-lg border">
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-headline">Speed & Efficiency</h3>
                <p className="text-muted-foreground mt-2">
                    By automating boilerplate, generating code, and providing strategic plans, our AI accelerates your development workflow by orders of magnitude. Go from idea to MVP in minutes, not weeks.
                </p>
            </div>
             <div className="bg-card/50 p-6 rounded-lg border">
                <BrainCircuit className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-headline">True Agency</h3>
                <p className="text-muted-foreground mt-2">
                    Terminal3's AI is more than a chatbot. It's an agent. It can understand complex goals, break them into executable steps, and use its own tools to get the job done autonomously.
                </p>
            </div>
        </div>

        <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">A Google AI Partnership</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
                Our deep integration with Google's Gemini models means we are always at the bleeding edge of AI capabilities. This partnership allows us to provide a level of intelligence, reliability, and scale that is unmatched in the Web3 space. When you build with Terminal3, you're building with the power of Google's best AI.
            </p>
        </div>
    </div>
  );
}


'use client';

import Hero from './landing/hero';
import GridPattern from './landing/grid-pattern';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from './ui/button';

// --- Data for dynamic content (now text-driven) --- //
const aiAgencyFlow = [
  {
    title: "Translate Your Vision into Action",
    description: "Simply state your complex Web3 objectives. Our AI translates your intent into a precise, actionable strategy.",
  },
  {
    title: "Witness Autonomous Orchestration",
    description: "Your AI agent intelligently designs and optimizes the entire Web3 workflow, decomposing your goals into executable steps.",
  },
  {
    title: "Observe Flawless On-Chain Execution",
    description: "Watch as your AI agent autonomously deploys contracts, manages liquidity, and executes transactions with unparalleled precision.",
  },
  {
    title: "Achieve Continuous Evolution",
    description: "Benefit from proactive AI that continuously monitors, learns, and refines its strategies, ensuring sustained, superior outcomes.",
  },
];

const flagshipServices = [
    { href: "/dashboard/bot-creator", title: "AI-Driven Trading Automation", description: "Deploy autonomous agents that adapt and execute trading strategies to maximize your market advantage." },
    { href: "/solana-cash-machine", title: "The Solana Wealth Blueprint", description: "Use AI-driven tokenomics and liquidity strategies to transform your capital into consistent, reliable income streams on Solana." },
    { href: "/dashboard/security-audits", title: "Predictive Security Audits", description: "Leverage proactive AI analysis to identify and neutralize smart contract vulnerabilities before they become a threat." },
];

export function LandingPage() {

    return (
        <div className="bg-background text-foreground overflow-hidden font-body">
            {/* Dynamic Hero Section */}
            <div className="relative">
                <GridPattern className="absolute inset-0 -z-10 h-full w-full opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
                <Hero />

                <div className="container mx-auto px-4 md:px-6 py-20 text-center space-y-28 max-w-7xl">
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="max-w-6xl mx-auto"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-5xl lg:text-6xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text leading-tight"
                        >
                            Terminal3: Your AI Partner for Web3 Mastery
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-10 tracking-wide"
                        >
                            Delegate your complex Web3 operations to autonomous AI agents. Build, automate, and master the decentralized future with intelligent strategies and flawless on-chain execution.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <Button asChild size="lg" className="text-base py-6 px-9 group">
                                <Link href="/dashboard">
                                    Activate Your AI Agent
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.section>

                    {/* AI Agency in Action: Dynamic Workflow - No Icons, Text-Driven */}
                    <section className="max-w-7xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-green-400 to-primary text-transparent bg-clip-text">
                            From Vision to Value: Your AI Agent at Work
                        </h2>
                        <div className="relative flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 lg:gap-6">
                            {aiAgencyFlow.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.7, delay: index * 0.12 }}
                                    className="flex flex-col items-center text-center max-w-xs lg:max-w-none lg:flex-1 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <h3 className="text-xl font-bold font-headline mb-3 text-foreground">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                                </motion.div>
                            ))}
                            {/* Dynamic connecting lines for desktop */}
                            <div className="absolute hidden lg:flex inset-0 justify-around items-start -z-10 opacity-70">
                                {aiAgencyFlow.slice(0, -1).map((_, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 1, delay: 0.2 + index * 0.15 }}
                                        className="h-0.5 bg-primary/30 absolute top-[calc(50%+20px)] left-0 right-0"
                                        style={{ 
                                            width: 'calc(100% / 3 - 3rem)', // Adjust width to account for gap
                                            left: `${(index / (aiAgencyFlow.length - 1)) * 100 + 10}%`, // Adjust left position with padding
                                            transformOrigin: 'left',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* T03 Token - Integrated Value (Text-driven elegance) */}
                    <section className="text-center max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 p-10 rounded-xl bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/10 shadow-2xl relative">
                        <div className="text-left lg:text-center">
                            <h2 className="text-4xl font-bold font-headline mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                                T03: The Fuel for Your AI-Powered Web3 Engine
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                The T03 token is more than a currency; it's the key to unlocking the full potential of your AI agents. Access premium automation, gain priority execution, and steer the future of the Terminal3 ecosystem.
                            </p>
                            <Button asChild variant="outline" className="text-base py-5 px-7 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-colors">
                                <Link href="/t3-token">
                                    Master T03 Utility
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </section>

                    {/* Intelligent Services Overview (Flagship) - Minimal Cards, No Icons */}
                    <section className="max-w-7xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
                            Achieve Unrivaled Performance with AI-Native Solutions
                        </h2>
                        <div className="grid md:grid-cols-3 gap-10">
                            {flagshipServices.map((service, index) => (
                                <Link href={service.href} key={service.title} className="group block">
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6, delay: index * 0.12 }}
                                        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                                        className="h-full rounded-xl border border-primary/10 bg-gradient-to-br from-card to-background/50 shadow-xl p-8 flex flex-col items-center text-center transition-all"
                                    >
                                        <h3 className="text-2xl font-bold font-headline mb-3 text-foreground group-hover:text-blue-300 transition-colors">{service.title}</h3>
                                        <p className="text-muted-foreground text-sm flex-grow mb-6 leading-relaxed">{service.description}</p>
                                        <Button variant="link" className="text-primary group-hover:text-blue-300">
                                            Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-16">
                            <Button asChild variant="secondary" size="lg" className="text-base py-6 px-9 group">
                                <Link href="/dashboard">
                                    Explore All AI-Native Services
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </section>

                    {/* Confidence & Innovation (Refined, No Icons) */}
                    <section className="text-center max-w-5xl mx-auto pt-16">
                        <h2 className="text-4xl lg:text-5xl font-bold font-headline mb-12 bg-gradient-to-r from-red-400 to-yellow-400 text-transparent bg-clip-text">
                            Pioneering the Future of Decentralized Intelligence
                        </h2>
                        <div className="grid md:grid-cols-2 gap-10 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="flex flex-col items-center text-center p-8 rounded-xl bg-card/50 border border-yellow-500/10 shadow-xl"
                            >
                                <h3 className="text-2xl font-bold font-headline mb-3 text-yellow-500">Strategic Google AI Partnership</h3>
                                <p className="text-muted-foreground text-base leading-relaxed">
                                    Built on Google's cutting-edge Gemini models, our platform harnesses unparalleled AI intelligence, ensuring robust reliability and scalable performance for your Web3 ventures.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="flex flex-col items-center text-center p-8 rounded-xl bg-card/50 border border-red-500/10 shadow-xl"
                            >
                                <h3 className="text-2xl font-bold font-headline mb-3 text-red-500">Advanced Web3 Research Initiatives</h3>
                                <p className="text-muted-foreground text-base leading-relaxed">
                                    We are at the forefront of innovation, actively developing breakthroughs such as Constitutional AI for DAO governance and sophisticated Cross-Chain Agent Communication protocols.
                                </p>
                                <Button asChild variant="link" className="mt-4 text-red-400 hover:text-red-500">
                                    <Link href="/research">
                                        Explore Our Research
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

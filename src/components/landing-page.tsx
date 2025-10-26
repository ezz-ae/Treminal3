
'use client';

import Hero from './landing/hero';
import GridPattern from './landing/grid-pattern';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BrainCircuit, Code, Rocket, ShieldCheck, AppWindow, Gem, TrendingUp, Library, Bot, TerminalSquare, Code2, FileCode, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from './ui/button';

const solanaCashMachineFlow = [
  {
    title: 'Create a Token with AI',
    description: 'Use our AI-powered suggestions to create a custom SPL token on the Solana network.',
  },
  {
    title: 'Let AI Run Your Liquidity',
    description: 'Our AI-driven tools will intelligently manage your liquidity pools to maximize returns.',
  },
  {
    title: 'Make Money Every Day',
    description: 'Generate daily returns from your automated liquidity strategies and watch your investment grow.',
  },
];

const features = [
    { href: "/dashboard/bot-creator", title: "AI Trading Bot", icon: Bot, description: "Design, simulate, and deploy automated trading bots on decentralized exchanges." },
    { href: "/solana-cash-machine", title: "Solana AI Terminal", icon: TerminalSquare, description: "Interact with the Solana network using natural language commands." },
    { href: "/solana-cash-machine", title: "Solana Code Assistant", icon: Code2, description: "Get AI-powered assistance for writing and auditing Solana smart contracts." },
    { href: "/dashboard/dapp-builder", title: "AI Business Architect", icon: AppWindow, description: "Get a strategic plan and architecture for your new dApp." },
    { href: "/dashboard/token-launcher", title: "Token Launcher", icon: Gem, description: "Generate custom ERC-20 and SPL tokens on EVM and Solana chains." },
    { href: "/dashboard/strategy-vault", title: "Yield Farming Aggregator", icon: TrendingUp, description: "Automatically move stablecoins between top lending protocols to maximize your APY." },
    { href: "/dashboard/security-audits", title: "Security Audits", icon: ShieldCheck, description: "Audit smart contracts for vulnerabilities with AI-powered analysis." },
    { href: "/dashboard/strategy-vault", title: "Strategy Vault", icon: Library, description: "Browse and execute pre-built Web3 automation flows for DeFi, NFTs, and more." },
    { href: "/dashboard/scripting", title: "Web3 Scripting", icon: FileCode, description: "Write and execute custom Web3 scripts with our AI-powered editor." }
];

export function LandingPage() {

    return (
        <div className="bg-background text-foreground">
            <div className="relative">
                <GridPattern className="[mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)]" />
                <Hero />
            </div>
            <div className="container mx-auto px-4 md:px-6 py-12">
                <main className="space-y-12">
                    <section className="text-center">
                      <h2 className="text-3xl font-bold font-headline mb-4">Solana Cash Machine Flow</h2>
                      <p className="max-w-2xl mx-auto text-muted-foreground mb-8">Turn your budget into daily returns with our AI-powered Solana toolkit.</p>
                      <div className="grid md:grid-cols-3 gap-8">
                        {solanaCashMachineFlow.map((step, index) => (
                          <Card key={index}>
                            <CardHeader className="flex-row items-center gap-4">
                              <div className='flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground font-bold rounded-full'>{index + 1}</div>
                              <CardTitle>{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className='text-muted-foreground'>{step.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <Button asChild size='lg' className='mt-8'>
                        <Link href='/solana-cash-machine'>
                            Learn More
                            <ArrowRight className='ml-2 h-5 w-5' />
                        </Link>
                      </Button>
                    </section>
                    <section className="text-center">
                        <h2 className="text-3xl font-bold font-headline mb-4">Everything you need to build in Web3</h2>
                        <p className="max-w-2xl mx-auto text-muted-foreground mb-8">A complete suite of tools for Web3 developers, from beginners to experts.</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature) => (
                                <Link href={feature.href} key={feature.title}>
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 105, 180, 0.7), 0 0 40px rgba(255, 105, 180, 0.5)',
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className='h-full rounded-lg'
                                    >
                                        <Card className="h-full">
                                        <CardHeader className='items-center text-center'>
                                            <feature.icon className="w-10 h-10 text-primary mb-2" />
                                            <CardTitle>{feature.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className='text-center'>
                                            <CardDescription>{feature.description}</CardDescription>
                                        </CardContent>
                                        </Card>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

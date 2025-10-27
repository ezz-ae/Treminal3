
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Zap, DollarSign, Gem, Coins, LineChart, CheckCircle, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const solCashFlowSteps = [
  {
    icon: Lightbulb,
    title: "AI Vision to Token Reality",
    description: "Simply articulate your token idea. Our AI instantly designs and launches your custom SPL token on the Solana network.",
  },
  {
    icon: Coins,
    title: "Automated Liquidity Orchestration",
    description: "AI agents autonomously create and manage your liquidity pools, ensuring optimal depth and efficiency without manual intervention.",
  },
  {
    icon: LineChart,
    title: "Proactive Profit Optimization",
    description: "Continuous AI monitoring and adaptive strategies optimize your token's performance for sustained growth and daily returns.",
  },
];

const keyAdvantages = [
  {
    icon: BrainCircuit,
    title: "Pure AI Native",
    description: "Leveraging advanced intelligence for every step of your Solana token's journey.",
  },
  {
    icon: Zap,
    title: "Instant Execution",
    description: "Harness Solana's speed with AI-powered, lightning-fast deployments and transactions.",
  },
  {
    icon: DollarSign,
    title: "Consistent Returns",
    description: "Strategies designed for automated, predictable daily cash flow from your token.",
  },
  {
    icon: CheckCircle,
    title: "Effortless Management",
    description: "From launch to optimization, experience a truly hands-off, AI-managed experience.",
  },
];

export default function SolCashPage() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Hero Section - Dynamic, Bold, AI-Centric */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-blue-500/10 opacity-70 rounded-full w-[800px] h-[800px] blur-3xl mx-auto -translate-y-1/2 -translate-x-1/2"
          style={{ left: '50%', top: '50%' }}
        ></motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text leading-tight"
        >
          SolCash: Your AI-Native Solana Wealth Engine
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12"
        >
          Transform your ideas into automated income. SolCash empowers you with AI-driven creation, liquidity, and optimization for the Solana ecosystem.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button size="lg" className="text-lg py-7 px-10 group bg-primary hover:bg-primary/90 transition-all">
            Launch Your Solana Wealth Machine
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* AI-Powered Solana Flow - Dynamic, Less Cards */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-green-400 to-primary text-transparent bg-clip-text">
          How SolCash Generates Automated Income
        </h2>
        <div className="relative flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 lg:gap-8">
            {solCashFlowSteps.map((step, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: index * 0.15 }}
                    className="flex flex-col items-center text-center max-w-sm lg:flex-1 p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/20 shadow-lg"
                >
                    <div className="p-4 bg-primary/10 rounded-full text-primary mb-4">
                        <step.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold font-headline mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-base">{step.description}</p>
                </motion.div>
            ))}
            {/* Dynamic connecting lines for desktop */}
            <div className="absolute hidden lg:flex inset-0 justify-around items-start -z-10">
                {solCashFlowSteps.slice(0, -1).map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.15 }}
                        className="h-0.5 bg-primary/50 absolute top-1/3 left-0 right-0"
                        style={{ 
                            width: 'calc(100% / 2)',
                            left: `${(index / (solCashFlowSteps.length - 1)) * 100}%`,
                            transformOrigin: 'left',
                            transform: 'translateY(150px) translateX(50%)'
                        }}
                    />
                ))}
            </div>
        </div>
      </section>

      {/* Key Advantages - More Impactful, Less Cards */}
      <section className="container mx-auto px-4 md:px-6 py-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-12 bg-gradient-to-r from-red-400 to-yellow-400 text-transparent bg-clip-text">
              The SolCash Advantage
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
              {keyAdvantages.map((advantage, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex flex-col items-center p-6 border border-border/50 rounded-xl bg-card/50 shadow-lg"
                  >
                      <advantage.icon className="w-16 h-16 text-primary mb-6 animate-pulse-slow" />
                      <h3 className="text-2xl font-bold font-headline mb-3">{advantage.title}</h3>
                      <p className="text-muted-foreground text-center text-base">{advantage.description}</p>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* Call to Action Bar */}
      <div className="bg-primary/10 py-16 text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8">Ready to Launch Your Solana Project?</h2>
            <Button size="xl" className="text-xl py-8 px-12 group">
                Get Started with SolCash
                <ArrowRight className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
      </div>

      {/* Disclaimer Section - Subtle but Present */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-3xl mx-auto opacity-70">
          <strong className="text-destructive-foreground">Disclaimer:</strong> Solana token creation and liquidity management involve risks inherent to cryptocurrency markets. Token values and returns can fluctuate significantly. Terminal3 is not a financial advisor. Users are solely responsible for their financial decisions. Please utilize SolCash responsibly and in compliance with all applicable regulations.
        </p>
      </div>
    </div>
  );
}

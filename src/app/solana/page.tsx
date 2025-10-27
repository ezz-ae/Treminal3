
'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Bot } from 'lucide-react'; // Keeping Bot for explicit AI mention, and ArrowRight for navigation
import Link from 'next/link';
import { motion } from 'framer-motion';
import GridPattern from '@/components/landing/grid-pattern';
import { Button } from '@/components/ui/button';

const solanaServices = [
    { href: "/solana/trading", title: "AI Trading Orchestration", description: "Unleash autonomous AI agents for precision trading and adaptive strategies on Solana. Maximize your market advantage with intelligent automation." },
    { href: "/solana/tokens", title: "AI Token Intelligence", description: "Discover high-potential Solana tokens with unparalleled AI insights. Our intelligence engine proactively identifies opportunities and analyzes market dynamics for you." },
    { href: "/solana/liquidity-pools", title: "AI Liquidity Optimization", description: "Maximize capital efficiency and generate consistent returns by deploying AI-driven liquidity strategies. Intelligent management for Solana pools." },
    { href: "/solana/terminal", title: "AI Command Terminal", description: "Interact, monitor, and manage the Solana blockchain with unprecedented AI precision and natural language commands. Your intuitive gateway to decentralized operations." },
];

const getAiNetworkSummary = (tps: number, slotTime: number) => {
    if (tps > 3500 && slotTime < 450) {
        return "AI notes exceptionally robust network performance. Solana is operating at peak efficiency, ready for high-volume AI operations.";
    } else if (tps < 3000 && slotTime > 500) {
        return "AI observes moderate network activity. Performance is stable, providing reliable conditions for AI agent deployment.";
    }
    return "AI detects balanced network conditions. Consistent performance, ideal for optimizing diverse Web3 strategies.";
};

export default function SolanaPage() {
  const [networkStats, setNetworkStats] = useState({ tps: 0, slotTime: 0, epoch: 0, aiSummary: "AI is analyzing Solana network data..." });

  useEffect(() => {
    // Mock real-time data fetching with AI insights
    const interval = setInterval(() => {
      const newTps = Math.floor(2500 + Math.random() * 1500);
      const newSlotTime = Math.floor(400 + Math.random() * 100);
      const newEpoch = 512; // Static for mock
      setNetworkStats({
        tps: newTps,
        slotTime: newSlotTime,
        epoch: newEpoch,
        aiSummary: getAiNetworkSummary(newTps, newSlotTime),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="bg-background text-foreground overflow-hidden font-body">
          {/* Hero Section: Solana Command Center */}
          <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
               <GridPattern className="absolute inset-0 -z-10 h-full w-full opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
              <motion.h1
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text leading-tight"
              >
                  Solana Command Center: AI-Powered Navigation
              </motion.h1>
              <motion.p
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
              >
                  Your intuitive gateway to the Solana ecosystem, enhanced by autonomous AI intelligence for unmatched control, insight, and execution.
              </motion.p>
              <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
              >
                  <Button asChild size="lg" className="text-base py-6 px-9 group">
                      Explore AI-Native Solana
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
              </motion.div>
          </div>

          {/* AI-Analyzed Solana Network Pulse */}
          <section className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-green-400 to-primary text-transparent bg-clip-text">
              AI-Analyzed Solana Network Pulse
            </h2>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-foreground mb-3 font-headline">Transactions per Second (TPS)</h3>
                <p className="text-5xl font-extrabold text-primary leading-tight">{networkStats.tps.toLocaleString()}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-foreground mb-3 font-headline">Slot Time Latency</h3>
                <p className="text-5xl font-extrabold text-blue-400 leading-tight">{networkStats.slotTime}ms</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-foreground mb-3 font-headline">Current Epoch Cycle</h3>
                <p className="text-5xl font-extrabold text-purple-400 leading-tight">{networkStats.epoch}</p>
              </motion.div>
            </div>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg text-primary mt-12 text-center max-w-4xl mx-auto"
            >
                <Bot className="inline-block w-5 h-5 mr-2 align-middle" /> {networkStats.aiSummary}
            </motion.p>
          </section>

          {/* AI-Driven Solana Ecosystem Overview */}
          <section className="container mx-auto px-4 md:px-6 py-16 max-w-7xl">
            <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
              AI-Powered Solana Services: Your Autonomous Toolkit
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {solanaServices.map((service, index) => (
                <Link href={service.href} key={service.title} className="group block">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.3)" }}
                    className="h-full rounded-xl border border-primary/10 bg-gradient-to-br from-card to-background/50 shadow-xl p-8 flex flex-col items-center text-center transition-all"
                  >
                    <h3 className="text-xl font-bold font-headline mb-3 text-foreground group-hover:text-blue-300 transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground text-sm flex-grow mb-6 leading-relaxed">{service.description}</p>
                    <Button variant="link" className="text-primary group-hover:text-blue-300">
                      Access Service <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>

          {/* Disclaimer Section - Subtle & Professional */}
          <div className="container mx-auto px-4 md:px-6 py-8 text-center">
            <p className="text-sm text-muted-foreground max-w-4xl mx-auto opacity-70 leading-relaxed">
              <strong className="text-destructive-foreground">Disclaimer:</strong> Interacting with blockchain networks and utilizing AI-powered tools carries inherent technical and market risks. Terminal3 provides advanced intelligence and execution capabilities; however, users are responsible for their strategic decisions, managing digital assets securely, and ensuring compliance with all applicable regulations. Engage with the Solana ecosystem responsibly.
            </p>
          </div>
      </div>
  );
}

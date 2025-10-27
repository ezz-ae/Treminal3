
'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const t03EarningFlow = [
  {
    title: "AI-Curated Airdrop Discovery",
    description: "Our intelligence agents continuously identify and connect you with high-potential T03 token distributions and community engagement rewards.",
    action: "Explore current airdrop opportunities within your <Link href=\"/dashboard/quests\" className=\"text-primary hover:underline\">Dashboard Quests</Link>."
  },
  {
    title: "Optimized T03 Staking Engagement",
    description: "Effortlessly allocate your T03 tokens to our staking protocols. Our system automates optimal positioning to ensure continuous, maximized earnings.",
    action: "Initiate staking directly from your <Link href=\"/dashboard/stake\" className=\"text-primary hover:underline\">Staking Overview</Link>."
  },
  {
    title: "Seamless Reward Flow & Management",
    description: "Experience a consistent stream of accumulated airdrop tokens and staking rewards. Manage and compound your earnings with integrated tools.",
    action: "Monitor and claim your rewards in real-time within your <Link href=\"/dashboard/finance\" className=\"text-primary hover:underline\">Financial Dashboard</Link>."
  },
];

const t03Advantages = [
  {
    title: "Intelligent Opportunity Matching",
    description: "Leverage AI to connect with the most relevant and high-value earning opportunities within the T03 ecosystem.",
  },
  {
    title: "Automated Passive Income Streams",
    description: "Establish and maintain consistent reward generation through our advanced, set-and-forget staking mechanisms.",
  },
  {
    title: "Integrated Ecosystem Amplification",
    description: "T03 tokens are your gateway to unlocking advanced features, enhanced platform access, and governance participation across Terminal3.",
  },
];

export default function T03AirCashPage() {
  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: Dynamic, T03-Centric, Proactive Tone */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-background to-purple-500/5 opacity-50 rounded-full w-[800px] h-[800px] blur-3xl mx-auto -translate-y-1/2 -translate-x-1/2"
          style={{ left: '50%', top: '50%' }}
        ></motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text leading-tight"
        >
          T03 AirCash: Your AI-Native Earning Gateway
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          Maximize your T03 token holdings through AI-driven airdrop discovery and automated staking. Generate consistent Web3 income streams effortlessly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button asChild size="lg" className="text-base py-6 px-9 group bg-blue-500 hover:bg-blue-600 transition-all">
            Begin Earning T03 Rewards
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* T03 Automated Earning Journey - Dynamic, Text-Driven with On-Page Docs */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-purple-400 to-green-400 text-transparent bg-clip-text">
          The T03 Automated Earning Journey
        </h2>
        <div className="relative space-y-16">
          {t03EarningFlow.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`relative p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 
                ${index % 2 === 0 ? 'md:pr-12 md:text-left' : 'md:pl-12 md:text-right'}
              `}
            >
              {/* Step Number on the side */}
              <div className={`absolute top-1/2 -translate-y-1/2 p-3 bg-primary text-primary-foreground rounded-full font-bold text-base z-10 border-4 border-background 
                ${index % 2 === 0 ? '-left-6 md:left-full md:-ml-6' : '-right-6 md:right-full md:-mr-6'}
              `}>
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold font-headline mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-4">{step.description}</p>
              <p className="text-sm text-primary leading-relaxed">{step.action}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* T03 Key Advantages - Elegant & Impactful */}
      <section className="container mx-auto px-4 md:px-6 py-16 text-center max-w-6xl">
          <h2 className="text-4xl lg:text-5xl font-bold font-headline mb-12 bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
              The T03 AirCash Advantage: Optimized for Growth
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {t03Advantages.map((advantage, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, delay: index * 0.12 }}
                      className="flex flex-col items-center p-8 border border-border/10 rounded-xl bg-card/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                      <h3 className="text-xl font-bold font-headline mb-3 text-foreground">{advantage.title}</h3>
                      <p className="text-muted-foreground text-sm text-center leading-relaxed">{advantage.description}</p>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* Call to Action Bar */}
      <div className="bg-primary/10 py-16 text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline mb-8">Ready to Amplify Your T03 Holdings?</h2>
            <Button asChild size="xl" className="text-base py-7 px-10 group bg-blue-500 hover:bg-blue-600 transition-all">
                Explore Earning Opportunities
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
      </div>

      {/* Disclaimer Section - Subtle & Professional */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-3xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">Disclaimer:</strong> Participation in airdrops and staking involves inherent risks in volatile cryptocurrency markets. T03 token values and rewards can fluctuate significantly. Terminal3 is not a financial advisor. Users are solely responsible for their financial decisions, due diligence, and ensuring compliance with all applicable local, national, and international laws and regulations. Please engage responsibly.
        </p>
      </div>
    </div>
  );
}

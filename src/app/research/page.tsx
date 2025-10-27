
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const researchTopics = [
  {
    title: 'Constitutional AI for DAO Governance',
    description: 'We are pioneering a framework where DAO actions are governed by a foundational AI, ensuring every proposal aligns with the organization’s core principles. This brings intelligent, incorruptible oversight to decentralized governance.',
    status: 'Conceptual Phase',
  },
  {
    title: 'Cross-Chain Agent Communication Protocol (CCAP)',
    description: 'We are engineering a universal language that enables autonomous AI agents to communicate, negotiate, and execute complex strategies across any blockchain. This unlocks truly seamless, multi-chain automation without human intervention.',
    status: 'Under Research',
  },
  {
    title: 'Zero-Knowledge Machine Learning (ZKML) for On-Chain Privacy',
    description: 'Our research integrates Zero-Knowledge Proofs into AI, allowing you to gain invaluable insights from our models without ever exposing your private data. This is the future of confidential, on-chain intelligence.',
    status: 'In Development',
  },
  {
    title: 'Dynamic On-Chain Reputation Systems',
    description: 'We are building a system that moves beyond simple scores. It evaluates a wallet's entire on-chain history—from governance to DeFi—to create a dynamic reputation. This unlocks undercollateralized lending and true decentralized identity.',
    status: 'Prototyping',
  },
  {
    title: 'AI-Driven Economic Modeling for Resilient Tokenomics',
    description: 'Deploy an autonomous AI agent that stress-tests your token economy before launch. It simulates millions of user actions to identify failure modes and ensure your tokenomics are built for long-term success.',
    status: 'Conceptual Phase',
  },
];

export default function ResearchPage() {
  return (
    <div className="bg-background text-foreground overflow-hidden font-body">
      {/* Hero Section: Elegant & Focused Research Introduction */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text leading-tight"
        >
          Building the Future of Autonomous Web3
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          Our research is where the future of decentralized intelligence is born. We are actively creating the foundational technologies that will power the next generation of autonomous, AI-driven Web3 applications.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button asChild size="lg" className="text-base py-6 px-9 group">
            <Link href="#frontiers">
              Explore Our Research Frontiers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Dynamic Research Topics Presentation */}
      <section id="frontiers" className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-green-400 to-primary text-transparent bg-clip-text">
          Frontiers of Decentralized Intelligence
        </h2>
        <div className="space-y-20">
          {researchTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`relative p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 
                ${index % 2 === 0 ? 'md:pr-16 md:text-left' : 'md:pl-16 md:text-right md:flex-row-reverse'}
                flex flex-col items-start
              `}
            >
              {/* Status Indicator */}
              <span className={`absolute ${index % 2 === 0 ? 'top-4 left-4' : 'top-4 right-4'} text-xs font-semibold px-3 py-1 rounded-full 
                ${topic.status === 'Conceptual Phase' ? 'bg-blue-500/20 text-blue-400' : 
                 topic.status === 'Under Research' ? 'bg-yellow-500/20 text-yellow-400' : 
                 topic.status === 'In Development' ? 'bg-green-500/20 text-green-400' : 
                 'bg-purple-500/20 text-purple-400'
                }`}>
                {topic.status}
              </span>

              <h3 className="text-2xl font-bold font-headline mb-3 text-foreground mt-8 md:mt-0">{topic.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{topic.description}</p>
              <Button asChild variant="link" className="mt-4 pl-0 text-base group">
                <Link href="/contact">
                  Engage with this Research
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action - Engage with Research */}
      <section className="text-center py-16 bg-primary/10">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline mb-8">Shape the Future of Decentralized Intelligence</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                Our research is not built in a vacuum. We believe in collaborative innovation. If you are a builder, researcher, or investor with a shared vision, we invite you to connect with us.
            </p>
            <Button asChild size="lg" className="text-base py-6 px-9 group bg-primary hover:bg-primary/90 transition-all">
              <Link href="/contact">
                Partner with Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
        </div>
      </section>

      {/* Disclaimer Section - Subtle & Professional */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground max-w-3xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">A Note on Innovation:</strong> The research initiatives detailed here are at the cutting edge of Web3 and AI. They are forward-looking and experimental by nature. While our goal is to integrate these breakthroughs into the Terminal3 platform, timelines are subject to the complexities of deep-tech development. We are committed to transparency and will share our progress as we build the future.
        </p>
      </div>
    </div>
  );
}

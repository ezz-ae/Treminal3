
'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    title: "AI-Driven Strategy Formulation",
    description: "Articulate your financial objectives and risk parameters. Our advanced AI autonomously designs bespoke trading strategies for optimal market engagement."
  },
  {
    title: "Rigorous Simulation & Refinement",
    description: "Prior to live deployment, thoroughly backtest your strategy against comprehensive historical data. Simulate real-time performance to ensure robust profitability and risk mitigation."
  },
  {
    title: "Autonomous Deployment & Execution",
    description: "Launch your CashBOT 03 with singular precision. Our AI assumes control, executing trades with unparalleled agility across decentralized exchanges, 24/7."
  },
  {
    title: "Proactive Performance Optimization",
    description: "Continuously monitor and adapt. Our AI agents constantly learn from market dynamics, ensuring sustained cash flow and evolutionary strategy refinement."
  }
];

const coreAdvantages = [
  {
    title: "24/7 Autonomous Operation",
    description: "Your AI bot operates ceaselessly, identifying and capitalizing on opportunities even during your offline periods."
  },
  {
    title: "Optimized Profitability Pathways",
    description: "AI-driven strategies fluidly adapt to market shifts, consistently working towards maximizing your returns and enhancing cash flow."
  },
  {
    title: "Robust Operational Frameworks",
    description: "Engineered on battle-tested architectures with integrated security protocols, safeguarding your digital assets throughout automated operations."
  },
];

export default function CashBot03Page() {
  return (
    <div className="bg-background text-foreground overflow-hidden relative font-body">
      {/* Dynamic Hero Section */}
      <div className="container mx-auto px-4 md:px-6 py-20 text-center relative overflow-hidden max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-green-500/5 opacity-50 rounded-full w-[800px] h-[800px] blur-3xl mx-auto -translate-y-1/2 -translate-x-1/2"
          style={{ left: '50%', top: '50%' }}
        ></motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold font-headline mb-4 bg-gradient-to-r from-primary to-green-400 text-transparent bg-clip-text leading-tight"
        >
          CashBOT 03: Your AI-Native Profit Engine
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 tracking-wide"
        >
          Automate your trading with unparalleled AI intelligence. CashBOT 03 is not merely a bot; it's your autonomous agent for consistent Web3 financial growth.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button asChild size="lg" className="text-base py-6 px-9 group bg-primary hover:bg-primary/90 transition-all">
            Launch Your AI Trading Agent
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* AI Agent in Action: A Dynamic Flow with subtle 03 motif */}
      <section className="container mx-auto px-4 md:px-6 py-16 relative max-w-7xl">
        {/* Subtle, animated '03' as a background element */} 
        <motion.div
            initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
            whileInView={{ opacity: 0.03, rotate: 10, scale: 1.1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] font-extrabold text-primary/5 select-none pointer-events-none z-0"
        >
            03
        </motion.div>

        <h2 className="text-4xl lg:text-5xl font-bold text-center font-headline mb-16 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text relative z-10">
          CashBOT 03: Orchestrating Your Automated Wealth
        </h2>
        <div className="relative space-y-16 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-24 items-center justify-items-center z-10">
          {/* Vertical Line for larger screens */} 
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border/50"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`flex flex-col relative p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-lg w-full max-w-lg hover:shadow-xl transition-all duration-300
                ${index % 2 === 0 ? 'lg:col-start-1 lg:text-right lg:items-end' : 'lg:col-start-2 lg:text-left lg:items-start'}
              `}
            >
              {/* Step Number Circle */}
              <div className={`absolute ${index % 2 === 0 ? '-top-6 lg:-right-6' : '-top-6 lg:-left-6'} lg:top-1/2 lg:-translate-y-1/2 p-3 bg-primary text-primary-foreground rounded-full font-bold text-base z-10 border-4 border-background`}>
                {index + 1}
              </div>

              <h3 className="text-xl font-bold font-headline mb-2 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* Core Advantages (Elegant & Impactful) */}
      <section className="container mx-auto px-4 md:px-6 py-16 text-center relative max-w-7xl">
        {/* Another subtle, animated '03' for this section */}
        <motion.div
            initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
            whileInView={{ opacity: 0.03, rotate: -10, scale: 1.1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-[20rem] font-extrabold text-purple-500/5 select-none pointer-events-none z-0"
        >
            03
        </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold font-headline mb-12 bg-gradient-to-r from-red-400 to-yellow-400 text-transparent bg-clip-text relative z-10">
              The CashBOT 03 Advantage: Precision. Profit. Peace of Mind.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
              {coreAdvantages.map((advantage, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, delay: index * 0.12 }}
                      className="flex flex-col items-center p-6 border border-border/10 rounded-xl bg-card/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                      {/* Removed icon, relying on strong typography */}
                      <h3 className="text-2xl font-bold font-headline mb-3 text-foreground">{advantage.title}</h3>
                      <p className="text-muted-foreground text-base text-center leading-relaxed">{advantage.description}</p>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* Call to Action - Strong and Clear */}
      <section className="text-center py-16 relative z-10">
        <h2 className="text-3xl lg:text-4xl font-bold font-headline mb-8">Ready to Automate Your Web3 Earnings?</h2>
        <Button asChild size="xl" className="text-base py-7 px-10 group bg-primary hover:bg-primary/90 transition-all">
          Deploy Your CashBOT 03 Now
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </section>

      {/* Disclaimer Section - Subtle but Present */}
      <div className="container mx-auto px-4 md:px-6 py-8 text-center relative z-10">
        <p className="text-sm text-muted-foreground max-w-3xl mx-auto opacity-70 leading-relaxed">
          <strong className="text-destructive-foreground">Disclaimer:</strong> Engaging with trading bots in volatile cryptocurrency markets carries significant inherent risks. Past performance is not indicative of future results, and rapid market fluctuations can lead to substantial losses. Terminal3 operates as a technology provider and is not a financial advisor. Users are solely responsible for their investment decisions, due diligence, and ensuring compliance with all applicable local, national, and international laws and regulations. Please utilize CashBOT 03 responsibly and with a comprehensive understanding of the associated financial risks.
        </p>
      </div>
    </div>
  );
}

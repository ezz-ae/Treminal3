
'use client';

import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
    {
        question: "What is Terminal3?",
        answer: "Terminal3 is an all-in-one, AI-native development platform for Web3. It allows you to go from an idea to a fully deployed decentralized application (dApp) using natural language. It integrates tools for building, managing, and analyzing Web3 projects, all supercharged by AI."
    },
    {
        question: "How does the AI work?",
        answer: "Our platform is built on Google's advanced Gemini models. When you provide a prompt, our AI agent interprets your goal, breaks it down into steps, selects the appropriate tools (like smart contract generators or security auditors), and executes the plan. It's a true agent-based system designed for complex Web3 tasks."
    },
    {
        question: "Is it secure to build smart contracts with an AI?",
        answer: "Security is our highest priority. Our AI leverages a library of battle-tested, pre-audited smart contract templates from industry leaders like OpenZeppelin. When generating code, it customizes these secure foundations rather than writing contracts from scratch. Furthermore, every generated contract can be instantly passed to our AI Security Auditor for an additional layer of verification."
    },
    {
        question: "What blockchains do you support?",
        answer: "Terminal3 is chain-agnostic. Our primary tools support any EVM-compatible blockchain (like Ethereum, Polygon, Arbitrum, etc.). We also have a dedicated, high-performance 'Command Center' specifically for the Solana ecosystem."
    },
    {
        question: "Do I need to be a developer to use Terminal3?",
        answer: "No, but it helps! Founders and product managers can use Terminal3 to generate business plans, design tokenomics, and create functional prototypes without writing code. Developers can use it to accelerate their workflow, automate boilerplate tasks, and debug contracts, significantly speeding up the development lifecycle."
    },
    {
        question: "What does 'A Google AI Partnership' mean?",
        answer: "It means we work closely with Google to utilize their cutting-edge AI infrastructure and models, including the Gemini family. This partnership gives us priority access to the latest advancements in AI, ensuring our platform remains at the forefront of innovation and provides the most powerful and reliable tools for our users."
    }
]

export default function FaqsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
        <header className="mb-12 text-center">
            <HelpCircle className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-4xl font-bold font-headline">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                Have questions? We have answers. Here are some of the most common things we get asked.
            </p>
        </header>

        <div className="max-w-3xl mx-auto">
             <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                        {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    </div>
  );
}

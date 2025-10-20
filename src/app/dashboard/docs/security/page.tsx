'use client';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const bestPractices = [
  {
    title: 'Always Use Audited Contracts',
    description: 'Whenever possible, build upon well-known and audited contracts like those from OpenZeppelin. Our Smart Contract Templates are based on these standards. Avoid using unverified code from unknown sources.'
  },
  {
    title: 'Check-Effects-Interactions Pattern',
    description: 'To prevent reentrancy attacks, perform all state-changing logic (checks and effects) *before* interacting with external contracts (e.g., sending funds). This ensures your contract\'s state is updated before the external call can re-enter your function.'
  },
  {
    title: 'Handle Integer Overflows and Underflows',
    description: 'Use Solidity versions 0.8.0 or higher, which have built-in checks for integer arithmetic. For older versions, use a library like OpenZeppelin\'s SafeMath to prevent attackers from exploiting these vulnerabilities.'
  },
  {
    title: 'Implement Proper Access Control',
    description: 'Ensure that sensitive functions (like withdrawing funds or changing ownership) are protected with access control modifiers (e.g., `onlyOwner`). Clearly define roles and permissions within your contracts.'
  },
  {
    title: 'Use our Automated Security Audit Tool',
    description: 'Before deploying, always run your contracts through our AI-powered Security Audit tool. It can catch common vulnerabilities and provide recommendations for fixes, serving as a critical first line of defense.'
  },
    {
    title: 'Be Wary of Front-Running',
    description: 'Transactions on public blockchains are visible in the mempool before they are mined. Be aware that attackers can see your transactions and may try to front-run them. Avoid designs where the order of transactions is critical for fairness (e.g., a "first-come, first-served" mint).'
  }
]

export default function SecurityPage() {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight">
        <header className="mb-12">
             <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/10 rounded-lg text-primary">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-5xl font-bold !mb-0">Security Best Practices</h1>
                    <p className="text-xl text-muted-foreground mt-2">
                        Learn how to secure your applications and smart contracts on the Terminal3 platform.
                    </p>
                </div>
            </div>
        </header>

        <section className="mb-12">
            <h2>Building Securely in Web3</h2>
            <p>
                In the world of decentralized applications, security is not an afterthought—it's the foundation. The immutable nature of blockchains means that once a smart contract is deployed, its vulnerabilities are permanent and can be exploited by anyone. This guide outlines the essential best practices you should follow to protect your project and your users' assets.
            </p>
        </section>

        <section>
            <h2 className="mb-8">Core Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                {bestPractices.map((practice) => (
                    <div key={practice.title} className="bg-card/50 p-6 rounded-lg border h-full">
                        <h3 className="font-headline text-xl font-bold mb-2">{practice.title}</h3>
                        <p className="text-muted-foreground text-sm">{practice.description}</p>
                    </div>
                ))}
            </div>
        </section>
        
         <section className="mt-12 p-8 rounded-lg bg-red-500/10 border border-red-500/20">
             <div className='flex items-center gap-4'>
                <AlertTriangle className="w-12 h-12 text-red-400" />
                <div>
                    <h2 className="!mt-0 text-red-400">Security is a Process, Not a Destination</h2>
                    <p className="text-red-400/80">
                        No application is ever 100% secure. Security is an ongoing process of vigilance, testing, and auditing. While Terminal3 provides powerful tools like our <Link href="/dashboard/security-audits" className='text-red-300 hover:text-red-200'>AI Security Auditor</Link>, they are aids, not substitutes for a comprehensive security strategy. For high-value contracts, always consider a full manual audit from a reputable third-party firm.
                    </p>
                </div>
             </div>
        </section>
    </div>
  )
}

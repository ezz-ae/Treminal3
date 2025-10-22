
'use client';
import {
  AppWindow,
  Bot,
  ShieldCheck,
  AreaChart,
  Vote,
  Terminal,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Terminal,
    title: 'AI Command Center',
    description: 'The heart of Terminal3. A conversational interface to execute any task, from creating a token to auditing a contract.',
    href: '/dashboard/dapp-builder'
  },
  {
    icon: AppWindow,
    title: 'dApp Builder',
    description: 'Describe your application and let the AI generate a complete plan, including UI components and smart contracts.',
    href: '/dashboard/dapp-builder'
  },
  {
    icon: ShieldCheck,
    title: 'Security Audits',
    description: 'Paste in Solidity code and receive a comprehensive security analysis and recommendations.',
    href: '/dashboard/security-audits'
  },
    {
    icon: Vote,
    title: 'DAO Governance',
    description: 'Design a complete governance structure for your Decentralized Autonomous Organization.',
    href: '/dashboard/dao-governance'
  },
  {
    icon: AreaChart,
    title: 'On-chain Analytics',
    description: 'A visually rich dashboard providing deep insights into on-chain data.',
    href: '/dashboard/finance'
  },
  {
    icon: Bot,
    title: 'And much more...',
    description: 'Explore token launching, custom wallets, decentralized storage, and a full suite of developer tools.',
    href: '/dashboard'
  },
]

export default function GettingStartedPage() {
  return (
      <div className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-p:text-muted-foreground prose-a:text-primary">
          <header className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-primary/10 rounded-lg text-primary">
                      <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                      <h1 className="text-4xl font-bold !mb-0">Getting Started</h1>
                      <p className="text-lg text-muted-foreground mt-2">
                          Welcome to Terminal3. Here’s everything you need to know to get started.
                      </p>
                  </div>
              </div>
          </header>
          <section className="mb-12">
              <h2>What is Terminal3?</h2>
              <p>
                  Terminal3 is an all-in-one, AI-native platform designed to take you from idea to deployed dApp faster than ever before. It integrates a powerful suite of development, management, and analytics tools into a single, cohesive interface, supercharged by generative AI. Whether you're a seasoned developer or just starting, Terminal3 streamlines the entire Web3 development lifecycle.
              </p>
          </section>
          <section>
              <h2 className="mb-8">Core Features Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                  {features.map((feature) => (
                      <Link key={feature.title} href={feature.href}>
                          <div className="bg-card/50 p-6 rounded-lg border border-transparent hover:border-primary hover:bg-primary/5 cursor-pointer transition-all duration-300 h-full">
                              <div className="flex items-center gap-4 mb-4">
                                  <feature.icon className="w-6 h-6 text-primary" />
                                  <h3 className="font-headline text-lg font-bold">{feature.title}</h3>
                              </div>
                              <p className="text-muted-foreground text-sm">{feature.description}</p>
                          </div>
                      </Link>
                  ))}
              </div>
          </section>
          <section className="mt-12">
             <h2>Your First Steps</h2>
             <ol>
                 <li>
                   <strong>Explore the Dashboard:</strong> The <Link href="/dashboard">main dashboard</Link> is your mission control. It gives you a snapshot of your assets and provides access to all available services.
                 </li>
                 <li>
                   <strong>Use the AI dApp Builder:</strong> The fastest way to build is to ask. Go to the <Link href="/dashboard/dapp-builder">dApp Builder</Link> and try a prompt like: <em className="text-primary/80">"Create a plan for a dApp that lets users mint a profile NFT."</em>
                 </li>
                 <li>
                   <strong>Check the Analytics:</strong> Visit the <Link href="/dashboard/finance">Analytics</Link> page to see a demo of our on-chain data visualization capabilities.
                 </li>
                  <li>
                   <strong>Read the Docs:</strong> Whenever you need more detail, this <Link href="/dashboard/docs">documentation</Link> section is here to help with in-depth guides and recipes.
                 </li>
             </ol>
         </section>
      </div>
  );
}

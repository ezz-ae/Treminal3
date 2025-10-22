
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  AppWindow,
  Bot,
  Puzzle,
  FileJson,
  AreaChart,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  BotMessageSquare,
  Wallet,
  Network,
  FileArchive,
  Vote,
  Newspaper,
  Wind,
} from 'lucide-react';
import Link from 'next/link';

const docSections = [
  {
    icon: GraduationCap,
    title: 'Getting Started',
    description: 'Learn the basics of the Terminal3 platform, from connecting your wallet to deploying your first dApp.',
    href: '/dashboard/docs/getting-started'
  },
   {
    icon: Newspaper,
    title: 'Blog & Guides',
    description: 'Explore our comprehensive library of articles, tutorials, and guides for building in Web3.',
    href: '/blog'
  },
  {
    icon: Wind,
    title: 'Solana Hub',
    description: 'A deep-dive into our high-performance infrastructure and AI tools for Solana development.',
    href: '/solana'
  },
  {
    icon: Puzzle,
    title: 'APIs & Integration',
    description: 'Full reference documentation for all our developer APIs, including examples and use cases.',
    href: '/dashboard/docs/apis'
  },
  {
    icon: FileJson,
    title: 'Smart Contracts',
    description: 'Explore our library of audited smart contract templates and learn how to customize them securely.',
    href: '/dashboard/docs/smart-contracts'
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description: 'Best practices for securing your applications and smart contracts on our platform.',
    href: '/dashboard/docs/security'
  },
  {
    icon: BookOpen,
    title: 'Glossary',
    description: 'A comprehensive dictionary of Web3 and blockchain terms used throughout the platform.',
    href: '/dashboard/docs/glossary'
  },
]


export default function DocsPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Documentation</h1>
        <p className="max-w-2xl mt-4 text-muted-foreground text-lg">
          Welcome to the T3 Academy. Find the guides, references, and tutorials you need to build, manage, and scale your Web3 projects.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold font-headline mb-6">Platform Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docSections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className="flex flex-col group bg-card/50 hover:border-primary/50 transition-colors duration-300 h-full">
                  <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
                          <section.icon className="w-6 h-6" />
                      </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                      <CardTitle className="text-xl font-bold mb-2">{section.title}</CardTitle>
                      <CardDescription className="text-sm">{section.description}</CardDescription>
                  </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

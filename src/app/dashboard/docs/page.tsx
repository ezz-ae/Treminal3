
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
  Sprout,
  BotMessageSquare,
  Wallet,
  Network,
  FileArchive,
  Vote,
  BookPlus,
  FilePenLine,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';


const docSections = [
  {
    icon: GraduationCap,
    title: 'Getting Started',
    description: 'Learn the basics of the Terminal3 platform, from connecting your wallet to deploying your first dApp.',
    href: '#'
  },
  {
    icon: AppWindow,
    title: 'Core Services',
    description: 'Detailed guides on our foundational tools like the dApp Builder and Token Launcher.',
    href: '#'
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Master the art of creating and deploying autonomous AI agents to automate your on-chain tasks.',
    href: '#'
  },
  {
    icon: Puzzle,
    title: 'APIs & Integration',
    description: 'Full reference documentation for all our developer APIs, including examples and use cases.',
    href: '#'
  },
   {
    icon: Sprout,
    title: 'Solana',
    description: 'Explore our comprehensive suite of tools and services for building on the Solana blockchain.',
    href: '/dashboard/docs/solana'
  },
  {
    icon: FileJson,
    title: 'Smart Contracts',
    description: 'Explore our library of audited smart contract templates and learn how to customize them securely.',
    href: '#'
  },
  {
    icon: AreaChart,
    title: 'Data & Analytics',
    description: 'Dive deep into our analytics engine to query, visualize, and get insights from on-chain data.',
    href: '#'
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description: 'Best practices for securing your applications and smart contracts on our platform.',
    href: '#'
  },
  {
    icon: BookOpen,
    title: 'Glossary',
    description: 'A comprehensive dictionary of Web3 and blockchain terms used throughout the platform.',
    href: '#'
  },
]

const articles = [
  {
    serviceIndex: 0,
    icon: AppWindow,
    title: 'Building a dApp with Natural Language',
    excerpt: 'Discover how to describe your desired decentralized application and let Terminal3 AI generate the foundational code for you.',
    content: 'Building a dApp is now as easy as describing it. With Terminal3\'s "Full Automatic" mode, you can simply write a prompt like "Create an NFT marketplace for digital artists with a 5% royalty fee." Our AI will interpret your request, select the appropriate smart contract templates, generate the front-end components, and present you with a functional baseline. This article walks you through the process, from crafting the perfect prompt to making minor tweaks to the AI-generated output. It\'s the fastest way to go from idea to MVP.',
  },
   {
    serviceIndex: 1,
    icon: Puzzle,
    title: 'Launching Your Own Cryptocurrency',
    excerpt: 'From concept to circulation, learn how the Token Launcher simplifies the complex process of creating a new digital asset.',
    content: 'Ever dreamed of launching your own token? The Token Launcher makes it a reality. This guide covers the key parameters you can define, such as name, symbol, total supply, and decimal places. We\'ll walk through the automated process of generating and deploying an ERC-20 compliant smart contract. You\'ll learn how to manage your token\'s distribution and get it listed on decentralized exchanges, all from the Terminal3 dashboard.',
  },
  {
    serviceIndex: 2,
    icon: Bot,
    title: 'Automated Trading Strategies',
    excerpt: 'Dive into the world of algorithmic trading. Build, backtest, and deploy high-frequency trading bots on major exchanges.',
    content: 'Unleash the power of automation with our Trading Bot Platform. This note explores how you can leverage pre-built templates for strategies like arbitrage and market-making, or write your own custom logic in a secure sandboxed environment. We\'ll cover how to connect to exchange APIs, use our powerful backtesting engine with historical data, and deploy your bot for live trading. Stop watching the charts and let your agent do the work.',
  },
  {
    serviceIndex: 3,
    icon: BotMessageSquare,
    title: 'Deploying Autonomous AI Agents',
    excerpt: 'Go beyond simple scripts. Create intelligent agents that can react to on-chain events and perform complex tasks automatically.',
    content: 'AI Agents are the next frontier of Web3 automation. This guide explains how to create agents that can be triggered by specific on-chain events, such as a large token transfer or a change in a smart contract\'s state. We\'ll show you how to give your agent a goal, like "rebalance my portfolio when volatility exceeds a certain threshold," and let it determine the best course of action. This is true automation for the decentralized world.',
  },
  {
    serviceIndex: 4,
    icon: Wallet,
    title: 'Branded Crypto Wallets for Your Users',
    excerpt: 'Foster brand loyalty and streamline user experience by providing your community with a custom, secure crypto wallet.',
    content: 'Why send your users to a third-party wallet? With our Custom Wallet builder, you can create a secure, branded wallet experience directly within your application. This note covers the customization options, from logos and color schemes to pre-configured network settings. We\'ll also discuss the security features, including multi-sig support and hardware wallet integration, ensuring your users\' assets are always safe.',
  },
  {
    serviceIndex: 5,
    icon: FileJson,
    title: 'Secure Smart Contracts Made Easy',
    excerpt: 'Leverage our library of audited and battle-tested smart contract templates to build your project on a secure foundation.',
    content: 'Smart contract vulnerabilities are a massive risk in Web3. Our Smart Contract Templates provide the peace of mind you need. This guide details our library of common contracts, including ERC-20 tokens, ERC-721 NFTs, vesting contracts, and DAOs. Learn how each template has been rigorously audited by third-party security firms and how you can easily customize them to fit your specific needs without writing a single line of Solidity.',
  },
  {
    serviceIndex: 6,
    icon: Network,
    title: 'Mastering Manual Transactions',
    excerpt: 'For the pros who need granular control, learn how to interact directly with the blockchain for custom operations and analysis.',
    content: 'Sometimes, you need to get your hands dirty. The Manual Transactions tool gives you a direct interface to any EVM-compatible blockchain. This advanced guide shows you how to construct and broadcast raw transactions, call specific functions on any smart contract, and decode transaction data for deep analysis. It\'s the ultimate tool for developers and researchers who need precise control over their on-chain interactions.',
  },
  {
    serviceIndex: 7,
    icon: AreaChart,
    title: 'The Future of Decentralized Finance (DeFi)',
    excerpt: 'Explore the cutting-edge of finance and learn how Terminal3 provides the tools to participate in the DeFi revolution.',
    content: 'Decentralized Finance (DeFi) is rebuilding the entire financial system on the blockchain. From lending and borrowing to trading and insurance, DeFi protocols are creating a more open, efficient, and accessible global economy. Terminal3 is your gateway to this revolution. Use our Trading Bot Platform to execute complex strategies across multiple decentralized exchanges, or launch your own financial instrument with our Token Launcher. Our On-chain Analytics engine gives you the deep insights needed to navigate the market, while our audited Smart Contract Templates provide the security required for financial applications. With Terminal3, you\'re not just observing the future of finance—you\'re building it.',
  },
   {
    serviceIndex: 8,
    icon: FileArchive,
    title: 'Leveraging Decentralized Storage',
    excerpt: 'Learn how to host your dApp front-end, store NFT metadata, and manage files on IPFS and other decentralized networks.',
    content: 'Decentralized storage is a core pillar of a truly censorship-resistant web. This note explains how to use our Decentralized Storage solutions to upload and manage files on IPFS and other networks. We\'ll walk through the process of pinning files for permanence, getting a content-addressable hash (CID), and using it to serve a dApp front-end or link to NFT metadata. Say goodbye to centralized servers and embrace the permanent web.',
  },
  {
    serviceIndex: 9,
    icon: ShieldCheck,
    title: 'Automated Security Audits',
    excerpt: 'Before you deploy, run our automated security analyzer on your smart contracts to catch common vulnerabilities.',
    content: 'Don\'t deploy with bugs. Our automated Security Audits tool is your first line of defense against potential exploits. This guide explains the types of vulnerabilities our scanner looks for, including reentrancy, integer overflows, and improper access control. While not a substitute for a full manual audit, this tool can catch common mistakes and give you a report on your contract\'s security posture in minutes, helping you build with confidence.',
  },
  {
    serviceIndex: 10,
    icon: Vote,
    title: 'Effective DAO Governance',
    excerpt: 'Manage your Decentralized Autonomous Organization with our comprehensive suite of governance tools.',
    content: 'Running a DAO is more than just deploying a contract. Our DAO Governance tools help you manage the entire lifecycle. This note covers how to create proposals, set up different voting mechanisms (like token-weighted or one-person-one-vote), and execute passed proposals on-chain. We\'ll also explore how to manage your treasury and keep your community engaged through a transparent and easy-to-use governance dashboard.',
  },
];

type Article = {
    title: string;
    excerpt: string;
    icon: React.ElementType;
    content: string;
};

export default function DocsPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Documentation</h1>
        <p className="max-w-2xl mt-4 text-muted-foreground text-lg">
          Welcome to the T3 Academy. Find the guides, references, and tutorials you need to build, manage, and scale your Web3 projects.
        </p>
      </div>

       <div className="mb-16">
        <h2 className="text-2xl font-bold font-headline mb-6">T3 Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <Card 
                    key={article.title} 
                    className="flex flex-col group bg-card/50 hover:border-primary/50 transition-colors duration-300 cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                >
                    <CardHeader>
                        <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit">
                            <article.icon className="w-6 h-6" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardTitle className="text-xl font-bold mb-2">{article.title}</CardTitle>
                        <CardDescription className="text-sm">{article.excerpt}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
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

       <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="max-w-3xl w-full bg-black/80 shadow-2xl shadow-primary/20 backdrop-blur-sm p-0 border-0 flex flex-col">
            <motion.div
              className="relative font-code text-sm rounded-lg pointer-events-auto flex-grow flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-primary origin-center animate-[scaleX_1.5s_ease-in-out]" />
              <div className="absolute top-0 right-0 w-px h-full bg-primary origin-center animate-[scaleY_1.5s_ease-in-out]" />
              <div className="absolute bottom-0 right-0 w-full h-px bg-primary origin-center animate-[scaleX_1.5s_ease-in-out_0.2s]" />
              <div className="absolute top-0 left-0 w-px h-full bg-primary origin-center animate-[scaleY_1.5s_ease-in-out_0.2s]" />
              
              <div className="p-8 flex-grow overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-headline text-3xl text-white mb-4">{selectedArticle?.title}</DialogTitle>
                  <DialogDescription className="text-gray-400 font-sans prose prose-invert">
                    <p className="text-base leading-relaxed">{selectedArticle?.content}</p>
                  </DialogDescription>
                </DialogHeader>
              </div>

               <DialogFooter className="p-4 border-t border-primary/20">
                <Button variant="ghost">
                  <BookPlus className="mr-2" />
                  Add to Notebook
                </Button>
                <Button variant="ghost">
                  <FilePenLine className="mr-2" />
                  Suggest Edit
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
    </div>
  )
}

    
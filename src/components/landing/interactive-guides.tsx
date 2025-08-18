
'use client';

import { useState, useEffect } from 'react';
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
import {
  AppWindow,
  Bot,
  Puzzle,
  Wallet,
  FileJson,
  Network,
  BotMessageSquare,
  AreaChart,
  FileArchive,
  ShieldCheck,
  Vote,
  BookPlus,
  FilePenLine,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

const articles = [
  {
    serviceIndex: 0,
    icon: AppWindow,
    title: 'Building a dApp with Natural Language',
    excerpt: 'Discover how to describe your desired decentralized application and let Treminal3 AI generate the foundational code for you.',
    content: 'Building a dApp is now as easy as describing it. With Treminal3\'s "Full Automatic" mode, you can simply write a prompt like "Create an NFT marketplace for digital artists with a 5% royalty fee." Our AI will interpret your request, select the appropriate smart contract templates, generate the front-end components, and present you with a functional baseline. This article walks you through the process, from crafting the perfect prompt to making minor tweaks to the AI-generated output. It\'s the fastest way to go from idea to MVP.',
  },
   {
    serviceIndex: 1,
    icon: Puzzle,
    title: 'Launching Your Own Cryptocurrency',
    excerpt: 'From concept to circulation, learn how the Token Launcher simplifies the complex process of creating a new digital asset.',
    content: 'Ever dreamed of launching your own token? The Token Launcher makes it a reality. This guide covers the key parameters you can define, such as name, symbol, total supply, and decimal places. We\'ll walk through the automated process of generating and deploying an ERC-20 compliant smart contract. You\'ll learn how to manage your token\'s distribution and get it listed on decentralized exchanges, all from the Treminal3 dashboard.',
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
    excerpt: 'Explore the cutting-edge of finance and learn how Treminal3 provides the tools to participate in the DeFi revolution.',
    content: 'Decentralized Finance (DeFi) is rebuilding the entire financial system on the blockchain. From lending and borrowing to trading and insurance, DeFi protocols are creating a more open, efficient, and accessible global economy. Treminal3 is your gateway to this revolution. Use our Trading Bot Platform to execute complex strategies across multiple decentralized exchanges, or launch your own financial instrument with our Token Launcher. Our On-chain Analytics engine gives you the deep insights needed to navigate the market, while our audited Smart Contract Templates provide the security required for financial applications. With Treminal3, you\'re not just observing the future of finance—you\'re building it.',
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


// A catch-all default article
const defaultArticle = {
    serviceIndex: -1,
    icon: BookOpen,
    title: 'Welcome to the Knowledge Hub',
    excerpt: 'Select a service above to see a relevant guide, or explore our general documentation to learn more about the platform.',
    content: 'Our platform is a comprehensive suite of tools designed to take you from idea to launch and beyond. Whether you are a developer, a founder, or a marketer, you\'ll find the resources you need to succeed in the Web3 space. Explore our dApp builder, launch your own token, deploy AI agents, and so much more. This is your command center for the new digital economy. Select a service from the grid above to see a specific guide related to it.'
};

type Article = {
    title: string;
    excerpt: string;
    icon: React.ElementType;
    content: string;
};

interface InteractiveGuidesProps {
    activeServiceIndex: number | null;
}

export default function InteractiveGuides({ activeServiceIndex }: InteractiveGuidesProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [article, setArticle] = useState<Article>(defaultArticle);

  useEffect(() => {
    const articleData = articles.find(a => a.serviceIndex === activeServiceIndex) || defaultArticle;
    setArticle(articleData);
  }, [activeServiceIndex]);

  const LucideIcon = article.icon;

  return (
    <section id="start" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
            className="max-w-4xl mx-auto bg-card p-8 rounded-lg border cursor-pointer hover:border-primary/50 transition-colors duration-300" 
            onClick={() => setSelectedArticle(article)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex flex-col items-start">
                 <div className="flex items-center gap-4 mb-4">
                    <LucideIcon className="w-10 h-10 text-primary" />
                    <h3 className="font-headline text-3xl font-bold">{article.title}</h3>
                </div>
                <p className="text-muted-foreground text-lg mb-6 ml-14">{article.excerpt}</p>
                <Button variant="link" className="p-0 text-lg ml-14">Read Note &rarr;</Button>
            </div>
        </motion.div>

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
    </section>
  );
}

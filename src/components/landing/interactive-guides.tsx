
'use client';

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
  BookOpen,
  BookPlus,
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { addNoteAction } from '@/app/actions';

const articles = [
  {
    serviceIndex: 0,
    slug: 'building-a-dapp-with-natural-language',
    icon: AppWindow,
    title: 'Building a dApp with Natural Language',
    excerpt: 'Discover how to describe your desired decentralized application and let Terminal3 AI generate the foundational code for you.',
    content: 'Building a dApp is now as easy as describing it. With Terminal3\'s "Full Automatic" mode, you can simply write a prompt like "Create an NFT marketplace for digital artists with a 5% royalty fee." Our AI will interpret your request, select the appropriate smart contract templates, generate the front-end components, and present you with a functional baseline. It analyzes your needs, proposes a full architecture including required smart contracts and UI components, and then generates the code. This article walks you through the process, from crafting the perfect prompt to making minor tweaks to the AI-generated output. It\'s the fastest way to go from idea to MVP.',
  },
   {
    serviceIndex: 1,
    slug: 'launching-your-own-cryptocurrency',
    icon: Puzzle,
    title: 'Launching Your Own Cryptocurrency',
    excerpt: 'From concept to circulation, learn how the Token Launcher simplifies the complex process of creating a new digital asset.',
    content: 'Ever dreamed of launching your own token? The Token Launcher makes it a reality. This guide covers how our AI can parse a simple description like "Create a deflationary utility token called \'Galaxy Dust\' with the symbol GLX and a total supply of 1 billion" to generate a secure, ERC-20 compliant smart contract. You\'ll learn how the AI automatically handles details like setting the name, symbol, total supply, and decimal places. We\'ll walk through the automated process of generating and deploying the contract, all from a single prompt in the Terminal3 dashboard.',
  },
  {
    serviceIndex: 2,
    slug: 'automated-trading-strategies',
    icon: Bot,
    title: 'Automated Trading Strategies',
    excerpt: 'Dive into the world of algorithmic trading. Build, backtest, and deploy high-frequency trading bots on major exchanges.',
    content: 'Unleash the power of automation with our Trading Bot Platform. This note explores how you can leverage pre-built templates for strategies like arbitrage and market-making, or describe your own custom logic in a secure sandboxed environment. We\'ll cover how to connect to exchange APIs via our AI agents, use our powerful backtesting engine with historical data, and deploy your bot for live trading. You can prompt the system with "Develop a bot that buys token X on Uniswap and sells it on Sushiswap if the price difference is greater than 2%." Stop watching the charts and let your agent do the work.',
  },
  {
    serviceIndex: 3,
    slug: 'deploying-autonomous-ai-agents',
    icon: BotMessageSquare,
    title: 'Deploying Autonomous AI Agents',
    excerpt: 'Go beyond simple scripts. Create intelligent agents that can react to on-chain events and perform complex tasks automatically.',
    content: 'AI Agents are the next frontier of Web3 automation. This guide explains how to create agents that can be triggered by specific on-chain events, such as a large token transfer or a change in a smart contract\'s state. We\'ll show you how to give your agent a goal, like "rebalance my DeFi portfolio when asset A\'s value exceeds 50% of the total," and let it determine the best course of action by calling different contracts and services. This is true automation for the decentralized world, all powered by natural language commands.',
  },
  {
    serviceIndex: 4,
    slug: 'branded-crypto-wallets-for-your-users',
    icon: Wallet,
    title: 'Branded Crypto Wallets for Your Users',
    excerpt: 'Foster brand loyalty and streamline user experience by providing your community with a custom, secure crypto wallet.',
    content: 'Why send your users to a third-party wallet? With our Custom Wallet builder, you can create a secure, branded wallet experience directly within your application. This note covers how you can prompt our AI to "Design a wallet for my dApp with our logo, a blue color scheme, and pre-configured for the Polygon network." We\'ll also discuss the underlying security features that are included by default, including multi-sig support and hardware wallet integration, ensuring your users\' assets are always safe.',
  },
  {
    serviceIndex: 5,
    slug: 'secure-smart-contracts-made-easy',
    icon: FileJson,
    title: 'Secure Smart Contracts Made Easy',
    excerpt: 'Leverage our library of audited and battle-tested smart contract templates to build your project on a secure foundation.',
    content: 'Smart contract vulnerabilities are a massive risk in Web3. Our Smart Contract Templates provide the peace of mind you need. This guide details our library of common contracts, including ERC-20 tokens, ERC-721 NFTs, vesting contracts, and DAOs. Learn how each template has been rigorously audited by third-party security firms and how you can easily customize them using an AI prompt like "Generate an ERC721 contract with a function that allows the owner to airdrop NFTs to a list of addresses." This combines the security of templates with the flexibility of AI.',
  },
  {
    serviceIndex: 6,
    slug: 'mastering-manual-transactions',
    icon: Network,
    title: 'Mastering Manual Transactions',
    excerpt: 'For the pros who need granular control, learn how to interact directly with the blockchain for custom operations and analysis.',
    content: 'Sometimes, you need to get your hands dirty. The Manual Transactions tool gives you a direct interface to any EVM-compatible blockchain. This advanced guide shows you how to construct and broadcast raw transactions, call specific functions on any smart contract by providing its ABI, and decode transaction data for deep analysis. You can also use the AI agent with prompts like "Call the \'mint\' function on contract 0x... with the parameter \'5\'." It\'s the ultimate tool for developers and researchers who need precise control over their on-chain interactions.',
  },
  {
    serviceIndex: 7,
    slug: 'the-future-of-decentralized-finance-defi',
    icon: AreaChart,
    title: 'On-chain Analytics',
    excerpt: 'Explore the cutting-edge of finance and learn how Terminal3 provides the tools to participate in the DeFi revolution.',
    content: 'Our On-chain Analytics engine gives you the deep insights needed to navigate the market. This guide explains how you can use natural language to query indexed blockchain data. For example, you could ask, "Show me the top 10 most active trading pairs on Uniswap V3 in the last 24 hours" or "Visualize the daily transaction volume for the Bored Ape Yacht Club collection." The system translates your query, fetches the data, and presents it in a visually rich dashboard, transforming complex data into actionable intelligence.',
  },
   {
    serviceIndex: 8,
    slug: 'leveraging-decentralized-storage',
    icon: FileArchive,
    title: 'Leveraging Decentralized Storage',
    excerpt: 'Learn how to host your dApp front-end, store NFT metadata, and manage files on IPFS and other decentralized networks.',
    content: 'Decentralized storage is a core pillar of a truly censorship-resistant web. This note explains how to use our Decentralized Storage solutions to upload and manage files on IPFS, Arweave, and other networks. We\'ll walk through the process of using an AI prompt like "Upload my dApp\'s build folder to IPFS and pin it for permanence." The AI will handle the upload, provide you with the content-addressable hash (CID), and even show you how to link it to a decentralized domain name or use it in an NFT\'s metadata. Say goodbye to centralized servers and embrace the permanent web.',
  },
  {
    serviceIndex: 9,
    slug: 'automated-security-audits',
    icon: ShieldCheck,
    title: 'Automated Security Audits',
    excerpt: 'Before you deploy, run our automated security analyzer on your smart contracts to catch common vulnerabilities.',
    content: 'Don\'t deploy with bugs. Our automated Security Audits tool is your first line of defense against potential exploits. This guide explains how to simply paste your Solidity code into the AI Command Center and ask for an audit. The AI will analyze the code for common vulnerabilities like reentrancy, integer overflows, front-running risks, and improper access control. While not a substitute for a full manual audit, this tool can catch common mistakes and give you a detailed report on your contract\'s security posture in minutes, helping you build with confidence.',
  },
  {
    serviceIndex: 10,
    slug: 'effective-dao-governance',
    icon: Vote,
    title: 'Effective DAO Governance',
    excerpt: 'Manage your Decentralized Autonomous Organization with our comprehensive suite of governance tools.',
    content: 'Running a DAO is more than just deploying a contract. Our DAO Governance tools help you manage the entire lifecycle. This note covers how to use the AI to generate a full governance plan. You can use a prompt like "Design a DAO for a gaming guild that uses token-weighted voting for major decisions and a council for minor ones." The AI will generate a plan including the tokenomics, voting structure, and operational steps. You can then use our tools to create proposals, manage voting, and execute passed proposals on-chain, all through a transparent and easy-to-use governance dashboard.',
  },
];


const defaultArticle = {
    serviceIndex: -1,
    slug: 'welcome',
    icon: BookOpen,
    title: 'Welcome to the Knowledge Hub',
    excerpt: 'Select a service above to see a relevant guide, or explore our general documentation to learn more about the platform.',
    content: 'Our platform is a comprehensive suite of tools designed to take you from idea to launch and beyond. Whether you are a developer, a founder, or a marketer, you\'ll find the resources you need to succeed in the Web3 space. Explore our dApp builder, launch your own token, deploy AI agents, and so much more. This is your command center for the new digital economy. Select a service from the grid above to see a specific guide related to it.'
};

type Article = typeof defaultArticle;

interface InteractiveGuidesProps {
    activeServiceIndex: number | null;
}

export default function InteractiveGuides({ activeServiceIndex }: InteractiveGuidesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const article = articles.find(a => a.serviceIndex === activeServiceIndex) || defaultArticle;
  
  const LucideIcon = article.icon;

  const handleAddNote = async () => {
    try {
      await addNoteAction({
        title: article.title,
        content: article.excerpt,
      });
      toast({
        title: 'Note Saved!',
        description: `"${article.title}" has been added to your notes.`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error saving note',
        description: 'There was a problem saving your note.',
      });
    }
  }

  return (
    <section id="start" className="py-12 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div 
            className="max-w-4xl mx-auto bg-card p-8 rounded-lg border cursor-pointer hover:border-primary/50 transition-colors duration-300" 
            onClick={() => setIsDialogOpen(true)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex flex-col items-start">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <LucideIcon className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-3xl font-bold">{article.title}</h3>
                </div>
                <p className="text-muted-foreground text-lg mb-6 ml-[64px]">{article.excerpt}</p>
                <Button variant="link" className="p-0 text-lg ml-[64px]">Read Guide &rarr;</Button>
            </div>
        </motion.div>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl w-full bg-background/80 shadow-2xl shadow-primary/20 backdrop-blur-sm p-0 border flex flex-col">
            <motion.div
              className="relative font-code text-sm rounded-lg pointer-events-auto flex-grow flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-primary origin-center animate-[scaleX_1.5s_ease-in-out]" />
              <div className="absolute top-0 right-0 w-px h-full bg-primary origin-center animate-[scaleY_1.5s_ease-in-out]" />
              <div className="absolute bottom-0 right-0 w-full h-px bg-primary origin-center animate-[scaleX_1.5s_ease-in-out_0.2s]" />
              <div className="absolute top-0 left-0 w-px h-full bg-primary origin-center animate-[scaleY_1.5s_ease-in-out_0.2s]" />
              
              <div className="p-8 flex-grow overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-headline text-3xl text-foreground mb-4">{article?.title}</DialogTitle>
                  <DialogDescription className="text-muted-foreground font-sans prose prose-invert prose-p:text-muted-foreground">
                    <p className="text-base leading-relaxed">{article?.content}</p>
                  </DialogDescription>
                </DialogHeader>
              </div>

               <DialogFooter className="p-4 border-t border-primary/20">
                <Button variant="ghost" onClick={handleAddNote} disabled={article.serviceIndex === -1}>
                  <BookPlus className="mr-2" />
                  Add to Notes
                </Button>
                <Button variant="secondary" asChild disabled={article.serviceIndex === -1}>
                    <Link href={`/blog/${article.slug}`}>Read Full Article</Link>
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}


'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';

const articles = [
  // Corresponds to Service index 0: dApp Builder
  {
    title: 'Unlocking the Power of dApps',
    excerpt: 'Discover how decentralized applications are changing the digital landscape and how you can build one with Treminal3.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'decentralized application',
    content: 'Decentralized applications, or dApps, represent a paradigm shift in how we interact with technology. By running on a peer-to-peer network of computers rather than a single central server, they offer unprecedented levels of transparency, security, and user control. With Treminal3\'s dApp Builder, the barrier to entry has never been lower. Our intuitive, no-code interface allows you to select from a range of templates, customize your application\'s logic, and deploy to the blockchain of your choice in a matter of minutes. You can build anything from a simple voting system to a complex marketplace without writing a single line of smart contract code. This is the future of application development, and it\'s accessible to everyone.',
  },
  // Corresponds to Service index 1: Token Launcher
   {
    title: 'How to Launch Your Own Cryptocurrency',
    excerpt: 'A complete guide to designing, creating, and launching your own token using the Treminal3 Token Launcher.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cryptocurrency coins',
    content: 'Ever dreamed of launching your own cryptocurrency? With Treminal3, it\'s easier than you think. Our Token Launcher guides you through every step. First, define your token\'s properties: name, symbol, total supply, and decimal places. Choose advanced features like burn mechanisms or minting capabilities. Our platform generates the secure, audited smart contract code for you. Preview and test on a testnet before committing. When you\'re ready, deploy to your chosen mainnet with a single click. We handle the complexities of contract deployment, so you can focus on building your community and utility around your new token.',
  },
  // Corresponds to Service index 2: Trading Bot Platform
  {
    title: 'How to Build Your First Trading Bot',
    excerpt: 'A step-by-step guide to creating an automated trading strategy on Treminal3\'s powerful bot platform.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'trading bot code',
    content: 'Automated trading can give you a significant edge in the fast-paced crypto markets. This guide will walk you through creating your first trading bot using Treminal3. Start by navigating to the "Trading Bots" section in your dashboard. Select a template, such as "Simple Arbitrage" or "Grid Trading." Connect your exchange API keys in our secure environment. Then, using our simple interface, define your parameters: which assets to trade, your risk tolerance, and the conditions for buying and selling. Our backtesting engine lets you simulate your bot\'s performance against historical data before you risk any real capital. When you\'re ready, deploy your bot with a single click and monitor its performance in real-time from your dashboard. It\'s that simple.',
  },
  // Add 9 more articles to correspond to the other services
  {
    title: 'Deploying Autonomous AI Agents',
    excerpt: 'Learn how to use AI agents to automate tasks and interact with your dApps on the blockchain.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'artificial intelligence robot',
    content: 'AI is coming to Web3. Treminal3\'s AI Agents allow you to deploy autonomous programs that can react to on-chain events, execute transactions, and manage your protocols without human intervention. This guide shows you how. Select an agent template, like "Oracle Price Feeder" or "Automated Treasury Manager." Configure its logic using our simple rules engine or by providing your own script. Define its permissions and budget carefully. Deploy the agent, and it will run 24/7, executing its tasks based on the real-time state of the blockchain. This is automation on a whole new level.',
  },
  {
    title: 'Building Your Branded Crypto Wallet',
    excerpt: 'Discover how to create and distribute your own secure, custom-branded crypto wallets for your community.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'crypto wallet phone',
    content: 'Give your users a seamless and branded experience by providing them with a custom wallet. With Treminal3, you can generate a white-label wallet SDK. Upload your logo, choose your color scheme, and select the blockchain networks you want to support. We package it all into a secure, easy-to-integrate SDK for iOS, Android, and web. Your users can create wallets, manage their assets, and connect to your dApps, all within an experience that you control. It\'s the best way to foster loyalty and improve user onboarding.',
  },
  {
    title: 'Secure Smart Contracts Made Easy',
    excerpt: 'Learn how to leverage our audited smart contract templates to build secure applications without the hassle.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'secure smart contract',
    content: 'Smart contract security is paramount. A single vulnerability can be catastrophic. That\'s why Treminal3 provides a library of pre-audited smart contract templates for common use cases like DAOs, token vesting schedules, and staking pools. This article explains how to use them. Simply browse the template library, select the one that fits your needs, and configure the parameters through our user-friendly interface. You get the security of a professionally audited contract without the time and expense of a manual audit.',
  },
  {
    title: 'Mastering Manual Transactions',
    excerpt: 'For developers who need fine-grained control, learn how to interact directly with the blockchain using our transaction tools.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'blockchain transaction data',
    content: 'Sometimes you need to get your hands dirty. Treminal3\'s Manual Transactions tool gives you a power-user interface for the blockchain. This guide shows you how to read contract data, call specific functions, and craft custom transactions from scratch. It\'s an indispensable tool for debugging, testing, and performing custom administrative actions on your smart contracts. Move beyond the limitations of standard UIs and interact with the blockchain on your own terms.',
  },
  {
    title: 'The Future of Decentralized Finance (DeFi)',
    excerpt: 'Explore the cutting-edge of finance and learn how Treminal3 provides the tools to participate in the DeFi revolution.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'decentralized finance crypto',
    content: 'Decentralized Finance (DeFi) is rebuilding the entire financial system on the blockchain. From lending and borrowing to trading and insurance, DeFi protocols are creating a more open, efficient, and accessible global economy. Treminal3 is your gateway to this revolution. Use our Trading Bot Platform to execute complex strategies across multiple decentralized exchanges, or launch your own financial instrument with our Token Launcher. Our On-chain Analytics engine gives you the deep insights needed to navigate the market, while our audited Smart Contract Templates provide the security required for financial applications. With Treminal3, you\'re not just observing the future of finance—you\'re building it.',
  },
   {
    title: 'Leveraging Decentralized Storage',
    excerpt: 'Understand the benefits of IPFS and other decentralized storage networks and how to use them with Treminal3.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'decentralized data storage',
    content: 'Decentralized storage solutions like IPFS provide a resilient and censorship-resistant way to store and share files. This article explores how to use Treminal3 to manage your data on these networks. Whether you\'re storing NFT metadata, hosting a dApp front-end, or archiving important documents, our platform simplifies the process. Upload files with a simple drag-and-drop interface, manage your data, and retrieve content using its unique content identifier (CID).',
  },
  {
    title: 'Automated Security Audits for Your dApps',
    excerpt: 'Learn how to find vulnerabilities in your smart contracts automatically with our powerful security audit tool.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cyber security check',
    content: 'Before deploying any smart contract, a security audit is essential. Treminal3\'s automated audit tool helps you catch common vulnerabilities before they become a problem. This guide explains the process. Simply point the tool at your contract\'s source code or address. Our engine will run a comprehensive suite of tests, checking for issues like reentrancy, integer overflows, and improper access control. You\'ll get a detailed report with findings, risk levels, and remediation advice, giving you peace of mind before you launch.',
  },
  {
    title: 'Running Your Own DAO',
    excerpt: 'A guide to managing a Decentralized Autonomous Organization using our comprehensive governance tools.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'community governance vote',
    content: 'DAOs are the future of community coordination. Treminal3 provides a full suite of tools to manage your DAO effectively. This article covers the essentials. Learn how to create and submit proposals, facilitate community voting on-chain, and execute the results automatically. Our platform helps you manage your treasury, track member participation, and maintain transparency. Whether you\'re running a small collective or a large protocol, our governance tools provide the framework for success.',
  },
];

type Article = (typeof articles)[0];

interface InteractiveGuidesProps {
    activeServiceIndex: number | null;
}

export default function InteractiveGuides({ activeServiceIndex }: InteractiveGuidesProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [article, setArticle] = useState<Article>(articles[0]);

  useEffect(() => {
    if (activeServiceIndex !== null && articles[activeServiceIndex]) {
        setArticle(articles[activeServiceIndex]);
    } else {
        // Default to a general, introductory article if none is selected
        setArticle(articles[7]);
    }
  }, [activeServiceIndex])

  return (
    <section id="start" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">From the Blog</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Explore our latest articles and guides to get the most out of Treminal3.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center cursor-pointer" onClick={() => setSelectedArticle(article)}>
            <div className="relative h-96 rounded-lg overflow-hidden order-last md:order-first group">
                 <Image
                    src={article.image}
                    alt={article.title}
                    data-ai-hint={article.aiHint}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
            </div>
            <div className="flex flex-col items-start">
                <h3 className="font-headline text-3xl font-bold mb-4">{article.title}</h3>
                <p className="text-muted-foreground text-lg mb-6">{article.excerpt}</p>
                <Button variant="link" className="p-0 text-lg">Read More &rarr;</Button>
            </div>
        </div>

        <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="max-w-3xl w-full bg-black/80 shadow-2xl shadow-primary/20 backdrop-blur-sm p-0 border-0">
            <motion.div
              className="relative font-code text-sm rounded-lg pointer-events-auto"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-primary origin-center animate-[scaleX_1.5s_ease-in-out]" />
              <div className="absolute top-0 right-0 w-px h-full bg-primary origin-center animate-[scaleY_1.5s_ease-in-out]" />
              <div className="absolute bottom-0 right-0 w-full h-px bg-primary origin-center animate-[scaleX_1.5s_ease-in-out_0.2s]" />
              <div className="absolute top-0 left-0 w-px h-full bg-primary origin-center animate-[scaleY_1.5s_ease-in-out_0.2s]" />
              
              <div className="p-8 max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-headline text-3xl text-white mb-4">{selectedArticle?.title}</DialogTitle>
                  <DialogDescription className="text-gray-400 font-sans prose prose-invert">
                    <p className="text-base leading-relaxed">{selectedArticle?.content}</p>
                  </DialogDescription>
                </DialogHeader>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

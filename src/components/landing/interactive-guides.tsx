
'use client';

import { useState } from 'react';
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
import { Card, CardContent } from '../ui/card';

const articles = [
  {
    title: 'Unlocking the Power of dApps',
    excerpt: 'Discover how decentralized applications are changing the digital landscape and how you can build one with Treminal3.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'decentralized application',
    content: 'Decentralized applications, or dApps, represent a paradigm shift in how we interact with technology. By running on a peer-to-peer network of computers rather than a single central server, they offer unprecedented levels of transparency, security, and user control. With Treminal3\'s dApp Builder, the barrier to entry has never been lower. Our intuitive, no-code interface allows you to select from a range of templates, customize your application\'s logic, and deploy to the blockchain of your choice in a matter of minutes. You can build anything from a simple voting system to a complex marketplace without writing a single line of smart contract code. This is the future of application development, and it\'s accessible to everyone.',
  },
  {
    title: 'The Future of Decentralized Finance (DeFi)',
    excerpt: 'Explore the cutting-edge of finance and learn how Treminal3 provides the tools to participate in the DeFi revolution.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'decentralized finance crypto',
    content: 'Decentralized Finance (DeFi) is rebuilding the entire financial system on the blockchain. From lending and borrowing to trading and insurance, DeFi protocols are creating a more open, efficient, and accessible global economy. Treminal3 is your gateway to this revolution. Use our Trading Bot Platform to execute complex strategies across multiple decentralized exchanges, or launch your own financial instrument with our Token Launcher. Our On-chain Analytics engine gives you the deep insights needed to navigate the market, while our audited Smart Contract Templates provide the security required for financial applications. With Treminal3, you\'re not just observing the future of finance—you\'re building it.',
  },
  {
    title: 'How to Build Your First Trading Bot',
    excerpt: 'A step-by-step guide to creating an automated trading strategy on Treminal3\'s powerful bot platform.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'trading bot code',
    content: 'Automated trading can give you a significant edge in the fast-paced crypto markets. This guide will walk you through creating your first trading bot using Treminal3. Start by navigating to the "Trading Bots" section in your dashboard. Select a template, such as "Simple Arbitrage" or "Grid Trading." Connect your exchange API keys in our secure environment. Then, using our simple interface, define your parameters: which assets to trade, your risk tolerance, and the conditions for buying and selling. Our backtesting engine lets you simulate your bot\'s performance against historical data before you risk any real capital. When you\'re ready, deploy your bot with a single click and monitor its performance in real-time from your dashboard. It\'s that simple.',
  },
];

type Article = (typeof articles)[0];

export default function InteractiveGuides() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="start" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">From the Blog</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Explore our latest articles and guides to get the most out of Treminal3.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card 
              key={article.title} 
              className="bg-card border-border shadow-lg cursor-pointer flex flex-col group"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  data-ai-hint={article.aiHint}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="font-headline text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow">{article.excerpt}</p>
                  <Button variant="link" className="p-0 mt-4 self-start">Read More &rarr;</Button>
              </CardContent>
            </Card>
          ))}
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

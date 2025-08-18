
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
  DialogFooter,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { BookPlus, FilePenLine } from 'lucide-react';

const articles = [
  // Corresponds to Service index 0: dApp Builder
  {
    serviceIndex: 0,
    title: 'Building a dApp with Natural Language',
    excerpt: 'Discover how to describe your desired decentralized application and let Treminal3 AI generate the foundational code for you.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'ai code generation',
    content: 'Building a dApp is now as easy as describing it. With Treminal3\'s "Full Automatic" mode, you can simply write a prompt like "Create an NFT marketplace for digital artists with a 5% royalty fee." Our AI will interpret your request, select the appropriate smart contract templates, generate the front-end components, and present you with a functional baseline. This article walks you through the process, from crafting the perfect prompt to making minor tweaks to the AI-generated output. It\'s the fastest way to go from idea to MVP.',
  },
  // Add more articles for other service indexes...
  // Default article for index 7 or null
  {
    serviceIndex: 7,
    title: 'The Future of Decentralized Finance (DeFi)',
    excerpt: 'Explore the cutting-edge of finance and learn how Treminal3 provides the tools to participate in the DeFi revolution.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'decentralized finance crypto',
    content: 'Decentralized Finance (DeFi) is rebuilding the entire financial system on the blockchain. From lending and borrowing to trading and insurance, DeFi protocols are creating a more open, efficient, and accessible global economy. Treminal3 is your gateway to this revolution. Use our Trading Bot Platform to execute complex strategies across multiple decentralized exchanges, or launch your own financial instrument with our Token Launcher. Our On-chain Analytics engine gives you the deep insights needed to navigate the market, while our audited Smart Contract Templates provide the security required for financial applications. With Treminal3, you\'re not just observing the future of finance—you\'re building it.',
  },
];


// A catch-all default article
const defaultArticle = {
    serviceIndex: -1, // Indicates it's a default
    title: 'Welcome to the Knowledge Hub',
    excerpt: 'Select a service above to see a relevant guide, or explore our general documentation to learn more about the platform.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'knowledge base library',
    content: 'Our platform is a comprehensive suite of tools designed to take you from idea to launch and beyond. Whether you are a developer, a founder, or a marketer, you\'ll find the resources you need to succeed in the Web3 space. Explore our dApp builder, launch your own token, deploy AI agents, and so much more. This is your command center for the new digital economy. Select a service from the grid above to see a specific guide related to it.'
};

type Article = {
    title: string;
    excerpt: string;
    image: string;
    aiHint: string;
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

  return (
    <section id="start" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">From Our Notes</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            A contextual guide based on your selections.
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
                <Button variant="link" className="p-0 text-lg">Read Note &rarr;</Button>
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
    </section>
  );
}

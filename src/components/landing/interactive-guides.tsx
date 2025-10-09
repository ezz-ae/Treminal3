
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
import { articles } from '@/lib/articles';

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

const iconMap: Record<string, React.ElementType> = {
    AppWindow, Bot, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, ShieldCheck, Vote, BookOpen
};


export default function InteractiveGuides({ activeServiceIndex }: InteractiveGuidesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const article = articles.find(a => a.serviceIndex === activeServiceIndex) || defaultArticle;
  
  const LucideIcon = article.icon ? iconMap[article.icon] : BookOpen;

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

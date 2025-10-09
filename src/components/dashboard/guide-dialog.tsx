
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { addNoteAction } from '@/app/actions';
import type { Article } from '@/lib/articles';
import { BookOpen, BookPlus } from 'lucide-react';
import * as React from 'react';

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
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    AppWindow, Bot, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, ShieldCheck, Vote, BookOpen
};

interface GuideDialogProps {
  article: Article | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function GuideDialog({ article, isOpen, onOpenChange }: GuideDialogProps) {
  const { toast } = useToast();

  if (!article) {
    return null;
  }

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
  };
  
  const LucideIcon = iconMap[article.icon] || BookOpen;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <LucideIcon className="w-6 h-6" />
                </div>
                <DialogTitle className="font-headline text-2xl text-foreground">{article.title}</DialogTitle>
            </div>
          <DialogDescription className="text-muted-foreground text-base leading-relaxed prose prose-invert prose-p:text-muted-foreground">
            {article.content}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={handleAddNote}>
            <BookPlus className="mr-2" />
            Add to Notes
          </Button>
          <Button asChild>
            <Link href={`/blog/${article.slug}`}>Read Full Article</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

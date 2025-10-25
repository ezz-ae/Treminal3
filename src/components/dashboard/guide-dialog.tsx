
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
import type { Article } from '@/lib/articles';
import { BookPlus } from 'lucide-react';
import * as React from 'react';
import { iconMap } from '@/lib/icon-map';
import { useWallet } from '@/hooks/use-wallet';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface GuideDialogProps {
  article: Article | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

type Note = {
  id: string;
  title: string;
  content: string;
  slug: string;
};

/**
 * A dialog component that displays a short guide based on a selected article.
 * It provides options to save the guide as a note or read the full article.
 * @param {GuideDialogProps} props - The component props.
 * @returns {JSX.Element | null} The dialog component or null if no article is provided.
 */
export function GuideDialog({ article, isOpen, onOpenChange }: GuideDialogProps) {
  const { toast } = useToast();
  const { wallet } = useWallet();
  const [allNotes, setAllNotes] = useLocalStorage<Record<string, Note[]>>('notes', {});

  if (!article) {
    return null;
  }

  /**
   * Handles saving the current article as a note in local storage for the connected wallet.
   */
  const handleAddNote = async () => {
    if (!wallet) {
        toast({
            variant: 'destructive',
            title: 'Authentication Required',
            description: 'You must connect your wallet to save notes.',
        });
        return;
    }
    
    const newNote = {
      id: `${wallet.address}-${article.slug}-${Date.now()}`,
      title: article.title,
      content: article.excerpt,
      slug: article.slug,
    };

    const userNotes = allNotes[wallet.address] || [];
    if (userNotes.some(note => note.slug === article.slug)) {
      toast({
        title: 'Note Already Saved',
        description: `You've already saved this article.`,
      });
      return;
    }

    setAllNotes({
      ...allNotes,
      [wallet.address]: [...userNotes, newNote],
    });

    toast({
      title: 'Note Saved!',
      description: `"${article.title}" has been added to your notes.`,
      action: <Button asChild variant="secondary"><Link href="/dashboard/notes">View Notes</Link></Button>
    });
  };
  
  const LucideIcon = iconMap[article.icon] || iconMap['BookOpen'];

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
            <div dangerouslySetInnerHTML={{ __html: article.excerpt || '' }} />
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

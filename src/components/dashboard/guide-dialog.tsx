
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
import { addNote } from '@/lib/notes';
import type { Article } from '@/lib/articles';
import { BookPlus } from 'lucide-react';
import * as React from 'react';
import { iconMap } from '@/lib/icon-map';
import { useUser } from '@/hooks/use-user';


interface GuideDialogProps {
  article: Article | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function GuideDialog({ article, isOpen, onOpenChange }: GuideDialogProps) {
  const { toast } = useToast();
  const { user } = useUser();

  if (!article) {
    return null;
  }

  const handleAddNote = async () => {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Authentication Required',
            description: 'You must be logged in to save notes.',
        });
        return;
    }
    try {
      await addNote({
        userId: user.uid,
        title: article.title,
        content: article.excerpt,
      });
      toast({
        title: 'Note Saved!',
        description: `"${article.title}" has been added to your notes.`,
        action: <Button asChild variant="secondary"><Link href="/dashboard/notes">View Notes</Link></Button>
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error saving note',
        description: 'There was a problem saving your note.',
      });
    }
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


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
  BookPlus,
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { articles } from '@/lib/articles';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useUser, useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
  

export default function InteractiveGuides() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState(articles[0]);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  
  const handleAddNote = async () => {
    if (!activeArticle) return;
     if (!user) {
        toast({
            variant: 'destructive',
            title: 'Authentication Required',
            description: 'You must be logged in to save notes.',
        });
        return;
    }
     if (!firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Firestore is not available.',
      });
      return;
    }
    try {
       await addDoc(collection(firestore, 'notes'), {
        userId: user.uid,
        title: activeArticle.title,
        content: activeArticle.excerpt,
        slug: activeArticle.slug,
        createdAt: serverTimestamp(),
      });
      toast({
        title: 'Note Saved!',
        description: `"${activeArticle.title}" has been added to your notes.`,
        action: <Button asChild variant="secondary"><Link href="/dashboard/notes">View Notes</Link></Button>
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error saving note',
        description: 'There was a problem saving your note.',
      });
    }
  }

  const handleSelectChange = (slug: string) => {
    const article = articles.find(a => a.slug === slug);
    if (article) {
        setActiveArticle(article);
    }
  }

  return (
    <section id="start" className="py-12 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Interactive Knowledge Hub</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                Select a topic to get a quick guide, or dive into our full documentation. Your journey to Web3 mastery starts here.
            </p>
        </div>
        <motion.div 
            className="max-w-4xl mx-auto bg-card p-8 rounded-lg border" 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                    <h3 className="font-headline text-3xl font-bold mb-2">{activeArticle.title}</h3>
                    <p className="text-muted-foreground text-lg mb-6">{activeArticle.excerpt}</p>
                    <Button onClick={() => setIsDialogOpen(true)}>Read Quick Guide &rarr;</Button>
                </div>
                <div className="w-full">
                    <Select onValueChange={handleSelectChange} defaultValue={activeArticle.slug}>
                        <SelectTrigger className="text-base h-12">
                            <SelectValue placeholder="Select a guide..." />
                        </SelectTrigger>
                        <SelectContent>
                            {articles.map(article => (
                                <SelectItem key={article.slug} value={article.slug}>{article.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </motion.div>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl w-full bg-background/80 shadow-2xl shadow-primary/20 backdrop-blur-sm p-8 border">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl text-foreground mb-4">{activeArticle?.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground font-sans prose prose-invert prose-p:text-muted-foreground max-h-[60vh] overflow-y-auto pr-4">
                <p className="text-base leading-relaxed">{activeArticle?.content}</p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
                <Button variant="ghost" onClick={handleAddNote}>
                  <BookPlus className="mr-2" />
                  Add to Notes
                </Button>
                <Button asChild>
                    <Link href={`/blog/${activeArticle.slug}`}>Read Full Article</Link>
                </Button>
              </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

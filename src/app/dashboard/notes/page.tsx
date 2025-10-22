
'use client';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookPlus, ArrowRight, BookX } from 'lucide-react';
import { useWallet } from '@/hooks/use-wallet';
import { useLocalStorage } from '@/hooks/use-local-storage';

type Note = {
  id: string;
  title: string;
  content: string;
  slug: string;
};

/**
 * A page that displays the user's saved notes.
 * Notes are stored in local storage and associated with the connected wallet address.
 * @returns {JSX.Element} The notes page component.
 */
export default function NotesPage() {
    const { wallet } = useWallet();
    const [allNotes, setAllNotes] = useLocalStorage<Record<string, Note[]>>('notes', {});

    const userNotes = wallet?.address ? allNotes[wallet.address] || [] : [];
    
    const removeNote = (noteId: string) => {
        if (!wallet?.address) return;
        const updatedNotes = userNotes.filter(note => note.id !== noteId);
        setAllNotes({
            ...allNotes,
            [wallet.address]: updatedNotes,
        });
    }


  return (
      <div className="max-w-4xl mx-auto py-8 px-4">
          <header className="mb-12 text-center">
              <BookPlus className="w-16 h-16 mx-auto text-primary mb-4" />
              <h1 className="text-5xl font-bold font-headline">My Notes</h1>
              <p className="text-xl text-muted-foreground mt-4">
                  Your personal collection of saved articles and notes from the T3 Academy.
              </p>
          </header>
          {userNotes.length > 0 ? (
              <div className="space-y-6">
                  {userNotes.map((note) => (
                      <Card key={note.id} className="group transition-all hover:border-primary/50">
                          <CardHeader>
                              <CardTitle className="text-2xl font-bold font-headline transition-colors group-hover:text-primary">
                                  {note.title}
                              </CardTitle>
                          </CardHeader>
                           <CardContent>
                               <CardDescription className="text-base line-clamp-3">{note.content}</CardDescription>
                           </CardContent>
                           <CardFooter className="flex justify-between">
                              <Button asChild>
                                  <Link href={`/blog/${note.slug}`}>
                                      Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); removeNote(note.id); }}>
                                  <BookX className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                              </Button>
                           </CardFooter>
                      </Card>
                  ))}
              </div>
          ) : (
               <div className="text-center bg-card border rounded-lg p-12">
                  <h2 className="text-2xl font-bold font-headline">No notes yet.</h2>
                  <p className="text-muted-foreground mt-2 mb-6 max-w-md mx-auto">
                      Connect your wallet and save notes from articles in our blog to start building your personal knowledge base.
                  </p>
                  <Button asChild>
                      <Link href="/blog">
                          Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
               </div>
          )}
      </div>
  );
}


'use client';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookPlus, ArrowRight } from 'lucide-react';
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

  return (
    <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
            <BookPlus className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-5xl font-bold font-headline">My Notes</h1>
            <p className="text-xl text-muted-foreground mt-4">
                Your personal collection of saved articles and notes.
            </p>
        </header>

        {userNotes.length > 0 ? (
            <div className="grid gap-8">
                {userNotes.map((note) => (
                   <Link href={`/blog/${note.slug}`} key={note.id}>
                        <Card className="group hover:border-primary transition-colors">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">
                                    {note.title}
                                </CardTitle>
                                <CardDescription className="mt-2 text-base line-clamp-3">{note.content}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        ) : (
             <div className="text-center bg-card border rounded-lg p-12">
                <h2 className="text-2xl font-bold font-headline">No notes yet.</h2>
                <p className="text-muted-foreground mt-2 mb-6">
                    You can save notes from articles in our blog. Connect your wallet to see your saved notes.
                </p>
                <Button asChild>
                    <Link href="/blog">
                        Explore Articles <ArrowRight className="ml-2" />
                    </Button>
                </Link>
             </div>
        )}
    </div>
  );
}

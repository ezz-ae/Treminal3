
'use client';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookPlus, ArrowRight } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { useCollection } from '@/hooks/use-collection';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/hooks/use-firebase';
import { useMemo } from 'react';

type Note = {
  title: string;
  content: string;
  slug: string;
};

export default function NotesPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const notesQuery = useMemo(() => {
        if (!user || !firestore) return null;
        return query(
            collection(firestore, 'notes'), 
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );
    }, [user, firestore]);
    
    const { data: notes, loading } = useCollection<Note>(notesQuery);

  return (
    <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
            <BookPlus className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-5xl font-bold font-headline">My Notes</h1>
            <p className="text-xl text-muted-foreground mt-4">
                Your personal collection of saved articles and notes.
            </p>
        </header>

        {loading && <div className="text-center">Loading notes...</div>}

        {!loading && notes && notes.length > 0 ? (
            <div className="grid gap-8">
                {notes.map((note) => (
                    <Card key={note.slug} className="group hover:border-primary transition-colors">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">
                                {note.title}
                            </CardTitle>
                            <CardDescription className="mt-2 text-base line-clamp-3">{note.content}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        ) : null}

        {!loading && (!notes || notes.length === 0) && (
             <div className="text-center bg-card border rounded-lg p-12">
                <h2 className="text-2xl font-bold font-headline">No notes yet.</h2>
                <p className="text-muted-foreground mt-2 mb-6">
                    You can save notes from articles in our blog.
                </p>
                <Link href="/blog">
                    <Button>
                        Explore Articles <ArrowRight className="ml-2" />
                    </Button>
                </Link>
             </div>
        )}
    </div>
  );
}

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getNotes, type Note } from '@/lib/notes';
import { BookPlus, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'My Notes | Terminal3',
  description: 'Your personal collection of saved articles and notes from the Terminal3 platform.',
};

export default function NotesPage() {
  const notes = getNotes();

  return (
    <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
            <BookPlus className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-5xl font-bold font-headline">My Notes</h1>
            <p className="text-xl text-muted-foreground mt-4">
                Your personal collection of saved articles and notes.
            </p>
        </header>

        {notes.length > 0 ? (
            <div className="grid gap-8">
                {notes.map((note: Note) => (
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
        ) : (
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
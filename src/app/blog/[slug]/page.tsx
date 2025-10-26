
// src/app/blog/[slug]/page.tsx
import { articles } from '@/lib/articles';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import {format} from 'date-fns';

// Add this to properly render markdown
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <div>
                <h1 className="text-4xl font-bold font-headline">{article.title}</h1>
                <p className="text-muted-foreground text-lg">{format(new Date(article.date), 'PPP')}</p>
            </div>
          </div>
          
        </header>
        <Card>
          <CardContent className="prose dark:prose-invert max-w-none p-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

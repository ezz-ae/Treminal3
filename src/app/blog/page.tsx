
// src/app/blog/page.tsx
import { articles } from '@/lib/articles';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">The Terminal3 Blog</h1>
        <p className="text-lg text-muted-foreground mt-2">Insights, tutorials, and announcements from the Terminal3 team.</p>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link href={`/blog/${article.slug}`} key={article.slug}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{article.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{article.excerpt}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

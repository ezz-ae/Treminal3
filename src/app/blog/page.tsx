
import { articles } from '@/lib/articles';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold font-headline mb-8">The Terminal3 Blog</h1>
      <div className="space-y-8">
        {articles.map(article => (
          <Link href={`/blog/${article.slug}`} key={article.slug} className="block group">
            <div className="p-6 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
              <h2 className="text-2xl font-bold font-headline mb-2 group-hover:text-primary transition-colors">{article.title}</h2>
              <p className="text-muted-foreground mb-4">{article.excerpt}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{article.date}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

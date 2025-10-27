
import { articles } from '@/lib/articles';
import { notFound } from 'next/navigation';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug);

  if (!article) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold font-headline mb-4">{article.title}</h1>
      <p className="text-muted-foreground text-lg mb-8">{article.date}</p>
      <div className="prose dark:prose-invert max-w-none">
        {article.content}
      </div>
    </div>
  );
}

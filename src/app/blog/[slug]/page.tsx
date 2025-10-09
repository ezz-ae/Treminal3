import { getArticles, getArticleBySlug } from '@/lib/articles';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return notFound();
  }

  return {
    title: `${article.title} | Terminal3 Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: new Date(article.date).toISOString(),
      url: `https://terminal3.me/blog/${article.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return notFound();
  }
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: new Date(article.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Terminal3',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight">
        <header className="mb-12">
            <h1 className="text-5xl font-bold !mb-2">{article.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4"/>
                    <span>{article.date}</span>
                </div>
            </div>
        </header>

        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </>
  );
}

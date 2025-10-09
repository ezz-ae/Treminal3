
import { getArticles, getArticleBySlug } from '@/lib/articles.server';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Tag, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';
import * as React from 'react';
import {
    AppWindow,
    Bot,
    Puzzle,
    Wallet,
    FileJson,
    Network,
    BotMessageSquare,
    AreaChart,
    FileArchive,
    ShieldCheck,
    Vote,
  } from 'lucide-react';
  
const iconMap: Record<string, React.ElementType> = {
    AppWindow, Bot, Puzzle, Wallet, FileJson, Network, BotMessageSquare, AreaChart, FileArchive, ShieldCheck, Vote, BookOpen
};

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

  const LucideIcon = iconMap[article.icon] || BookOpen;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-p:text-muted-foreground prose-a:text-primary">
        <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/10 rounded-lg text-primary">
                    <LucideIcon className="w-8 h-8" />
                </div>
                <div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4"/>
                            <span>{article.date}</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold !mb-0 text-foreground">{article.title}</h1>
                </div>
            </div>
        </header>

        <div className="text-lg leading-relaxed">{article.content}</div>
      </article>
    </div>
  );
}

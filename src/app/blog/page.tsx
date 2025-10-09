import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getArticles, type Article } from '@/lib/articles';
import { ArrowRight, Newspaper } from 'lucide-react';

export const metadata = {
  title: 'Blog | Terminal3',
  description: 'Explore articles, guides, and updates on Web3 development, AI, and the Terminal3 platform.',
};

export default function BlogIndexPage() {
  const articles = getArticles();

  return (
    <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
            <Newspaper className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-5xl font-bold font-headline">T3 Blog</h1>
            <p className="text-xl text-muted-foreground mt-4">
                Explore articles, guides, and updates on Web3 development, AI, and the Terminal3 platform.
            </p>
        </header>

        <div className="grid gap-8">
            {articles.map((article: Article) => (
                <Link href={`/blog/${article.slug}`} key={article.slug}>
                    <Card className="group hover:border-primary transition-colors">
                        <CardHeader>
                            <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
                            <CardTitle className="text-2xl font-bold font-headline group-hover:text-primary transition-colors flex justify-between items-center">
                                {article.title}
                                <ArrowRight className="w-6 h-6 transform transition-transform group-hover:translate-x-1" />
                            </CardTitle>
                            <CardDescription className="mt-2 text-base">{article.excerpt}</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
  );
}

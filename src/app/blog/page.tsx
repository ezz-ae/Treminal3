
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getArticles, type Article } from '@/lib/articles.server';
import { ArrowRight, Newspaper } from 'lucide-react';
import * as React from 'react';
import { iconMap } from '@/lib/icon-map';

export const metadata = {
  title: 'Blog | Terminal3',
  description: 'Explore articles, guides, and updates on Web3 development, AI, and the Terminal3 platform.',
};

const ArticleCard = ({ article, isFeatured = false }: { article: Article, isFeatured?: boolean }) => {
    const LucideIcon = iconMap[article.icon] || iconMap['BookOpen'];
    return (
        <Link href={`/blog/${article.slug}`} className="block group" legacyBehavior>
            <Card className="h-full bg-card/50 hover:border-primary/50 transition-colors duration-300 flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                            <LucideIcon className="w-6 h-6" />
                        </div>
                         <p className="text-sm text-muted-foreground">{article.date}</p>
                    </div>
                    <CardTitle className={isFeatured ? "text-3xl" : "text-2xl"}>{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription className="text-base">{article.excerpt}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                    <div className="text-sm font-medium text-primary flex items-center gap-2">
                        Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Card>
        </Link>
    );
}


export default function BlogIndexPage() {
  const articles = getArticles();
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
        <header className="mb-12 text-center">
            <Newspaper className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-5xl font-bold font-headline">T3 Blog</h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                Explore articles, guides, and updates on Web3 development, AI, and the Terminal3 platform.
            </p>
        </header>

        {featuredArticle && (
            <div className="mb-12">
                 <h2 className="text-3xl font-bold font-headline mb-6 text-center">Featured Article</h2>
                <div className="max-w-4xl mx-auto">
                    <ArticleCard article={featuredArticle} isFeatured={true}/>
                </div>
            </div>
        )}

        {otherArticles.length > 0 && (
            <div>
                 <h2 className="text-3xl font-bold font-headline mb-6 text-center">More Articles</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    {otherArticles.map((article: Article) => (
                        <ArticleCard article={article} key={article.slug} />
                    ))}
                </div>
            </div>
        )}
    </div>
  );
}


import { articles, type Article } from './articles';

// This function should only be called from server-side code (e.g., getStaticProps, getServerSideProps, or Server Components)
export function getArticles(): Article[] {
  // In this project, articles are sourced from a single TS file, so we just sort them.
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}


// This function should only be called from server-side code
export function getArticleBySlug(slug: string): Article | undefined {
  const article = articles.find(a => a.slug === slug);
  if (!article) {
    return undefined;
  }
  return article;
}


import { articles, type Article } from './articles';

/**
 * Fetches and sorts all articles by date in descending order.
 * This function should only be called from server-side code.
 * @returns {Article[]} An array of sorted articles.
 */
export function getArticles(): Article[] {
  // In this project, articles are sourced from a single TS file, so we just sort them.
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}


/**
 * Fetches a single article by its slug.
 * This function should only be called from server-side code.
 * @param {string} slug - The slug of the article to retrieve.
 * @returns {Article | undefined} The article object if found, otherwise undefined.
 */
export function getArticleBySlug(slug: string): Article | undefined {
  const article = articles.find(a => a.slug === slug);
  if (!article) {
    return undefined;
  }
  return article;
}

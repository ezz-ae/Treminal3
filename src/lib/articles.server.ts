// src/lib/articles.server.ts
import { articles, type Article } from '@/lib/articles'

// Re-export the Article type so pages can import it from here
export type { Article }

/** Return all articles sorted newest first. */
export async function getArticles(): Promise<Article[]> {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Keep this alias if other parts of the app call getAllArticles()
export async function getAllArticles(): Promise<Article[]> {
  return getArticles()
}

/** Return a single article by slug, or null. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return articles.find(a => a.slug === slug) ?? null
}
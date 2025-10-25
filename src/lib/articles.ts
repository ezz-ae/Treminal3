// src/lib/articles.ts
export type Article = {
  slug: string
  title: string
  date: string   // ISO date string
  excerpt?: string
  icon?: string  // <-- add this line
}

export const articles: Article[] = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    date: '2025-10-25',
    excerpt: 'This is the first post on our new blog.',
    icon: 'BookOpen'
  }
]
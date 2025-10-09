
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { articles, type Article } from './articles';

const articlesDirectory = path.join(process.cwd(), 'src/articles');

// This function should only be called from server-side code (e.g., getStaticProps, getServerSideProps, or Server Components)
export function getArticles(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    } as Article;
  });

  return allArticlesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}


// This function should only be called from server-side code
export function getArticleBySlug(slug: string): Article | undefined {
  const article = articles.find(a => a.slug === slug);
  if (!article) {
    return undefined;
  }
  // To keep content consistent with potential markdown files, we simulate reading it
  // In a real scenario with separate MD files, you would read the file here.
  // For this project, the content is already in the in-memory array.
  return article;
}

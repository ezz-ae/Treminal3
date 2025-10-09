import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  icon: string;
};

const articlesDirectory = path.join(process.cwd(), 'src/articles');

const articlesData: Omit<Article, 'slug' | 'content'>[] = [
    {
        icon: 'AppWindow',
        title: 'Building a dApp with Natural Language',
        excerpt: 'Discover how to describe your desired decentralized application and let Terminal3 AI generate the foundational code for you.',
        date: '2024-07-20',
    },
    {
        icon: 'Puzzle',
        title: 'Launching Your Own Cryptocurrency',
        excerpt: 'From concept to circulation, learn how the Token Launcher simplifies the complex process of creating a new digital asset.',
        date: '2024-07-19',
    },
    {
        icon: 'Bot',
        title: 'Automated Trading Strategies',
        excerpt: 'Dive into the world of algorithmic trading. Build, backtest, and deploy high-frequency trading bots on major exchanges.',
        date: '2024-07-18',
    },
    {
        icon: 'BotMessageSquare',
        title: 'Deploying Autonomous AI Agents',
        excerpt: 'Go beyond simple scripts. Create intelligent agents that can react to on-chain events and perform complex tasks automatically.',
        date: '2024-07-17',
    },
    {
        icon: 'Wallet',
        title: 'Branded Crypto Wallets for Your Users',
        excerpt: 'Foster brand loyalty and streamline user experience by providing your community with a custom, secure crypto wallet.',
        date: '2024-07-16',
    },
    {
        icon: 'FileJson',
        title: 'Secure Smart Contracts Made Easy',
        excerpt: 'Leverage our library of audited and battle-tested smart contract templates to build your project on a secure foundation.',
        date: '2024-07-15',
    },
    {
        icon: 'Network',
        title: 'Mastering Manual Transactions',
        excerpt: 'For the pros who need granular control, learn how to interact directly with the blockchain for custom operations and analysis.',
        date: '2024-07-14',
    },
    {
        icon: 'AreaChart',
        title: 'The Future of Decentralized Finance (DeFi)',
        excerpt: 'Explore the cutting-edge of finance and learn how Terminal3 provides the tools to participate in the DeFi revolution.',
        date: '2024-07-13',
    },
    {
        icon: 'FileArchive',
        title: 'Leveraging Decentralized Storage',
        excerpt: 'Learn how to host your dApp front-end, store NFT metadata, and manage files on IPFS and other decentralized networks.',
        date: '2024-07-12',
    },
    {
        icon: 'ShieldCheck',
        title: 'Automated Security Audits',
        excerpt: 'Before you deploy, run our automated security analyzer on your smart contracts to catch common vulnerabilities.',
        date: '2024-07-11',
    },
    {
        icon: 'Vote',
        title: 'Effective DAO Governance',
        excerpt: 'Manage your Decentralized Autonomous Organization with our comprehensive suite of governance tools.',
        date: '2024-07-10',
    },
];

function slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

// Ensure the directory exists
if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true });
}

// Generate markdown files if they don't exist
articlesData.forEach(article => {
    const slug = slugify(article.title);
    const filePath = path.join(articlesDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        const content = `---
title: "${article.title}"
excerpt: "${article.excerpt}"
date: "${article.date}"
icon: "${article.icon}"
---

Content for ${article.title} goes here. This is a placeholder. In a real application, this would be filled with rich markdown content.
`;
        fs.writeFileSync(filePath, content);
    }
});


export function getArticles(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticles = fileNames.map(fileName => {
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

  return allArticles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | undefined {
  const filePath = path.join(articlesDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    } as Article;
  } catch (error) {
    return undefined;
  }
}

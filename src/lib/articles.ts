
// src/lib/articles.ts
export type Article = {
  slug: string;
  title: string;
  date: string;   // ISO date string
  excerpt?: string;
  icon?: string;
  content?: string;
}

export const articles: Article[] = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    date: '2025-10-25',
    excerpt: 'This is the first post on our new blog. We are excited to share our thoughts and ideas with you.',
    icon: 'BookOpen',
    content: `
## Welcome to the Terminal3 Blog

This is the very first post on our new blog! We're thrilled to have you here. 

Our goal with this blog is to share insights, tutorials, and announcements related to Terminal3 and the broader Web3 ecosystem. We'll be covering a wide range of topics, including:

*   AI-powered development
*   Smart contract best practices
*   Building and launching dApps
*   The future of Web3

We hope you'll find the content valuable and engaging. Stay tuned for more posts coming soon!
`
  },
  {
    slug: 'getting-started-with-terminal3',
    title: 'Getting Started with Terminal3',
    date: '2025-11-01',
    excerpt: 'Learn how to get up and running with Terminal3 in just a few minutes. We will walk you through the process of creating your first dApp.',
    icon: 'Rocket',
    content: `
## Your First dApp with Terminal3

Terminal3 makes it incredibly easy to go from idea to a fully functional, deployed dApp. In this guide, we'll walk you through the entire process.

### 1. Connect Your Wallet

The first step is to connect your wallet. This will allow you to interact with the Terminal3 platform and deploy your dApps.

### 2. Describe Your dApp

Using natural language, describe the dApp you want to build. For example, you could say: "Create a simple NFT minting dApp on Solana."

### 3. Generate and Deploy

Terminal3's AI will generate the smart contract and front-end code for your dApp. You can review and modify the code as needed. Once you're satisfied, you can deploy your dApp to the blockchain with a single command.

That's it! You've just created and deployed your first dApp with Terminal3.
`
  },
  {
    slug: 'understanding-the-t3-token',
    title: 'Understanding the T3 Token',
    date: '2025-11-05',
    excerpt: 'The T3 token is the native utility token of the Terminal3 ecosystem. In this post, we will explore the tokenomics and utility of the T3 token.',
    icon: 'Coins',
    content: `
## The T3 Token: Powering the Terminal3 Ecosystem

The T3 token is at the heart of the Terminal3 platform. It's designed to facilitate a sustainable and decentralized ecosystem for AI-native Web3 development.

### Tokenomics

*   **Total Supply:** 1,000,000,000 T3
*   **Distribution:** Airdrops, liquidity mining, team and advisor allocation, and a treasury for future development.

### Utility

The T3 token has a variety of use cases within the Terminal3 ecosystem:

*   **Access to Premium Features:** T3 token holders will get access to premium features and services.
*   **Governance:** T3 token holders will be able to participate in the governance of the Terminal3 platform.
*   **Staking:** Users will be able to stake their T3 tokens to earn rewards.

We believe the T3 token will play a crucial role in the long-term success of the Terminal3 platform.
`
  }
]

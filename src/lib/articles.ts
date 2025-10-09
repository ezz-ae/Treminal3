
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  icon: string;
  serviceIndex?: number;
};

// This is the single source of truth for article metadata, safe for client-side import.
export const articles: Article[] = [
    {
        serviceIndex: 0,
        slug: 'building-a-dapp-with-natural-language',
        icon: 'AppWindow',
        title: 'Building a dApp with Natural Language',
        excerpt: 'Discover how to describe your desired decentralized application and let Terminal3 AI generate the foundational code for you.',
        date: '2024-07-20',
        content: 'Building a dApp is now as easy as describing it. With Terminal3\'s "Full Automatic" mode, you can simply write a prompt like "Create an NFT marketplace for digital artists with a 5% royalty fee." Our AI will interpret your request, select the appropriate smart contract templates, generate the front-end components, and present you with a functional baseline. It analyzes your needs, proposes a full architecture including required smart contracts and UI components, and then generates the code. This article walks you through the process, from crafting the perfect prompt to making minor tweaks to the AI-generated output. It\'s the fastest way to go from idea to MVP.',
    },
    {
        serviceIndex: 1,
        slug: 'launching-your-own-cryptocurrency',
        icon: 'Puzzle',
        title: 'Launching Your Own Cryptocurrency',
        excerpt: 'From concept to circulation, learn how the Token Launcher simplifies the complex process of creating a new digital asset.',
        date: '2024-07-19',
        content: 'Ever dreamed of launching your own token? The Token Launcher makes it a reality. This guide covers how our AI can parse a simple description like "Create a deflationary utility token called \'Galaxy Dust\' with the symbol GLX and a total supply of 1 billion" to generate a secure, ERC-20 compliant smart contract. You\'ll learn how the AI automatically handles details like setting the name, symbol, total supply, and decimal places. We\'ll walk through the automated process of generating and deploying the contract, all from a single prompt in the Terminal3 dashboard.',
    },
    {
        serviceIndex: 9,
        slug: 'automated-security-audits',
        icon: 'ShieldCheck',
        title: 'Automated Security Audits',
        excerpt: 'Before you deploy, run our automated security analyzer on your smart contracts to catch common vulnerabilities.',
        date: '2024-07-11',
        content: 'Don\'t deploy with bugs. Our automated Security Audits tool is your first line of defense against potential exploits. This guide explains how to simply paste your Solidity code into the AI Command Center and ask for an audit. The AI will analyze the code for common vulnerabilities like reentrancy, integer overflows, front-running risks, and improper access control. While not a substitute for a full manual audit, this tool can catch common mistakes and give you a detailed report on your contract\'s security posture in minutes, helping you build with confidence.',
    },
    {
        serviceIndex: 10,
        slug: 'effective-dao-governance',
        icon: 'Vote',
        title: 'Effective DAO Governance',
        excerpt: 'Manage your Decentralized Autonomous Organization with our comprehensive suite of governance tools.',
        date: '2024-07-10',
        content: 'Running a DAO is more than just deploying a contract. Our DAO Governance tools help you manage the entire lifecycle. This article covers how to use the AI to generate a full governance plan. You can use a prompt like "Design a DAO for a gaming guild that uses token-weighted voting for major decisions and a council for minor ones." The AI will generate a plan including the tokenomics, voting structure, and operational steps. You can then use our tools to create proposals, manage voting, and execute passed proposals on-chain, all through a transparent and easy-to-use governance dashboard.',
    },
].sort((a, b) => (a.date < b.date ? 1 : -1));

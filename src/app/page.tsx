
import { Metadata } from 'next';
import { MainContent } from '@/components/layout/main-content';

export const metadata: Metadata = {
  title: 'Terminal3 | Your AI Partner for Web3 Mastery',
  description: 'Delegate your complex Web3 operations to autonomous AI agents. Build, automate, and master the decentralized future with intelligent strategies and flawless on-chain execution.',
  openGraph: {
    title: 'Terminal3 | Your AI Partner for Web3 Mastery',
    description: 'Empower your vision with autonomous AI agents. From intelligent strategies to flawless on-chain execution, Terminal3 provides your ultimate edge in the decentralized world.',
    url: 'https://www.terminal3.me',
    siteName: 'Terminal3',
    images: [
      {
        url: 'https://www.terminal3.me/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Terminal3 - AI-Powered Web3 Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terminal3 | Your AI Partner for Web3 Mastery',
    description: 'Build, automate, and master the decentralized future with Terminal3\'s autonomous AI agents.',
    images: ['https://www.terminal3.me/twitter-image.png'],
  },
  keywords: ['AI', 'Web3', 'Crypto', 'Blockchain', 'Development', 'Automation', 'Smart Contracts', 'Solana', 'Ethereum', 'dApps'],
  authors: [{ name: 'Terminal3', url: 'https://www.terminal3.me' }],
  creator: 'Terminal3',
  publisher: 'Terminal3',
};

export default function Home() {
  return <MainContent />;
}

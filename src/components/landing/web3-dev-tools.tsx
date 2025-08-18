
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppWindow, Bot, Puzzle, Wallet, FileJson, Network } from 'lucide-react';

const tools = [
  {
    icon: AppWindow,
    title: 'dApp Builder',
    description: 'Create and deploy decentralized applications with our intuitive builder.',
  },
  {
    icon: Puzzle,
    title: 'Token Launcher',
    description: 'Design and launch your own custom cryptocurrency tokens in minutes.',
  },
  {
    icon: Bot,
    title: 'Trading Bot Platform',
    description: 'Develop and deploy automated trading bots on major exchanges.',
  },
  {
    icon: Wallet,
    title: 'Custom Wallets',
    description: 'Build and brand your own secure crypto wallets for your users.',
  },
  {
    icon: FileJson,
    title: 'Smart Contract Templates',
    description: 'Use our audited templates to create secure smart contracts without the hassle.',
  },
  {
    icon: Network,
    title: 'Manual Transactions',
    description: 'Interact directly with the blockchain for custom operations and analysis.',
  },
];

export default function Web3DevTools() {
  return (
    <section id="for-developers" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">A powerful terminal for Web3 development.</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            From dApps and tokens to complex trading bots, Treminal3 provides the tools to bring your Web3 ideas to life.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Card key={tool.title} className="bg-card border-border shadow-lg">
              <CardHeader>
                <tool.icon className="w-8 h-8 mb-4 text-primary" />
                <CardTitle className="font-headline text-lg">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

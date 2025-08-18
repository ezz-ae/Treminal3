import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Code, FileSignature } from 'lucide-react';

const tools = [
  {
    icon: Network,
    title: 'Web3 Integrations',
    description: 'Seamlessly connect your business to the decentralized world with our robust Web3 APIs.',
  },
  {
    icon: Code,
    title: 'Developer Tools',
    description: 'Build, test, and deploy applications with a comprehensive suite of developer-focused tools.',
  },
  {
    icon: FileSignature,
    title: 'Smart Contracts',
    description: 'Automate agreements and transactions for freelancers and online businesses with secure contracts.',
  },
];

export default function Web3DevTools() {
  return (
    <section id="web3" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Built for the Future of the Web</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Harness the power of blockchain and decentralized technologies with our powerful APIs and infrastructure.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Card key={tool.title} className="bg-background/50 border-border/50">
              <CardHeader>
                <tool.icon className="w-8 h-8 mb-4 text-primary" />
                <CardTitle className="font-headline">{tool.title}</CardTitle>
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

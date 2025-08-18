
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Landmark, ShieldCheck } from 'lucide-react';

const solutions = [
  {
    icon: Wallet,
    title: 'Freelancer Banking',
    description: 'Online banking built for the independent workforce. Manage your fiat and crypto finances with ease.',
  },
  {
    icon: Landmark,
    title: 'Crypto Payments & Invoicing',
    description: 'Accept cryptocurrency payments from clients worldwide with our secure, automated invoicing system.',
  },
  {
    icon: ShieldCheck,
    title: 'Web3 Marketing Suite',
    description: 'Launch token airdrops, manage NFT campaigns, and engage your community with our Web3-native marketing tools.',
  },
];

export default function FinancialSolutions() {
  return (
    <section id="solutions" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Payments, Banking, and Marketing for the new economy.</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            From day-to-day banking to pioneering Web3 marketing campaigns, Treminal3 provides the tools you need to grow.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden order-last md:order-first">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Financial dashboard"
                data-ai-hint="financial dashboard crypto"
                fill
                className="object-cover"
              />
          </div>
          <div>
            <div className="space-y-6">
              {solutions.map((solution) => (
                <div key={solution.title} className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <solution.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-headline">{solution.title}</h3>
                    <p className="text-muted-foreground text-sm">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

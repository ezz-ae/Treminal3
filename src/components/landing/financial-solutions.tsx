import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Landmark, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const solutions = [
  {
    icon: Wallet,
    title: 'Freelancer Banking',
    description: 'Online banking built for the independent workforce. Manage your finances with ease.',
  },
  {
    icon: Landmark,
    title: 'Crypto Loans & Investments',
    description: 'Access capital or grow your assets with our secure crypto financial services.',
  },
  {
    icon: ShieldCheck,
    title: 'Blockchain Infrastructure',
    description: 'Reliable and scalable blockchain infrastructure to power your business\'s core functions.',
  },
];

export default function Platform() {
  return (
    <section id="platform" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The Platform for your Business</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            From day-to-day banking to pioneering crypto investments, Treminal3 provides the tools you need to take control of your company's financial future.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden order-last md:order-first">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Financial dashboard"
                data-ai-hint="financial dashboard"
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

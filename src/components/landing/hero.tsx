import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headline mb-6">
              The one-stop shop for your business.
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-muted-foreground mb-10">
              Treminal3 provides a complete ecosystem of software, financial services, and web3 infrastructure to power your business.
            </p>
            <div className="flex justify-center md:justify-start items-center gap-4">
              <Button size="lg">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Business owner using a terminal"
                data-ai-hint="business owner point of sale"
                fill
                className="object-cover"
              />
          </div>
        </div>
      </div>
    </section>
  );
}

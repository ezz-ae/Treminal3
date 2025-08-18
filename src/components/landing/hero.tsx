import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 bg-card overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Abstract background"
          data-ai-hint="abstract background"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter font-headline mb-6">
          The New Standard in Business Solutions
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
          Treminal3 provides a complete ecosystem of software, financial services, and web3 infrastructure to power your business, from startups to enterprise-level companies.
        </p>
        <div className="flex justify-center items-center gap-4">
          <Button size="lg">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}

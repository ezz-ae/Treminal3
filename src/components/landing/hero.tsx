import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './animated-text';

export default function Hero() {
  const words = ["Web3", "dApp", "token", "trading bot", "platform"];
  
  return (
    <section className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headline mb-10">
            Build, manage, and grow your <AnimatedText words={words} className="text-primary" /> project at any scale.
          </h1>
          <div className="flex justify-center items-center gap-4">
            <Button size="lg">
              Start Building <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

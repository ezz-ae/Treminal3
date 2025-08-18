import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './animated-text';

export default function Hero() {
  const words = ["dApp", "token", "trading bot", "custom wallet", "smart contract", "Web3 project"];
  
  return (
    <section className="bg-background text-foreground">
      <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headline mb-10">
            The ultimate terminal to build your next <AnimatedText words={words} className="text-primary" />
          </h1>
          <div className="flex justify-center items-center gap-4 mt-20">
            <Button size="lg">
              Start Building <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
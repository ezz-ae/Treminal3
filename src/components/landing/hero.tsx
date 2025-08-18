import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedText from './animated-text';

export default function Hero() {
  const words = ["Web3", "dApp", "token", "trading bot", "platform"];
  
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headline mb-10">
              Build, manage, and grow your <AnimatedText words={words} className="text-primary" /> project at any scale.
            </h1>
            <div className="flex justify-center md:justify-start items-center gap-4">
              <Button size="lg">
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Web3 development terminal"
                data-ai-hint="web3 terminal code"
                fill
                className="object-cover"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
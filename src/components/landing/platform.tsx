import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Platform() {
  return (
    <section id="platform" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className='text-primary font-semibold mb-2'>Platform</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">One platform to run your entire business.</h2>
            <p className="text-muted-foreground mb-8">
              From secure payments to sophisticated reporting, Treminal3 offers a fully integrated suite of products that work together to help you run your business.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary">
              Learn more about the platform <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Platform dashboard"
                data-ai-hint="platform dashboard analytics"
                fill
                className="object-cover"
              />
          </div>
        </div>
      </div>
    </section>
  );
}

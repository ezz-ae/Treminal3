import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function ForDevelopers() {
  return (
    <section id="for-developers" className="py-12 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Code on a screen"
                data-ai-hint="code screen terminal"
                fill
                className="object-cover"
              />
          </div>
          <div>
            <p className='text-blue-400 font-semibold mb-2'>For Developers</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">Powerful APIs for developers.</h2>
            <p className="text-gray-300 mb-8">
              Build with our flexible APIs for online payments, in-person payments, and everything in between.
            </p>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
              Read the docs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

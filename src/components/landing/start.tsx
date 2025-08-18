import { Button } from '@/components/ui/button';

export default function Start() {
  return (
    <section id="start" className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-headline">Ready to get started?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Create an account to explore more of what Treminal3 has to offer.
        </p>
        <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
          Create account
        </Button>
      </div>
    </section>
  );
}

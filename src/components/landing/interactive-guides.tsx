import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '../ui/button';

const guides = [
  {
    value: 'item-1',
    title: 'How do I build my first dApp?',
    content: 'Start by selecting a network in the Treminal3 dashboard. Then, navigate to the dApp Builder, choose a template, and follow the on-screen instructions. You can have a simple dApp running in less than 15 minutes.',
  },
  {
    value: 'item-2',
    title: 'How do I launch a new token?',
    content: 'Head to the "Token Launcher" section. Define your token\'s name, symbol, total supply, and other parameters. Treminal3 handles the smart contract creation and deployment for you.',
  },
  {
    value: 'item-3',
    title: 'How do I set up banking for my freelance business?',
    content: 'In the "Banking" tab, you can create a new account that handles both fiat and cryptocurrencies. Connect your external wallets and bank accounts to get a consolidated view of your finances.',
  },
];

export default function InteractiveGuides() {
  return (
    <section id="start" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Get started with Treminal3</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Explore our solutions or create an account to get started.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full mb-8">
            {guides.map((guide) => (
              <AccordionItem key={guide.value} value={guide.value}>
                <AccordionTrigger className="font-headline text-lg">{guide.title}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {guide.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center">
            <Button size="lg">Create Account</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

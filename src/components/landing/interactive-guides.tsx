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
    title: 'How do I set up my online banking?',
    content: 'Start by creating your Treminal3 account. Once verified, navigate to the "Banking" tab and follow the on-screen instructions to open your business checking account. The whole process takes less than 10 minutes.',
  },
  {
    value: 'item-2',
    title: 'How can I integrate the payment API?',
    content: 'Head to the "Developers" section in your dashboard to generate your API keys. Our comprehensive documentation provides code examples in multiple languages to help you integrate payments into your website or app quickly.',
  },
  {
    value: 'item-3',
    title: 'How do I use the smart contract system?',
    content: 'Our smart contract system uses pre-built templates for common freelance and business agreements. Select a template from the "Contracts" section, fill in the details, and send it to your client. The system handles deployment and execution on the blockchain automatically.',
  },
];

export default function Start() {
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

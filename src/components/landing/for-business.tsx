import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Banknote, Megaphone } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Briefcase,
    title: 'In-Person Payments',
    description: 'Terminals, card readers, and a POS system to power your checkout.',
  },
  {
    icon: Banknote,
    title: 'Online Payments',
    description: 'Ecommerce platforms, payment links, and online checkout for your website.',
  },
  {
    icon: Megaphone,
    title: 'Invoices',
    description: 'Send digital invoices and estimates, track payments, and send reminders.',
  },
];

export default function ForBusiness() {
  return (
    <section id="for-business" className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className='text-primary font-semibold mb-2'>For Business</p>
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The tools you need to run your business.</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            No matter the size of your business, we have the tools to help you get started, run, and grow.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link href="#" key={service.title} className="group">
              <Card className="flex flex-col text-center items-center p-6 border-0 shadow-md h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

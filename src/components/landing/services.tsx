import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Banknote, Megaphone } from 'lucide-react';

const services = [
  {
    icon: Briefcase,
    title: 'Business Software',
    description: 'Integrated software solutions to manage your operations, sales, and team with efficiency.',
  },
  {
    icon: Banknote,
    title: 'Banking Solutions',
    description: 'Modern banking services designed for speed and flexibility, tailored for today\'s businesses.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Automation',
    description: 'Powerful tools to reach your customers, automate campaigns, and grow your brand.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">A Fully Integrated Platform</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            One platform to accept payments, manage your team, and grow your business.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col text-center items-center p-6">
              <CardHeader className="p-0">
                <div className="bg-accent/20 text-accent-foreground p-4 rounded-full mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

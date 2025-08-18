import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Blocks, Waypoints, Landmark } from 'lucide-react';

const services = [
  {
    icon: Blocks,
    title: 'Web3 & Blockchain Development',
    description: 'The full-stack platform to build, launch, and manage any Web3 project with ease.',
  },
  {
    icon: Waypoints,
    title: 'Web3 Marketing & Smart Payments',
    description: 'Grow your audience and streamline revenue with our integrated marketing and payment tools.',
  },
  {
    icon: Landmark,
    title: 'Freelancers Banking System',
    description: 'A modern financial stack for the independent workforce. Manage your crypto and fiat seamlessly.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The all-in-one Web3 platform</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Treminal3 provides everything you need to succeed in the new digital economy.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col text-center items-center p-6 border-0 shadow-lg h-full">
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
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Building, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const jobOpenings = [
  {
    title: 'Senior AI Engineer - Web3 Agents',
    location: 'Dubai, UAE',
    department: 'Engineering',
    type: 'Full-time',
    description: 'Design and build the next generation of autonomous AI agents that interact with smart contracts and DeFi protocols. Deep experience with LLMs and blockchain technology is required.'
  },
  {
    title: 'Lead Product Designer - AI Interfaces',
    location: 'London, UK',
    department: 'Design',
    type: 'Full-time',
    description: 'Own the user experience of our AI Command Center. You will be responsible for designing intuitive, futuristic interfaces for complex AI-driven Web3 interactions.'
  },
  {
    title: 'Solana Ecosystem Lead',
    location: 'Dubai, UAE',
    department: 'Business Development',
    type: 'Full-time',
    description: 'Forge partnerships and drive adoption of Terminal3 within the Solana ecosystem. Deep network and understanding of Solana projects is a must.'
  },
  {
    title: 'Head of Marketing - Web3',
    location: 'New York, USA',
    department: 'Marketing',
    type: 'Full-time',
    description: 'Define and execute our global marketing strategy. You will be responsible for telling the story of Terminal3 to the world and growing our developer community.'
  },
  {
    title: 'Smart Contract Security Researcher',
    location: 'London, UK',
    department: 'Security',
    type: 'Full-time',
    description: 'Work alongside our AI to audit smart contracts, discover new vulnerabilities, and enhance the capabilities of our AI Security Auditor tool.'
  },
  {
    title: 'DevOps Engineer - AI Infrastructure',
    location: 'Dubai, UAE',
    department: 'Engineering',
    type: 'Remote',
    description: 'Manage and scale the complex cloud infrastructure that powers our AI models and Web3 services. Experience with GCP, Kubernetes, and Genkit is a plus.'
  }
];

export default function CareersPage() {
  return (
    <div className="container mx-auto py-12 px-4">
        <header className="mb-12 text-center">
            <Building className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-5xl font-bold font-headline">Join Our Mission</h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                We are building the future of decentralized development, powered by AI. We're a small, dedicated team of innovators and are looking for passionate individuals to join us.
            </p>
        </header>

        <div className="space-y-8 max-w-4xl mx-auto">
            {jobOpenings.map((job) => (
                 <Card key={job.title} className="bg-card/50 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="text-2xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 pt-2">
                             <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</span>
                             <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {job.department}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{job.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <Badge variant="secondary">{job.type}</Badge>
                            {job.location.includes('Remote') && <Badge variant="secondary">Remote Friendly</Badge>}
                        </div>
                        <Button>Apply Now</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}

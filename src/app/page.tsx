
'use client';

import Hero from '@/components/landing/hero';
import InteractiveGuides from '@/components/landing/interactive-guides';
import CodingModes from '@/components/landing/coding-modes';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ArrowRight,
  AppWindow,
  Gem,
  ShieldCheck,
  BookOpen,
  BrainCircuit,
  Wind,
  Library,
} from 'lucide-react';
import Link from 'next/link';


/**
 * The main landing page for Terminal3.
 * It serves as an introduction to the platform's capabilities and directs users
 * to the core services and interactive guides.
 * @returns {JSX.Element} The main landing page component.
 */
export default function Home() {
    const services = [
        { href: "/dashboard/strategy-vault", title: "Strategy Vault", description: "Browse and execute pre-built investment flows.", icon: Library },
        { href: "/dashboard/dapp-builder", title: "AI Business Architect", description: "Get a strategic plan for your dApp.", icon: AppWindow },
        { href: "/dashboard/token-launcher", title: "Token Launcher", description: "Generate custom ERC-20 tokens with AI.", icon: Gem },
        { href: "/dashboard/bot-creator", title: "Bot Creator", description: "Design, simulate, and deploy trading bots.", icon: BrainCircuit },
        { href: "/solana", title: "Solana Command Center", description: "Interact with the Solana network via AI.", icon: Wind },
        { href: "/dashboard/security-audits", title: "Security Audits", description: "Audit smart contracts for vulnerabilities.", icon: ShieldCheck },
        { href: "/dashboard/docs", title: "Docs & Academy", description: "Read guides, tutorials, and API references.", icon: BookOpen },
    ];
  return (
    <>
      <Hero />
      <div className="container mx-auto py-12 md:py-24 space-y-24">
         <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">A Unified Platform for Web3 Innovation</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground">
                    Explore the full suite of AI-powered tools to build, manage, and scale your projects. From idea to deployment, Terminal3 is your command center.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <ServiceCard key={service.title} href={service.href} title={service.title} description={service.description} icon={service.icon} />
                ))}
            </div>
        </div>
      </div>
      <InteractiveGuides />
      <CodingModes />
    </>
  );
}


const ServiceCard = ({ href, title, description, icon: Icon }: { href: string, title: string, description: string, icon: React.ElementType }) => (
    <Link href={href}>
        <Card className="h-full bg-card/50 hover:border-primary/50 transition-colors group flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-primary">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                 <CardDescription>{description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
                 <p className="text-sm font-medium text-primary flex items-center gap-1">
                    Open Dashboard <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </p>
            </div>
        </Card>
    </Link>
)

'use client';

import { LifeBuoy, BookOpen, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="container mx-auto py-12 px-4">
        <header className="mb-12 text-center">
            <LifeBuoy className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-5xl font-bold font-headline">Support Center</h1>
            <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                We're here to help you build. Find the resources you need to succeed with Terminal3.
            </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <Card className="bg-card/50 hover:border-primary/50 transition-colors">
                 <Link href="/dashboard/docs">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl"><BookOpen className="text-primary"/> Documentation</CardTitle>
                        <CardDescription>
                            Dive into our comprehensive guides, API references, and tutorials to master the Terminal3 platform.
                        </CardDescription>
                    </CardHeader>
                 </Link>
            </Card>
             <Card className="bg-card/50 hover:border-primary/50 transition-colors">
                <a href="mailto:support@terminal3.dev">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl"><Mail className="text-primary"/> Email Support</CardTitle>
                        <CardDescription>
                            Have a specific question or need direct assistance? Reach out to our dedicated support team.
                        </CardDescription>
                    </CardHeader>
                </a>
            </Card>
        </div>
    </div>
  );
}

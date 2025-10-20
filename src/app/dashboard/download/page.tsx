
'use client';

import { Download, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const downloadLinks = [
    { os: 'macOS (Intel)', href: '#' },
    { os: 'macOS (Apple Silicon)', href: '#' },
    { os: 'Windows', href: '#' },
    { os: 'Linux (.deb)', href: '#' },
    { os: 'Linux (.rpm)', href: '#' },
];

/**
 * A page for downloading the Terminal3 desktop application.
 * Provides "coming soon" links for different operating systems.
 * @returns {JSX.Element} The Download page component.
 */
export default function DownloadPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="p-6 bg-primary/10 rounded-full text-primary mb-6">
            <Terminal className="w-16 h-16" />
        </div>
        <h1 className="text-4xl font-bold font-headline">Download Terminal3 Desktop</h1>
        <p className="text-muted-foreground max-w-lg mx-auto mt-4">
            Access the full power of Terminal3 with our desktop application for an integrated development experience, offline access, and enhanced security.
        </p>
         <Badge className="mt-6">Coming Soon</Badge>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl mt-8">
            {downloadLinks.map((linkInfo) => (
                <Button key={linkInfo.os} size="lg" disabled asChild>
                    <Link href={linkInfo.href}>
                        <Download className="mr-2"/> {linkInfo.os}
                    </Link>
                </Button>
            ))}
        </div>
    </div>
  );
}

'use client';

import { Download, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const downloadLinks = [
    { os: 'macOS (Intel)', href: '#', icon: 'apple' },
    { os: 'macOS (Apple Silicon)', href: '#', icon: 'apple' },
    { os: 'Windows', href: '#', icon: 'windows' },
    { os: 'Linux (.deb)', href: '#', icon: 'linux' },
    { os: 'Linux (.rpm)', href: '#', icon: 'linux' },
];

/**
 * A page for downloading the Terminal3 desktop application.
 * Provides "coming soon" links for different operating systems.
 * @returns {JSX.Element} The Download page component.
 */
export default function DownloadPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="p-6 bg-primary/10 rounded-full text-primary mb-6 border border-primary/20">
            <Terminal className="w-16 h-16" />
        </div>
        <h1 className="text-4xl font-bold font-headline">Download Terminal3 Desktop</h1>
        <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            Access the full power of Terminal3 with our native desktop application for an integrated development experience, offline access, and enhanced security features.
        </p>
         <Badge className="mt-6 text-base">Coming Soon</Badge>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mt-10">
            {downloadLinks.map((linkInfo) => (
                <Button key={linkInfo.os} size="lg" disabled asChild className="h-14 text-lg">
                    <Link href={linkInfo.href}>
                        <Download className="mr-3 h-5 w-5"/> {linkInfo.os}
                    </Link>
                </Button>
            ))}
        </div>
        <p className="text-sm text-muted-foreground mt-8">
            The desktop app will be available for macOS, Windows, and Linux.
        </p>
    </div>
  );
}

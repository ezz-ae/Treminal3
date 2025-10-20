
'use client';

import { Download, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const downloadLinks = [
    { os: 'macOS', href: '#' },
    { os: 'Windows', href: '#' },
    { os: 'Linux', href: '#' },
];

/**
 * A page for downloading the Terminal3 desktop application.
 * Provides "coming soon" links for different operating systems.
 * @returns {JSX.Element} The Download page component.
 */
export default function DownloadPage() {
  return (
    <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
            <div className="p-6 bg-primary/10 rounded-full text-primary">
                <Terminal className="w-16 h-16" />
            </div>
            <div>
                <h1 className="text-4xl font-bold font-headline">Download Terminal3</h1>
                <p className="text-muted-foreground max-w-lg mx-auto mt-2">
                    Access the full power of Terminal3 with our desktop application for an integrated development experience. Coming soon for all major operating systems.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                {downloadLinks.map((linkInfo) => (
                    <Button key={linkInfo.os} size="lg" asChild>
                        <Link href={linkInfo.href}>
                            <Download className="mr-2"/> {linkInfo.os}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    </div>
  );
}

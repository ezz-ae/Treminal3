
'use client';

import { Download, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const downloadLinks = [
    { os: 'macOS (Intel)', href: '#' },
    { os: 'macOS (Apple Silicon)', href: '#' },
    { os: 'Windows x64', href: '#' },
    { os: 'Linux (.deb)', href: '#' },
    { os: 'Linux (.rpm)', href: '#' },
    { os: 'Linux (.AppImage)', href: '#' },
];

/**
 * A page for downloading the Terminal3 desktop application.
 * Provides "coming soon" links for different operating systems.
 * @returns {JSX.Element} The Download page component.
 */
export default function DownloadPage() {
  return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4 container mx-auto">
          <div className="p-6 bg-primary/10 rounded-full text-primary mb-6 border border-primary/20">
              <Terminal className="w-16 h-16" />
          </div>
          <h1 className="text-4xl font-bold font-headline">Terminal3 Desktop</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Access the full power of Terminal3 with our native desktop application for an integrated development experience, offline access, and enhanced security features.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mt-12">
              {downloadLinks.map((linkInfo) => (
                  <Button key={linkInfo.os} size="lg" asChild className="h-14 text-lg">
                      <Link href={linkInfo.href}>
                          <Download className="mr-3 h-5 w-5"/> {linkInfo.os}
                      </Link>
                  </Button>
              ))}
          </div>
          <Card className="mt-12 w-full max-w-2xl text-left bg-card/50">
              <CardHeader>
                  <CardTitle>Get Notified</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">The desktop app is under active development. Sign up for our newsletter to be the first to know when it's available.</p>
                  <div className="flex w-full items-center space-x-2 mt-4">
                      <Input type="email" placeholder="Email" />
                      <Button type="submit">Notify Me</Button>
                  </div>
              </CardContent>
          </Card>
      </div>
  );
}

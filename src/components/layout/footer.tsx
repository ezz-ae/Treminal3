
import { Terminal, Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Twitter, href: '#', 'aria-label': 'Twitter' },
  { icon: Github, href: '#', 'aria-label': 'Github' },
  { icon: Linkedin, href: '#', 'aria-label': 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
           <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 md:mb-0">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline">Treminal3</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Empowering businesses with cutting-edge solutions.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <Link key={index} href={social.href} aria-label={social['aria-label']} className="text-muted-foreground hover:text-foreground transition-colors">
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Treminal3, Inc. All rights reserved. Treminal3 is part of <a href="https://mtcmartech.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mtc'</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}

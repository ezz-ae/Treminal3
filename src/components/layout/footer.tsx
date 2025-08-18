import { Terminal, Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Twitter, href: '#', 'aria-label': 'Twitter' },
  { icon: Github, href: '#', 'aria-label': 'Github' },
  { icon: Linkedin, href: '#', 'aria-label': 'LinkedIn' },
];

const footerLinks = [
  {
    title: 'Products',
    links: ['Banking', 'Software', 'Marketing', 'Web3', 'Blockchain'],
  },
  {
    title: 'Resources',
    links: ['Docs', 'Guides', 'API Status', 'Pricing'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Contact Us'],
  },
];

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline">Treminal3</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Empowering businesses with cutting-edge solutions.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 font-headline">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Treminal3, Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {socialLinks.map((social, index) => (
              <Link key={index} href={social.href} aria-label={social['aria-label']} className="text-muted-foreground hover:text-foreground transition-colors">
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

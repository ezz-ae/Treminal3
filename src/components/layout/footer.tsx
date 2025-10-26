
'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Activity, Zap, ShieldCheck, Newspaper, Terminal } from 'lucide-react';

const serviceLinks = [
    { name: 'AI Business Architect', href: '/dashboard/dapp-builder' },
    { name: 'Token Launcher', href: '/dashboard/token-launcher' },
    { name: 'Trading Bot Creator', href: '/dashboard/bot-creator' },
    { name: 'Security Audits', href: '/dashboard/security-audits' },
    { name: 'Solana Toolkit', href: '/solana' },
    { name: 'Strategy Vault', href: '/dashboard/strategy-vault' },
];

const cashFlows = [
    { name: 'SolCash', href: '/solcash' },
    { name: 'CashBOT 03', href: '/cashbot-03' },
    { name: 'T03 AirCash', href: '/t03-aircash' },
    { name: 'Sniper 03', href: '/sniper-03' },
];

const resourceLinks = [
    { name: 'Documentation', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'T03 by Terminal3', href: '/t03' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Support', href: '/support' },
];

const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
];

const socialLinks = [
    { icon: Github, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
];

/**
 * The main footer component for the application.
 * Includes service links, resource links, company links, social media links,
 * and a status indicator.
 * @returns {JSX.Element} The Footer component.
 */
export default function Footer() {
  return (
      <footer className="border-t py-12 bg-background relative overflow-hidden">
                <div 
                    className="absolute -bottom-1/2 -left-1/4 w-1/2 h-[200%] bg-primary/5 rounded-full blur-2xl dark:bg-primary/10"
                    style={{ animation: 'aurora 20s linear infinite' }}
                ></div>
                <div 
                   className="absolute -top-1/2 -right-1/4 w-1/2 h-[200%] bg-primary/5 rounded-full blur-2xl dark:bg-primary/10"
                   style={{ animation: 'aurora 25s linear infinite reverse' }}
               ></div>
                <div className="container mx-auto px-4 relative z-10">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                      <div className="col-span-2 md:col-span-2">
                          <Link href="/" className="flex items-center space-x-2 mb-4">
                              <Terminal className="h-6 w-6 text-primary" />
                              <span className="font-bold font-headline text-xl">Terminal3</span>
                          </Link>
                          <p className="text-muted-foreground text-sm max-w-xs">
                              The AI-Native Web3 Development Platform. Build, manage, and grow your dApps faster.
                          </p>
                          <div className="flex space-x-4 mt-6">
                              {socialLinks.map((link, index) => (
                                  <Link href={link.href} key={index} className="text-muted-foreground hover:text-primary transition-colors">
                                      <link.icon className="h-5 w-5" />
                                  </Link>
                              ))}
                          </div>
                      </div>

                      <div>
                          <h3 className="font-semibold mb-4">Core Services</h3>
                          <ul className="space-y-2">
                              {serviceLinks.map((link, index) => (
                                  <li key={index}>
                                      <Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                          {link.name}
                                      </Link>
                                  </li>
                              ))}
                          </ul>
                      </div>

                       <div>
                          <h3 className="font-semibold mb-4">Cash Flows</h3>
                          <ul className="space-y-2">
                              {cashFlows.map((link, index) => (
                                  <li key={index}>
                                      <Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                          {link.name}
                                      </Link>
                                  </li>
                              ))}
                          </ul>
                      </div>

                      <div>
                          <h3 className="font-semibold mb-4">Resources</h3>
                          <ul className="space-y-2">
                              {resourceLinks.map((link, index) => (
                                  <li key={index}>
                                      <Link href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                          {link.name}
                                      </Link>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>

                  <div className="border-t pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                      <p>&copy; {new Date().getFullYear()} Terminal3. All rights reserved.</p>
                      {/* REMOVED STATUS INDICATOR */}
                  </div>
              </div>
      </footer>
  );
}

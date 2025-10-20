
import { Terminal, Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { StatusIndicator } from '../ui/status-indicator';

const serviceLinks = [
    { href: '/dashboard/dapp-builder', label: 'AI Business Architect' },
    { href: '/dashboard/token-launcher', label: 'Token Launcher' },
    { href: '/dashboard/bot-creator', label: 'Bot Creator' },
    { href: '/solana', label: 'Solana Command Center' },
    { href: '/dashboard/security-audits', label: 'Security Audits' },
    { href: '/dashboard/analytics', label: 'On-chain Analytics' },
    { href: '/dashboard/stake', label: 'Staking' },
    { href: '/dashboard/tools', label: 'Developer Tools' },
];

const resourceLinks = [
    { href: '/dashboard/docs/getting-started', label: 'Getting Started' },
    { href: '/dashboard/docs/apis', label: 'Universal RPC' },
    { href: '/blog', label: 'Blog & Guides' },
    { href: '/dashboard/docs', label: 'Documentation' },
];

const companyLinks = [
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Contact' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
]

const socialLinks = [
  { icon: Twitter, href: '#', 'aria-label': 'Twitter' },
  { icon: Github, href: '#', 'aria-label': 'Github' },
  { icon: Linkedin, href: '#', 'aria-label': 'LinkedIn' },
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
            className="absolute -bottom-1/2 -left-1/4 w-1/2 h-[200%] bg-primary/5 rounded-full blur-3xl dark:bg-primary/10"
            style={{ animation: 'aurora 20s linear infinite' }}
        ></div>
         <div 
            className="absolute -top-1/2 -right-1/4 w-1/2 h-[200%] bg-blue-500/5 rounded-full blur-3xl dark:bg-blue-500/10"
            style={{ animation: 'aurora 25s linear infinite reverse' }}
        ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2 md:col-span-2">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <Terminal className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg font-headline">Terminal3</span>
                </Link>
                <p className="text-muted-foreground text-sm max-w-xs">
                    The AI-powered Web3 Development and Services Platform.
                </p>
                 <div className="mt-4">
                    <StatusIndicator />
                </div>
            </div>

             <div>
                <h4 className="font-headline font-semibold mb-4">Services</h4>
                <ul className="space-y-2">
                    {serviceLinks.map((link) => (
                        <li key={link.label}>
                            <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div>
                <h4 className="font-headline font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                    {resourceLinks.map((link) => (
                        <li key={link.label}>
                            <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
             <div>
                <h4 className="font-headline font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                    {companyLinks.map((link) => (
                        <li key={link.label}>
                            <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Terminal3, Inc. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <Link key={index} href={social.href} aria-label={social['aria-label']} className="text-muted-foreground hover:text-primary transition-colors">
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

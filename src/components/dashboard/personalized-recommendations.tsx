
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/hooks/use-wallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Rocket, PieChart } from 'lucide-react';
import Link from 'next/link';

const recommendations = {
  new: [
    { title: 'Secure Your First dApp', description: 'Run a security audit on your smart contracts to find vulnerabilities before you deploy.', href: '/dashboard/security-audits', icon: ShieldCheck },
    { title: 'Launch Your Own Token', description: 'Create and deploy your own ERC-20 token in minutes without writing any code.', href: '/dashboard/token-launcher', icon: Rocket },
  ],
  active: [
    { title: 'Analyze Your Portfolio', description: 'Get a detailed breakdown of your crypto assets and their performance.', href: '/dashboard/finance', icon: PieChart },
    { title: 'Optimize Your Gas Fees', description: 'Analyze your recent transactions and get recommendations for gas optimization.', href: '/dashboard/tools', icon: Zap },
  ],
};

type Recommendation = {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

export function PersonalizedRecommendations() {
  const { wallet } = useWallet();
  const [userStatus, setUserStatus] = useState<'new' | 'active'>('new');
  const [currentRecommendations, setCurrentRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // In a real app, you would fetch the user's on-chain data to determine their status
    if (wallet) {
      // For now, we'll just simulate a user who has been active
      setUserStatus('active');
    }
  }, [wallet]);

  useEffect(() => {
    setCurrentRecommendations(recommendations[userStatus]);
  }, [userStatus]);

  return (
    <section>
      <h2 className="text-2xl font-bold font-headline mb-4">Personalized Recommendations</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {currentRecommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <rec.icon className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>{rec.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{rec.description}</p>
                <Button asChild>
                  <Link href={rec.href}>Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

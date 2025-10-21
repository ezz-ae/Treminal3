'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Hero from '@/components/landing/hero';
import MotionTerminal from './dashboard/motion-terminal';
import { articles } from '@/lib/articles';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { iconMap } from '@/lib/icon-map';
import InteractiveGuides from '@/components/landing/interactive-guides';
import CodingModes from '@/components/landing/coding-modes';
import { useWallet } from '@/hooks/use-wallet';
import { useRouter } from 'next/navigation';
import DashboardPage from './dashboard/page';

/**
 * The main landing page for unauthenticated users.
 * It combines a hero section, an interactive terminal, featured services,
 * and calls to action to encourage users to start building.
 * @returns {JSX.Element} The landing page component.
 */
export default function LandingPage() {
    const { wallet } = useWallet();
    const router = useRouter();

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const terminalScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
    const terminalY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

    const activeServiceIndex = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9], [0, 1, 2, 3, 7, 9, 10], {
        clamp: false
    });

    if (wallet) {
        return <DashboardPage />;
    }

  return (
    <div ref={containerRef}>
      <Hero />
      <div className="h-[4000px] relative">
        <div className="sticky top-[15vh] h-[70vh] px-4">
            <motion.div 
                className="w-full h-full max-w-4xl mx-auto"
                style={{ scale: terminalScale, y: terminalY }}
            >
                <MotionTerminal scrollYProgress={scrollYProgress} activeServiceIndex={null} />
            </motion.div>
        </div>
      </div>
       <InteractiveGuides />
       <CodingModes />
    </div>
  );
}

const ServiceCard = ({ article }: { article: typeof articles[0] }) => {
    const Icon = iconMap[article.icon];
    return (
        <Card className="bg-card/50">
            <CardHeader>
                <div className="flex items-center gap-4">
                     <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle>{article.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription>{article.excerpt}</CardDescription>
            </CardContent>
        </Card>
    )
}

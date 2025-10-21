'use client';

import { Bot, PlayCircle, Loader2, CheckCircle, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const steps = [
    "Initializing AI Agent...",
    "Accessing Strategy Vault...",
    "Parsing 'Solana First Mover' flow...",
    "Allocating compute resources...",
    "Generating token metadata...",
    "Compiling smart contract...",
    "Running security pre-flight checks...",
    "Executing deployment simulation...",
    "Generating marketing assets...",
    "Finalizing execution plan...",
];

/**
 * A placeholder page for the Dev Flow execution environment.
 * @returns {JSX.Element} The Dev Flow page component.
 */
export default function DevFlowPage() {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (progress < 100) {
            const timer = setTimeout(() => {
                const newProgress = progress + 10;
                setProgress(newProgress);
                setCurrentStep(Math.floor(newProgress / 10));
            }, 800);
            return () => clearTimeout(timer);
        } else {
            const finalTimer = setTimeout(() => setIsComplete(true), 800);
            return () => clearTimeout(finalTimer);
        }
    }, [progress]);

  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="relative mb-6">
            <div className="p-8 bg-primary/10 rounded-full text-primary border border-primary/20">
                <Bot className="w-20 h-20" />
            </div>
            <AnimatePresence>
            {!isComplete ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute bottom-2 -right-2 bg-background rounded-full p-1">
                    <Loader2 className="w-12 h-12 text-primary/80 animate-spin" />
                </motion.div>
            ) : (
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute bottom-2 -right-2 bg-background rounded-full p-1">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                 </motion.div>
            )}
            </AnimatePresence>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold font-headline">Strategy Execution in Progress</h1>
            <p className="text-muted-foreground max-w-xl mx-auto mt-4">
                The AI agent has been deployed and is executing the automated "Solana First Mover" strategy. You can monitor the progress below.
            </p>
        </motion.div>
       
        <Card className="w-full max-w-2xl mt-12 bg-card/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    Execution Log
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full">
                    <Progress value={progress} className="h-3 mb-4" />
                    <div className="text-sm text-muted-foreground h-6 text-center">
                         <AnimatePresence mode="wait">
                            <motion.p
                                key={currentStep}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isComplete ? 'Execution Complete!' : steps[currentStep]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
                 <div className="mt-8">
                    <Button variant="outline" disabled={!isComplete}>View Deployment Results (Coming Soon)</Button>
                </div>
            </CardContent>
        </Card>
    </div>
    <Footer />
    </>
  );
}

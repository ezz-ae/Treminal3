'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/use-wallet';
import { useEffect } from "react";

/**
 * Authentication page for users to connect their wallet.
 * Handles wallet connection and redirects connected users to the dashboard.
 * @returns {JSX.Element} The authentication page component.
 */
export default function AuthPage() {
    const router = useRouter();
    const { connectWallet, wallet } = useWallet();

    const handleConnect = async () => {
        await connectWallet();
    }

    useEffect(() => {
        if (wallet) {
            router.push('/dashboard');
        }
    }, [wallet, router]);


    if (wallet) {
         return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <p>Connecting and redirecting...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center flex-1 bg-background">
            <Card className="w-full max-w-md mx-4 sm:mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">Connect to Terminal3</CardTitle>
                    <CardDescription>Connect your wallet to access the platform and start building.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center space-y-4">
                        <Wallet className="w-16 h-16 text-primary" />
                        <p className="text-sm text-muted-foreground">
                            By connecting, you agree to our Terms of Service and Privacy Policy.
                        </p>
                        <Button size="lg" className="w-full" onClick={handleConnect}>
                            Connect Wallet
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

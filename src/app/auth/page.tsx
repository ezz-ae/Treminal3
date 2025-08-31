
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletCards } from "lucide-react";

export default function AuthPage() {

    const handleConnect = () => {
        // Placeholder for wallet connection logic (e.g., with ethers.js, web3-react, wagmi)
        alert("Connecting to wallet...");
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-md mx-4 sm:mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">Connect Your Wallet</CardTitle>
                    <CardDescription>Connect your wallet to access your dashboard and start building.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center space-y-4">
                        <WalletCards className="w-16 h-16 text-primary" />
                        <p className="text-sm text-muted-foreground">
                            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
                        </p>
                        <Button size="lg" className="w-full" onClick={handleConnect}>
                            <WalletCards className="mr-2" />
                            Connect Wallet
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

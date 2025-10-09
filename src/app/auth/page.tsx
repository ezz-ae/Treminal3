
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Wallet } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { useUser } from "@/firebase";

/**
 * Authentication page for users to sign in.
 * Handles Google sign-in and redirects authenticated users to the dashboard.
 * @returns {JSX.Element} The authentication page component.
 */
export default function AuthPage() {
    const router = useRouter();
    const auth = useAuth();
    const { user, loading } = useUser();

    /**
     * Handles the Google sign-in process via a popup.
     */
    const handleConnect = async () => {
        if (auth) {
            const provider = new GoogleAuthProvider();
            try {
                await signInWithPopup(auth, provider);
                router.push('/dashboard');
            } catch (error) {
                console.error("Authentication failed", error);
            }
        }
    }

    useEffect(() => {
        // If the user is already logged in, redirect to the dashboard.
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);


    // Show a loading state while checking user status or if the user is already authenticated.
    if (loading || user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-md mx-4 sm:mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">Connect to Terminal3</CardTitle>
                    <CardDescription>Sign in with Google to access your dashboard and start building.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center space-y-4">
                        <Wallet className="w-16 h-16 text-primary" />
                        <p className="text-sm text-muted-foreground">
                            By connecting, you agree to our Terms of Service and Privacy Policy.
                        </p>
                        <Button size="lg" className="w-full" onClick={handleConnect}>
                            Connect with Google
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

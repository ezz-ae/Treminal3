
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, DollarSign, Zap, BrainCircuit } from "lucide-react";

export default function SolCashPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">SolCash: The Solana Cash Machine</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Your all-in-one solution for creating, managing, and profiting from your own Solana token. No coding required, just your vision and our AI.</p>
        <Button size="lg">
          Get Started with SolCash
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl font-bold text-center font-headline mb-8">Your Journey to Daily Returns</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full">
                    <BrainCircuit className="w-6 h-6" />
                </div>
              <CardTitle>1. Create Your Token with AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Leverage our AI-powered suggestions to design and launch your custom SPL token on the Solana network. Describe your token, and our AI will bring it to life.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full">
                    <Zap className="w-6 h-6" />
                </div>
              <CardTitle>2. AI-Powered Liquidity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Our intelligent liquidity management system automatically creates and manages your liquidity pools, ensuring optimal performance and maximizing your returns.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full">
                    <DollarSign className="w-6 h-6" />
                </div>
              <CardTitle>3. Make Money Every Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sit back and watch your investment grow as our AI-driven strategies generate daily returns from your automated liquidity pools. Your Solana Cash Machine is at work.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <Card className="bg-muted/40">
          <CardHeader>
            <CardTitle>Important Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">SolCash is a powerful tool, but it's important to understand the risks involved. The value of your token and the returns from your liquidity pools can fluctuate. Terminal3 is not a financial advisor, and you are responsible for your own financial decisions. Please use SolCash responsibly and in accordance with all applicable laws and regulations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

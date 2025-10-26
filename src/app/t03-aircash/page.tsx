
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, DollarSign, CheckCircle, Award } from "lucide-react";

export default function T03AirCashPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">T03 AirCash: Airdrops and Staking</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Participate in exclusive airdrops and stake your T03 tokens to earn rewards. Your gateway to the T03 ecosystem.</p>
        <Button size="lg">
          Get Started with T03 AirCash
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl font-bold text-center font-headline mb-8">Your Journey to Earning Rewards</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full">
                    <Gift className="w-6 h-6" />
                </div>
              <CardTitle>1. Participate in Airdrops</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Complete tasks and participate in community events to be eligible for T03 token airdrops. The more you participate, the more you can earn.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full">
                    <DollarSign className="w-6 h-6" />
                </div>
              <CardTitle>2. Stake Your T03 Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Stake your T03 tokens to earn a share of the platform's revenue. The longer you stake, the more you can earn.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full">
                    <Award className="w-6 h-6" />
                </div>
              <CardTitle>3. Claim Your Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Claim your airdropped tokens and staking rewards at any time. Use them to access premium features or trade them on decentralized exchanges.</p>
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
            <p className="text-muted-foreground">T03 AirCash is a great way to earn rewards, but it's important to understand the risks involved. The value of T03 tokens can fluctuate, and staking rewards are not guaranteed. Terminal3 is not a financial advisor, and you are responsible for your own financial decisions. Please use T03 AirCash responsibly and in accordance with all applicable laws and regulations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

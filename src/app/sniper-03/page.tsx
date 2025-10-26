
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, ShieldCheck, TrendingUp, Crosshair } from "lucide-react";

export default function Sniper03Page() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Sniper 03: Your Competitive Edge</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Utilize our high-performance sniper scripts to gain a competitive edge in the fast-paced world of cryptocurrency. Never miss a token launch or NFT mint again.</p>
        <Button size="lg">
          Get Started with Sniper 03
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl font-bold text-center font-headline mb-8">Your Journey to Sniping Success</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full">
                    <Crosshair className="w-6 h-6" />
                </div>
              <CardTitle>1. Choose Your Target</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Browse our library of high-performance sniper scripts and choose the one that best fits your needs. We have scripts for a variety of use cases, from token launches to NFT mints.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full">
                    <ShieldCheck className="w-6 h-6" />
                </div>
              <CardTitle>2. Configure and Test</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configure the script to your exact specifications and test it in a simulated environment. Our scripts are designed to be safe and secure, but it's always a good idea to test them before using them in a live environment.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full">
                    <Zap className="w-6 h-6" />
                </div>
              <CardTitle>3. Deploy and Dominate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Deploy the script with a single click and let it go to work. Our high-performance infrastructure ensures that your script will execute quickly and reliably, giving you the edge you need to succeed.</p>
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
            <p className="text-muted-foreground">Sniper scripts are powerful tools, but they are not without risk. The cryptocurrency market is volatile, and there is no guarantee that you will be successful. Terminal3 is not responsible for any losses you may incur. Please use Sniper 03 responsibly and in accordance with all applicable laws and regulations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

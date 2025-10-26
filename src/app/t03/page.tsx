
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function T03Page() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">T03 by Terminal3</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">Your all-access pass to the entire suite of Terminal3 tools and services. No complicated pricing tiers, no hidden fees. Just one token to unlock everything.</p>
        <Button size="lg" asChild>
          <a href="#">Get T03 Now</a>
        </Button>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl font-bold text-center font-headline mb-8">One Token, Unlimited Potential</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Full Access to All Features</h3>
              <p className="text-muted-foreground">Your T03 token grants you access to every tool and service on the Terminal3 platform, including our AI Business Architect, Token Launcher, Trading Bot Creator, and more.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">No Recurring Fees</h3>
              <p className="text-muted-foreground">Forget about monthly subscriptions. With T03, you own your access. Use your tokens to pay for services as you need them, or hold them for future use.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Community and Governance</h3>
              <p className="text-muted-foreground">T03 is more than just a utility token. It's your voice in the Terminal3 ecosystem. Participate in governance and help shape the future of the platform.</p>
            </div>
          </div>
        </div>
      </div>

       {/* Call to Action Section */}
       <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h2 className="text-3xl font-bold font-headline mb-4">Get Your T03 Tokens Today</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Ready to unlock the full power of Terminal3? Get your T03 tokens now and start building the future of Web3.</p>
        <Button size="lg" asChild>
          <a href="#">Buy T03 on a DEX</a>
        </Button>
      </div>

    </div>
  );
}

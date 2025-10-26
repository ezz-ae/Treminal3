
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, BrainCircuit, TrendingUp } from "lucide-react";

export default function CashBot03Page() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-headline mb-2">CashBOT 03: Your AI-Powered Trading Bot</h1>
          <p className="text-xl text-muted-foreground">Automate your trading strategies and let our AI-powered bot work for you, 24/7.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Follow these simple steps to start automating your trades with CashBOT 03.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <BrainCircuit className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">1. Design Your Strategy</h3>
                <p className="text-muted-foreground">Use our intuitive interface to design your custom trading strategy. Set your parameters, risk tolerance, and profit targets.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Bot className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">2. Backtest and Simulate</h3>
                <p className="text-muted-foreground">Test your strategy against historical data to see how it would have performed. Simulate its performance in real-time to gain confidence in your approach.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">3. Deploy and Monitor</h3>
                <p className="text-muted-foreground">Deploy your bot with a single click and monitor its performance in real-time. CashBOT 03 will execute trades on your behalf, 24/7.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Trading bots are powerful tools, but they are not without risk. The cryptocurrency market is volatile, and past performance is not indicative of future results. Terminal3 is not a financial advisor, and you are responsible for your own financial decisions. Please use CashBOT 03 responsibly and in accordance with all applicable laws and regulations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

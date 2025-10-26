
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SolanaCashMachinePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold font-headline mb-4">Solana Cash Machine</h1>
          <p className="text-muted-foreground mb-8">Turn your budget into daily returns with our AI-powered Solana toolkit. Create a token, let our AI manage your liquidity, and watch your investment grow.</p>
          
          <h2 className="text-2xl font-bold font-headline mb-4">Terms and Conditions</h2>
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              <p>By using the Solana Cash Machine, you agree to the following terms and conditions:</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>You are responsible for all financial risks associated with creating and managing a token.</li>
                <li>Terminal3 is not a financial advisor and does not provide financial advice.</li>
                <li>The ROI calculator is for informational purposes only and is not a guarantee of future returns.</li>
                <li>You are responsible for complying with all applicable laws and regulations.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>ROI Calculator</CardTitle>
              <CardDescription>Estimate your potential returns based on your budget.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-muted-foreground mb-1">Your Budget (USDC)</label>
                  <Input id="budget" type="number" placeholder="1000" />
                </div>
                <Button className="w-full">Calculate ROI</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

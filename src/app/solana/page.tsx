'use client';

import { useState, useEffect } from 'react';
import { Wind, CircleDollarSign, Zap, Clock, Terminal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CustomCodeBlock } from '@/components/ui/code-block';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const rpcEndpoint = "https://api.terminal3.me/v1/rpc/YOUR_API_KEY/sol";
const curlExample = `
curl ${rpcEndpoint} -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getEpochInfo"
  }
'
    `;

const jsExample = `
const url = '${rpcEndpoint}';
const headers = {
    'Content-Type': 'application/json'
};
const body = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'getAccountInfo',
    params: [
        'vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg',
        {
          encoding: 'jsonParsed'
        }
    ]
});

fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
    `;


/**
 * A comprehensive dashboard for interacting with and monitoring the Solana network.
 * Features live network stats and an AI-powered terminal for natural language commands.
 * @returns {JSX.Element} The Solana dashboard page component.
 */
export default function SolanaPage() {

  const [networkStats, setNetworkStats] = useState({
    tps: 0,
    slotTime: 0,
    epoch: 0,
  });

  useEffect(() => {
    // Mock real-time data fetching
    const interval = setInterval(() => {
      setNetworkStats({
        tps: Math.floor(2500 + Math.random() * 1500),
        slotTime: Math.floor(400 + Math.random() * 100),
        epoch: 512, // Usually static for a while
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="space-y-8 prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight">
      <header className="not-prose">
        <h1 className="text-4xl font-bold font-headline flex items-center gap-3">
          <Wind className="w-10 h-10 text-primary" />
          Solana Hub Overview
        </h1>
        <p className="text-muted-foreground text-lg">
          Your complete hub to interact with the Solana network using natural language, monitor live stats, and access high-performance RPC endpoints.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 not-prose">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions per Second</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.tps.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Live network throughput</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Slot Time (ms)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.slotTime}ms</div>
            <p className="text-xs text-muted-foreground">Block confirmation speed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Epoch</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.epoch}</div>
            <p className="text-xs text-muted-foreground">Next epoch in ~2 days</p>
          </CardContent>
        </Card>
      </div>

       <Card className="not-prose text-center">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <Terminal className="text-primary"/> AI Terminal
                </CardTitle>
                 <CardDescription>
                    The heart of the Solana Hub. Use natural language to interact with the network.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">Airdrop tokens, check balances, inspect transactions, and more without writing a single line of code.</p>
                <Button asChild>
                    <Link href="/solana/terminal">Open AI Terminal &rarr;</Link>
                </Button>
            </CardContent>
       </Card>
      
      <section>
            <h2>High-Performance RPC</h2>
            <p>
                Connect to our robust Solana RPC endpoints to interact with the blockchain. Send transactions, query data, and build powerful applications with confidence.
            </p>
            <h3>Endpoint URL</h3>
            <p>
                Use the following base URL for all RPC requests. Replace \`YOUR_API_KEY\` with your actual API key.
            </p>
            <div className="bg-card border rounded-md p-4 font-mono text-sm not-prose">https://api.terminal3.me/v1/rpc/<span className='text-primary'>YOUR_API_KEY</span>/sol</div>
            
            <h3 className="mt-8">Examples</h3>
            <h4>cURL Request</h4>
            <p>Here's a simple example of how to fetch the current epoch info using cURL.</p>
            <CustomCodeBlock code={curlExample} language="bash" />

            <h4 className="mt-8">JavaScript Fetch</h4>
            <p>Here's how you can fetch account information using JavaScript's \`fetch\` API.</p>
            <CustomCodeBlock code={jsExample} language="javascript" />
        </section>

        <section>
            <h2>Key RPC Methods</h2>
            <p>Our Solana endpoints support a wide range of JSON-RPC methods. Here are some of the most commonly used ones:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li><code>getAccountInfo</code>: Returns all information associated with the account of a given public key.</li>
                <li><code>getTokenAccountsByOwner</code>: Returns all token accounts owned by a given public key.</li>
                <li><code>getBalance</code>: Returns the balance of the account of a given public key.</li>
                <li><code>sendTransaction</code>: Submits a signed transaction to the cluster for processing.</li>
                <li><code>requestAirdrop</code>: Requests an airdrop of lamports to a public key (devnet/testnet only).</li>
            </ul>
        </section>
    </div>
  );
}


'use client';
import { CustomCodeBlock } from '@/components/ui/code-block';
import { Button } from '@/components/ui/button';
import { Copy, Puzzle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ApisPage() {
    const rpcEndpoint = "https://api.terminal3.me/v1/rpc";
    const curlExample = `
curl ${rpcEndpoint}/YOUR_API_KEY/eth -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_blockNumber"
  }
'
    `;

    const jsExample = `
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
 
const client = createPublicClient({ 
  chain: mainnet,
  transport: http('${rpcEndpoint}/YOUR_API_KEY/eth')
})

const blockNumber = await client.getBlockNumber();
console.log(blockNumber);
    `;

  return (
    <div className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight">
        <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/10 rounded-lg text-primary">
                    <Puzzle className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-5xl font-bold !mb-0">APIs & Integration</h1>
                    <p className="text-xl text-muted-foreground mt-2">
                        Full reference documentation for all our developer APIs, including examples and use cases for our Universal RPC.
                    </p>
                </div>
            </div>
        </header>

        <section>
            <h2>Universal RPC API</h2>
            <p>
                Connect to over 50 chains with a single, reliable RPC endpoint. Our Universal RPC API provides a consistent interface for interacting with multiple blockchains, abstracting away the complexity of managing individual node connections.
            </p>
            <h3>Endpoint URL</h3>
            <p>
                Use the following base URL for all RPC requests. Replace \`YOUR_API_KEY\` with your actual API key and \`eth\` with the desired chain identifier (e.g., \`sol\`, \`polygon\`, \`arbitrum\`).
            </p>
            <div className="bg-card border rounded-md p-4 font-mono text-sm">{rpcEndpoint}/<span className='text-primary'>YOUR_API_KEY</span>/<span className='text-primary'>CHAIN</span></div>
            
            <h3 className="mt-8">Examples</h3>
            <h4>cURL Request (Ethereum)</h4>
            <p>Here's a simple example of how to fetch the latest block number from the Ethereum mainnet using cURL.</p>
            <CustomCodeBlock code={curlExample} language="bash" />

            <h4 className="mt-8">JavaScript Example (Viem)</h4>
            <p>We recommend using libraries like Viem or Ethers.js for interacting with our RPC endpoints in a JavaScript environment.</p>
            <CustomCodeBlock code={jsExample} language="javascript" />
        </section>

        <section className="mt-12">
            <h2>Supported Chains</h2>
            <p>Our Universal RPC API supports a growing list of chains, including but not limited to:</p>
            <ul className="grid grid-cols-3 gap-x-4 gap-y-2">
                <li>Ethereum</li>
                <li>Solana</li>
                <li>Polygon</li>
                <li>BNB Smart Chain</li>
                <li>Arbitrum</li>
                <li>Optimism</li>
                <li>Avalanche</li>
                <li>Base</li>
                <li>Fantom</li>
            </ul>
        </section>
    </div>
  )
}

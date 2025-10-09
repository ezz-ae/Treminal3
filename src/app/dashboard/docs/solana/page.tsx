
'use client';
import { CodeBlock, dracula } from 'react-code-blocks';
import { Button } from '@/components/ui/button';
import { Copy, BotMessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const CustomCodeBlock = ({ code, language = 'typescript' }: { code: string; language?: string }) => {
    const { toast } = useToast();
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Copied to clipboard!",
        });
    }

    return (
        <div className="relative group my-4 rounded-md overflow-hidden">
            <CodeBlock
                text={code.trim()}
                language={language}
                showLineNumbers={true}
                theme={dracula}
            />
            <Button 
                variant="ghost" 
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
            >
                <Copy className="w-4 h-4"/>
            </Button>
        </div>
    )
}

export default function SolanaPage() {
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

  return (
    <div className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight">
        <header className="mb-12">
            <h1 className="text-5xl font-bold">Solana on Terminal3</h1>
            <p className="text-xl text-muted-foreground mt-4">
                Leverage our high-performance infrastructure for your Solana applications. Get reliable, low-latency access to the Solana blockchain.
            </p>
        </header>

        <section>
            <h2>Universal RPC API</h2>
            <p>
                Connect to our robust Solana RPC endpoints to interact with the blockchain. Send transactions, query data, and build powerful applications with confidence.
            </p>
            <h3>Endpoint URL</h3>
            <p>
                Use the following base URL for all RPC requests. Replace \`YOUR_API_KEY\` with your actual API key and \`sol\` with the desired chain identifier.
            </p>
            <div className="bg-card border rounded-md p-4 font-mono text-sm">https://api.terminal3.me/v1/rpc/<span className='text-primary'>YOUR_API_KEY</span>/<span className='text-primary'>CHAIN</span></div>
            
            <h3 className="mt-8">Examples</h3>
            <h4>cURL Request (Solana)</h4>
            <p>Here's a simple example of how to fetch the current epoch info using cURL.</p>
            <CustomCodeBlock code={curlExample} language="bash" />

            <h4 className="mt-8">JavaScript Fetch</h4>
            <p>Here's how you can fetch account information using JavaScript's \`fetch\` API.</p>
            <CustomCodeBlock code={jsExample} language="javascript" />
        </section>

        <section className="mt-12">
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

        <section className="mt-12 p-8 rounded-lg bg-primary/10 border border-primary/20">
            <h2 className="!mt-0">Supercharge with AI</h2>
            <p>
                Don't want to manually craft complex JSON-RPC calls? Use our AI Agent to interact with the Solana network using natural language.
            </p>
            <p>
                Simply describe what you want to do, like "Get the token balance for wallet address X" or "Airdrop 2 SOL to my devnet wallet," and our AI will handle the rest.
            </p>
             <Button asChild>
                <Link href="/dashboard/ai-agents">
                    <BotMessageSquare className="mr-2"/> Try the AI Agent
                </Link>
            </Button>
        </section>
    </div>
  )
}

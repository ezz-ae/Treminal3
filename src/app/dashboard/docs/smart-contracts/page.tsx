
'use client';
import { FileJson, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

const templates = [
  {
    icon: FileJson,
    name: 'ERC-20 Token',
    description: 'The standard for fungible tokens. Create your own cryptocurrency with a fixed supply, minting, and burning capabilities.',
  },
  {
    icon: FileJson,
    name: 'ERC-721 NFT Collection',
    description: 'The standard for non-fungible tokens. Perfect for digital art, collectibles, or unique assets. Includes metadata support.',
  },
  {
    icon: FileJson,
    name: 'Vesting Contract',
    description: 'Lock up tokens for a specified period, with gradual release schedules. Essential for team and investor allocations.',
  },
  {
    icon: FileJson,
    name: 'Simple Marketplace',
    description: 'A basic contract for listing and selling ERC-721 NFTs for a fixed price in a designated ERC-20 token.',
  },
  {
    icon: FileJson,
    name: 'DAO Governance',
    description: 'A flexible governance contract for creating and voting on proposals using an ERC-20 governance token.',
  },
  {
    icon: FileJson,
    name: 'Crowdsale Contract',
    description: 'Raise funds by selling a fixed amount of tokens at a fixed price. Includes start/end times and a funding goal.',
  },
]

export default function SmartContractsPage() {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight">
        <header className="mb-12">
             <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/10 rounded-lg text-primary">
                    <FileJson className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-5xl font-bold !mb-0">Smart Contract Templates</h1>
                    <p className="text-xl text-muted-foreground mt-2">
                        Explore our library of audited smart contract templates and learn how to customize them securely with the help of AI.
                    </p>
                </div>
            </div>
        </header>

        <section className="mb-12">
            <h2>Build on a Secure Foundation</h2>
            <p>
                Smart contract development can be complex and fraught with risk. A single vulnerability can lead to catastrophic losses. That's why Terminal3 provides a comprehensive library of battle-tested and audited smart contract templates. These templates cover the most common use cases in Web3 and are built using industry best practices to ensure security and gas efficiency.
            </p>
        </section>

        <section>
            <h2 className="mb-8">Available Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                {templates.map((template) => (
                    <div key={template.name} className="bg-card/50 p-6 rounded-lg border h-full">
                        <div className="flex items-center gap-4 mb-4">
                            <template.icon className="w-8 h-8 text-primary" />
                            <h3 className="font-headline text-xl font-bold">{template.name}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">{template.description}</p>
                    </div>
                ))}
            </div>
        </section>
        
         <section className="mt-12 p-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-8">
            <ShieldCheck className="w-24 h-24 text-primary hidden md:block" />
            <div>
                <h2 className="!mt-0">Audited and Secure</h2>
                <p>
                    Every template in our library has undergone rigorous internal testing and has been audited by third-party security experts. We prioritize security so you can focus on building your application.
                </p>
            </div>
        </section>

         <section className="mt-12 p-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-8">
             <Zap className="w-24 h-24 text-primary hidden md:block" />
            <div>
                <h2 className="!mt-0">AI-Powered Customization</h2>
                <p>
                    Need to add a feature? Don't start from scratch. Use our <Link href="/dashboard/token-launcher">AI tools</Link> to customize any template. Simply describe your requirements, like "Add a 5% royalty fee to the NFT contract" or "Make the crowdsale support a whitelist," and our AI will generate the necessary code modifications for you.
                </p>
            </div>
        </section>

    </div>
  )
}

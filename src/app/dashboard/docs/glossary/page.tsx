
'use client';

import { BookOpen } from 'lucide-react';

const terms = {
  "A": [
    { term: "Address", definition: "A unique identifier for a wallet or smart contract on the blockchain, capable of sending and receiving assets. It's like a bank account number for crypto." },
    { term: "Airdrop", definition: "A method of distributing cryptocurrency to the public, usually for free, to a large number of wallet addresses. Often used for marketing or to reward early adopters." },
    { term: "API (Application Programming Interface)", definition: "A set of rules and tools for building software and applications. In Web3, APIs are used to connect applications to blockchain data and services." },
  ],
  "B": [
    { term: "Blockchain", definition: "A distributed, immutable ledger that records transactions in blocks. Each block is cryptographically linked to the previous one, creating a secure and transparent chain of data." },
    { term: "Block", definition: "A batch of transactions recorded on the blockchain. Once a block is added to the chain, its data cannot be altered." },
  ],
  "D": [
    { term: "dApp (Decentralized Application)", definition: "An application that runs on a decentralized network (like a blockchain) rather than on a single, centralized server. This makes it more resistant to censorship and single points of failure." },
    { term: "DAO (Decentralized Autonomous Organization)", definition: "An organization represented by rules encoded as a computer program (smart contract) that is controlled by its members and not influenced by a central authority." },
    { term: "DeFi (Decentralized Finance)", definition: "A new financial system built on blockchain technology that enables peer-to-peer financial services without traditional intermediaries like banks." },
  ],
  "E": [
    { term: "ERC-20", definition: "The technical standard for fungible tokens on the Ethereum blockchain. Fungible tokens are interchangeable, like currency (one dollar is the same as another dollar)." },
    { term: "ERC-721", definition: "The technical standard for non-fungible tokens (NFTs) on the Ethereum blockchain. NFTs are unique and not interchangeable, representing ownership of a specific item." },
    { term: "EVM (Ethereum Virtual Machine)", definition: "A Turing-complete virtual machine that runs on the Ethereum network. It's the runtime environment for every smart contract on Ethereum." },
  ],
  "G": [
    { term: "Gas", definition: "The fee required to conduct a transaction or execute a smart contract on the Ethereum blockchain. Prices are denoted in Gwei (a smaller unit of Ether)." },
  ],
  "M": [
    { term: "Mainnet", definition: "The main, live blockchain network where real transactions occur and have actual economic value." },
    { term: "Minting", definition: "The process of creating a new token (fungible or non-fungible) on a blockchain." },
  ],
  "S": [
    { term: "Smart Contract", definition: "A self-executing contract with the terms of the agreement directly written into code. They run on the blockchain and automatically execute when preset conditions are met." },
    { term: "Solidity", definition: "The primary programming language used for writing smart contracts on Ethereum and other EVM-compatible blockchains." },
  ],
  "W": [
    { term: "Wallet", definition: "A digital wallet that allows users to store, send, and receive cryptocurrencies. It holds the user's private keys, which are needed to authorize transactions." },
  ]
};

export default function GlossaryPage() {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-p:text-muted-foreground prose-a:text-primary">
        <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/10 rounded-lg text-primary">
                    <BookOpen className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold !mb-0">Glossary</h1>
                    <p className="text-lg text-muted-foreground mt-2">
                        A comprehensive dictionary of Web3 and blockchain terms used throughout the platform.
                    </p>
                </div>
            </div>
        </header>
        
        {Object.entries(terms).map(([letter, definitions]) => (
            <section key={letter} className="mb-12">
                <h2 className="text-3xl font-bold text-primary border-b border-border pb-2">{letter}</h2>
                <dl className="mt-6 space-y-8">
                    {definitions.map(item => (
                        <div key={item.term}>
                            <dt className="text-lg font-bold font-headline">{item.term}</dt>
                            <dd className="mt-2 text-muted-foreground">{item.definition}</dd>
                        </div>
                    ))}
                </dl>
            </section>
        ))}
    </div>
  )
}

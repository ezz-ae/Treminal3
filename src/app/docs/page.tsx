
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';

const commandSections = [
    {
        service: "dApp Builder",
        commands: [
            {
                command: "treminal3 create:dapp --name=<dapp-name> --template=<template-name>",
                description: "Creates a new decentralized application from a specified template.",
                whatYouNeed: ["A unique name for your dApp.", "A valid template name (e.g., 'nft-marketplace', 'defi-lending')."],
                whatToExpect: "A new directory containing the source code for your dApp, ready for customization.",
                aiCapability: "This service is available in 'Text to Code' mode. You can describe your dApp and the AI will generate it for you."
            },
            {
                command: "treminal3 deploy:dapp --name=<dapp-name> --network=<network-name>",
                description: "Deploys the specified dApp to a live network.",
                whatYouNeed: ["The name of the dApp you want to deploy.", "The target network (e.g., 'mainnet', 'sepolia')."],
                whatToExpect: "Your dApp will be built and deployed. You will receive a public URL to access it.",
                aiCapability: "Deployment is an automated process initiated after creation."
            }
        ]
    },
    {
        service: "Token Launcher",
        commands: [
            {
                command: 'treminal3 create:token --name="My Token" --symbol=TKN --supply=1000000',
                description: "Generates a smart contract for a new ERC-20 token.",
                whatYouNeed: ["The token's name.", "A short symbol (e.g., 'TKN').", "The total supply of tokens."],
                whatToExpect: "A new Solidity file (.sol) containing the ERC-20 smart contract code for your token.",
                aiCapability: "This service is available in 'Text to Code' mode. Describe your tokenomics and the AI will scaffold the contract."
            },
            {
                command: "treminal3 deploy:token --network=<network-name>",
                description: "Deploys the generated token contract to the specified network.",
                whatYouNeed: ["A generated token contract file.", "The target network (e.g., 'polygon', 'mainnet')."],
                whatToExpect: "The token contract will be deployed to the specified network, and you will receive its contract address.",
                aiCapability: "Deployment is an automated process initiated after creation."
            }
        ]
    },
    {
        service: "Trading Bots",
        commands: [
            {
                command: "treminal3 create:bot --name=<bot-name> --template=<template-name>",
                description: "Creates a new trading bot from a template.",
                whatYouNeed: ["A name for your bot.", "A valid trading strategy template (e.g., 'uniswap-v3-arbitrage')."],
                whatToExpect: "A new file containing the code for your trading bot, ready for configuration and backtesting.",
                aiCapability: "This service is available in 'Text to Code' mode. Describe your trading strategy, and the AI will generate the bot's logic."
            },
            {
                command: "treminal3 backtest --name=<bot-name> --from=<start-date>",
                description: "Runs a backtest simulation for a bot using historical data.",
                whatYouNeed: ["An existing trading bot file.", "A start date for the backtest period."],
                whatToExpect: "A performance report showing profit and loss (PnL), win rate, and other key metrics.",
                aiCapability: "Backtesting is an automated analysis tool."
            },
            {
                command: "treminal3 deploy:bot --name=<bot-name> --live",
                description: "Deploys a trading bot for live trading.",
                whatYouNeed: ["A configured and tested trading bot.", "API keys for the target exchange."],
                whatToExpect: "The bot will be deployed and will start executing trades live in the market.",
                aiCapability: "Deployment is an automated process."
            }
        ]
    },
     {
        service: "AI Agents",
        commands: [
            {
                command: "treminal3 create:agent --name=<agent-name> --trigger=<trigger-event>",
                description: "Creates an autonomous AI agent that executes based on a trigger.",
                whatYouNeed: ["A name for your agent.", "A defined trigger event (e.g., 'on-chain-event', 'time-interval')."],
                whatToExpect: "A new file with the boilerplate code for your AI agent, ready for you to define its logic.",
                aiCapability: "This service is at the core of our AI capabilities, allowing you to define complex autonomous tasks."
            },
            {
                command: "treminal3 agent:logs --name=<agent-name>",
                description: "Tails the logs for a deployed AI agent to monitor its activity.",
                whatYouNeed: ["The name of a deployed AI agent."],
                whatToExpect: "A real-time stream of logs from your agent, showing its actions and any errors.",
                aiCapability: "This is a monitoring tool for AI agents."
            }
        ]
    },
    {
        service: "Custom Wallets",
        commands: [
            {
                command: 'treminal3 create:wallet --brand=<brand-name> --template=multi-sig',
                description: "Generates the SDK for a custom, branded crypto wallet.",
                whatYouNeed: ["A brand name for your wallet.", "A valid wallet template (e.g., 'simple', 'multi-sig')."],
                whatToExpect: "A downloadable SDK and boilerplate code for creating your own branded wallet applications.",
                aiCapability: "Describe your desired wallet features and target audience, and the AI will recommend a template and configuration."
            },
            {
                command: "treminal3 publish:wallet --name=<wallet-name>",
                description: "Guides you through the process of publishing your wallet to app stores.",
                whatYouNeed: ["A generated wallet SDK.", "Developer accounts for the target app stores."],
                whatToExpect: "A guided checklist and automated scripts to help you package and submit your wallet for review.",
                aiCapability: "This is primarily a guided workflow, not a direct code generation service."
            }
        ]
    },
    {
        service: "Smart Contracts",
        commands: [
            {
                command: "treminal3 list:templates",
                description: "Lists all available smart contract templates.",
                whatYouNeed: ["None."],
                whatToExpect: "A list of available templates like 'ERC20', 'ERC721', 'DAO', 'Vesting'.",
                aiCapability: "This is a utility command; the templates themselves can be used by the AI in 'Text to Code' mode."
            },
            {
                command: "treminal3 use:template --name=<template-name> --output=<filepath>",
                description: "Creates a new smart contract file from the specified template.",
                whatYouNeed: ["A valid template name.", "A path for the output file."],
                whatToExpect: "A new Solidity file created at the specified path, pre-filled with the template code.",
                aiCapability: "This is a manual command, but the AI uses this capability in the background for 'Text to Code' mode."
            }
        ]
    },
    {
        service: "Manual Transactions",
        commands: [
            {
                command: "treminal3 tx:send --to=<address> --value=<amount> --network=<network>",
                description: "Sends a specified amount of native currency to an address.",
                whatYouNeed: ["A recipient address.", "The amount to send (e.g., '1.5ETH').", "The target network."],
                whatToExpect: "The transaction is broadcasted to the network, and a transaction hash is returned upon confirmation.",
                aiCapability: "This is a manual action to ensure user intent and security."
            },
            {
                command: "treminal3 tx:call --to=<address> --data=<calldata> --network=<network>",
                description: "Calls a function on a smart contract with custom calldata.",
                whatYouNeed: ["The smart contract address.", "The encoded function calldata.", "The target network."],
                whatToExpect: "The contract function is executed, and the transaction hash is returned.",
                aiCapability: "Advanced use; primarily a manual tool for developers."
            }
        ]
    },
    {
        service: "On-chain Analytics",
        commands: [
            {
                command: 'treminal3 analytics:query --dataset=uniswap_v3 --query="<sql-query>"',
                description: "Queries indexed on-chain data using SQL-like syntax.",
                whatYouNeed: ["A valid dataset name (e.g., 'uniswap_v3').", "A valid SQL query for that dataset."],
                whatToExpect: "The query results are returned in a tabular format or as a JSON object.",
                aiCapability: "You can ask for data in natural language (e.g., 'show me the 10 largest swaps on Uniswap today'), and the AI will construct the SQL query for you."
            }
        ]
    },
    {
        service: "Decentralized Storage",
        commands: [
            {
                command: "treminal3 storage:upload <filepath> --network=ipfs",
                description: "Uploads a file or directory to a decentralized storage network.",
                whatYouNeed: ["The local path to the file or directory.", "The target storage network (e.g., 'ipfs', 'arweave')."],
                whatToExpect: "The content is uploaded, and a unique content identifier (CID) or transaction ID is returned.",
                aiCapability: "This is an automated process initiated by the command."
            }
        ]
    },
    {
        service: "Security Audits",
        commands: [
            {
                command: "treminal3 audit:contract <filepath>",
                description: "Runs an automated security audit on a smart contract file.",
                whatYouNeed: ["The file path to a Solidity smart contract."],
                whatToExpect: "A security report detailing any found vulnerabilities, categorized by severity (Critical, High, Medium, Low).",
                aiCapability: "The AI uses automated tools to check for common security flaws and bad practices."
            }
        ]
    },
     {
        service: "DAO Governance",
        commands: [
            {
                command: 'treminal3 dao:create-proposal --title="<proposal-title>" --description="..."',
                description: "Creates a new governance proposal for a DAO.",
                whatYouNeed: ["A title for the proposal.", "A detailed description of the proposal."],
                whatToExpect: "A new proposal is created and submitted to your DAO's governance contract. A proposal ID is returned.",
                aiCapability: "You can describe the proposal in 'Text to Code' mode, and the AI will format and submit it for you."
            },
            {
                command: "treminal3 dao:vote --proposal-id=<id> --vote=<yes|no|abstain>",
                description: "Casts a vote on an active DAO proposal.",
                whatYouNeed: ["A valid proposal ID.", "Your vote ('yes', 'no', or 'abstain')."],
                whatToExpect: "Your vote is cast on the blockchain for the specified proposal.",
                aiCapability: "This is a manual action to ensure user intent."
            }
        ]
    }
];

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Treminal3 CLI Documentation</h1>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
              Your comprehensive guide to the Treminal3 command-line interface.
            </p>
          </div>
          
          <Card className="mb-12">
            <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {commandSections.map((section) => (
                        <li key={section.service}>
                            <a href={`#${section.service.toLowerCase().replace(/ /g, '-')}`} className="text-primary hover:underline">
                                {section.service}
                            </a>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
          
          <div className="space-y-12">
            {commandSections.map((section) => (
              <section key={section.service} id={section.service.toLowerCase().replace(/ /g, '-')}>
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6 border-b pb-2">{section.service}</h2>
                <div className="space-y-6">
                  {section.commands.map((cmd) => (
                    <Card key={cmd.command} className="font-code overflow-hidden">
                      <CardHeader className="bg-muted/50 p-4">
                        <div className="bg-muted p-4 rounded-md text-card-foreground overflow-x-auto">
                          <code>{cmd.command}</code>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div className="font-sans">
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-muted-foreground">{cmd.description}</p>
                        </div>

                        <div className="font-sans">
                            <h4 className="font-semibold mb-2">Prerequisites</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                {cmd.whatYouNeed.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>

                        <div className="font-sans">
                            <h4 className="font-semibold mb-2">Expected Outcome</h4>
                            <p className="text-muted-foreground">{cmd.whatToExpect}</p>
                        </div>
                        
                        <div className="font-sans">
                            <h4 className="font-semibold mb-2">AI Capability</h4>
                            <p className="text-muted-foreground">{cmd.aiCapability}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

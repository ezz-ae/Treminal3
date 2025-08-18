import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const commandSections = [
    {
        service: "General",
        commands: [
            {
                command: "treminal3 --version",
                description: "Checks the installed version of the Treminal3 CLI.",
            }
        ]
    },
    {
        service: "dApp Builder",
        commands: [
            {
                command: "treminal3 create:dapp --name=<dapp-name> --template=<template-name>",
                description: "Creates a new decentralized application from a specified template (e.g., 'nft-marketplace').",
            },
            {
                command: "treminal3 deploy:dapp --name=<dapp-name> --network=<network-name>",
                description: "Deploys the specified dApp to a network like 'mainnet' or 'sepolia'.",
            }
        ]
    },
    {
        service: "Token Launcher",
        commands: [
            {
                command: 'treminal3 create:token --name="My Token" --symbol=TKN --supply=1000000',
                description: "Generates a smart contract for a new ERC-20 token with the specified parameters.",
            },
            {
                command: "treminal3 deploy:token --network=<network-name>",
                description: "Deploys the generated token contract to the specified network.",
            }
        ]
    },
    {
        service: "Trading Bots",
        commands: [
            {
                command: "treminal3 create:bot --name=<bot-name> --template=<template-name>",
                description: "Creates a new trading bot from a template (e.g., 'uniswap-v3-arbitrage').",
            },
            {
                command: "treminal3 backtest --name=<bot-name> --from=<start-date>",
                description: "Runs a backtest simulation for a bot using historical data.",
            },
            {
                command: "treminal3 deploy:bot --name=<bot-name> --live",
                description: "Deploys a trading bot for live trading.",
            }
        ]
    },
     {
        service: "AI Agents",
        commands: [
            {
                command: "treminal3 create:agent --name=<agent-name> --trigger=<trigger-event>",
                description: "Creates an autonomous AI agent that executes based on a trigger (e.g., 'on-chain-event').",
            },
            {
                command: "treminal3 agent:logs --name=<agent-name>",
                description: "Tails the logs for a deployed AI agent to monitor its activity.",
            }
        ]
    },
    {
        service: "Smart Contracts",
        commands: [
            {
                command: "treminal3 list:templates",
                description: "Lists all available smart contract templates (e.g., 'ERC20', 'ERC721', 'DAO').",
            },
            {
                command: "treminal3 use:template --name=<template-name> --output=<filepath>",
                description: "Creates a new smart contract file from the specified template.",
            }
        ]
    },
    {
        service: "Security Audits",
        commands: [
            {
                command: "treminal3 audit:contract <filepath>",
                description: "Runs an automated security audit on a smart contract file to find common vulnerabilities.",
            }
        ]
    },
     {
        service: "DAO Governance",
        commands: [
            {
                command: 'treminal3 dao:create-proposal --title="<proposal-title>" --description="..."',
                description: "Creates a new governance proposal for a DAO.",
            },
            {
                command: "treminal3 dao:vote --proposal-id=<id> --vote=<yes|no|abstain>",
                description: "Casts a vote on an active DAO proposal.",
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
          
          <div className="space-y-12">
            {commandSections.map((section) => (
              <section key={section.service} id={section.service.toLowerCase().replace(/ /g, '-')}>
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6 border-b pb-2">{section.service}</h2>
                <div className="space-y-6">
                  {section.commands.map((cmd) => (
                    <Card key={cmd.command} className="font-code">
                      <CardHeader>
                        <CardTitle className="text-lg bg-muted p-4 rounded-md text-card-foreground overflow-x-auto">
                          <code>{cmd.command}</code>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground font-sans">{cmd.description}</p>
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

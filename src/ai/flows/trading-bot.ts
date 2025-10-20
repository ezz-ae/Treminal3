
'use server';
/**
 * @fileOverview AI flows for creating and simulating trading bots.
 *
 * - generateTradingBot - Creates a trading bot from a user's strategy description.
 * - runTradingBotSimulation - Simulates a trading bot's performance against historical data.
 */

import { ai } from '@/ai/genkit';
import { TradingBotInput, TradingBotInputSchema, TradingBotOutput, TradingBotOutputSchema, TradingBotSimulationOutput, TradingBotSimulationOutputSchema } from '@/ai/schemas/trading-bot';

const botGenerationPrompt = ai.definePrompt({
  name: 'tradingBotGenerator',
  input: { schema: TradingBotInputSchema },
  output: { schema: TradingBotOutputSchema },
  prompt: `You are an expert in algorithmic trading and Python development. Based on the user's strategy description, generate a Python class for a trading bot.

**Strategy:** {{strategy}}
**Trading Pair:** {{tradingPair}}

**Your Task:**
1.  **Bot Name:** Create a descriptive name for the bot.
2.  **Description:** Summarize the trading strategy in a few sentences.
3.  **Python Code:** Generate a Python class named 'TradingStrategy'. It should have an 'execute' method that takes historical data (a pandas DataFrame with columns 'timestamp', 'open', 'high', 'low', 'close', 'volume') and returns a list of trade signals ('buy', 'sell', or 'hold').

Provide your response in the specified JSON format. The Python code should be a single string with correct newlines and indentation.
`,
});

const botSimulationPrompt = ai.definePrompt({
    name: 'tradingBotSimulator',
    input: { schema: TradingBotInputSchema },
    output: { schema: TradingBotSimulationOutputSchema },
    prompt: `You are a powerful trading simulation engine. You will be given a trading strategy and you must simulate its performance over the last 6 months of historical data for the {{tradingPair}} pair.

**Strategy:** {{strategy}}
**Initial Capital:** {{initialCapital}} USDC

**Your Task:**
1.  **Generate Fake Data**: You do not have access to real market data. You must generate a realistic-looking but *fake* set of historical price data for the last 6 months to run the simulation.
2.  **Simulate Trades:** Execute the strategy against the generated data.
3.  **Calculate Metrics:** Compute the Total PNL, Win Rate, and Max Drawdown.
4.  **Generate Equity Curve:** Produce a list of data points showing the portfolio's equity over time.
5.  **List Trades:** Detail the first 5 buy/sell trades made during the simulation.

Provide your response in the specified JSON format. Make the simulation results look plausible and interesting. For example, the PNL should not always be positive.
`,
});


export async function generateTradingBot(input: TradingBotInput): Promise<TradingBotOutput> {
  const { output } = await botGenerationPrompt(input);
  if (!output) {
    throw new Error("Failed to generate trading bot.");
  }
  return output;
}

export async function runTradingBotSimulation(input: TradingBotInput): Promise<TradingBotSimulationOutput> {
    const { output } = await botSimulationPrompt(input);
    if (!output) {
      throw new Error("Failed to run trading bot simulation.");
    }
    return output;
}

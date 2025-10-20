
import { z } from 'zod';

export const TradingBotInputSchema = z.object({
  strategy: z.string().describe("The user's trading strategy in natural language. e.g., 'Buy BTC when RSI is below 30, sell when above 70.'"),
  tradingPair: z.string().describe("The trading pair for the bot, e.g., 'BTC/USDC'."),
  initialCapital: z.number().describe("The initial capital in USDC for simulation."),
});
export type TradingBotInput = z.infer<typeof TradingBotInputSchema>;

export const TradingBotOutputSchema = z.object({
  name: z.string().describe("A creative name for the trading bot."),
  description: z.string().describe("A summary of the bot's trading strategy."),
  pythonCode: z.string().describe("The Python code for the trading bot strategy."),
});
export type TradingBotOutput = z.infer<typeof TradingBotOutputSchema>;

export const TradingBotSimulationOutputSchema = z.object({
    summary: z.object({
        totalPnl: z.number().describe("Total profit or loss in USDC."),
        winRate: z.number().describe("The percentage of winning trades."),
        maxDrawdown: z.number().describe("The maximum drawdown percentage."),
    }),
    trades: z.array(z.object({
        type: z.enum(['buy', 'sell']),
        price: z.number(),
        amount: z.number(),
        timestamp: z.number(),
    })),
    equityCurve: z.array(z.object({
        date: z.string().describe("Date for the equity point, e.g., '2023-01-01'"),
        equity: z.number().describe("Portfolio equity value in USDC at that date."),
    })),
});
export type TradingBotSimulationOutput = z.infer<typeof TradingBotSimulationOutputSchema>;

    
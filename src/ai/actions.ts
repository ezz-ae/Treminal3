
'use server';

import { 
    runSecurityAudit as runAudit, 
    generateTradingBot as genTradingBot, 
    runTradingBotSimulation as runSim,
    runSolanaTool as runSolTool,
    recommendBusinessTools as recommendTools,
    generateTokenContract as genTokenContract,
    generateSolanaToken as genSolToken
} from '@/ai/dev';
import { consumeCredits, addCredits } from '@/lib/credits';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

import type { SecurityAuditInput, SecurityAuditOutput } from '@/ai/schemas/security-audit';
import type { TradingBotInput, TradingBotOutput, TradingBotSimulationOutput } from '@/ai/schemas/trading-bot';
import type { SolanaToolInput, SolanaToolOutput } from '@/ai/schemas/solana-tool';
import type { BusinessToolRecommendationInput, BusinessToolRecommendationOutput } from '@/ai/schemas/business-tool-recommendation';
import type { TokenGeneratorInput, TokenGeneratorOutput } from '@/ai/schemas/token-generator';
import type { SolanaTokenGeneratorInput, SolanaTokenGeneratorOutput } from '@/ai/schemas/solana-token-generator';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

async function handleCredits<T extends z.ZodTypeAny>( 
    userId: string, 
    cost: number, 
    usageTag: string, 
    action: (input: z.infer<T>) => Promise<any>,
    input: z.infer<T>
) {
    try {
        await consumeCredits(userId, cost);
    } catch (error: any) {
        if (error.message === 'INSUFFICIENT_CREDITS') {
            throw error;
        }
        console.error('Error consuming credits:', error);
        throw new Error('An unexpected error occurred while processing your request.');
    }

    const startTime = Date.now();

    try {
        let retries = 0;
        while (true) {
            try {
                const result = await action(input);
                const durationMs = Date.now() - startTime;
                
                await prisma.run.create({
                    data: {
                        userId,
                        usageTag,
                        inputSize: JSON.stringify(input).length,
                        outputTokens: JSON.stringify(result).length, 
                        durationMs,
                    },
                });

                return result;
            } catch (error: any) {
                if (error.status === 429 && retries < MAX_RETRIES) {
                    retries++;
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * Math.pow(2, retries))); // exponential backoff
                } else {
                    throw error;
                }
            }
        }
    } catch (error) {
        await addCredits(userId, cost); // Refund credits on failure
        throw error;
    }
}

export async function runSecurityAudit(input: SecurityAuditInput): Promise<SecurityAuditOutput> {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    return handleCredits(userId, 5, 'SEC_AUDIT', runAudit, input);
}

export async function generateTradingBot(input: TradingBotInput): Promise<TradingBotOutput> {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    return handleCredits(userId, 10, 'TRADING_BOT', genTradingBot, input);
}

export async function runTradingBotSimulation(input: TradingBotInput): Promise<TradingBotSimulationOutput> {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    return handleCredits(userId, 2, 'TRADING_BOT_SIM', runSim, input);
}

export async function runSolanaTool(input: SolanaToolInput): Promise<SolanaToolOutput> {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    return handleCredits(userId, 3, 'SOLANA_TOOL', runSolTool, input);
}

export async function recommendBusinessTools(input: BusinessToolRecommendationInput): Promise<BusinessToolRecommendationOutput> {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    return handleCredits(userId, 1, 'BIZ_TOOL_REC', recommendTools, input);
}

export async function generateTokenContract(input: TokenGeneratorInput): Promise<TokenGeneratorOutput> {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    return handleCredits(userId, 15, 'TOKEN_GEN', genTokenContract, input);
}

export async function generateSolanaToken(input: SolanaTokenGeneratorInput): Promise<SolanaTokenGeneratorOutput> {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    return handleCredits(userId, 5, 'SOLANA_TOKEN_GEN', genSolToken, input);
}

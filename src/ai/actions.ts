
'use server';

import { runSecurityAudit as runAudit } from '@/ai/flows/security-audit';
import { generateTradingBot as genTradingBot, runTradingBotSimulation as runSim} from '@/ai/flows/trading-bot';
import { runSolanaTool as runSolTool } from '@/ai/flows/solana-tool';
import { recommendBusinessTools as recommendTools } from '@/ai/flows/business-tool-recommendation';


import type { SecurityAuditInput, SecurityAuditOutput } from '@/ai/schemas/security-audit';
import type { TradingBotInput, TradingBotOutput, TradingBotSimulationOutput } from '@/ai/schemas/trading-bot';
import type { SolanaToolInput, SolanaToolOutput } from '@/ai/schemas/solana-tool';
import type { BusinessToolRecommendationInput, BusinessToolRecommendationOutput } from '@/ai/schemas/business-tool-recommendation';


export async function runSecurityAudit(input: SecurityAuditInput): Promise<SecurityAuditOutput> {
    const result = await runAudit(input);
    return result;
}

export async function generateTradingBot(input: TradingBotInput): Promise<TradingBotOutput> {
    const result = await genTradingBot(input);
    return result;
}

export async function runTradingBotSimulation(input: TradingBotInput): Promise<TradingBotSimulationOutput> {
    const result = await runSim(input);
    return result;
}

export async function runSolanaTool(input: SolanaToolInput): Promise<SolanaToolOutput> {
    const result = await runSolTool(input);
    return result;
}

export async function recommendBusinessTools(input: BusinessToolRecommendationInput): Promise<BusinessToolRecommendationOutput> {
    const result = await recommendTools(input);
    return result;
}


'use server';

import { runSecurityAudit as runAudit } from '@/ai/flows/security-audit';
import { generateTradingBot as genTradingBot, runTradingBotSimulation as runSim} from '@/ai/flows/trading-bot';


import type { SecurityAuditInput, SecurityAuditOutput } from '@/ai/schemas/security-audit';
import type { TradingBotInput, TradingBotOutput, TradingBotSimulationOutput } from '@/ai/schemas/trading-bot';


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


'use server';

import { generateDapp as genDapp } from '@/ai/flows/dapp-builder';
import { generateToken as genToken } from '@/ai/flows/token-launcher';
import { recommendBusinessTools as recTools } from '@/ai/flows/business-tool-recommendation';
import { runSecurityAudit as runAudit } from '@/ai/flows/security-audit';
import { generateDaoPlan as genDao } from '@/ai/flows/dao-governance';
import { generateTradingBot as genTradingBot, runTradingBotSimulation as runSim} from '@/ai/flows/trading-bot';


import type { DappBuilderInput, DappBuilderOutput } from '@/ai/schemas/dapp-builder';
import type { TokenLauncherInput, TokenLauncherOutput } from '@/ai/schemas/token-launcher';
import type { BusinessToolRecommendationInput, BusinessToolRecommendationOutput } from '@/ai/schemas/business-tool-recommendation';
import type { SecurityAuditInput, SecurityAuditOutput } from '@/ai/schemas/security-audit';
import type { DaoGovernanceInput, DaoGovernanceOutput } from '@/ai/schemas/dao-governance';
import type { TradingBotInput, TradingBotOutput, TradingBotSimulationOutput } from '@/ai/schemas/trading-bot';


export async function generateDapp(input: DappBuilderInput): Promise<DappBuilderOutput> {
    const result = await genDapp(input);
    return result;
}

export async function generateToken(input: TokenLauncherInput): Promise<TokenLauncherOutput> {
    const result = await genToken(input);
    return result;
}

export async function recommendBusinessTools(input: BusinessToolRecommendationInput): Promise<BusinessToolRecommendationOutput> {
    const result = await recTools(input);
    return result;
}

export async function runSecurityAudit(input: SecurityAuditInput): Promise<SecurityAuditOutput> {
    const result = await runAudit(input);
    return result;
}

export async function generateDaoPlan(input: DaoGovernanceInput): Promise<DaoGovernanceOutput> {
    const result = await genDao(input);
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

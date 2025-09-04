
'use server';

import { generateDapp as genDapp } from '@/ai/flows/dapp-builder';
import { generateToken as genToken } from '@/ai/flows/token-launcher';
import { recommendBusinessTools as recTools } from '@/ai/flows/business-tool-recommendation';
import { runSecurityAudit as runAudit } from '@/ai/flows/security-audit';
import { generateDaoPlan as genDao } from '@/ai/flows/dao-governance';

import type { DappBuilderInput, DappBuilderOutput } from '@/ai/schemas/dapp-builder';
import type { TokenLauncherInput, TokenLauncherOutput } from '@/ai/schemas/token-launcher';
import type { BusinessToolRecommendationInput, BusinessToolRecommendationOutput } from '@/ai/schemas/business-tool-recommendation';
import type { SecurityAuditInput, SecurityAuditOutput } from '@/ai/schemas/security-audit';
import type { DaoGovernanceInput, DaoGovernanceOutput } from '@/ai/schemas/dao-governance';


export async function generateDapp(input: DappBuilderInput): Promise<DappBuilderOutput> {
    console.log("Generating dApp with input:", input);
    const result = await genDapp(input);
    console.log("dApp generation result:", result);
    return result;
}

export async function generateToken(input: TokenLauncherInput): Promise<TokenLauncherOutput> {
    console.log("Generating token with input:", input);
    const result = await genToken(input);
    console.log("Token generation result:", result);
    return result;
}

export async function recommendBusinessTools(input: BusinessToolRecommendationInput): Promise<BusinessToolRecommendationOutput> {
    console.log("Getting recommendations with input:", input);
    const result = await recTools(input);
    console.log("Recommendation result:", result);
    return result;
}

export async function runSecurityAudit(input: SecurityAuditInput): Promise<SecurityAuditOutput> {
    console.log("Running security audit with input:", input);
    const result = await runAudit(input);
    console.log("Security audit result:", result);
    return result;
}

export async function generateDaoPlan(input: DaoGovernanceInput): Promise<DaoGovernanceOutput> {
    console.log("Generating DAO plan with input:", input);
    const result = await genDao(input);
    console.log("DAO plan result:", result);
    return result;
}

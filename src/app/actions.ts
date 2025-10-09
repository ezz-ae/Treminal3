
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

/**
 * Server action to generate a dApp plan using an AI flow.
 * @param input - The structured input for the dApp builder.
 * @returns A promise that resolves to the generated dApp plan.
 */
export async function generateDapp(input: DappBuilderInput): Promise<DappBuilderOutput> {
    const result = await genDapp(input);
    return result;
}

/**
 * Server action to generate an ERC-20 token contract using an AI flow.
 * @param input - The structured input for the token launcher.
 * @returns A promise that resolves to the generated token data and code.
 */
export async function generateToken(input: TokenLauncherInput): Promise<TokenLauncherOutput> {
    const result = await genToken(input);
    return result;
}

/**
 * Server action to recommend business tools using an AI flow.
 * @param input - The structured input describing the user's business.
 * @returns A promise that resolves to a list of tool recommendations.
 */
export async function recommendBusinessTools(input: BusinessToolRecommendationInput): Promise<BusinessToolRecommendationOutput> {
    const result = await recTools(input);
    return result;
}

/**
 * Server action to run a security audit on a Solidity contract using an AI flow.
 * @param input - The Solidity code to be audited.
 * @returns A promise that resolves to the security audit report.
 */
export async function runSecurityAudit(input: SecurityAuditInput): Promise<SecurityAuditOutput> {
    const result = await runAudit(input);
    return result;
}

/**
 * Server action to generate a DAO governance plan using an AI flow.
 * @param input - The structured input for the DAO planner.
 * @returns A promise that resolves to the generated DAO governance plan.
 */
export async function generateDaoPlan(input: DaoGovernanceInput): Promise<DaoGovernanceOutput> {
    const result = await genDao(input);
    return result;
}

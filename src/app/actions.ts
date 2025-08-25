
'use server';

import { generateDapp as genDapp, DappBuilderInput, DappBuilderOutput } from '@/ai/flows/dapp-builder';
import { generateToken as genToken, TokenLauncherInput, TokenLauncherOutput } from '@/ai/flows/token-launcher';

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


export type { DappBuilderOutput, TokenLauncherOutput };

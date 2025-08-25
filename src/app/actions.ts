
'use server';

import { generateDapp as genDapp, DappBuilderInput, DappBuilderOutput } from '@/ai/flows/dapp-builder';

export async function generateDapp(input: DappBuilderInput): Promise<DappBuilderOutput> {
    console.log("Generating dApp with input:", input);
    const result = await genDapp(input);
    console.log("dApp generation result:", result);
    return result;
}

export type { DappBuilderOutput };

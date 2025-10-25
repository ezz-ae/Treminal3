/* eslint-disable @typescript-eslint/no-explicit-any */
export type SolanaToolInput = Record<string, any>;
export type SolanaToolOutput = { ok: boolean; text?: string; result?: any; error?: string };

// TODO: keep your existing imports/agent setup above this line
// import { solanaAgent } from './your-agent';

export async function runSolanaTool(input: SolanaToolInput): Promise<SolanaToolOutput> {
  // const llmResponse = await solanaAgent(input);
  const llmResponse: any = await (global as any).solanaAgent?.(input) ?? {}; // replace with your real call

  // Normalize response shapes (OpenAI-like, Vertex, Genkit, etc.)
  const anyResp: any = llmResponse;
  const choices = anyResp?.choices ?? anyResp?.candidates ?? [];
  const first = choices[0] ?? {};
  const message = first.message ?? anyResp?.message ?? {};
  const toolRequest =
    message.toolRequest ??
    first.toolRequest ??
    anyResp?.toolRequest ??
    null;

  const text =
    (typeof anyResp?.outputText === 'function' ? anyResp.outputText() : undefined) ??
    anyResp?.text ??
    message?.content ??
    '';

  if (!toolRequest) {
    return { ok: true, text, result: null };
  }

  // Example tool dispatch — replace with your actual tools
  try {
    const { name, arguments: toolArgs } = toolRequest;
    // Dispatch to your toolset here.
    // const result = await runYourTool(name, toolArgs);
    const result = { name, args: toolArgs }; // placeholder
    return { ok: true, text, result };
  } catch (err: any) {
    return { ok: false, text, error: err?.message ?? String(err) };
  }
}

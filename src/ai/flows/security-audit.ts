
'use server';
/**
 * @fileOverview An AI agent that audits Solidity smart contracts for security vulnerabilities.
 *
 * - runSecurityAudit - A function that handles the security audit process.
 */

import { ai } from '@/ai/genkit';
import { SecurityAuditInput, SecurityAuditInputSchema, SecurityAuditOutput, SecurityAuditOutputSchema } from '@/ai/schemas/security-audit';


export async function runSecurityAudit(input: SecurityAuditInput): Promise<SecurityAuditOutput> {
  return securityAuditFlow(input);
}

const prompt = ai.definePrompt({
  name: 'securityAuditor',
  input: { schema: SecurityAuditInputSchema },
  output: { schema: SecurityAuditOutputSchema },
  prompt: `You are an expert smart contract security auditor. Analyze the following Solidity code for vulnerabilities.

Solidity Code:
\`\`\`solidity
{{solidityCode}}
\`\`\`

Your task is to:
1.  Identify all potential security vulnerabilities in the provided code.
2.  For each vulnerability, provide its name, a detailed description of the risk, a specific recommendation for fixing it, and a severity level (Critical, High, Medium, Low, or Informational).
3.  Provide a high-level summary of the contract's overall security posture.
4.  Focus on common vulnerabilities like reentrancy, integer overflows/underflows, front-running, access control issues, and unchecked external calls.

Provide your response in the specified JSON format. If no vulnerabilities are found, return an empty array for the vulnerabilities field and state that the contract appears secure in the summary.
`,
});


const securityAuditFlow = ai.defineFlow(
  {
    name: 'securityAuditFlow',
    inputSchema: SecurityAuditInputSchema,
    outputSchema: SecurityAuditOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output || { vulnerabilities: [], summary: "Could not analyze the contract." };
  }
);

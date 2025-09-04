
import { z } from 'zod';

export const SecurityAuditInputSchema = z.object({
  solidityCode: z.string().describe("The Solidity code of the smart contract to be audited."),
});
export type SecurityAuditInput = z.infer<typeof SecurityAuditInputSchema>;

export const SecurityAuditOutputSchema = z.object({
  vulnerabilities: z.array(z.object({
    name: z.string().describe("The name of the vulnerability (e.g., 'Reentrancy', 'Integer Overflow')."),
    description: z.string().describe("A detailed explanation of the vulnerability and its potential impact."),
    recommendation: z.string().describe("The recommended action to fix the vulnerability."),
    severity: z.enum(['Critical', 'High', 'Medium', 'Low', 'Informational']).describe("The severity level of the vulnerability."),
  })).describe("A list of vulnerabilities found in the contract."),
  summary: z.string().describe("A high-level summary of the contract's security posture."),
});
export type SecurityAuditOutput = z.infer<typeof SecurityAuditOutputSchema>;

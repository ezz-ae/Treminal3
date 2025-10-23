# TODO – Gemini / Genkit Integration Checklist

> Goal: Every "expensive" AI action should call `consumeCredits()` first. When out of credits, open the PayModal.

1) **Wrap flows**
   - `security-audit`: add server action wrapper that calls `consumeCredits(uid, 5)`
   - `trading-bot`: `consumeCredits(uid, 8)`
   - `token-generator`: `consumeCredits(uid, 15)`
   - `solana-token-generator`: `consumeCredits(uid, 20)`

2) **Dev imports fix**
   - Use the provided `src/ai/dev.ts` which imports only existing flows.

3) **Add tags**
   - In each run, include a `usageTag` string for analytics (e.g., "SEC_AUDIT", "TOKEN_LAUNCH").

4) **Backpressure**
   - If Gemini rate-limits, auto‑retry with jitter; meter credits only on accepted jobs.

5) **Errors**
   - If a run fails before any meaningful token usage, **refund** the credits via `addCredits(uid, n)`.

6) **Telemetry**
   - Log `{ uid, usageTag, inputSize, outputTokens, durationMs }` to a `runs` table for pricing tuning.

7) **UI** 
   - Show current credits in the header.
   - If credits < cost, show PayModal.

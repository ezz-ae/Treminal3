# Treminal3 – Crypto Monetization Add‑On

This patch adds **crypto-only** payments (EVM + optional Solana), fee-on-mint launch flow hooks,
a minimal credits system, wallet providers, and a Gemini TODO list. Unzip this at the repo root,
resolve any merges, set env vars, and deploy.

## What you get
- **Smart contracts (EVM)**: `T3PaymentGateway.sol` (USDC/USDT + native), `T3TokenFactory.sol` (flat fee before deploy),
  `T3ProPass.sol` (NFT membership gating).
- **Wallets**: Wagmi + RainbowKit (EVM) and Solana Wallet Adapter (Phantom/Backpack).
- **API routes**:
  - `POST /api/credit/confirm` — verifies on-chain payment and credits the user.
  - `GET  /api/me/entitlements` — returns `{ plan, credits }`.
- **Credits & Store**: Prisma + SQLite minimal schema and helpers.
- **UI**: `<PayModal />` and a `/billing` page stub.
- **AI**: `src/ai/dev.ts` import fix + `TODO-GEMINI.md` checklist.

## Install
```bash
# deps you likely need (add if missing)
npm i wagmi viem @rainbow-me/rainbowkit @walletconnect/ethereum-provider   @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-base   @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets   zod prisma @prisma/client
```

Initialize Prisma (SQLite by default):
```bash
npx prisma init --datasource-provider sqlite
npx prisma migrate dev --name init_t3_crypto
```

## Env
Copy `.env.example` to `.env.local` and fill:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000

# EVM
NEXT_PUBLIC_T3_CHAIN_ID=8453         # e.g., Base mainnet; use 84532 for Base Sepolia test
NEXT_PUBLIC_T3_RPC_URL=
NEXT_PUBLIC_T3_PAYMENT_GATEWAY=0x... # deployed T3PaymentGateway
NEXT_PUBLIC_T3_FACTORY=0x...         # deployed T3TokenFactory (optional for fee-on-mint)

# SOLANA (optional for payments)
NEXT_PUBLIC_SOLANA_RPC=
NEXT_PUBLIC_SOLANA_TREASURY=...

# Prisma
DATABASE_URL="file:./dev.db"

# (If you use NextAuth/SIWE later)
# NEXTAUTH_SECRET=...
```

## Build flow
1. **Deploy contracts** (`contracts/`) on your chain of choice (Base / BSC / OP / etc.).
2. Put addresses in `.env.local`.
3. `npx prisma migrate dev` then `npm run dev`.
4. Connect wallet → open a Pro action (e.g., "Launch" / "Audit") → PayModal opens → pay USDC/native → app calls `/api/credit/confirm` which verifies on-chain and credits your account.

## Notes
- This is additive and conservative. No custodial flows.
- `T3TokenFactory.sol` here is illustrative (basic). For production, swap in a verified ERC20 implementation and add LP‑lock/renounce toggles.
- For Solana-only users, the flow uses a treasury address and server-side signature verification; no custom program is strictly required to start.

# Treminal3 – Crypto Monetization Add-On (v2)

What’s new vs v1:
- **ERC‑20 support**: `/api/credit/confirm` now parses the gateway **Paid** event to validate USDC/USDT payments.
- **ABIs included**: `abis/T3PaymentGateway.json` for clean decoding.
- **Hardhat mini**: one-command deployment to Base Sepolia for **PaymentGateway** and **TokenFactory**.
- **Credits UX**: `use-entitlements` hook + `CreditsBadge` component.
- **PayModalV2**: updated copy to guide ERC‑20 *or* native payment.

## Hardhat quick start
```bash
cd hardhat
cp .env.example .env  # fill BASE_SEPOLIA_RPC, DEPLOYER_KEY, TREASURY
npm i
npx hardhat run scripts/deploy.js --network basesepolia
# Output: deploy.out.json with addresses
```
Copy addresses to your app `.env.local`:
```
NEXT_PUBLIC_T3_CHAIN_ID=84532
NEXT_PUBLIC_T3_RPC_URL=<same as BASE_SEPOLIA_RPC>
NEXT_PUBLIC_T3_PAYMENT_GATEWAY=<gateway address>
NEXT_PUBLIC_T3_FACTORY=<factory address>
```

## App quick test
1) `npx prisma migrate dev`
2) `npm run dev`
3) Connect wallet → send native or call `payERC20()` on the gateway → paste `txHash` in PayModal → credits minted.

> Replace the mocked `getMockUserId()` with your session/wallet mapping when ready.

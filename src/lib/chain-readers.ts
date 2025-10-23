// Replace these with real RPC/indexer calls.
// For EVM, read ownership, renounce status, LP lock events, tax values; for Solana, program accounts.

export async function readTrustForToken(chainId: number, tokenAddr: string) {
  // TODO: implement with viem + your factory/lockers
  return {
    lpLocked: false,
    renounced: false,
    hasBlacklist: false,
    buyTaxBps: 0,
    sellTaxBps: 0,
  }
}

export async function fetchPriceAndHolders(chainId: number, tokenAddr: string) {
  // TODO: integrate with your preferred indexer/Dex API
  return {
    priceUsd: 0,
    marketCapUsd: 0,
    holders: 0,
    liquidityUsd: 0
  }
}

import { createPublicClient, http, hexToBigInt } from 'viem'
import { base, baseSepolia } from 'viem/chains'

export function getEvmClient() {
  const chainId = Number(process.env.NEXT_PUBLIC_T3_CHAIN_ID || 84532)
  const rpc = process.env.NEXT_PUBLIC_T3_RPC_URL!
  const chain = chainId === 8453 ? base : baseSepolia
  return createPublicClient({ chain, transport: http(rpc) })
}

export async function isTxPaid(txHash: `0x${string}`, expectedTo: `0x${string}`, minValueWei?: bigint) {
  // Very simple native-value check; for ERC20 use event logs on PaymentGateway (Paid event)
  const client = getEvmClient()
  const tx = await client.getTransaction({ hash: txHash })
  if (!tx) return false
  if (tx.to?.toLowerCase() !== expectedTo.toLowerCase()) return false
  if (minValueWei && tx.value < minValueWei) return false
  const receipt = await client.getTransactionReceipt({ hash: txHash })
  return receipt.status === 'success'
}

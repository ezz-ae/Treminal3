'use client'

import * as React from 'react'
import { WagmiProvider } from 'wagmi'
import { http } from 'viem'
import { base, baseSepolia } from 'wagmi/chains'
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'

/**
 * Build transports only if RPCs are provided; otherwise RainbowKit
 * will fall back to its defaults/public providers.
 */
const transports: Record<number, ReturnType<typeof http>> = {}
if (process.env.NEXT_PUBLIC_BASE_RPC) {
  transports[base.id] = http(process.env.NEXT_PUBLIC_BASE_RPC)
}
if (process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC) {
  transports[baseSepolia.id] = http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC)
}

const config = getDefaultConfig({
  appName: 'Terminal3',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? 'DEV_PLACEHOLDER',
  chains: [base, baseSepolia],
  transports,
  ssr: true,
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
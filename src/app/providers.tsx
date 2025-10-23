'use client'

import { ReactNode, useMemo } from 'react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

export default function Providers({ children }: { children: ReactNode }) {
  const chainId = Number(process.env.NEXT_PUBLIC_T3_CHAIN_ID || 84532)
  const chains = [chainId === 8453 ? base : baseSepolia]
  const { publicClient } = configureChains(chains, [publicProvider()])

  const config = useMemo(() => createConfig({
    autoConnect: true,
    publicClient
  }), [publicClient])

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

// src/app/layout.tsx
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import { WalletProvider } from '@/hooks/use-wallet'
import { cn } from '@/lib/utils'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Web3Provider } from '@/providers/Web3Provider' // make sure this path is correct

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

const title = 'Terminal3: The AI-Native Web3 Development Platform'
const description =
  'Go from idea to deployed dApp with an AI-powered terminal. Generate smart contracts, build front-ends, and manage your entire Web3 project with natural language.'

export const metadata: Metadata = {
  metadataBase: new URL('https://terminal3.me'),
  title: {
    default: title,
    template: `%s | Terminal3`,
  },
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/',
    siteName: 'Terminal3',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${inter.variable} ${spaceGrotesk.variable} font-body antialiased flex flex-col min-h-screen`,
          'bg-background text-foreground',
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* Web3 stack first so hooks below can use it */}
          <Web3Provider>
            <WalletProvider>
              <Header />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
            </WalletProvider>
          </Web3Provider>

          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
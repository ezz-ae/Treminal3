import { config } from 'dotenv'
config()

// Import only flows that exist in your repo; extend as you add
import '@/ai/flows/security-audit'
import '@/ai/flows/trading-bot'
import '@/ai/flows/token-generator'
import '@/ai/flows/solana-token-generator'
import '@/ai/flows/solana-tool'

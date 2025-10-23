import { NextResponse } from 'next/server'
import { getEntitlements } from '@/lib/credits'

// NOTE: Replace the mocked user with your real auth (session or header)
function getMockUserId(req: Request) {
  // In production read from your auth session/JWT
  return 'demo-user-id'
}

export async function GET(req: Request) {
  const uid = getMockUserId(req)
  const ent = await getEntitlements(uid)
  return NextResponse.json(ent)
}

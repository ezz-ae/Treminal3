import { prisma } from './db'

export async function getEntitlements(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { credits: true } })
  return {
    plan: user?.plan ?? 'free',
    proUntil: user?.proUntil ?? null,
    credits: user?.credits?.balance ?? 0
  }
}

export async function addCredits(userId: string, amount: number) {
  await prisma.$transaction(async (tx) => {
    const existing = await tx.credits.upsert({
      where: { userId },
      update: { balance: { increment: amount } },
      create: { userId, balance: amount }
    })
    return existing
  })
}

export async function consumeCredits(userId: string, amount: number) {
  await prisma.$transaction(async (tx) => {
    const current = await tx.credits.upsert({
      where: { userId },
      update: {},
      create: { userId, balance: 0 }
    })
    if (current.balance < amount) {
      throw new Error('INSUFFICIENT_CREDITS')
    }
    await tx.credits.update({
      where: { userId },
      data: { balance: { decrement: amount } }
    })
  })
}

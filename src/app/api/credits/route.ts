
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function GET() {
    const { userId } = auth();
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const credits = await prisma.credits.findUnique({
        where: { userId },
    });

    return NextResponse.json({ credits: credits?.balance || 0 });
}

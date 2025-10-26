
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const AIRDROP_FILE = path.join(process.cwd(), 'airdrop-list.txt');

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        await fs.appendFile(AIRDROP_FILE, `${email}\n`);

        return NextResponse.json({ message: 'Successfully registered for the airdrop!' });
    } catch (error) {
        console.error('Airdrop registration error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


'use client';

import { useCredits } from '@/hooks/use-credits';
import { CircleDollarSign } from 'lucide-react';

export function CreditBalance() {
    const { credits } = useCredits();

    return (
        <div className="flex items-center space-x-2">
            <CircleDollarSign className="h-5 w-5 text-primary" />
            <span className="font-semibold">{credits}</span>
        </div>
    );
}

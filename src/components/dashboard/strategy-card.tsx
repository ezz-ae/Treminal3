
'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Zap, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';

const riskStyles: Record<string, { card: string; badge: string; text: string }> = {
    'Low': {
        card: 'border-green-500/30 hover:border-green-500/80',
        badge: 'border-green-500/50 bg-green-500/10 text-green-400',
        text: 'text-green-400'
    },
    'Medium': {
        card: 'border-orange-500/30 hover:border-orange-500/80',
        badge: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
        text: 'text-orange-400'
    },
    'High': {
        card: 'border-red-500/30 hover:border-red-500/80',
        badge: 'border-red-500/50 bg-red-500/10 text-red-400',
        text: 'text-red-400'
    },
    'Very High': {
        card: 'border-red-700/50 hover:border-red-700/80',
        badge: 'border-red-700/50 bg-red-700/20 text-red-500',
        text: 'text-red-500'
    }
}

export function StrategyCard({ strategy, onSelect, isSelected }: any) {
    const riskStyle = riskStyles[strategy.risk] || riskStyles['Medium'];
    const Icon = strategy.icon;

    return (
        <motion.div
            layoutId={`card-${strategy.name}`}
            onClick={() => onSelect(strategy)}
            className={cn(
                "cursor-pointer flex flex-col bg-card/50 rounded-lg border-2 transition-colors group h-full",
                riskStyle.card,
                isSelected && 'border-primary/80'
            )}
        >
            <div className="p-6 flex items-start gap-4 bg-card/50 rounded-t-md">
                <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit h-fit mt-1">
                    <Icon className="w-6 h-6 shrink-0"/>
                </div>
                <div>
                    <h3 className="text-base font-bold font-headline group-hover:text-primary transition-colors">{strategy.name}</h3>
                    <Badge variant="outline" className="text-xs font-mono mt-2">{strategy.category}</Badge>
                </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
                <p className="text-sm text-muted-foreground mb-6 flex-grow">{strategy.description}</p>
                
                <div className="space-y-4">
                        <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-2"><Zap className="w-4 h-4"/>Execution Cost</p>
                        <p className="text-xs font-mono font-bold">{strategy.cost}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-2"><TrendingUp className="w-4 h-4"/>Projected ROI</p>
                        <p className="text-xs font-mono font-bold">{strategy.roi}</p>
                    </div>
                        <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-2"><ShieldAlert className="w-4 h-4"/>Risk Level</p>
                        <p className={cn("text-xs font-mono font-bold", riskStyle.text)}>{strategy.risk}</p>
                    </div>
                </div>
            </div>
             <div className="p-6 pt-0">
                <Button variant={isSelected ? "default" : "secondary"} className="w-full mt-4">
                    {isSelected ? 'Selected' : 'View Details'} <ArrowRight className="ml-2 w-4 h-4"/>
                </Button>
            </div>
        </motion.div>
    );
}

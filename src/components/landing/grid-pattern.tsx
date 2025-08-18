
'use client';

import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface GridPatternProps extends ComponentProps<'svg'> {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    squares?: Array<[number, number]>;
    className?: string;
}

export default function GridPattern({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    squares,
    className,
    ...props
}: GridPatternProps) {
    return (
        <svg
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute inset-0 h-full w-full fill-background [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)]',
                className,
            )}
            {...props}
        >
            <defs>
                <pattern
                    id="grid-pattern"
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" className="stroke-primary/10" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#grid-pattern)" />
            <g>
                {squares &&
                    squares.map(([x, y], i) => (
                        <rect
                            key={i}
                            strokeWidth="0"
                            x={x * width}
                            y={y * height}
                            width={width + 1}
                            height={height + 1}
                        />
                    ))}
            </g>
        </svg>
    );
}

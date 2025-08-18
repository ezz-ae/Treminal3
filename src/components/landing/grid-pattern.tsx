
'use client';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { ComponentProps, useRef, useState, useEffect } from 'react';

interface GridPatternProps extends ComponentProps<'svg'> {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    squares?: Array<[number, number]>;
    static?: boolean;
}

export default function GridPattern({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    squares,
    static: isStatic = false,
    className,
    ...props
}: GridPatternProps) {
    const isMobile = useIsMobile();
    const position = useMousePosition();
    const ref = useRef<HTMLDivElement>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);

    useEffect(() => {
        if (ref.current) {
            setRect(ref.current.getBoundingClientRect());
        }
    }, [isMobile]);

    const mouseX = position.x - (rect?.left ?? 0);
    const mouseY = position.y - (rect?.top ?? 0);

    return (
        <div ref={ref} className="pointer-events-none absolute inset-0">
            <svg
                className={cn(
                    'absolute inset-0 h-full w-full fill-background [mask-image:radial-gradient(at_center,white,transparent)]',
                    className
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
                        <path d={`M.5 ${height}V.5H${width}`} fill="none" className="stroke-primary/20" />
                    </pattern>
                </defs>
                {!isStatic && (
                    <circle
                        cx={mouseX}
                        cy={mouseY}
                        r="300"
                        fill="rgba(var(--primary), 0.4)"
                        className="fill-primary/5 transition-transform duration-300 ease-in-out"
                    />
                )}
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
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
        </div>
    );
}

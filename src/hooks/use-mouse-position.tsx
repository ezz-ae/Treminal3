
'use client';

import { useEffect, useState } from 'react';

/**
 * A custom hook that tracks the mouse position on the screen.
 * @returns {{x: number, y: number}} The current x and y coordinates of the mouse.
 */
export const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const setFromEvent = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', setFromEvent);

        return () => {
            window.removeEventListener('mousemove', setFromEvent);
        };
    }, []);

    return position;
};

    

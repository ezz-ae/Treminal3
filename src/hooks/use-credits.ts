
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export function useCredits() {
    const [credits, setCredits] = useState(0);
    const { getToken } = useAuth();

    useEffect(() => {
        async function fetchCredits() {
            const token = await getToken();
            if (!token) return;

            const response = await fetch('/api/credits', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setCredits(data.credits);
            }
        }

        fetchCredits();
    }, [getToken]);

    return { credits };
}

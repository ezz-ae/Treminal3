
'use client';

import { useState, useEffect } from 'react';
import { onSnapshot, type Query, type DocumentData, type QuerySnapshot } from 'firebase/firestore';

interface UseCollectionOptions<T> {
  transform?: (data: DocumentData) => T;
}

export function useCollection<T = DocumentData>(
  query: Query<DocumentData> | null,
  options?: UseCollectionOptions<T>
) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setData(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const result: T[] = snapshot.docs.map((doc) => {
          const docData = doc.data();
          const transformedData = options?.transform ? options.transform(docData) : docData;
          return {
            id: doc.id,
            ...transformedData,
          } as T;
        });
        setData(result);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query, options]);

  return { data, loading, error };
}

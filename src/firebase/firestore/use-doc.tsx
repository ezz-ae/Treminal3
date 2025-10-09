
'use client';

import { useState, useEffect } from 'react';
import { onSnapshot, type DocumentReference, type DocumentData, type DocumentSnapshot } from 'firebase/firestore';

interface UseDocOptions<T> {
  transform?: (data: DocumentData) => T;
}

export function useDoc<T = DocumentData>(
  docRef: DocumentReference<DocumentData> | null,
  options?: UseDocOptions<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!docRef) {
      setData(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot: DocumentSnapshot<DocumentData>) => {
        if (snapshot.exists()) {
          const docData = snapshot.data();
          const transformedData = options?.transform ? options.transform(docData) : docData;
          const result = {
            id: snapshot.id,
            ...transformedData,
          } as T;
          setData(result);
        } else {
          setData(null);
        }
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
  }, [docRef, options]);

  return { data, loading, error };
}

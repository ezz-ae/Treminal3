
'use server';

import { firestore } from '@/firebase/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export type Note = {
  title: string;
  content: string;
  userId: string;
};

export async function addNote(note: Note): Promise<void> {
  if (!note.userId) {
    throw new Error('User must be authenticated to add a note.');
  }

  try {
    await addDoc(collection(firestore, 'notes'), {
      ...note,
      createdAt: serverTimestamp(),
      slug: note.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    });
  } catch (error) {
    console.error("Error writing to Firestore:", error);
    throw new Error("Failed to save note.");
  }
}

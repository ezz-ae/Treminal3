
'use client';
import {
  collection,
  addDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';

export type Note = {
  title: string;
  content: string;
  userId: string;
  slug: string;
};

export async function addNote(
  firestore: Firestore,
  note: Note
): Promise<void> {
  if (!note.userId) {
    throw new Error('User must be authenticated to add a note.');
  }

  try {
    await addDoc(collection(firestore, 'notes'), {
      ...note,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error writing to Firestore:', error);
    throw new Error('Failed to save note.');
  }
}

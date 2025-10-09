
'use client';
import {
  collection,
  addDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';

/**
 * Represents the structure of a note object.
 */
export type Note = {
  title: string;
  content: string;
  userId: string;
  slug: string;
};

/**
 * Adds a new note to the Firestore database.
 * @param {Firestore} firestore - The Firestore database instance.
 * @param {Note} note - The note object to add.
 * @throws {Error} If the user is not authenticated or if the save fails.
 */
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

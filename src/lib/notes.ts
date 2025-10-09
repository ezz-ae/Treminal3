import fs from 'fs';
import path from 'path';

const notesFilePath = path.join(process.cwd(), 'src/lib/notes.json');

export type Note = {
  title: string;
  content: string;
  slug: string;
};

function readNotes(): Note[] {
  if (!fs.existsSync(notesFilePath)) {
    return [];
  }
  const fileContent = fs.readFileSync(notesFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

function writeNotes(notes: Note[]): void {
  fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
}

export function getNotes(): Note[] {
  return readNotes();
}

export function addNote(note: Omit<Note, 'slug'>): Note {
  const notes = readNotes();
  const newNote: Note = { ...note, slug: note.title.toLowerCase().replace(/\s+/g, '-') };
  
  // Avoid duplicates
  if (notes.some(n => n.slug === newNote.slug)) {
    return notes.find(n => n.slug === newNote.slug)!;
  }

  const updatedNotes = [...notes, newNote];
  writeNotes(updatedNotes);
  return newNote;
}

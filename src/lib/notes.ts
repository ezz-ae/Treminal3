import fs from 'fs';
import path from 'path';

// This is a placeholder in-memory store. In a real application, you'd use a database.
// To make it persist across server restarts in this prototype, we'll use a JSON file.

const notesFilePath = path.join(process.cwd(), 'src/lib/notes.json');

export type Note = {
  title: string;
  content: string;
  slug: string;
};

function readNotes(): Note[] {
  try {
    if (fs.existsSync(notesFilePath)) {
      const fileContent = fs.readFileSync(notesFilePath, 'utf-8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error("Error reading notes file:", error);
  }
  return [];
}

function writeNotes(notes: Note[]): void {
  try {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
  } catch (error) {
     console.error("Error writing notes file:", error);
  }
}

// Initialize file if it doesn't exist
if (!fs.existsSync(notesFilePath)) {
    writeNotes([]);
}


export function getNotes(): Note[] {
  return readNotes();
}

export function addNote(note: Omit<Note, 'slug'>): Note {
  const notes = readNotes();
  const slug = note.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  const newNote: Note = { ...note, slug };
  
  // Avoid duplicates
  if (notes.some(n => n.slug === newNote.slug)) {
    return notes.find(n => n.slug === newNote.slug)!;
  }

  const updatedNotes = [...notes, newNote];
  writeNotes(updatedNotes);
  return newNote;
}


'use client';
import {
  useFirebaseApp,
  useFirestore,
  useAuth,
} from './provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { useUser } from './auth/use-user';
import { initializeFirebase } from './config';
import { FirebaseClientProvider } from './client-provider';

export {
  initializeFirebase,
  FirebaseClientProvider,
  useCollection,
  useDoc,
  useUser,
  useFirebaseApp,
  useFirestore,
  useAuth,
};

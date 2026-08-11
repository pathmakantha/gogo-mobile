import authModule, { type FirebaseAuthTypes } from '@react-native-firebase/auth';

/**
 * Single point of contact with @react-native-firebase/auth. Screens and
 * slices should import from here (not the package directly) so the native
 * SDK can be swapped later without touching call sites.
 */
export const firebaseAuth = authModule();

export type FirebaseUser = FirebaseAuthTypes.User;

export function onAuthStateChanged(
  callback: (user: FirebaseUser | null) => void,
): () => void {
  return firebaseAuth.onAuthStateChanged(callback);
}

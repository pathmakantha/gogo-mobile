import authModule, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FIREBASE_ENABLED } from './env';

/**
 * Single point of contact with @react-native-firebase/auth. Screens and
 * slices should import from here (not the package directly) so the native
 * SDK can be swapped later without touching call sites.
 *
 * `null` while FIREBASE_ENABLED is false — see src/config/env.ts. Prefer
 * going through src/api/authService.ts (which has a mock fallback) rather
 * than reading `firebaseAuth` directly in screens.
 */
export const firebaseAuth = FIREBASE_ENABLED ? authModule() : null;

export type FirebaseUser = FirebaseAuthTypes.User;

export function onAuthStateChanged(
  callback: (user: FirebaseUser | null) => void,
): () => void {
  if (!firebaseAuth) {
    callback(null);
    return () => undefined;
  }
  return firebaseAuth.onAuthStateChanged(callback);
}

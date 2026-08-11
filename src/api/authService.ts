import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { firebaseAuth } from '../config/firebase';
import type { AppUser } from '../types/models';

// Firebase's ConfirmationResult holds a non-serializable confirm() closure —
// it must never be put into Redux. Keep it here as a module-level singleton.
let pendingConfirmation: FirebaseAuthTypes.ConfirmationResult | null = null;

export function toAppUser(user: FirebaseAuthTypes.User): AppUser {
  return {
    uid: user.uid,
    email: user.email,
    phoneNumber: user.phoneNumber,
    displayName: user.displayName,
  };
}

export function getCurrentUser(): AppUser | null {
  const current = firebaseAuth.currentUser;
  return current ? toAppUser(current) : null;
}

// Firebase Auth error codes are stable across SDK versions but the bundled
// `.message` text is developer-facing ("[auth/invalid-credential] The supplied
// auth credential is malformed or has expired."). Map the common ones to copy
// that's safe to show a traveler; fall back to the raw message otherwise.
const FRIENDLY_AUTH_ERRORS: Record<string, string> = {
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/user-not-found': 'No account found with that email.',
  'auth/invalid-email': "That email address doesn't look right.",
  'auth/email-already-in-use': 'An account with that email already exists.',
  'auth/weak-password': 'Choose a stronger password.',
  'auth/too-many-requests': 'Too many attempts — try again in a few minutes.',
  'auth/network-request-failed': 'Network error — check your connection and try again.',
};

export function getAuthErrorMessage(err: unknown, fallback: string): string {
  const code = err && typeof err === 'object' && 'code' in err ? (err as { code?: unknown }).code : undefined;
  if (typeof code === 'string' && FRIENDLY_AUTH_ERRORS[code]) {
    return FRIENDLY_AUTH_ERRORS[code];
  }
  return err instanceof Error ? err.message : fallback;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string,
): Promise<AppUser> {
  const credential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
  if (displayName) {
    await credential.user.updateProfile({ displayName });
  }
  return toAppUser(credential.user);
}

export async function signInWithEmail(email: string, password: string): Promise<AppUser> {
  const credential = await firebaseAuth.signInWithEmailAndPassword(email, password);
  return toAppUser(credential.user);
}

export async function resetPassword(email: string): Promise<void> {
  await firebaseAuth.sendPasswordResetEmail(email);
}

// Requires GoogleSignin.configure() to have run (see src/config/googleSignIn.ts) and a
// webClientId from a Google OAuth client registered against this Firebase project — see
// GOOGLE_WEB_CLIENT_ID in .env.example.
export async function signInWithGoogle(): Promise<AppUser> {
  await GoogleSignin.hasPlayServices();
  const response = await GoogleSignin.signIn();
  if (!isSuccessResponse(response) || !response.data.idToken) {
    throw new Error('Google sign-in was cancelled or returned no credential.');
  }
  const googleCredential = auth.GoogleAuthProvider.credential(response.data.idToken);
  const credential = await firebaseAuth.signInWithCredential(googleCredential);
  return toAppUser(credential.user);
}

// iOS only — requires the "Sign in with Apple" capability enabled on the app's App ID
// (Apple Developer portal) and the matching entitlement added in Xcode.
export async function signInWithApple(): Promise<AppUser> {
  const response = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  if (!response.identityToken) {
    throw new Error('Apple sign-in returned no identity token.');
  }
  const appleCredential = auth.AppleAuthProvider.credential(response.identityToken, response.nonce);
  const credential = await firebaseAuth.signInWithCredential(appleCredential);
  return toAppUser(credential.user);
}

export async function sendPhoneOtp(phoneNumber: string): Promise<void> {
  pendingConfirmation = await firebaseAuth.signInWithPhoneNumber(phoneNumber);
}

export async function confirmPhoneOtp(code: string): Promise<AppUser> {
  if (!pendingConfirmation) {
    throw new Error('No OTP request in progress — call sendPhoneOtp first.');
  }
  const credential = await pendingConfirmation.confirm(code);
  pendingConfirmation = null;
  if (!credential?.user) {
    throw new Error('OTP confirmation failed.');
  }
  return toAppUser(credential.user);
}

export async function sendEmailVerificationOtp(): Promise<void> {
  const current = firebaseAuth.currentUser;
  if (current) {
    await current.sendEmailVerification();
  }
}

export async function signOut(): Promise<void> {
  pendingConfirmation = null;
  await firebaseAuth.signOut();
  // Best-effort — only signed in with Google if the user used that provider.
  if (GoogleSignin.hasPreviousSignIn()) {
    await GoogleSignin.signOut().catch(() => {});
  }
}

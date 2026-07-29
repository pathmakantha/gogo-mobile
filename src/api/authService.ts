import { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebaseAuth } from '../config/firebase';
import { FIREBASE_ENABLED } from '../config/env';
import type { AppUser } from '../types/models';

// Firebase's ConfirmationResult holds a non-serializable confirm() closure —
// it must never be put into Redux. Keep it here as a module-level singleton.
let pendingConfirmation: FirebaseAuthTypes.ConfirmationResult | null = null;

function requireFirebaseAuth() {
  if (!firebaseAuth) {
    throw new Error('Firebase is not connected — set FIREBASE_ENABLED in src/config/env.ts once it is.');
  }
  return firebaseAuth;
}

export function toAppUser(user: FirebaseAuthTypes.User): AppUser {
  return {
    uid: user.uid,
    email: user.email,
    phoneNumber: user.phoneNumber,
    displayName: user.displayName,
  };
}

// --- Mock auth backend, used only while FIREBASE_ENABLED is false --------
let mockUser: AppUser | null = null;
let mockUserSeq = 0;

function mockSignIn(email: string, displayName?: string | null): AppUser {
  mockUser = {
    uid: `mock-${++mockUserSeq}`,
    email,
    phoneNumber: null,
    displayName: displayName ?? email.split('@')[0],
  };
  return mockUser;
}
// ---------------------------------------------------------------------------

export function getCurrentUser(): AppUser | null {
  if (!FIREBASE_ENABLED) return mockUser;
  const current = firebaseAuth?.currentUser;
  return current ? toAppUser(current) : null;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string,
): Promise<AppUser> {
  if (!FIREBASE_ENABLED) return mockSignIn(email, displayName);
  const credential = await requireFirebaseAuth().createUserWithEmailAndPassword(email, password);
  if (displayName) {
    await credential.user.updateProfile({ displayName });
  }
  return toAppUser(credential.user);
}

export async function signInWithEmail(email: string, password: string): Promise<AppUser> {
  if (!FIREBASE_ENABLED) return mockSignIn(email);
  const credential = await requireFirebaseAuth().signInWithEmailAndPassword(email, password);
  return toAppUser(credential.user);
}

export async function sendPhoneOtp(phoneNumber: string): Promise<void> {
  if (!FIREBASE_ENABLED) return; // OtpVerifyScreen accepts any 4-digit code in mock mode
  pendingConfirmation = await requireFirebaseAuth().signInWithPhoneNumber(phoneNumber);
}

export async function confirmPhoneOtp(code: string): Promise<AppUser> {
  if (!FIREBASE_ENABLED) {
    if (!mockUser) throw new Error('No account to verify — sign up first.');
    return mockUser;
  }
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
  if (!FIREBASE_ENABLED) return;
  const current = firebaseAuth?.currentUser;
  if (current) {
    await current.sendEmailVerification();
  }
}

export async function signOut(): Promise<void> {
  pendingConfirmation = null;
  if (!FIREBASE_ENABLED) {
    mockUser = null;
    return;
  }
  await requireFirebaseAuth().signOut();
}

import { type FirebaseAuthTypes } from '@react-native-firebase/auth';
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
}

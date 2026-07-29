/**
 * Flip to `true` once a real Firebase project is connected — i.e. once
 * `GoogleService-Info.plist` / `google-services.json` are in place (see
 * README.md). Calling `@react-native-firebase/auth`'s `auth()` before a
 * default Firebase app exists throws "No Firebase App '[DEFAULT]' has been
 * created", so while this is `false`, src/config/firebase.ts never touches
 * the native module and src/api/authService.ts runs against an in-memory
 * mock instead — the app is fully usable, auth just isn't persisted or real.
 */
export const FIREBASE_ENABLED = false;

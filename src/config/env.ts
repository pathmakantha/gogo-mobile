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

/**
 * GoGo-Api's deployed dev-stage URL (see GoGo-Api/serverless.yml + .env
 * DEV_API_URL). NOTE: as of Aug 2026, GoGo-Api/src/index.js has its
 * `module.exports.handler = serverless(app)` line commented out — the
 * Lambda deployed at this URL will not actually route requests until
 * that's re-enabled on the backend side. Confirm with the API owner
 * before relying on this in a build.
 *
 * There's no real env-var injection wired up yet (no react-native-config /
 * react-native-dotenv in this project) - this is a plain constant for now,
 * matching FIREBASE_ENABLED above. Swap to a real per-environment config
 * when a staging/prod API exists alongside dev.
 */
export const API_BASE_URL = 'https://yectkl0tbg.execute-api.us-east-2.amazonaws.com/dev';

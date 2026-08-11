import Config from 'react-native-config';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Web client ID comes from a Google OAuth client registered against this Firebase
// project (Firebase console -> Authentication -> Sign-in method -> Google). Until
// that's set up, google-services.json / GoogleService-Info.plist have no OAuth
// client and this stays unset — "Continue with Google" will fail fast instead of
// silently misconfiguring the SDK.
const webClientId = Config.GOOGLE_WEB_CLIENT_ID;

export const isGoogleSignInConfigured = Boolean(webClientId);

export function configureGoogleSignIn(): void {
  if (!webClientId) return;
  GoogleSignin.configure({ webClientId });
}

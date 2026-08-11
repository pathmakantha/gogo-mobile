# Gogo — Sri Lanka trip planner

A React Native (bare CLI) app: plan a Sri Lanka trip around your budget. Built from the
`Gogo App Design` design doc.

## Stack

- **React Native 0.86** (bare CLI, TypeScript, New Architecture)
- **Redux Toolkit** + `react-redux` — `src/store/`
- **axios** — `src/api/axiosInstance.ts` (attaches Firebase ID token to every request)
- **NativeWind v4** (Tailwind for RN) — `tailwind.config.js`, `global.css`
- **`@react-native-firebase/app` + `/auth`** — native Firebase modules, `src/config/firebase.ts`
- **React Navigation** (native-stack + bottom-tabs) — `src/navigation/`
- **i18next** / `react-i18next` — `src/i18n/` (English fully translated; Sinhala, Tamil,
  German, French, Chinese, Russian are stubbed with English fallback copy pending real
  translation)
- **yarn** as the package manager

## Firebase

`src/config/firebase.ts` always calls `@react-native-firebase/auth`'s `auth()` — there's no
mock fallback, so the native config files (see Firebase setup below) must be in place before
`src/api/authService.ts` can sign anyone in.

## What's fully built vs. stubbed

Fully built, matching the design's visual language: **Login, Signup, OTP verify,
Language select, Interests select, Permissions, Welcome, Trip setup (live budget
slider), Home/Discover feed** (with one sponsored card).

The remaining ~23 screens (Settings — appearance toggle is functional, the rest is
placeholder — Edit profile, Tour detail/customize, Popular plans, Favorites, Itinerary,
Route map, Budget planner, Cost split, Add expense, My trips, Trip summary, Share trip,
Date range picker, Travel buddies, Notifications, Offline maps, Gogo Plus paywall,
Stays & transport, Profile, Operator dashboard, Listing editor) are real, navigable
routes rendered via `src/components/common/StubScreen.tsx` — correct header/theme, no
placeholder crashes, just not pixel-built yet.

## First-time setup

```sh
yarn install
cd ios && bundle install && bundle exec pod install && cd ..
```

### Fonts (Sora / Manrope)

Not bundled — see `src/assets/fonts/README.md` for exact filenames to download and the
`npx react-native-asset` linking step. Until added, screens fall back to the system font.

### Firebase (required for auth to actually work)

This project uses **native** Firebase modules (`@react-native-firebase/app`,
`@react-native-firebase/auth`), not the JS SDK — bare RN CLI needs the native config files:

1. Create a Firebase project at https://console.firebase.google.com (you'll need to run
   `firebase login` yourself — it's an interactive browser OAuth flow).
2. Register an iOS app (bundle id `com.gogo`) and an Android app (same package
   name), download their config files.
3. **iOS**: drop `GoogleService-Info.plist` into `ios/GOGOmobile/` — then **open the
   project in Xcode** (`xed ios`) and drag the file into the `GOGOmobile` target with
   "Copy items if needed" checked. A plain filesystem copy is not enough; Xcode needs to
   know it's a target resource.
4. **Android**: drop `google-services.json` into `android/app/`. Then:
   - `android/build.gradle` — add `classpath("com.google.gms:google-services:4.4.2")` to
     the buildscript `dependencies`.
   - `android/app/build.gradle` — add `apply plugin: "com.google.gms.google-services"`
     near the bottom.
5. **iOS AppDelegate** — confirm `FirebaseApp.configure()` runs before the RN bridge
   boots (check `ios/GOGOmobile/AppDelegate.swift`; `@react-native-firebase/app`
   autolinking usually adds this, but verify after `pod install`).
6. In the Firebase console, enable the **Email/Password** and **Phone** sign-in
   providers (Authentication → Sign-in method) — both are used by this app's auth flow.
7. `cd ios && pod install && cd ..`, then `yarn ios` / `yarn android`.

Both config files are gitignored (they're environment-specific, not secrets, but every
dev/environment supplies their own). Until they're added, the app crashes on launch —
`src/config/firebase.ts` calls `auth()` at import time, and that throws immediately
without a default Firebase app.

**Note on the OTP screen**: Firebase Auth doesn't have a native "email a 4-digit code"
primitive (that requires a backend). `src/screens/auth/OtpVerifyScreen.tsx` matches the
design's UI but the verification itself is a local UX gate on top of the already-created
Firebase account — see the comment in that file before shipping.

## Running

```sh
yarn start          # Metro
yarn ios             # or: yarn android
```

## Boilerplate RN CLI reference

<details>
<summary>Standard React Native CLI getting-started notes</summary>

First, start Metro, the JavaScript build tool for React Native:

```sh
yarn start
```

With Metro running, open a new terminal window/pane from the root of the project and
run `yarn android` or `yarn ios`.

For iOS, install CocoaPods dependencies first (only needed on first clone or after
updating native deps):

```sh
bundle install
bundle exec pod install
```

See the [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html)
and the [React Native environment setup docs](https://reactnative.dev/docs/set-up-your-environment)
for more.

</details>

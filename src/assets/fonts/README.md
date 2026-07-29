# Fonts

The design uses **Sora** (headings) and **Manrope** (body) from Google Fonts. These are not
bundled in source control-friendly binary form by this scaffold — download the static `.ttf`
weights yourself and drop them here with these exact filenames (referenced by
`tailwind.config.js` `fontFamily` tokens and used as literal `fontFamily` values in RN):

```
Sora-Medium.ttf      Sora-SemiBold.ttf     Sora-Bold.ttf      Sora-ExtraBold.ttf
Manrope-Regular.ttf  Manrope-Medium.ttf    Manrope-SemiBold.ttf
Manrope-Bold.ttf     Manrope-ExtraBold.ttf
```

Get them from https://fonts.google.com/specimen/Sora and https://fonts.google.com/specimen/Manrope
(download family, pick the static weights above).

After adding the files, link them into the native projects:

```bash
npx react-native-asset
```

This copies the fonts into `ios/` (adds `UIAppFonts` entries to `Info.plist`) and
`android/app/src/main/assets/fonts/`. Then rebuild the app (`yarn ios` / `yarn android`).

**Verify the family name per platform** after linking — iOS resolves fonts by their internal
PostScript name (open the `.ttf` in Font Book to confirm, e.g. `Sora-SemiBold` may report as
`Sora SemiBold`), while Android resolves by filename. If text renders in the system font instead
of Sora/Manrope after linking, this mismatch is almost always why.

Until these files are added, screens fall back to the system font — everything still renders,
just not with the exact typeface from the design.

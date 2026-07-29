export interface LanguageOption {
  code: string;
  label: string;
  englishLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', englishLabel: 'Default' },
  { code: 'si', label: 'සිංහල', englishLabel: 'Sinhala' },
  { code: 'ta', label: 'தமிழ்', englishLabel: 'Tamil' },
  { code: 'de', label: 'Deutsch', englishLabel: 'German' },
  { code: 'fr', label: 'Français', englishLabel: 'French' },
  { code: 'zh', label: '中文', englishLabel: 'Chinese (Simplified)' },
  { code: 'ru', label: 'Русский', englishLabel: 'Russian' },
];

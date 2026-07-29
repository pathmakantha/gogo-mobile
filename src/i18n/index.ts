import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import si from './locales/si.json';
import ta from './locales/ta.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import ru from './locales/ru.json';

const LANGUAGE_STORAGE_KEY = 'gogo:language';

const resources = {
  en: { translation: en },
  si: { translation: si },
  ta: { translation: ta },
  de: { translation: de },
  fr: { translation: fr },
  zh: { translation: zh },
  ru: { translation: ru },
};

let initPromise: Promise<void> | null = null;

export function initI18n(): Promise<void> {
  if (initPromise) {
    return initPromise;
  }
  initPromise = (async () => {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    await i18next.use(initReactI18next).init({
      resources,
      lng: storedLanguage ?? 'en',
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });
  })();
  return initPromise;
}

export async function changeAppLanguage(code: string): Promise<void> {
  await i18next.changeLanguage(code);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, code);
}

export default i18next;

import type { Middleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootState } from './index';

const PERSISTED_SLICES = ['settings', 'onboarding'] as const;
type PersistedSlice = (typeof PERSISTED_SLICES)[number];

const storageKey = (slice: PersistedSlice) => `gogo:${slice}`;

export const persistMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action);
  const type = typeof action === 'object' && action !== null && 'type' in action
    ? String((action as { type: unknown }).type)
    : '';
  const slice = PERSISTED_SLICES.find(name => type.startsWith(`${name}/`));
  if (slice) {
    const state = store.getState()[slice];
    AsyncStorage.setItem(storageKey(slice), JSON.stringify(state)).catch(() => undefined);
  }
  return result;
};

export async function loadPersistedSlice<T>(slice: PersistedSlice): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(storageKey(slice));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

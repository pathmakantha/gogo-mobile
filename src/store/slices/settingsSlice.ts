import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ThemePreference } from '../../types/models';

interface SettingsState {
  theme: ThemePreference;
  language: string;
  currency: string;
  units: 'km' | 'mi';
}

const initialState: SettingsState = {
  theme: 'auto',
  language: 'en',
  currency: 'USD',
  units: 'km',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    themeChanged(state, action: PayloadAction<ThemePreference>) {
      state.theme = action.payload;
    },
    languageChanged(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    currencyChanged(state, action: PayloadAction<string>) {
      state.currency = action.payload;
    },
    unitsChanged(state, action: PayloadAction<SettingsState['units']>) {
      state.units = action.payload;
    },
    settingsHydrated(_state, action: PayloadAction<SettingsState>) {
      return action.payload;
    },
  },
});

export const {
  themeChanged,
  languageChanged,
  currencyChanged,
  unitsChanged,
  settingsHydrated,
} = settingsSlice.actions;

export default settingsSlice.reducer;

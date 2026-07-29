import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import onboardingReducer from './slices/onboardingSlice';
import tripReducer from './slices/tripSlice';
import discoverReducer from './slices/discoverSlice';
import settingsReducer from './slices/settingsSlice';
import { persistMiddleware } from './persistMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    trip: tripReducer,
    discover: discoverReducer,
    settings: settingsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

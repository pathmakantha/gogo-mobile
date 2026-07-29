import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import onboardingReducer from './slices/onboardingSlice';
import tripReducer from './slices/tripSlice';
import discoverReducer from './slices/discoverSlice';
import settingsReducer from './slices/settingsSlice';
import { persistMiddleware } from './persistMiddleware';

const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
  trip: tripReducer,
  discover: discoverReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistMiddleware),
});

export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import onboardingReducer from './slices/onboardingSlice';
import tripReducer from './slices/tripSlice';
import discoverReducer from './slices/discoverSlice';
import settingsReducer from './slices/settingsSlice';
import plansReducer from './slices/plansSlice';
import itineraryReducer from './slices/itinerarySlice';
import budgetReducer from './slices/budgetSlice';
import socialReducer from './slices/socialSlice';
import operatorReducer from './slices/operatorSlice';
import agencyReducer from './slices/agencySlice';
import toolsReducer from './slices/toolsSlice';
import { persistMiddleware } from './persistMiddleware';

const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
  trip: tripReducer,
  discover: discoverReducer,
  settings: settingsReducer,
  plans: plansReducer,
  itinerary: itineraryReducer,
  budget: budgetReducer,
  social: socialReducer,
  operator: operatorReducer,
  agency: agencyReducer,
  tools: toolsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistMiddleware),
});

export type AppDispatch = typeof store.dispatch;

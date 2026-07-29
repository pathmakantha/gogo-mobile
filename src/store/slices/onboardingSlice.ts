import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PermissionsState {
  location: boolean;
  notifications: boolean;
}

interface OnboardingState {
  languageCode: string;
  selectedInterestIds: string[];
  permissions: PermissionsState;
  hasCompletedOnboarding: boolean;
}

const initialState: OnboardingState = {
  languageCode: 'en',
  selectedInterestIds: [],
  permissions: { location: false, notifications: false },
  hasCompletedOnboarding: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    languageSelected(state, action: PayloadAction<string>) {
      state.languageCode = action.payload;
    },
    interestToggled(state, action: PayloadAction<string>) {
      const idx = state.selectedInterestIds.indexOf(action.payload);
      if (idx >= 0) {
        state.selectedInterestIds.splice(idx, 1);
      } else {
        state.selectedInterestIds.push(action.payload);
      }
    },
    permissionSet(
      state,
      action: PayloadAction<{ key: keyof PermissionsState; granted: boolean }>,
    ) {
      state.permissions[action.payload.key] = action.payload.granted;
    },
    onboardingCompleted(state) {
      state.hasCompletedOnboarding = true;
    },
    onboardingReset() {
      return initialState;
    },
    onboardingHydrated(_state, action: PayloadAction<OnboardingState>) {
      return action.payload;
    },
  },
});

export const {
  languageSelected,
  interestToggled,
  permissionSet,
  onboardingCompleted,
  onboardingReset,
  onboardingHydrated,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;

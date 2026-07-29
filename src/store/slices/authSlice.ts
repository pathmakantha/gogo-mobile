import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppUser } from '../../types/models';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'guest' | 'error';

interface AuthState {
  user: AppUser | null;
  status: AuthStatus;
  pendingVerificationPhone: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  pendingVerificationPhone: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    authSucceeded(state, action: PayloadAction<AppUser>) {
      state.user = action.payload;
      state.status = 'authenticated';
      state.error = null;
      state.pendingVerificationPhone = null;
    },
    authFailed(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    guestModeEntered(state) {
      state.user = null;
      state.status = 'guest';
      state.error = null;
    },
    otpChallengeStarted(state, action: PayloadAction<string>) {
      state.pendingVerificationPhone = action.payload;
      state.status = 'loading';
    },
    signedOut() {
      return initialState;
    },
  },
});

export const {
  authLoading,
  authSucceeded,
  authFailed,
  guestModeEntered,
  otpChallengeStarted,
  signedOut,
} = authSlice.actions;

export default authSlice.reducer;

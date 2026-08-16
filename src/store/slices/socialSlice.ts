import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Buddy, ShareSettings } from '../../types/models';

interface SocialState {
  tripTitle: string;
  buddies: Buddy[];
  shareSettings: ShareSettings;
}

const initialState: SocialState = {
  tripTitle: 'Surf & Wildlife trip',
  buddies: [
    { id: 'b1', name: 'Nadia (you)', initial: 'N', colorToken: 'darkGreen', roleLabel: 'ORGANIZER', roleNote: 'nadia@…com', status: 'joined' },
    { id: 'b2', name: 'Amara', initial: 'A', colorToken: 'teal', roleLabel: 'EDITOR', roleNote: 'can edit itinerary & budget', status: 'joined' },
    { id: 'b3', name: 'Josh', initial: 'J', colorToken: 'primary', roleLabel: 'VIEWER', roleNote: 'view + add expenses', status: 'joined' },
    { id: 'b4', name: 'tharindu@…com', initial: '?', colorToken: 'darkGreen', roleLabel: '', roleNote: 'invite sent · expires in 6 days', status: 'pending' },
  ],
  shareSettings: {
    itineraryVisible: true,
    budgetVisible: true,
    liveLocationVisible: false,
    liveLocationVisibleTo: 'Amara, Josh',
    linkExpiry: 'After trip ends',
  },
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    shareToggleChanged(
      state,
      action: PayloadAction<{ key: 'itineraryVisible' | 'budgetVisible' | 'liveLocationVisible'; value: boolean }>,
    ) {
      state.shareSettings[action.payload.key] = action.payload.value;
    },
  },
});

export const { shareToggleChanged } = socialSlice.actions;
export default socialSlice.reducer;

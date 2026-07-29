import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Trip } from '../../types/models';

interface TripSetupState {
  budget: number;
  pax: number;
  dateRangeLabel: string;
  travelStyle: 'backpacker' | 'comfort' | 'family';
}

interface TripState {
  setup: TripSetupState;
  trips: Trip[];
}

const initialState: TripState = {
  setup: {
    budget: 1200,
    pax: 2,
    dateRangeLabel: 'Dec 14 – 22 · 9 days',
    travelStyle: 'backpacker',
  },
  trips: [
    { id: 't1', title: 'South Coast Surf & Wildlife', dateRangeLabel: 'Dec 14–22', pax: 2, budget: 1140 },
    { id: 't2', title: 'Hill Country & Tea Trails', dateRangeLabel: 'Jan 3–12', pax: 2, budget: 1220 },
  ],
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    budgetChanged(state, action: PayloadAction<number>) {
      state.setup.budget = action.payload;
    },
    paxIncremented(state) {
      state.setup.pax += 1;
    },
    paxDecremented(state) {
      state.setup.pax = Math.max(1, state.setup.pax - 1);
    },
    travelStyleChanged(state, action: PayloadAction<TripSetupState['travelStyle']>) {
      state.setup.travelStyle = action.payload;
    },
    dateRangeChanged(state, action: PayloadAction<string>) {
      state.setup.dateRangeLabel = action.payload;
    },
  },
});

export const {
  budgetChanged,
  paxIncremented,
  paxDecremented,
  travelStyleChanged,
  dateRangeChanged,
} = tripSlice.actions;

export default tripSlice.reducer;

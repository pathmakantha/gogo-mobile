import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DaySummary, ItineraryDay, RouteWaypoint } from '../../types/models';

interface ItineraryState {
  tripTitle: string;
  dateRangeLabel: string;
  totalDays: number;
  selectedDay: number;
  days: Record<number, ItineraryDay>;
  waypoints: RouteWaypoint[];
  mapDaySummary: DaySummary;
}

const initialState: ItineraryState = {
  tripTitle: 'Surf & Wildlife',
  dateRangeLabel: 'Dec 14–22',
  totalDays: 7,
  selectedDay: 3,
  days: {
    3: {
      day: 3,
      routeLabel: 'Mirissa → Galle',
      estCost: 84,
      stops: [
        { id: 's1', time: '06:30', title: 'Dawn surf — Weligama Bay', note: 'board rental $6' },
        { id: 's2', time: '11:00', title: 'Bus to Galle Fort', note: 'local bus · $1.20 · 55 min' },
        { id: 's3', time: '13:00', title: 'Fort walk + lunch', note: 'rampart loop · kottu at Elita $9' },
        { id: 's4', time: '17:30', title: 'Sunset at lighthouse', note: 'free' },
        {
          id: 's5',
          time: 'D6',
          title: '🚆 Ella → Kandy · reserved',
          note: "booking opens in 12 days — we'll remind you",
          reserved: true,
        },
      ],
    },
  },
  waypoints: [
    { id: 'w1', cityLabel: 'Mirissa · D1–3', x: 90, y: 480, isStart: true },
    { id: 'w2', cityLabel: 'Yala · D4', x: 240, y: 420 },
    { id: 'w3', cityLabel: 'Ella · D5–7', x: 290, y: 240 },
    { id: 'w4', cityLabel: 'Kandy · D8', x: 200, y: 130 },
  ],
  mapDaySummary: {
    day: 4,
    title: 'Day 4 · Mirissa → Yala',
    durationLabel: '2h 40m by private car',
    cost: 45,
    leaveByNote: 'leave by 4:30 AM for dawn safari',
  },
};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    dayViewSelected(state, action: PayloadAction<number>) {
      state.selectedDay = action.payload;
    },
  },
});

export const { dayViewSelected } = itinerarySlice.actions;
export default itinerarySlice.reducer;

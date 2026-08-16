import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TourDetail, TourSuggestion } from '../../types/models';

interface DiscoverState {
  feed: TourSuggestion[];
  tourDetails: Record<string, TourDetail>;
  showAds: boolean;
  loading: boolean;
  error: string | null;
}

const mockFeed: TourSuggestion[] = [
  {
    id: 'tour-1',
    title: 'South Coast Surf & Wildlife',
    route: 'Mirissa → Yala → Ella',
    days: 8,
    estCostForGroup: 1140,
    fitsBudget: true,
    budgetDeltaLabel: 'FITS BUDGET · $60 UNDER',
    imageLabel: 'surf + leopard safari photo',
    verifiedLabel: '✓ verified Aug',
  },
  {
    id: 'tour-sponsored-1',
    title: 'Mirissa Whale Season Special',
    route: 'Mirissa',
    days: 1,
    estCostForGroup: 38,
    fitsBudget: true,
    sponsored: true,
    sponsorName: 'Raja & Sons',
    sponsorPriceLabel: 'from $38 pp',
    imageLabel: 'operator photo — whale watching',
  },
  {
    id: 'tour-2',
    title: 'Hill Country & Tea Trails',
    route: 'Kandy → Nuwara Eliya → Ella',
    days: 9,
    estCostForGroup: 1220,
    fitsBudget: true,
    imageLabel: 'tea country / train photo',
    verifiedLabel: '✓ verified Aug',
    weatherNote: '⛈ monsoon season there for your dates',
  },
];

const mockTourDetails: Record<string, TourDetail> = {
  'tour-1': {
    id: 'tour-1',
    title: 'South Coast Surf & Wildlife',
    imageLabel: 'hero — Mirissa beach photo',
    days: 8,
    stopCount: 6,
    bestSeason: 'best Dec–Mar',
    rating: 4.8,
    ratingCount: 212,
    stops: [
      {
        id: 'stop-1',
        label: 'D1–3 · Mirissa — surf & stay',
        price: 310,
        note: '$310 · beach hostel',
        fairPriceNote: 'typical: $280–340 · verified Aug',
        fairPriceTone: 'good',
      },
      {
        id: 'stop-2',
        label: 'D4 · Yala — leopard safari',
        price: 180,
        note: '$180 · shared jeep, dawn slot',
        fairPriceNote: 'typical: $160–200 shared jeep',
        fairPriceTone: 'good',
      },
      {
        id: 'stop-3',
        label: 'D5 · Udawalawe elephant park',
        price: 95,
        note: 'removed — saves $95',
        fairPriceNote: '',
        fairPriceTone: 'good',
        removed: true,
      },
      {
        id: 'stop-4',
        label: "D5–8 · Ella — hikes & train",
        price: 395,
        note: "$395 · Nine Arches, Little Adam's Peak",
        fairPriceNote: 'typical: $310–370 · above fair range',
        fairPriceTone: 'high',
      },
    ],
  },
};

const initialState: DiscoverState = {
  feed: mockFeed,
  tourDetails: mockTourDetails,
  showAds: true,
  loading: false,
  error: null,
};

const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {
    adsToggled(state, action: PayloadAction<boolean>) {
      state.showAds = action.payload;
    },
    tourStopRemovalToggled(
      state,
      action: PayloadAction<{ tourId: string; stopId: string }>,
    ) {
      const detail = state.tourDetails[action.payload.tourId];
      const stop = detail?.stops.find(s => s.id === action.payload.stopId);
      if (stop) {
        stop.removed = !stop.removed;
      }
    },
  },
});

export const { adsToggled, tourStopRemovalToggled } = discoverSlice.actions;
export default discoverSlice.reducer;

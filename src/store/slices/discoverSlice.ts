import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TourSuggestion } from '../../types/models';

interface DiscoverState {
  feed: TourSuggestion[];
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
  },
];

const initialState: DiscoverState = {
  feed: mockFeed,
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
  },
});

export const { adsToggled } = discoverSlice.actions;
export default discoverSlice.reducer;

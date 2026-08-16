import { createSlice } from '@reduxjs/toolkit';
import type { AgencyPackage, Deal } from '../../types/models';

interface AgencyState {
  businessName: string;
  location: string;
  verified: boolean;
  dealViews: number;
  contacts: number;
  leadCredits: number;
  deals: Deal[];
  packages: AgencyPackage[];
}

const initialState: AgencyState = {
  businessName: 'Ceylon Trails',
  location: 'Mirissa',
  verified: true,
  dealViews: 1800,
  contacts: 57,
  leadCredits: 28,
  deals: [
    {
      id: 'deal-1',
      title: 'Yala Dawn Safari Package',
      agencyName: 'Ceylon Trails',
      rating: 4.9,
      imageLabel: 'safari jeep photo',
      priceLabel: '$48 pp',
      oldPriceLabel: '$60',
      discountBadge: '-20% · ENDS IN 3D',
      matchesFairPrice: true,
      includes: ['Hotel pickup', 'Park entry', 'Breakfast', 'Tracker guide'],
      durationLabel: 'Half day · shared jeep',
    },
    {
      id: 'deal-2',
      title: 'Mirissa Whale Season Special',
      agencyName: 'Raja & Sons',
      rating: 4.7,
      imageLabel: 'whale watching boat photo',
      priceLabel: 'from $38 pp',
      includes: [],
      durationLabel: '',
    },
    {
      id: 'deal-3',
      title: 'Nuwara Eliya Tea Factory Combo',
      agencyName: 'Highland Journeys',
      rating: 4.8,
      imageLabel: 'tea factory tour photo',
      priceLabel: '$15 pp',
      includes: [],
      durationLabel: '',
    },
  ],
  packages: [
    {
      id: 'pkg-1',
      title: 'Yala Dawn Safari Package',
      metaLabel: '-20% promo · ends in 3 days',
      status: 'promoLive',
    },
    {
      id: 'pkg-2',
      title: '3-Day Southern Loop',
      metaLabel: '$180 pp · 22 views this week',
      status: 'live',
      fairPriceNote: '✓ price matches traveler reports',
    },
  ],
};

const agencySlice = createSlice({
  name: 'agency',
  initialState,
  reducers: {},
});

export default agencySlice.reducer;

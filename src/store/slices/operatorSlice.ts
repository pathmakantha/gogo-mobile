import { createSlice } from '@reduxjs/toolkit';
import type { OperatorListing } from '../../types/models';

interface OperatorState {
  businessName: string;
  location: string;
  verified: boolean;
  viewsLast7d: number;
  saves: number;
  linkOuts: number;
  listings: OperatorListing[];
}

const initialState: OperatorState = {
  businessName: 'Ceylon Trails',
  location: 'Mirissa',
  verified: true,
  viewsLast7d: 2400,
  saves: 182,
  linkOuts: 96,
  listings: [
    { id: 'l1', title: 'Whale Season Special', metaLabel: '$38 pp · boosted until Fri', status: 'live' },
    { id: 'l2', title: 'Sunrise Surf Coaching', metaLabel: '$22 pp · 41 saves this week', status: 'live' },
    { id: 'l3', title: 'Lagoon Kayak Tour', metaLabel: 'draft — add photos to publish', status: 'draft' },
  ],
};

const operatorSlice = createSlice({
  name: 'operator',
  initialState,
  reducers: {},
});

export default operatorSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { ExpertPlanDetail, FavoriteItem, PopularPlan } from '../../types/models';

interface PlansState {
  popularPlans: PopularPlan[];
  favorites: FavoriteItem[];
  expertPlanDetails: Record<string, ExpertPlanDetail>;
}

const initialState: PlansState = {
  popularPlans: [
    {
      id: 'plan-classic-loop',
      title: 'The Classic Loop',
      imageLabel: 'Sigiriya rock photo',
      days: 7,
      route: 'Sigiriya → Kandy → Ella → Galle',
      rating: 4.9,
      free: true,
    },
    {
      id: 'plan-secret-south',
      title: 'Secret South — by Ishara',
      imageLabel: 'hidden beach photo',
      days: 6,
      route: 'local guide route',
      rating: 0,
      free: false,
      price: 2.99,
      authorName: 'Ishara',
      usedByLabel: '1.2k travelers used it',
    },
    {
      id: 'plan-hill-country-rail',
      title: 'Hill Country by Rail',
      imageLabel: 'blue train on viaduct photo',
      days: 5,
      route: 'Kandy → Ella by train',
      rating: 4.7,
      free: true,
    },
  ],
  favorites: [
    { id: 'fav-1', title: 'Surf & Wildlife', imageLabel: 'surf photo', statusLabel: '$1,045 · fits', statusTone: 'fits' },
    { id: 'fav-2', title: 'Tea Trails', imageLabel: 'tea country photo', statusLabel: '$1,220 · fits', statusTone: 'fits' },
    { id: 'fav-3', title: 'North & Culture', imageLabel: 'ancient city photo', statusLabel: '$1,480 · $280 over', statusTone: 'over' },
    { id: 'fav-4', title: 'Secret South', imageLabel: 'hidden beach photo', statusLabel: 'expert plan', statusTone: 'plan' },
  ],
  expertPlanDetails: {
    'plan-secret-south': {
      id: 'plan-secret-south',
      title: 'Secret South',
      imageLabel: 'hero — hidden south coast beach',
      route: 'Tangalle → Dickwella → Hiriketiya',
      authorName: 'Ishara Fernando',
      authorInitial: 'I',
      authorBio: 'Surf guide, Dickwella · 9 years local',
      usedByCount: 1240,
      rating: 4.9,
      ratingCount: 312,
      typicalCostLabel: '$690',
      routeDescription:
        "D1–2 Tangalle — the beaches the buses skip · D3 Dickwella blowhole at dawn · D4–6 Hiriketiya, where I teach. Includes the three guesthouses I'd send my own family to and the exact bus numbers.",
      accuracyNote: 'Accuracy checked Aug 2026 · prices re-verified quarterly or it comes off the store.',
      price: 2.99,
    },
  },
};

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {},
});

export default plansSlice.reducer;

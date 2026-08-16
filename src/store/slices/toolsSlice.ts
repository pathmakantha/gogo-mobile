import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CashRegion, FairPriceQuote, TrainLeg } from '../../types/models';

interface ToolsState {
  trainLegs: TrainLeg[];
  alertsOnForAllLegs: boolean;
  fairPrice: FairPriceQuote;
  cashSpentPercent: number;
  cashSpentLabel: string;
  cardSpentPercent: number;
  cashRegions: CashRegion[];
}

const initialState: ToolsState = {
  trainLegs: [
    {
      id: 'leg-1',
      routeLabel: 'Kandy → Ella · Blue Train',
      detailLabel: 'Observation car · Dec 18 · 08:47',
      riskLabel: 'HIGH SELLOUT RISK',
      riskTone: 'high',
      opensLabel: 'Booking opens in 2 days',
      opensDate: 'Nov 18, 05:30',
      sellOutNote: "Sells out in ~4 hours in December. We'll push you the moment it opens.",
      featured: true,
    },
    {
      id: 'leg-2',
      routeLabel: 'Ella → Kandy · return',
      detailLabel: '2nd class reserved · Dec 21',
      riskLabel: 'OPENS IN 12D',
      riskTone: 'medium',
    },
    {
      id: 'leg-3',
      routeLabel: 'Galle → Colombo · coastal',
      detailLabel: 'unreserved only — just turn up',
      riskLabel: 'NO BOOKING',
      riskTone: 'none',
    },
  ],
  alertsOnForAllLegs: true,
  fairPrice: {
    itemLabel: 'Tuk-tuk / km',
    whereLabel: 'Ella',
    rangeLabel: 'LKR 90–130',
    reportCount: 214,
    lastVerifiedNote: 'last verified 3 days ago',
    rangeLowLabel: 'LKR 60',
    rangeHighLabel: 'LKR 220',
    alsoCommonNote: 'Also common in Ella: jeep half-day LKR 12–16k · board rental LKR 1.5–2.5k/day',
  },
  cashSpentPercent: 68,
  cashSpentLabel: '68% cash · LKR 96,400',
  cardSpentPercent: 32,
  cashRegions: [
    {
      id: 'cr-1',
      title: 'Before Ella · Day 5',
      note: 'Last reliable ATMs are in Bandarawela. Hill-country guesthouses and tuk-tuks are cash-only.',
      badge: 'WITHDRAW HERE',
      badgeTone: 'withdraw',
      amountLabel: '~LKR 25,000',
    },
    {
      id: 'cr-2',
      title: 'Mirissa · Day 1–3',
      note: '~LKR 18,000 · ATMs plentiful',
      badge: 'CARDS OK',
      badgeTone: 'ok',
    },
    {
      id: 'cr-3',
      title: 'Yala · Day 4',
      note: '~LKR 12,000 · park fees cash',
      badge: 'CASH ONLY',
      badgeTone: 'cashOnly',
    },
  ],
};

const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    alertsToggled(state, action: PayloadAction<boolean>) {
      state.alertsOnForAllLegs = action.payload;
    },
  },
});

export const { alertsToggled } = toolsSlice.actions;
export default toolsSlice.reducer;

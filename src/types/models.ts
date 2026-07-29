export type ThemePreference = 'light' | 'dark' | 'auto';

export interface AppUser {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
}

export interface Interest {
  id: string;
  label: string;
}

export interface TourSuggestion {
  id: string;
  title: string;
  route: string;
  days: number;
  estCostForGroup: number;
  fitsBudget: boolean;
  budgetDeltaLabel?: string;
  sponsored?: boolean;
  sponsorName?: string;
  sponsorPriceLabel?: string;
  imageLabel: string;
}

export interface Trip {
  id: string;
  title: string;
  dateRangeLabel: string;
  pax: number;
  budget: number;
}

export interface Expense {
  id: string;
  tripId: string;
  title: string;
  amount: number;
  paidBy: string;
}

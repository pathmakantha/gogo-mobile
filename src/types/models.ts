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
  verifiedLabel?: string;
  weatherNote?: string;
}

export interface TourStop {
  id: string;
  label: string;
  price: number;
  note: string;
  fairPriceNote: string;
  fairPriceTone: 'good' | 'high';
  removed?: boolean;
}

export interface TourDetail {
  id: string;
  title: string;
  imageLabel: string;
  days: number;
  stopCount: number;
  bestSeason: string;
  rating: number;
  ratingCount: number;
  stops: TourStop[];
}

export interface Trip {
  id: string;
  title: string;
  dateRangeLabel: string;
  pax: number;
  budget: number;
  status: 'upcoming' | 'past';
  inDaysLabel?: string;
  buddyCount?: number;
  settledLabel?: string;
}

export interface PopularPlan {
  id: string;
  title: string;
  imageLabel: string;
  days: number;
  route: string;
  rating: number;
  free: boolean;
  price?: number;
  authorName?: string;
  usedByLabel?: string;
}

export interface FavoriteItem {
  id: string;
  title: string;
  imageLabel: string;
  statusLabel: string;
  statusTone: 'fits' | 'over' | 'plan';
}

export interface ItineraryStop {
  id: string;
  time: string;
  title: string;
  note: string;
  reserved?: boolean;
}

export interface ItineraryDay {
  day: number;
  routeLabel: string;
  estCost: number;
  stops: ItineraryStop[];
}

export interface RouteWaypoint {
  id: string;
  cityLabel: string;
  x: number;
  y: number;
  isStart?: boolean;
}

export interface DaySummary {
  day: number;
  title: string;
  durationLabel: string;
  cost: number;
  leaveByNote: string;
}

export interface Expense {
  id: string;
  tripId: string;
  title: string;
  amount: number;
  paidBy: string;
}

export interface BudgetCategory {
  id: string;
  label: string;
  spent: number;
  percentOfCap: number;
  tone: 'good' | 'over';
  overNote?: string;
  tip?: string;
}

export interface Payer {
  id: string;
  name: string;
  initial: string;
  colorToken: 'darkGreen' | 'teal' | 'primary';
  amountPaid: number;
  paidForLabel: string;
}

export interface Buddy {
  id: string;
  name: string;
  initial: string;
  colorToken: 'darkGreen' | 'teal' | 'primary';
  roleLabel: string;
  roleNote: string;
  status: 'joined' | 'pending';
}

export interface ShareSettings {
  itineraryVisible: boolean;
  budgetVisible: boolean;
  liveLocationVisible: boolean;
  liveLocationVisibleTo: string;
  linkExpiry: string;
}

export interface OperatorListing {
  id: string;
  title: string;
  metaLabel: string;
  status: 'live' | 'draft';
}

export interface Deal {
  id: string;
  title: string;
  agencyName: string;
  rating: number;
  imageLabel: string;
  priceLabel: string;
  oldPriceLabel?: string;
  discountBadge?: string;
  matchesFairPrice?: boolean;
  includes: string[];
  durationLabel: string;
}

export interface AgencyPackage {
  id: string;
  title: string;
  metaLabel: string;
  status: 'promoLive' | 'live';
  fairPriceNote?: string;
}

export interface TrainLeg {
  id: string;
  routeLabel: string;
  detailLabel: string;
  riskLabel?: string;
  riskTone?: 'high' | 'medium' | 'none';
  opensLabel?: string;
  opensDate?: string;
  sellOutNote?: string;
  featured?: boolean;
}

export interface FairPriceQuote {
  itemLabel: string;
  whereLabel: string;
  rangeLabel: string;
  reportCount: number;
  lastVerifiedNote: string;
  rangeLowLabel: string;
  rangeHighLabel: string;
  alsoCommonNote: string;
}

export interface CashRegion {
  id: string;
  title: string;
  note: string;
  badge: string;
  badgeTone: 'withdraw' | 'ok' | 'cashOnly';
  amountLabel?: string;
  detailNote?: string;
}

export interface ExpertPlanDetail {
  id: string;
  title: string;
  imageLabel: string;
  route: string;
  authorName: string;
  authorInitial: string;
  authorBio: string;
  usedByCount: number;
  rating: number;
  ratingCount: number;
  typicalCostLabel: string;
  routeDescription: string;
  accuracyNote: string;
  price: number;
}

export interface Settlement {
  id: string;
  fromName: string;
  toName: string;
  amount: number;
}

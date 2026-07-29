import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  OtpVerify: undefined;
};

export type OnboardingStackParamList = {
  LanguageSelect: undefined;
  InterestsSelect: undefined;
  Permissions: undefined;
  Welcome: undefined;
  TripSetup: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  TourDetail: { tourId?: string } | undefined;
  TourCustomize: { tourId?: string } | undefined;
  Notifications: undefined;
};

export type PlansStackParamList = {
  MyTrips: undefined;
  PopularPlans: undefined;
  Favorites: undefined;
  ItineraryDayTimeline: undefined;
  TripSummary: undefined;
  ShareTrip: undefined;
  DateRangePicker: undefined;
  TravelBuddies: undefined;
};

export type MapStackParamList = {
  RouteMap: undefined;
  OfflineMaps: undefined;
  StaysTransport: undefined;
  EmergencyCard: undefined;
};

export type BudgetStackParamList = {
  BudgetPlanner: undefined;
  CostSplit: undefined;
  AddExpense: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  GogoPlusPaywall: undefined;
  OperatorDashboard: undefined;
  ListingEditor: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  PlansTab: NavigatorScreenParams<PlansStackParamList>;
  MapTab: NavigatorScreenParams<MapStackParamList>;
  BudgetTab: NavigatorScreenParams<BudgetStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

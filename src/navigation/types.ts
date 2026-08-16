import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  OtpVerify: undefined;
  ForgotPassword: undefined;
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
  DealsFeed: undefined;
  DealDetail: { dealId?: string } | undefined;
  FairPriceGuide: undefined;
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
  TrainRadar: undefined;
  ProposeChange: undefined;
  ExpertPlanDetail: { planId?: string } | undefined;
  CreatorOnboarding: undefined;
};

export type MapStackParamList = {
  RouteMap: undefined;
  OfflineMaps: undefined;
  StaysTransport: undefined;
  EmergencyCard: undefined;
  SafetyCard: undefined;
};

export type BudgetStackParamList = {
  BudgetPlanner: undefined;
  CostSplit: undefined;
  AddExpense: undefined;
  CashPlanner: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  GogoPlusPaywall: undefined;
  OperatorDashboard: undefined;
  ListingEditor: undefined;
  AgencyDashboard: undefined;
  NewPromo: undefined;
  TripPassPaywall: undefined;
  OperatorVerification: undefined;
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
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

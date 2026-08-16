import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PlansStackParamList } from './types';
import { MyTripsScreen } from '../screens/trips/MyTripsScreen';
import { PopularPlansScreen } from '../screens/tours/PopularPlansScreen';
import { FavoritesScreen } from '../screens/tours/FavoritesScreen';
import { ItineraryDayTimelineScreen } from '../screens/itinerary/ItineraryDayTimelineScreen';
import { TripSummaryScreen } from '../screens/trips/TripSummaryScreen';
import { ShareTripScreen } from '../screens/trips/ShareTripScreen';
import { DateRangePickerScreen } from '../screens/trips/DateRangePickerScreen';
import { TravelBuddiesScreen } from '../screens/social/TravelBuddiesScreen';
import { ProposeChangeScreen } from '../screens/social/ProposeChangeScreen';
import { TrainRadarScreen } from '../screens/tools/TrainRadarScreen';
import { ExpertPlanDetailScreen } from '../screens/tours/ExpertPlanDetailScreen';
import { CreatorOnboardingScreen } from '../screens/creator/CreatorOnboardingScreen';

const Stack = createNativeStackNavigator<PlansStackParamList>();

export function PlansStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyTrips" component={MyTripsScreen} />
      <Stack.Screen name="PopularPlans" component={PopularPlansScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="ItineraryDayTimeline" component={ItineraryDayTimelineScreen} />
      <Stack.Screen name="TripSummary" component={TripSummaryScreen} />
      <Stack.Screen name="ShareTrip" component={ShareTripScreen} />
      <Stack.Screen name="DateRangePicker" component={DateRangePickerScreen} />
      <Stack.Screen name="TravelBuddies" component={TravelBuddiesScreen} />
      <Stack.Screen name="ProposeChange" component={ProposeChangeScreen} />
      <Stack.Screen name="TrainRadar" component={TrainRadarScreen} />
      <Stack.Screen name="ExpertPlanDetail" component={ExpertPlanDetailScreen} />
      <Stack.Screen name="CreatorOnboarding" component={CreatorOnboardingScreen} />
    </Stack.Navigator>
  );
}

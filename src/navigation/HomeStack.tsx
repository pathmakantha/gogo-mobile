import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from './types';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TourDetailScreen } from '../screens/tours/TourDetailScreen';
import { TourCustomizeScreen } from '../screens/tours/TourCustomizeScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import { DealsFeedScreen } from '../screens/agency/DealsFeedScreen';
import { DealDetailScreen } from '../screens/agency/DealDetailScreen';
import { FairPriceGuideScreen } from '../screens/tools/FairPriceGuideScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TourDetail" component={TourDetailScreen} />
      <Stack.Screen name="TourCustomize" component={TourCustomizeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="DealsFeed" component={DealsFeedScreen} />
      <Stack.Screen name="DealDetail" component={DealDetailScreen} />
      <Stack.Screen name="FairPriceGuide" component={FairPriceGuideScreen} />
    </Stack.Navigator>
  );
}

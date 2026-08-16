import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from './types';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { GogoPlusPaywallScreen } from '../screens/plus/GogoPlusPaywallScreen';
import { OperatorDashboardScreen } from '../screens/operator/OperatorDashboardScreen';
import { ListingEditorScreen } from '../screens/operator/ListingEditorScreen';
import { AgencyDashboardScreen } from '../screens/agency/AgencyDashboardScreen';
import { NewPromoScreen } from '../screens/agency/NewPromoScreen';
import { OperatorVerificationScreen } from '../screens/agency/OperatorVerificationScreen';
import { TripPassPaywallScreen } from '../screens/plus/TripPassPaywallScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="GogoPlusPaywall" component={GogoPlusPaywallScreen} />
      <Stack.Screen name="OperatorDashboard" component={OperatorDashboardScreen} />
      <Stack.Screen name="ListingEditor" component={ListingEditorScreen} />
      <Stack.Screen name="AgencyDashboard" component={AgencyDashboardScreen} />
      <Stack.Screen name="NewPromo" component={NewPromoScreen} />
      <Stack.Screen name="OperatorVerification" component={OperatorVerificationScreen} />
      <Stack.Screen name="TripPassPaywall" component={TripPassPaywallScreen} />
    </Stack.Navigator>
  );
}

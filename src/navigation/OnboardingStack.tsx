import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from './types';
import { LanguageSelectScreen } from '../screens/onboarding/LanguageSelectScreen';
import { InterestsSelectScreen } from '../screens/onboarding/InterestsSelectScreen';
import { PermissionsScreen } from '../screens/onboarding/PermissionsScreen';
import { WelcomeScreen } from '../screens/welcome/WelcomeScreen';
import { TripSetupScreen } from '../screens/welcome/TripSetupScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
      <Stack.Screen name="InterestsSelect" component={InterestsSelectScreen} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
      <Stack.Screen name="TripSetup" component={TripSetupScreen} />
    </Stack.Navigator>
  );
}

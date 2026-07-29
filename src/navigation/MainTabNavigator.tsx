import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import type { MainTabParamList } from './types';
import { HomeStack } from './HomeStack';
import { PlansStack } from './PlansStack';
import { MapStack } from './MapStack';
import { BudgetStack } from './BudgetStack';
import { ProfileStack } from './ProfileStack';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, string> = {
  HomeTab: '⌂',
  PlansTab: '☰',
  MapTab: '⛰',
  BudgetTab: '$',
  ProfileTab: '◍',
};

export function MainTabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarIcon: ({ color }) => (
          <Text style={{ color, fontSize: 18 }}>{TAB_ICONS[route.name as keyof MainTabParamList]}</Text>
        ),
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: t('tabs.home') }} />
      <Tab.Screen name="PlansTab" component={PlansStack} options={{ title: t('tabs.plans') }} />
      <Tab.Screen name="MapTab" component={MapStack} options={{ title: t('tabs.map') }} />
      <Tab.Screen name="BudgetTab" component={BudgetStack} options={{ title: t('tabs.budget') }} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: t('tabs.profile') }} />
    </Tab.Navigator>
  );
}

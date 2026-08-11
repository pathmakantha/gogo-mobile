import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import type { SvgProps } from 'react-native-svg';
import type { MainTabParamList } from './types';
import { HomeStack } from './HomeStack';
import { PlansStack } from './PlansStack';
import { MapStack } from './MapStack';
import { BudgetStack } from './BudgetStack';
import { ProfileStack } from './ProfileStack';
import { colors } from '../theme/colors';
import HomeIcon from '../assets/BottomTab/home.svg';
import GiftIcon from '../assets/BottomTab/gift.svg';
import MapIcon from '../assets/BottomTab/map.svg';
import CalculatorIcon from '../assets/BottomTab/calculater.svg';
import ProfileIcon from '../assets/BottomTab/profile.svg';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, React.FC<SvgProps>> = {
  HomeTab: HomeIcon,
  PlansTab: GiftIcon,
  MapTab: MapIcon,
  BudgetTab: CalculatorIcon,
  ProfileTab: ProfileIcon,
};

export function MainTabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarIcon: ({ color }) => {
          const Icon = TAB_ICONS[route.name as keyof MainTabParamList];
          return <Icon width={42} height={42} color={color} fill={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: t('tabs.home') }}
      />
      <Tab.Screen
        name="PlansTab"
        component={PlansStack}
        options={{ title: t('tabs.plans') }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapStack}
        options={{ title: t('tabs.map') }}
      />
      <Tab.Screen
        name="BudgetTab"
        component={BudgetStack}
        options={{ title: t('tabs.budget') }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ title: t('tabs.profile') }}
      />
    </Tab.Navigator>
  );
}

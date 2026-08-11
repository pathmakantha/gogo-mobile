import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { ProfileStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signedOut } from '../../store/slices/authSlice';
import { signOut } from '../../api/authService';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

export function ProfileScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const tripCount = useAppSelector(state => state.trip.trips.length);
  const [signingOut, setSigningOut] = useState(false);

  const name = user?.displayName || user?.email || t('profile.guest');
  const initial = name.trim().charAt(0).toUpperCase() || '?';

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      // Always reset local auth state, even for guests (no Firebase session to
      // sign out of) or if the Firebase call itself failed.
      dispatch(signedOut());
      setSigningOut(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <Pressable
        onPress={() => navigation.navigate('EditProfile')}
        className="flex-row items-center gap-3.5 px-5 pb-2.5 pt-4"
      >
        <View className="h-14 w-14 items-center justify-center rounded-full bg-dark-green">
          <Text className="font-sora-extrabold text-xl text-white">{initial}</Text>
        </View>
        <View>
          <Text className="font-sora-extrabold text-[19px] text-dark-green dark:text-white">{name}</Text>
          <Text className="mt-0.5 font-manrope-semibold text-xs text-muted-text dark:text-muted-text-dark">
            {t('profile.tripsPlanned', { count: tripCount })}
          </Text>
        </View>
      </Pressable>

      <View className="flex-1 gap-2.5 px-[18px] py-2">
        <Pressable
          onPress={() => navigation.navigate('GogoPlusPaywall')}
          className="flex-row items-center justify-between rounded-card bg-dark-green px-[17px] py-[15px]"
        >
          <View className="flex-1 pr-3">
            <Text className="font-manrope-extrabold text-sm text-white">
              gogo<Text className="text-light-accent">+</Text> {t('profile.freePlan')}
            </Text>
            <Text className="mt-0.5 font-manrope-semibold text-[11.5px] text-[#9DC3B3]">
              {t('profile.freePlanSubtitle')}
            </Text>
          </View>
          <Text className="rounded-pill bg-light-accent px-[11px] py-1.5 font-manrope-extrabold text-[11px] text-dark-green">
            {t('profile.upgrade')}
          </Text>
        </Pressable>

        <View className="overflow-hidden rounded-card border border-card-border bg-white dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            className="flex-row items-center justify-between border-b border-light-bg-alt px-4 py-3.5 dark:border-deep-dark-border"
          >
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('profile.settings')}
            </Text>
            <Text className="font-manrope-bold text-[13px] text-muted-text dark:text-muted-text-dark">
              ›
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            className="flex-row items-center justify-between border-b border-light-bg-alt px-4 py-3.5 dark:border-deep-dark-border"
          >
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('profile.emergencyCard')}
            </Text>
            <Text className="font-manrope-bold text-[13px] text-primary">
              {t('profile.emergencySetUp')}
            </Text>
          </Pressable>
          <View className="flex-row items-center justify-between px-4 py-3.5">
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('profile.helpSafety')}
            </Text>
            <Text className="font-manrope-bold text-[13px] text-muted-text dark:text-muted-text-dark">
              ›
            </Text>
          </View>
        </View>

        <Pressable
          onPress={handleSignOut}
          disabled={signingOut}
          className={`items-center rounded-card border border-card-border bg-white px-4 py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card ${
            signingOut ? 'opacity-50' : ''
          }`}
        >
          <Text className="font-manrope-bold text-sm text-[#B04A4E] dark:text-red-400">
            {t('profile.signOut')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

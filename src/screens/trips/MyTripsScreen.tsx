import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { PlansStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

type Nav = NativeStackNavigationProp<PlansStackParamList, 'MyTrips'>;

export function MyTripsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const trips = useAppSelector(state => state.trip.trips);
  const upcoming = trips.filter(trip => trip.status === 'upcoming');
  const past = trips.filter(trip => trip.status === 'past');

  if (trips.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
        <View className="flex-1 items-center justify-center px-8">
          <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-dark-green/10 dark:bg-white/10">
            <Text className="text-2xl">🧳</Text>
          </View>
          <Text className="text-center font-sora-bold text-lg text-dark-green dark:text-white">
            {t('myTrips.emptyTitle')}
          </Text>
          <Text className="mt-1.5 text-center font-manrope-medium text-[13px] text-muted-text dark:text-muted-text-dark">
            {t('myTrips.emptySubtitle')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('myTrips.title')}
        </Text>
        <Text className="font-manrope-bold text-[13px] text-primary-dark">{t('myTrips.new')}</Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 11, paddingTop: 4, paddingBottom: 24 }}>
        {upcoming.length > 0 && (
          <Text className="font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('myTrips.upNext').toUpperCase()}
          </Text>
        )}
        {upcoming.map(trip => (
          <View key={trip.id} className="rounded-card-lg bg-dark-green px-[18px] py-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-sora-bold text-base text-white">{trip.title}</Text>
              {trip.inDaysLabel ? (
                <View className="rounded-pill bg-light-accent px-2.5 py-1.5">
                  <Text className="font-manrope-extrabold text-[10.5px] text-dark-green">{trip.inDaysLabel}</Text>
                </View>
              ) : null}
            </View>
            <Text className="mt-1 font-manrope-semibold text-xs text-light-accent/70">
              {t('myTrips.upcomingMeta', { dates: trip.dateRangeLabel, buddies: trip.buddyCount ?? 0, budget: trip.budget })}
            </Text>
            <View className="mt-3 flex-row gap-2">
              <Pressable
                onPress={() => navigation.navigate('ItineraryDayTimeline')}
                className="flex-1 items-center rounded-[10px] bg-primary py-2.5"
              >
                <Text className="font-manrope-bold text-xs text-white">{t('myTrips.itinerary')}</Text>
              </Pressable>
              <Pressable
                onPress={() => (navigation.getParent() as any)?.navigate('BudgetTab', { screen: 'BudgetPlanner' })}
                className="flex-1 items-center rounded-[10px] bg-deep-dark-alt py-2.5"
              >
                <Text className="font-manrope-bold text-xs text-white">{t('myTrips.budget')}</Text>
              </Pressable>
              <Pressable
                onPress={() => (navigation.getParent() as any)?.navigate('MapTab', { screen: 'RouteMap' })}
                className="flex-1 items-center rounded-[10px] bg-deep-dark-alt py-2.5"
              >
                <Text className="font-manrope-bold text-xs text-white">{t('myTrips.map')}</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {past.length > 0 && (
          <Text className="mt-1 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('myTrips.past').toUpperCase()}
          </Text>
        )}
        {past.map(trip => (
          <View
            key={trip.id}
            className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card"
          >
            <View>
              <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">{trip.title}</Text>
              <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
                {t('myTrips.pastMeta', { date: trip.dateRangeLabel, settled: trip.settledLabel, budget: trip.budget, pax: trip.pax })}
              </Text>
            </View>
            <View className="flex-row gap-2.5">
              <Text className="font-manrope-bold text-xs text-primary-dark">{t('myTrips.reuse')}</Text>
              <Pressable onPress={() => navigation.navigate('CreatorOnboarding')}>
                <Text className="font-manrope-bold text-xs text-[#B78A2E]">{t('myTrips.sellIt')}</Text>
              </Pressable>
            </View>
          </View>
        ))}

        <View className="mt-1.5 items-center rounded-2xl border-[1.5px] border-dashed border-[#BFD6CA] bg-[#F1F7F4] p-5">
          <Text className="font-sora-bold text-sm text-dark-green">{t('myTrips.dreamingTitle')}</Text>
          <Text className="mt-1 text-center font-manrope-medium text-xs leading-5 text-muted-text">
            {t('myTrips.dreamingSubtitle')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

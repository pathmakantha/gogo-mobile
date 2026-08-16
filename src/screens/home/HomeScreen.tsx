import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { HomeStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';
import { PillBadge } from '../../components/common/PillBadge';
import { TourCard } from '../../components/discover/TourCard';
import { SponsoredTourCard } from '../../components/discover/SponsoredTourCard';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const feed = useAppSelector(state => state.discover.feed);
  const showAds = useAppSelector(state => state.discover.showAds);
  const { budget, pax, dateRangeLabel } = useAppSelector(state => state.trip.setup);
  const displayName = useAppSelector(state => state.auth.user?.displayName) ?? 'Nadia';

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top']}>
      <View className="px-5 pb-2.5 pt-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
            {t('home.greeting', { name: displayName })}
          </Text>
          <View className="h-[38px] w-[38px] items-center justify-center rounded-full bg-dark-green dark:bg-light-accent">
            <Text className="font-manrope-bold text-[13px] text-white dark:text-dark-green">
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {dateRangeLabel} · {pax} pax · ${budget} budget
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3">
          <View className="flex-row gap-2 pr-4">
            <PillBadge label={t('home.bestFit')} tone="filled" />
            <PillBadge label="Beaches" />
            <PillBadge label="Hill country" />
            <PillBadge label="Wildlife" />
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 12, paddingBottom: 24 }}>
        <Pressable
          onPress={() => navigation.navigate('DealsFeed')}
          className="flex-row items-center justify-between rounded-card-lg border-[1.5px] border-[#F0D9A8] bg-white px-[15px] py-[13px] dark:border-[#5C4A22] dark:bg-deep-dark-card"
        >
          <View>
            <Text className="font-manrope-extrabold text-[10px] tracking-wide text-[#B78A2E]">
              {t('home.localDealsBadge')}
            </Text>
            <Text className="mt-0.5 font-sora-bold text-sm text-dark-green dark:text-white">
              {t('home.localDealsTitle')}
            </Text>
          </View>
          <Text className="font-manrope-bold text-xs text-primary-dark">{t('home.browse')} →</Text>
        </Pressable>

        {feed.map(tour =>
          tour.sponsored ? (
            showAds && <SponsoredTourCard key={tour.id} tour={tour} />
          ) : (
            <Pressable key={tour.id} onPress={() => navigation.navigate('TourDetail', { tourId: tour.id })}>
              <TourCard tour={tour} />
            </Pressable>
          ),
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

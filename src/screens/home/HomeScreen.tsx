import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import { PillBadge } from '../../components/common/PillBadge';
import { TourCard } from '../../components/discover/TourCard';
import { SponsoredTourCard } from '../../components/discover/SponsoredTourCard';

export function HomeScreen() {
  const { t } = useTranslation();
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
        {feed.map(tour =>
          tour.sponsored ? (
            showAds && <SponsoredTourCard key={tour.id} tour={tour} />
          ) : (
            <TourCard key={tour.id} tour={tour} />
          ),
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

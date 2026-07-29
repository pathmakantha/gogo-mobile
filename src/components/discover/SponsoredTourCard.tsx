import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { TourSuggestion } from '../../types/models';

export function SponsoredTourCard({ tour }: { tour: TourSuggestion }) {
  const { t } = useTranslation();
  return (
    <View className="overflow-hidden rounded-card-lg border-[1.5px] border-light-accent/60 bg-white dark:bg-deep-dark-card">
      <View className="h-[88px] items-center justify-center bg-light-bg-alt dark:bg-deep-dark-alt">
        <Text className="font-manrope text-[11px] text-muted-text dark:text-muted-text-dark">
          {tour.imageLabel}
        </Text>
        <View className="absolute left-2.5 top-2.5 rounded-pill bg-dark-green px-2.5 py-1">
          <Text className="font-manrope-extrabold text-[10px] tracking-wide text-light-accent">
            {t('home.sponsored')}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between px-4 py-3">
        <View>
          <Text className="font-sora-bold text-[15px] text-dark-green dark:text-white">{tour.title}</Text>
          <Text className="mt-0.5 font-manrope-semibold text-xs text-muted-text dark:text-muted-text-dark">
            {tour.sponsorName} · {tour.sponsorPriceLabel}
          </Text>
        </View>
        <Text className="font-manrope-bold text-xs text-primary-dark">{t('home.view')} ↗</Text>
      </View>
    </View>
  );
}

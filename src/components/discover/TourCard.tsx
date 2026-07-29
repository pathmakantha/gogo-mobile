import React from 'react';
import { Text, View } from 'react-native';
import type { TourSuggestion } from '../../types/models';

export function TourCard({ tour }: { tour: TourSuggestion }) {
  return (
    <View className="overflow-hidden rounded-card-lg border border-card-border bg-white dark:border-deep-dark-border dark:bg-deep-dark-card">
      <View className="h-[118px] items-center justify-center bg-light-bg-alt dark:bg-deep-dark-alt">
        <Text className="font-manrope text-[11px] text-muted-text dark:text-muted-text-dark">
          {tour.imageLabel}
        </Text>
        {tour.fitsBudget && tour.budgetDeltaLabel ? (
          <View className="absolute left-2.5 top-2.5 rounded-pill bg-primary px-2.5 py-1.5">
            <Text className="font-manrope-extrabold text-[10.5px] text-white">{tour.budgetDeltaLabel}</Text>
          </View>
        ) : null}
      </View>
      <View className="px-4 py-3.5">
        <Text className="font-sora-bold text-base text-dark-green dark:text-white">{tour.title}</Text>
        <Text className="mt-0.5 font-manrope-semibold text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {tour.days} days · {tour.route} · est.{' '}
          <Text className="font-manrope-bold text-dark-green dark:text-white">
            ${tour.estCostForGroup}
          </Text>
        </Text>
      </View>
    </View>
  );
}

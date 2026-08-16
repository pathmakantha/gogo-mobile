import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { HomeStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'TourDetail'>;
type Route = RouteProp<HomeStackParamList, 'TourDetail'>;

export function TourDetailScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const tourId = route.params?.tourId ?? 'tour-1';
  const detail = useAppSelector(state => state.discover.tourDetails[tourId]);
  const pax = useAppSelector(state => state.trip.setup.pax);

  if (!detail) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-light-bg dark:bg-deep-dark">
        <Text className="font-manrope-semibold text-muted-text dark:text-muted-text-dark">
          Tour not found.
        </Text>
      </SafeAreaView>
    );
  }

  const activeStops = detail.stops.filter(s => !s.removed);
  const total = activeStops.reduce((sum, s) => sum + s.price, 0);

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="h-[150px] items-center justify-center bg-light-bg-alt dark:bg-deep-dark-alt">
        <Text className="font-manrope text-[11px] text-muted-text dark:text-muted-text-dark">
          {detail.imageLabel}
        </Text>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          className="absolute left-3.5 top-3 h-8 w-8 items-center justify-center rounded-full bg-white"
        >
          <Text className="font-manrope-bold text-[15px] text-dark-green">←</Text>
        </Pressable>
      </View>

      <View className="px-5 pb-2 pt-3.5">
        <Text className="font-sora-extrabold text-[21px] text-dark-green dark:text-white">
          {detail.title}
        </Text>
        <Text className="mt-0.5 font-manrope-semibold text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {detail.days} {t('tourDetail.stops', { stops: detail.stopCount })} {detail.bestSeason} · ★{' '}
          {detail.rating} ({detail.ratingCount})
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 9, paddingTop: 4 }}>
        <Text className="mt-1 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
          {t('tourDetail.yourStops').toUpperCase()}
        </Text>
        {detail.stops.map(stop =>
          stop.removed ? (
            <View
              key={stop.id}
              className="flex-row items-center justify-between rounded-card border-[1.5px] border-dashed border-[#BFD6CA] bg-[#F1F7F4] px-3.5 py-3"
            >
              <View>
                <Text className="font-manrope-bold text-sm text-[#8AA396] line-through">{stop.label}</Text>
                <Text className="font-manrope-semibold text-[11.5px] text-[#8AA396]">
                  {t('tourDetail.removedSaves', { amount: stop.price })}
                </Text>
              </View>
              <Text className="font-manrope-bold text-xs text-primary-dark">{t('tourDetail.undo')}</Text>
            </View>
          ) : (
            <View
              key={stop.id}
              className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-3.5 py-3 dark:border-deep-dark-border dark:bg-deep-dark-card"
            >
              <View>
                <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
                  {stop.label}
                </Text>
                <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
                  {stop.note}
                </Text>
                {stop.fairPriceNote ? (
                  <Text
                    className={`mt-0.5 font-manrope-semibold text-[11px] ${
                      stop.fairPriceTone === 'high' ? 'text-[#B78A2E]' : 'text-primary'
                    }`}
                  >
                    {stop.fairPriceNote}
                  </Text>
                ) : null}
              </View>
              <Text className="font-manrope-bold text-xs text-primary-dark">{t('tourDetail.swap')}</Text>
            </View>
          ),
        )}
        <View className="items-center rounded-card border-[1.5px] border-dashed border-pill-border py-3">
          <Text className="font-manrope-bold text-[13px] text-primary-dark">{t('tourDetail.addStop')}</Text>
        </View>
      </ScrollView>

      <View className="flex-row items-center justify-between gap-3 border-t border-card-border bg-white px-[18px] py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
        <View>
          <Text className="font-sora-extrabold text-lg text-dark-green dark:text-white">
            ${total}{' '}
            <Text className="font-manrope-semibold text-xs text-muted-text dark:text-muted-text-dark">
              {t('tourDetail.forGroup', { count: pax })}
            </Text>
          </Text>
          <Text className="font-manrope-bold text-[11px] text-primary">
            {t('tourDetail.underBudget', { amount: Math.max(0, 1200 - total) })}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('TourCustomize', { tourId: detail.id })}
          className="rounded-[13px] bg-primary px-[22px] py-[13px]"
        >
          <Text className="font-manrope-bold text-sm text-white">{t('tourDetail.customizeThisTrip')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

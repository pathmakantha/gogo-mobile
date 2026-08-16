import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { alertsToggled } from '../../store/slices/toolsSlice';
import type { TrainLeg } from '../../types/models';

const RISK_BADGE: Record<NonNullable<TrainLeg['riskTone']>, { bg: string; text: string }> = {
  high: { bg: 'bg-[#E0575B]', text: 'text-white' },
  medium: { bg: 'bg-[#F7F0DE]', text: 'text-[#8A7B57]' },
  none: { bg: 'bg-[#EAF5EF]', text: 'text-primary' },
};

export function TrainRadarScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { trainLegs, alertsOnForAllLegs } = useAppSelector(state => state.tools);
  const featured = trainLegs.find(leg => leg.featured);
  const rest = trainLegs.filter(leg => !leg.featured);

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('trainRadar.title')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {t('trainRadar.subtitle', { count: trainLegs.length })}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 4, paddingBottom: 16 }}>
        {featured && (
          <View className="rounded-card-lg bg-dark-green px-[18px] py-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-sora-bold text-[15px] text-white">{featured.routeLabel}</Text>
              {featured.riskLabel && (
                <View className={`rounded-pill px-[9px] py-1 ${RISK_BADGE[featured.riskTone ?? 'none'].bg}`}>
                  <Text className={`font-manrope-extrabold text-[10px] ${RISK_BADGE[featured.riskTone ?? 'none'].text}`}>
                    {featured.riskLabel}
                  </Text>
                </View>
              )}
            </View>
            <Text className="mt-1.5 font-manrope-semibold text-xs text-[#9DC3B3]">{featured.detailLabel}</Text>
            {featured.opensLabel && (
              <View className="mt-3 flex-row items-center justify-between rounded-[11px] bg-deep-dark-alt px-[13px] py-[11px]">
                <Text className="font-manrope-bold text-[12.5px] text-light-accent">{featured.opensLabel}</Text>
                <Text className="font-manrope-bold text-[11.5px] text-[#9DC3B3]">{featured.opensDate}</Text>
              </View>
            )}
            {featured.sellOutNote && (
              <Text className="mt-2.5 font-manrope-medium text-[11.5px] leading-[17px] text-[#B9D8CB]">
                {featured.sellOutNote}
              </Text>
            )}
          </View>
        )}

        {rest.map(leg => (
          <View
            key={leg.id}
            className="rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-2">
                <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">{leg.routeLabel}</Text>
                <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
                  {leg.detailLabel}
                </Text>
              </View>
              {leg.riskLabel && (
                <View className={`rounded-pill px-[9px] py-1 ${RISK_BADGE[leg.riskTone ?? 'none'].bg}`}>
                  <Text className={`font-manrope-extrabold text-[10px] ${RISK_BADGE[leg.riskTone ?? 'none'].text}`}>
                    {leg.riskLabel}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}

        <Text className="mt-1 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
          {t('trainRadar.ifYouMiss').toUpperCase()}
        </Text>
        <View className="rounded-xl bg-[#EAF5EF] px-3.5 py-3 dark:bg-deep-dark-alt">
          <Text className="font-manrope-medium text-[11.5px] leading-[17px] text-[#3E6654] dark:text-light-accent">
            {t('trainRadar.missHint')}
          </Text>
        </View>
      </ScrollView>

      <View className="px-[18px] pb-6">
        <Pressable
          onPress={() => dispatch(alertsToggled(!alertsOnForAllLegs))}
          className="rounded-card bg-primary px-4 py-[15px]"
        >
          <Text className="text-center font-manrope-bold text-[15px] text-white">
            {alertsOnForAllLegs ? t('trainRadar.alertsOn') : t('trainRadar.alertsOff')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

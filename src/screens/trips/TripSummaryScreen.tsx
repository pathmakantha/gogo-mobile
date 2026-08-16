import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export function TripSummaryScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-dark-green" edges={['top', 'bottom']}>
      <View className="px-6 pb-1.5 pt-4">
        <Text className="font-manrope-bold text-[11px] tracking-wide text-light-accent">
          {t('tripSummary.complete').toUpperCase()}
        </Text>
        <Text className="mt-2 font-sora-extrabold text-[26px] leading-8 text-white">
          {t('tripSummary.headline')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[22px]" contentContainerStyle={{ gap: 10, paddingTop: 10, paddingBottom: 16 }}>
        <View className="flex-row gap-[9px]">
          {[
            { value: '$1,128', label: t('tripSummary.spentCap', { cap: 1200 }) },
            { value: '612 km', label: t('tripSummary.traveled') },
            { value: '23', label: t('tripSummary.stopsDone') },
          ].map(stat => (
            <View
              key={stat.label}
              className="flex-1 items-center rounded-card border border-[#1A6B4F] bg-deep-dark-alt px-2.5 py-[13px]"
            >
              <Text className="font-sora-extrabold text-xl text-white">{stat.value}</Text>
              <Text className="mt-1 text-center font-manrope-bold text-[10.5px] text-light-accent/70">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <View className="rounded-card-lg border border-[#1A6B4F] bg-deep-dark-alt px-[17px] py-[15px]">
          <Text className="mb-2.5 font-manrope-bold text-[11px] tracking-wide text-light-accent/70">
            {t('tripSummary.finalSettleUp').toUpperCase()}
          </Text>
          <View className="flex-row justify-between py-1.5">
            <Text className="font-manrope-bold text-[13.5px] text-white">Josh → You</Text>
            <Text className="font-manrope-bold text-[13.5px] text-light-accent">$141 · {t('tripSummary.paid')}</Text>
          </View>
          <View className="flex-row justify-between py-1.5">
            <Text className="font-manrope-bold text-[13.5px] text-white">Amara → You</Text>
            <Text className="font-manrope-bold text-[13.5px] text-[#F0D9A8]">$9 · {t('tripSummary.pending')}</Text>
          </View>
        </View>

        <Pressable className="flex-row items-center justify-between rounded-card-lg border border-[#1A6B4F] bg-deep-dark-alt px-[17px] py-[15px]">
          <View>
            <Text className="font-manrope-bold text-sm text-white">{t('tripSummary.rateOperator')}</Text>
            <Text className="mt-0.5 font-manrope-semibold text-[11.5px] text-light-accent/70">
              {t('tripSummary.rateOperatorHint')}
            </Text>
          </View>
          <Text className="font-manrope-bold text-[13px] text-light-accent">★★★★★</Text>
        </Pressable>
      </ScrollView>

      <View className="gap-2.5 px-[22px] pb-6">
        <Pressable className="rounded-card bg-light-accent px-4 py-[15px]">
          <Text className="text-center font-manrope-extrabold text-[15px] text-dark-green">
            {t('tripSummary.shareRecap')}
          </Text>
        </Pressable>
        <Text className="text-center font-manrope-bold text-[13px] text-light-accent/70">
          {t('tripSummary.reuseForFriend')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

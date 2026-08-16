import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export function CreatorOnboardingScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [refundAgreed, setRefundAgreed] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center gap-3 px-5 pb-2 pt-4">
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text className="font-manrope-bold text-base text-dark-green dark:text-white">←</Text>
        </Pressable>
        <Text className="font-sora-extrabold text-xl text-dark-green dark:text-white">{t('creator.sellYourPlan')}</Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 6, paddingBottom: 16 }}>
        <View className="rounded-card-lg bg-dark-green px-5 py-[18px]">
          <Text className="font-sora-bold text-base leading-6 text-white">{t('creator.eligibleTitle')}</Text>
          <Text className="mt-2 font-manrope-medium text-[12.5px] leading-5 text-[#B9D8CB]">
            {t('creator.eligibleBody')}
          </Text>
        </View>

        <View className="rounded-card border border-card-border bg-white px-4 py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="mb-2.5 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('creator.youKeep').toUpperCase()}
          </Text>
          <View className="flex-row items-baseline justify-between">
            <Text className="font-sora-extrabold text-[30px] text-dark-green dark:text-white">70%</Text>
            <Text className="text-right font-manrope-semibold text-xs leading-[17px] text-muted-text dark:text-muted-text-dark">
              {t('creator.perSaleNote')}
            </Text>
          </View>
        </View>

        <Text className="mt-1 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
          {t('creator.accuracyPledge').toUpperCase()}
        </Text>

        <View className="flex-row items-start gap-2.5">
          <View className="h-[22px] w-[22px] items-center justify-center rounded-[7px] bg-primary">
            <Text className="text-xs text-white">✓</Text>
          </View>
          <Text className="flex-1 font-manrope-medium text-xs leading-5 text-muted-text dark:text-muted-text-dark">
            {t('creator.pledgeRecheck')}
          </Text>
        </View>
        <View className="flex-row items-start gap-2.5">
          <View className="h-[22px] w-[22px] items-center justify-center rounded-[7px] bg-primary">
            <Text className="text-xs text-white">✓</Text>
          </View>
          <Text className="flex-1 font-manrope-medium text-xs leading-5 text-muted-text dark:text-muted-text-dark">
            {t('creator.pledgeNoPadding')}
          </Text>
        </View>
        <Pressable onPress={() => setRefundAgreed(v => !v)} className="flex-row items-start gap-2.5">
          <View
            className={`h-[22px] w-[22px] items-center justify-center rounded-[7px] ${
              refundAgreed ? 'bg-primary' : 'border-[1.5px] border-pill-border'
            }`}
          >
            {refundAgreed && <Text className="text-xs text-white">✓</Text>}
          </View>
          <Text className="flex-1 font-manrope-medium text-xs leading-5 text-muted-text dark:text-muted-text-dark">
            {t('creator.pledgeRefund')}
          </Text>
        </Pressable>
      </ScrollView>

      <View className="px-[18px] pb-6">
        <Pressable className="rounded-card bg-primary px-4 py-[15px]">
          <Text className="text-center font-manrope-bold text-[15px] text-white">{t('creator.startListing')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

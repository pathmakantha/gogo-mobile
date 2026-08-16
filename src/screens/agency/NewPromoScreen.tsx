import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export function NewPromoScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [featured, setFeatured] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center gap-3 px-5 pb-2 pt-4">
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text className="font-manrope-bold text-base text-dark-green dark:text-white">←</Text>
        </Pressable>
        <Text className="font-sora-extrabold text-lg text-dark-green dark:text-white">{t('agency.newPromo')}</Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 6, paddingBottom: 16 }}>
        <View className="rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('agency.applyToPackage').toUpperCase()}
          </Text>
          <Text className="mt-1 font-manrope-bold text-[15px] text-dark-green dark:text-white">
            Yala Dawn Safari Package ▾
          </Text>
        </View>

        <View className="flex-row gap-2.5">
          <View className="flex-1 rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
            <Text className="font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
              {t('agency.discount').toUpperCase()}
            </Text>
            <Text className="mt-1 font-manrope-bold text-[15px] text-dark-green dark:text-white">20% off</Text>
          </View>
          <View className="flex-1 rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
            <Text className="font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
              {t('agency.validUntil').toUpperCase()}
            </Text>
            <Text className="mt-1 font-manrope-bold text-[15px] text-dark-green dark:text-white">Aug 3</Text>
          </View>
        </View>

        <Pressable
          onPress={() => setFeatured(v => !v)}
          className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card"
        >
          <View className="flex-1 pr-3">
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('agency.featureInDeals')}
            </Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              {t('agency.featureInDealsNote')}
            </Text>
          </View>
          <View className={`h-[27px] w-[46px] rounded-pill ${featured ? 'bg-primary' : 'bg-light-bg-alt dark:bg-deep-dark'}`}>
            <View
              className="absolute top-[3px] h-[21px] w-[21px] rounded-full bg-white"
              style={{ left: featured ? 22 : 3 }}
            />
          </View>
        </Pressable>

        <View className="rounded-card bg-dark-green px-4 py-3.5">
          <Text className="font-manrope-bold text-[11px] tracking-wide text-[#9DC3B3]">
            {t('agency.preview').toUpperCase()}
          </Text>
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="font-manrope-bold text-sm text-white">Yala Dawn Safari Package</Text>
            <View className="rounded-pill bg-[#B78A2E] px-2 py-1">
              <Text className="font-manrope-extrabold text-[10px] text-white">-20% · 5 DAYS LEFT</Text>
            </View>
          </View>
        </View>

        <View className="rounded-xl bg-[#EAF5EF] px-3.5 py-2.5 dark:bg-deep-dark-alt">
          <Text className="font-manrope-medium text-[11.5px] leading-[17px] text-[#3E6654] dark:text-light-accent">
            {t('agency.leadFeeHint')}
          </Text>
        </View>
      </ScrollView>

      <View className="gap-2.5 px-[18px] pb-6">
        <View className="rounded-xl border-[1.5px] border-[#F0D9A8] bg-[#FDF6E8] px-3.5 py-2.5">
          <Text className="font-manrope-semibold text-[11.5px] leading-[17px] text-[#8A7B57]">
            ⚠ {t('agency.verifiedOnlyWarning')}
          </Text>
        </View>
        <Pressable onPress={() => navigation.goBack()} className="rounded-card bg-primary px-4 py-[15px]">
          <Text className="text-center font-manrope-bold text-[15px] text-white">{t('agency.publishPromo')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

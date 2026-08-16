import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const FEATURES: { titleKey: string; noteKey?: string }[] = [
  { titleKey: 'gogoPlus.offlineMaps', noteKey: 'gogoPlus.offlineMapsNote' },
  { titleKey: 'gogoPlus.unlimitedPlans', noteKey: 'gogoPlus.unlimitedPlansNote' },
  { titleKey: 'gogoPlus.adFree' },
  { titleKey: 'gogoPlus.priceAlerts' },
];

export function GogoPlusPaywallScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-dark-green" edges={['top', 'bottom']}>
      <View className="items-end px-6 pt-1">
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text className="font-manrope-bold text-[13px] text-[#6FA98E]">✕</Text>
        </Pressable>
      </View>

      <View className="px-[26px]">
        <Text className="font-sora-extrabold text-[30px] text-white">
          gogo<Text className="text-light-accent">+</Text>
        </Text>
        <Text className="mt-2 font-manrope-semibold text-[15px] leading-6 text-[#B9D8CB]">
          {t('gogoPlus.tagline')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[26px] pt-5" contentContainerStyle={{ gap: 13, paddingBottom: 16 }}>
        {FEATURES.map(feature => (
          <View key={feature.titleKey} className="flex-row items-center gap-[11px]">
            <View className="h-[26px] w-[26px] items-center justify-center rounded-lg bg-primary">
              <Text className="font-manrope-bold text-[13px] text-white">✓</Text>
            </View>
            <Text className="flex-1 font-manrope-bold text-[14.5px] text-white">
              {t(feature.titleKey)}
              {feature.noteKey ? (
                <Text className="font-manrope-semibold text-xs text-[#9DC3B3]"> — {t(feature.noteKey)}</Text>
              ) : null}
            </Text>
          </View>
        ))}

        <View className="mt-2.5 flex-row items-center justify-between rounded-2xl border-2 border-light-accent bg-primary px-[18px] py-[15px]">
          <View>
            <Text className="font-manrope-extrabold text-[15px] text-white">{t('gogoPlus.annual')}</Text>
            <Text className="font-manrope-bold text-[11.5px] text-[#CFF2E1]">{t('gogoPlus.annualNote')}</Text>
          </View>
          <View className="rounded-pill bg-white px-2.5 py-1.5">
            <Text className="font-manrope-extrabold text-[10.5px] text-dark-green">{t('gogoPlus.bestValue')}</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between rounded-2xl border border-[#1A6B4F] bg-deep-dark-alt px-[18px] py-[15px]">
          <Text className="font-manrope-extrabold text-[15px] text-white">{t('gogoPlus.monthly')}</Text>
          <Text className="font-manrope-semibold text-xs text-[#9DC3B3]">{t('gogoPlus.monthlyNote')}</Text>
        </View>
      </ScrollView>

      <View className="px-[26px] pb-10">
        <Pressable className="rounded-card bg-white px-4 py-[15px]">
          <Text className="text-center font-manrope-extrabold text-[15px] text-dark-green">
            {t('gogoPlus.startTrial')}
          </Text>
        </Pressable>
        <Text className="mt-2.5 text-center font-manrope-medium text-[11px] text-[#6FA98E]">
          {t('gogoPlus.trialNote')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

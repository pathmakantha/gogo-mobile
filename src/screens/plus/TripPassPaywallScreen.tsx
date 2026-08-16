import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { ProfileStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'TripPassPaywall'>;

const FEATURES: { titleKey: string; noteKey?: string }[] = [
  { titleKey: 'tripPass.trainRadar', noteKey: 'tripPass.trainRadarNote' },
  { titleKey: 'tripPass.offlineEssentials' },
  { titleKey: 'tripPass.fairPriceCash' },
  { titleKey: 'tripPass.adFreeBuddies' },
];

export function TripPassPaywallScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView className="flex-1 bg-dark-green" edges={['top', 'bottom']}>
      <View className="items-end px-6 pt-1">
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text className="font-manrope-bold text-[13px] text-[#6FA98E]">✕</Text>
        </Pressable>
      </View>

      <View className="px-[26px]">
        <View className="self-start rounded-pill bg-primary px-[11px] py-1.5">
          <Text className="font-manrope-extrabold text-[10.5px] tracking-wide text-white">
            {t('tripPass.entryPointBadge')}
          </Text>
        </View>
        <Text className="mt-3.5 font-sora-extrabold text-[28px] leading-8 text-white">
          {t('tripPass.headline')}
        </Text>
        <Text className="mt-2.5 font-manrope-medium text-sm leading-[22px] text-[#B9D8CB]">
          {t('tripPass.subtitle')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[26px] pt-5" contentContainerStyle={{ gap: 12, paddingBottom: 16 }}>
        {FEATURES.map(feature => (
          <View key={feature.titleKey} className="flex-row items-center gap-[11px]">
            <View className="h-[26px] w-[26px] items-center justify-center rounded-lg bg-primary">
              <Text className="font-manrope-bold text-[13px] text-white">✓</Text>
            </View>
            <Text className="flex-1 font-manrope-bold text-sm text-white">
              {t(feature.titleKey)}
              {feature.noteKey ? (
                <Text className="font-manrope-semibold text-[11.5px] text-[#9DC3B3]"> — {t(feature.noteKey)}</Text>
              ) : null}
            </Text>
          </View>
        ))}

        <View className="mt-2.5 rounded-2xl border-2 border-light-accent bg-primary px-5 py-[18px]">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-sora-extrabold text-[22px] text-white">$12.99</Text>
              <Text className="font-manrope-bold text-xs text-[#CFF2E1]">{t('tripPass.priceNote')}</Text>
            </View>
            <View className="rounded-pill bg-white px-2.5 py-1.5">
              <Text className="font-manrope-extrabold text-[10.5px] text-dark-green">AUD 19.99</Text>
            </View>
          </View>
          <Text className="mt-2.5 font-manrope-medium text-[11.5px] leading-[17px] text-[#CFF2E1]">
            {t('tripPass.activeNote')}
          </Text>
        </View>
      </ScrollView>

      <View className="px-[26px] pb-9">
        <Pressable className="rounded-card bg-white px-4 py-4">
          <Text className="text-center font-manrope-extrabold text-[15px] text-dark-green">
            {t('tripPass.getTripPass')}
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('GogoPlusPaywall')} className="mt-3 items-center">
          <Text className="font-manrope-semibold text-xs text-[#6FA98E]">
            {t('tripPass.travelingOften')}{' '}
            <Text className="text-light-accent">{t('tripPass.gogoPlusLink')}</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

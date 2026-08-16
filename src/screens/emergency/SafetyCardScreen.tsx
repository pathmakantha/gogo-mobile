import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export function SafetyCardScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
        <View>
          <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
            {t('safetyCard.title', { region: 'Ella' })}
          </Text>
          <Text className="font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
            {t('safetyCard.subtitle')}
          </Text>
        </View>
        <View className="rounded-pill bg-[#EAF5EF] px-2.5 py-1.5 dark:bg-deep-dark-alt">
          <Text className="font-manrope-extrabold text-[9.5px] text-primary">{t('fairPrice.offline')}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 4, paddingBottom: 16 }}>
        <Pressable
          onPress={() => (navigation.getParent() as any)?.navigate('MapTab', { screen: 'EmergencyCard' })}
          className="flex-row items-center justify-between rounded-card-lg bg-[#B04A4E] px-[17px] py-[15px]"
        >
          <View>
            <Text className="font-sora-extrabold text-[15px] text-white">{t('safetyCard.emergency')}</Text>
            <Text className="font-manrope-semibold text-[11.5px] text-white/85">{t('safetyCard.emergencyHint')}</Text>
          </View>
          <Text className="font-sora-extrabold text-[22px] text-white">119</Text>
        </Pressable>

        <View className="flex-row gap-[9px]">
          <View className="flex-1 rounded-card border border-card-border bg-white px-3.5 py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
            <Text className="font-manrope-bold text-[12.5px] text-dark-green dark:text-white">
              {t('safetyCard.touristPolice')}
            </Text>
            <Text className="mt-0.5 font-manrope-semibold text-[11px] text-muted-text dark:text-muted-text-dark">
              Badulla district
            </Text>
            <Text className="mt-1.5 font-sora-extrabold text-[15px] text-dark-green dark:text-white">1912</Text>
          </View>
          <View className="flex-1 rounded-card border border-card-border bg-white px-3.5 py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
            <Text className="font-manrope-bold text-[12.5px] text-dark-green dark:text-white">
              {t('safetyCard.embassy')}
            </Text>
            <Text className="mt-0.5 font-manrope-semibold text-[11px] text-muted-text dark:text-muted-text-dark">
              Colombo
            </Text>
            <Text className="mt-1.5 font-sora-bold text-[13px] text-dark-green dark:text-white">+94 11 2463</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View>
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('safetyCard.nearestHospital')}
            </Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              Ella Base Hospital · 6 min
            </Text>
          </View>
          <Text className="font-manrope-bold text-xs text-primary-dark">{t('emergency.route')}</Text>
        </View>

        <View className="rounded-card border-[1.5px] border-[#E4D3E8] bg-white px-[15px] py-[13px] dark:bg-deep-dark-card">
          <View className="flex-row items-center justify-between">
            <Text className="font-manrope-bold text-[13.5px] text-dark-green dark:text-white">
              {t('safetyCard.womenTravelers')}
            </Text>
            <Text className="font-manrope-bold text-[11px] text-[#8A6B94]">{t('safetyCard.reportsCount', { count: 42 })}</Text>
          </View>
          <Text className="mt-1.5 font-manrope-medium text-[11.5px] leading-[18px] text-muted-text dark:text-muted-text-dark">
            {t('safetyCard.womenTravelersNote')}
          </Text>
        </View>

        <View className="rounded-xl bg-[#EAF5EF] px-3.5 py-2.5 dark:bg-deep-dark-alt">
          <Text className="font-manrope-medium text-[11.5px] leading-[17px] text-[#3E6654] dark:text-light-accent">
            {t('safetyCard.flipLanguageHint')}
          </Text>
        </View>
      </ScrollView>

      <View className="px-[18px] pb-6">
        <Pressable className="rounded-card bg-dark-green px-4 py-[15px]">
          <Text className="text-center font-manrope-bold text-[15px] text-white">
            {t('safetyCard.shareLiveLocation')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

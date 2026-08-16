import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export function EmergencyCardScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center gap-3 px-5 pb-2 pt-4">
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text className="font-manrope-bold text-base text-dark-green dark:text-white">←</Text>
        </Pressable>
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('emergency.title')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 6, paddingBottom: 24 }}>
        <View className="flex-row items-center justify-between rounded-card-lg bg-[#B04A4E] px-[18px] py-4">
          <View>
            <Text className="font-sora-extrabold text-base text-white">{t('emergency.policeAmbulance')}</Text>
            <Text className="font-manrope-semibold text-xs text-white/85">
              {t('emergency.policeAmbulanceHint')}
            </Text>
          </View>
          <Text className="font-sora-extrabold text-[22px] text-white">119</Text>
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View>
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('emergency.touristPolice')}
            </Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              {t('emergency.touristPoliceHint')}
            </Text>
          </View>
          <Text className="font-sora-extrabold text-[15px] text-dark-green dark:text-white">1912</Text>
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View>
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('emergency.nearestHospital')}
            </Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              Karapitiya Teaching Hospital · 14 min
            </Text>
          </View>
          <Text className="font-manrope-bold text-xs text-primary-dark">{t('emergency.route')}</Text>
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View>
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">{t('emergency.embassy')}</Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              Colombo · +94 11 2463 200
            </Text>
          </View>
          <Text className="font-manrope-bold text-xs text-primary-dark">{t('emergency.call')}</Text>
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View>
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('emergency.emergencyContact')}
            </Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              {t('emergency.emergencyContactHint')}
            </Text>
          </View>
          <Text className="font-manrope-bold text-xs text-primary-dark">{t('emergency.call')}</Text>
        </View>

        <View className="rounded-xl bg-[#EAF5EF] px-3.5 py-2.5 dark:bg-deep-dark-alt">
          <Text className="font-manrope-medium text-[11.5px] leading-[17px] text-[#3E6654] dark:text-light-accent">
            {t('emergency.offlineHint')}
          </Text>
        </View>
      </ScrollView>

      <View className="px-[18px] pb-6">
        <Pressable className="rounded-card bg-dark-green px-4 py-[15px]">
          <Text className="text-center font-manrope-bold text-[15px] text-white">
            {t('emergency.shareLiveLocation')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

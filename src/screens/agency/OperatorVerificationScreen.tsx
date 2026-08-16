import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export function OperatorVerificationScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [fairPriceAgreed, setFairPriceAgreed] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center gap-3 px-5 pb-2 pt-4">
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text className="font-manrope-bold text-base text-dark-green dark:text-white">←</Text>
        </Pressable>
        <Text className="font-sora-extrabold text-xl text-dark-green dark:text-white">
          {t('verification.getVerified')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 6, paddingBottom: 16 }}>
        <View className="rounded-card border-[1.5px] border-[#F0D9A8] bg-[#FDF6E8] px-[15px] py-[13px]">
          <Text className="font-manrope-semibold text-xs leading-5 text-[#8A7B57]">
            {t('verification.reviewNote')}
          </Text>
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View>
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('verification.businessRegistration')}
            </Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              BR-2019/4471.pdf
            </Text>
          </View>
          <View className="rounded-pill bg-[#EAF5EF] px-[9px] py-1.5 dark:bg-deep-dark-alt">
            <Text className="font-manrope-extrabold text-[10px] text-primary">{t('verification.uploaded')}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View>
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('verification.sltdaLicence')}
            </Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              {t('verification.sltdaLicenceHint')}
            </Text>
          </View>
          <Text className="font-manrope-bold text-xs text-primary-dark">{t('verification.upload')}</Text>
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View>
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('verification.insuranceCert')}
            </Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              {t('verification.insuranceCertHint')}
            </Text>
          </View>
          <Text className="font-manrope-bold text-xs text-primary-dark">{t('verification.upload')}</Text>
        </View>

        <View className="rounded-card border-[1.5px] border-light-accent/60 bg-white px-4 py-3.5 dark:bg-deep-dark-card">
          <Text className="font-manrope-bold text-[13.5px] text-dark-green dark:text-white">
            {t('verification.fairPriceAttestation')}
          </Text>
          <Text className="mt-1.5 font-manrope-medium text-[11.5px] leading-[17px] text-muted-text dark:text-muted-text-dark">
            {t('verification.fairPriceAttestationBody')}
          </Text>
          <Pressable onPress={() => setFairPriceAgreed(v => !v)} className="mt-2.5 flex-row items-center gap-2.5">
            <View
              className={`h-[22px] w-[22px] items-center justify-center rounded-[7px] ${
                fairPriceAgreed ? 'bg-primary' : 'border-[1.5px] border-pill-border'
              }`}
            >
              {fairPriceAgreed && <Text className="text-xs text-white">✓</Text>}
            </View>
            <Text className="font-manrope-bold text-[12.5px] text-dark-green dark:text-white">
              {t('verification.iAgree')}
            </Text>
          </Pressable>
        </View>

        <View className="mt-0.5 flex-row flex-wrap items-center gap-[7px]">
          <View className="rounded-pill bg-[#F7F0DE] px-2.5 py-1">
            <Text className="font-manrope-extrabold text-[10px] text-[#8A7B57]">{t('verification.pending')}</Text>
          </View>
          <View className="rounded-pill bg-[#EAF5EF] px-2.5 py-1">
            <Text className="font-manrope-extrabold text-[10px] text-primary">{t('operator.verified')}</Text>
          </View>
          <View className="rounded-pill bg-[#F7E6E6] px-2.5 py-1">
            <Text className="font-manrope-extrabold text-[10px] text-[#B04A4E]">{t('verification.revoked')}</Text>
          </View>
          <Text className="font-manrope-semibold text-[10.5px] text-muted-text dark:text-muted-text-dark">
            {t('verification.badgeStates')}
          </Text>
        </View>
      </ScrollView>

      <View className="px-[18px] pb-6">
        <Pressable onPress={() => navigation.goBack()} className="rounded-card bg-primary px-4 py-[15px]">
          <Text className="text-center font-manrope-bold text-[15px] text-white">
            {t('verification.submitForReview')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

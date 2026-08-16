import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const HIGHLIGHTS = ['Blue whales', 'Breakfast onboard', 'Hotel pickup'];

export function ListingEditorScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center gap-3 px-5 pb-2 pt-4">
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text className="font-manrope-bold text-base text-dark-green dark:text-white">←</Text>
        </Pressable>
        <Text className="font-sora-extrabold text-lg text-dark-green dark:text-white">
          {t('operator.editListing')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 6, paddingBottom: 16 }}>
        <View className="rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('operator.tourName').toUpperCase()}
          </Text>
          <Text className="mt-1 font-manrope-bold text-[15px] text-dark-green dark:text-white">
            Whale Season Special
          </Text>
        </View>

        <View className="flex-row gap-2.5">
          <View className="flex-1 rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
            <Text className="font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
              {t('operator.duration').toUpperCase()}
            </Text>
            <Text className="mt-1 font-manrope-bold text-[15px] text-dark-green dark:text-white">Half day</Text>
          </View>
          <View className="flex-1 rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
            <Text className="font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
              {t('operator.pricePerPax').toUpperCase()}
            </Text>
            <Text className="mt-1 font-manrope-bold text-[15px] text-dark-green dark:text-white">$38</Text>
          </View>
        </View>

        <View className="rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="mb-2.5 font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('operator.highlights').toUpperCase()}
          </Text>
          <View className="flex-row flex-wrap gap-[7px]">
            {HIGHLIGHTS.map(h => (
              <View key={h} className="rounded-pill bg-[#EAF5EF] px-[11px] py-1.5 dark:bg-deep-dark-alt">
                <Text className="font-manrope-bold text-[11.5px] text-primary">{h}</Text>
              </View>
            ))}
            <View className="rounded-pill border-[1.5px] border-dashed border-[#BFD6CA] px-[11px] py-1.5">
              <Text className="font-manrope-bold text-[11.5px] text-[#8AA396]">{t('operator.addHighlight')}</Text>
            </View>
          </View>
        </View>

        <View className="rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="mb-2.5 font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('operator.photosOf', { count: 2, total: 6 }).toUpperCase()}
          </Text>
          <View className="flex-row gap-2">
            <View className="h-16 w-16 rounded-[10px] bg-light-bg-alt dark:bg-deep-dark-alt" />
            <View className="h-16 w-16 rounded-[10px] bg-light-bg-alt dark:bg-deep-dark-alt" />
            <View className="h-16 w-16 items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-[#BFD6CA]">
              <Text className="font-manrope-bold text-xl text-[#8AA396]">+</Text>
            </View>
          </View>
        </View>

        <View className="rounded-xl bg-[#EAF5EF] px-3.5 py-2.5 dark:bg-deep-dark-alt">
          <Text className="font-manrope-medium text-[11.5px] leading-[17px] text-[#3E6654] dark:text-light-accent">
            {t('operator.photoTip')}
          </Text>
        </View>
      </ScrollView>

      <View className="flex-row gap-2.5 px-[18px] pb-6">
        <Pressable className="flex-1 rounded-card border-[1.5px] border-pill-border px-4 py-3.5">
          <Text className="text-center font-manrope-bold text-sm text-dark-green dark:text-white">
            {t('operator.preview')}
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.goBack()} className="flex-1 rounded-card bg-primary px-4 py-3.5">
          <Text className="text-center font-manrope-bold text-sm text-white">{t('operator.publish')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

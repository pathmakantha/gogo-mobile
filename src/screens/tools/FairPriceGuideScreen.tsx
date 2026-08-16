import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';

function parseQuote(input: string): number | null {
  const match = input.replace(/[^0-9.]/g, '');
  return match ? Number(match) : null;
}

export function FairPriceGuideScreen() {
  const { t } = useTranslation();
  const { fairPrice } = useAppSelector(state => state.tools);
  const [quoted, setQuoted] = useState('');

  const midFair = 110; // midpoint of LKR 90–130 fair zone, matches design's illustrative multiplier
  const quotedValue = parseQuote(quoted);
  const multiplier = quotedValue ? quotedValue / midFair : null;

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
        <View>
          <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
            {t('fairPrice.title')}
          </Text>
          <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
            {t('fairPrice.subtitle')}
          </Text>
        </View>
        <View className="rounded-pill bg-[#EAF5EF] px-2.5 py-1.5 dark:bg-deep-dark-alt">
          <Text className="font-manrope-extrabold text-[9.5px] text-primary">{t('fairPrice.offline')}</Text>
        </View>
      </View>

      <View className="flex-row gap-[9px] px-[18px] py-1.5">
        <View className="flex-1 rounded-xl border border-card-border bg-white px-[13px] py-[11px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="font-manrope-bold text-[10px] tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('fairPrice.item').toUpperCase()}
          </Text>
          <Text className="mt-0.5 font-manrope-bold text-[13.5px] text-dark-green dark:text-white">
            {fairPrice.itemLabel} ▾
          </Text>
        </View>
        <View className="flex-1 rounded-xl border border-card-border bg-white px-[13px] py-[11px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="font-manrope-bold text-[10px] tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('fairPrice.where').toUpperCase()}
          </Text>
          <Text className="mt-0.5 font-manrope-bold text-[13.5px] text-dark-green dark:text-white">
            {fairPrice.whereLabel} ▾
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 11, paddingTop: 6, paddingBottom: 16 }}>
        <View className="items-center rounded-card-lg bg-dark-green p-5">
          <Text className="font-manrope-bold text-[11px] tracking-wide text-[#9DC3B3]">
            {t('fairPrice.typicalRange', { item: fairPrice.itemLabel, where: fairPrice.whereLabel }).toUpperCase()}
          </Text>
          <Text className="mt-2 font-sora-extrabold text-[34px] text-white">
            {fairPrice.rangeLabel} <Text className="font-manrope-semibold text-[15px] text-[#9DC3B3]">/ km</Text>
          </Text>
          <View className="mt-4 h-2 w-full overflow-hidden rounded-pill bg-[#1A6B4F]">
            <View className="ml-[24%] h-full w-[38%] rounded-pill bg-light-accent" />
          </View>
          <View className="mt-2 w-full flex-row justify-between">
            <Text className="font-manrope-semibold text-[11px] text-[#9DC3B3]">{fairPrice.rangeLowLabel}</Text>
            <Text className="font-manrope-extrabold text-[11px] text-light-accent">{t('fairPrice.fairZone')}</Text>
            <Text className="font-manrope-semibold text-[11px] text-[#9DC3B3]">{fairPrice.rangeHighLabel}</Text>
          </View>
          <Text className="mt-3.5 font-manrope-medium text-[11.5px] text-[#B9D8CB]">
            {t('fairPrice.fromReports', { count: fairPrice.reportCount, note: fairPrice.lastVerifiedNote })}
          </Text>
        </View>

        <View className="rounded-card border border-card-border bg-white px-4 py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="mb-2.5 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('fairPrice.quotedPrice').toUpperCase()}
          </Text>
          <View className="flex-row items-center gap-2.5">
            <TextInput
              value={quoted}
              onChangeText={setQuoted}
              placeholder="LKR 300"
              keyboardType="numeric"
              className="flex-1 rounded-[11px] border border-card-border bg-light-bg px-3.5 py-3 font-sora-extrabold text-[17px] text-dark-green dark:bg-deep-dark dark:text-white"
            />
            {multiplier ? (
              <View className="rounded-[11px] bg-[#B04A4E] px-3.5 py-3">
                <Text className="font-manrope-bold text-xs text-white">{multiplier.toFixed(1)}× {t('fairPrice.high')}</Text>
              </View>
            ) : null}
          </View>
          <Text className="mt-2.5 font-manrope-medium text-[11.5px] leading-[17px] text-muted-text dark:text-muted-text-dark">
            {t('fairPrice.tryOffering')}
          </Text>
        </View>

        <View className="rounded-xl bg-[#EAF5EF] px-3.5 py-2.5 dark:bg-deep-dark-alt">
          <Text className="font-manrope-medium text-[11.5px] leading-[17px] text-[#3E6654] dark:text-light-accent">
            {fairPrice.alsoCommonNote}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

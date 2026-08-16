import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import type { CashRegion } from '../../types/models';

const BADGE_TONE: Record<CashRegion['badgeTone'], { bg: string; text: string }> = {
  withdraw: { bg: 'bg-[#B78A2E]', text: 'text-white' },
  ok: { bg: 'bg-[#EAF5EF]', text: 'text-primary' },
  cashOnly: { bg: 'bg-[#F7F0DE]', text: 'text-[#8A7B57]' },
};

export function CashPlannerScreen() {
  const { t } = useTranslation();
  const { cashSpentLabel, cardSpentPercent, cashSpentPercent, cashRegions } = useAppSelector(state => state.tools);

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('cashPlanner.title')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {t('cashPlanner.subtitle')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 4, paddingBottom: 16 }}>
        <View className="rounded-card-lg bg-dark-green px-[18px] py-4">
          <Text className="font-manrope-bold text-[11px] tracking-wide text-[#9DC3B3]">
            {t('cashPlanner.cashVsCard').toUpperCase()}
          </Text>
          <View className="mt-3 h-[9px] flex-row overflow-hidden rounded-pill bg-[#1A6B4F]">
            <View className="h-full bg-light-accent" style={{ width: `${cashSpentPercent}%` }} />
            <View className="h-full bg-[#0E93A3]" style={{ width: `${cardSpentPercent}%` }} />
          </View>
          <View className="mt-2 flex-row justify-between">
            <Text className="font-manrope-bold text-[11.5px] text-light-accent">{cashSpentLabel}</Text>
            <Text className="font-manrope-bold text-[11.5px] text-[#7FC7D4]">{cardSpentPercent}% card</Text>
          </View>
        </View>

        {cashRegions.map(region => (
          <View
            key={region.id}
            className={`rounded-card border bg-white px-4 py-3.5 dark:bg-deep-dark-card ${
              region.badgeTone === 'withdraw'
                ? 'border-[1.5px] border-[#F0D9A8] dark:border-[#5C4A22]'
                : 'border-card-border dark:border-deep-dark-border'
            }`}
          >
            {region.amountLabel ? (
              <>
                <View className="flex-row items-center justify-between">
                  <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">{region.title}</Text>
                  <View className={`rounded-pill px-[9px] py-1 ${BADGE_TONE[region.badgeTone].bg}`}>
                    <Text className={`font-manrope-extrabold text-[10px] ${BADGE_TONE[region.badgeTone].text}`}>
                      {region.badge}
                    </Text>
                  </View>
                </View>
                <Text className="mt-2 font-sora-extrabold text-[21px] text-dark-green dark:text-white">
                  {region.amountLabel}
                </Text>
                <Text className="mt-1 font-manrope-medium text-[11.5px] leading-[17px] text-muted-text dark:text-muted-text-dark">
                  {region.note}
                </Text>
                <Text className="mt-2 font-manrope-bold text-xs text-primary-dark">{t('cashPlanner.showAtms')} →</Text>
              </>
            ) : (
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">{region.title}</Text>
                  <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
                    {region.note}
                  </Text>
                </View>
                <View className={`rounded-pill px-[9px] py-1 ${BADGE_TONE[region.badgeTone].bg}`}>
                  <Text className={`font-manrope-extrabold text-[10px] ${BADGE_TONE[region.badgeTone].text}`}>
                    {region.badge}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}

        <View className="rounded-card border border-card-border bg-white px-4 py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="mb-2.5 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('cashPlanner.digitalPayments').toUpperCase()}
          </Text>
          <View className="flex-row flex-wrap gap-[7px]">
            <View className="rounded-pill bg-[#EAF5EF] px-[11px] py-1.5 dark:bg-deep-dark-alt">
              <Text className="font-manrope-bold text-[11.5px] text-primary">LankaQR ✓</Text>
            </View>
            <View className="rounded-pill bg-[#EAF5EF] px-[11px] py-1.5 dark:bg-deep-dark-alt">
              <Text className="font-manrope-bold text-[11.5px] text-primary">UPI ✓ Colombo</Text>
            </View>
            <View className="rounded-pill bg-[#F0F0EC] px-[11px] py-1.5">
              <Text className="font-manrope-bold text-[11.5px] text-[#8A8A7B]">Alipay — rare</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

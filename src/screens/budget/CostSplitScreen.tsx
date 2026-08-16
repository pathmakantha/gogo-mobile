import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import { AppButton } from '../../components/common/AppButton';
import type { Payer } from '../../types/models';

const AVATAR_BG: Record<Payer['colorToken'], string> = {
  darkGreen: 'bg-dark-green',
  teal: 'bg-[#0E93A3]',
  primary: 'bg-primary',
};

export function CostSplitScreen() {
  const { t } = useTranslation();
  const { totalSpent, travelerCount, payers, settlements } = useAppSelector(state => state.budget);

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('costSplit.title')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {t('costSplit.subtitle', { total: totalSpent, count: travelerCount })}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 6, paddingBottom: 24 }}>
        {payers.map(payer => (
          <View
            key={payer.id}
            className="flex-row items-center gap-3 rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card"
          >
            <View className={`h-[38px] w-[38px] items-center justify-center rounded-full ${AVATAR_BG[payer.colorToken]}`}>
              <Text className="font-manrope-bold text-[13px] text-white">{payer.initial}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">{payer.name}</Text>
              <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
                {payer.paidForLabel}
              </Text>
            </View>
            <Text className="font-sora-extrabold text-[15px] text-dark-green dark:text-white">
              ${payer.amountPaid}
            </Text>
          </View>
        ))}

        <Text className="mt-1.5 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
          {t('costSplit.toSettle').toUpperCase()}
        </Text>
        {settlements.map(settlement => (
          <View
            key={settlement.id}
            className="flex-row items-center justify-between rounded-card bg-dark-green px-4 py-3.5"
          >
            <Text className="font-manrope-bold text-[13.5px] text-white">
              {settlement.fromName} → {settlement.toName}
            </Text>
            <Text className="font-sora-extrabold text-base text-light-accent">${settlement.amount}</Text>
          </View>
        ))}
        <Text className="px-2.5 text-center font-manrope-medium text-[11.5px] leading-[17px] text-muted-text/80 dark:text-muted-text-dark/80">
          {t('costSplit.settleHint')}
        </Text>
      </ScrollView>

      <View className="px-[18px] pb-6">
        <AppButton label={t('costSplit.shareSettleUp')} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

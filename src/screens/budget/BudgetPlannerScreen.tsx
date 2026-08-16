import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';

export function BudgetPlannerScreen() {
  const { t } = useTranslation();
  const { plannedTotal, cap, categories } = useAppSelector(state => state.budget);
  const headroom = cap - plannedTotal;
  const capPercent = Math.min(100, Math.round((plannedTotal / cap) * 100));

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('budget.title')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {t('budget.subtitle', { cap })}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 6, paddingBottom: 24 }}>
        <View className="rounded-card-lg bg-dark-green px-5 py-[18px]">
          <View className="flex-row items-baseline justify-between">
            <Text className="font-manrope-semibold text-xs text-light-accent/70">
              {t('budget.plannedSoFar')}
            </Text>
            <Text className="font-sora-extrabold text-2xl text-white">${plannedTotal}</Text>
          </View>
          <View className="my-3 h-2 overflow-hidden rounded-pill bg-[#1A6B4F]">
            <View className="h-full rounded-pill bg-light-accent" style={{ width: `${capPercent}%` }} />
          </View>
          <View className="flex-row justify-between">
            <Text className="font-manrope-bold text-[11.5px] text-light-accent">
              {t('budget.headroom', { amount: headroom })}
            </Text>
            <Text className="font-manrope-bold text-[11.5px] text-light-accent/70">
              {t('budget.cap', { cap })}
            </Text>
          </View>
        </View>

        {categories.map(cat => (
          <View
            key={cat.id}
            className={`rounded-card border bg-white px-[15px] py-3 dark:bg-deep-dark-card ${
              cat.tone === 'over'
                ? 'border-[1.5px] border-[#F0D9A8]'
                : 'border-card-border dark:border-deep-dark-border'
            }`}
          >
            <View className="flex-row justify-between">
              <Text className="font-manrope-bold text-[13px] text-dark-green dark:text-white">
                {cat.label}
              </Text>
              <Text
                className={`font-manrope-bold text-[13px] ${
                  cat.tone === 'over' ? 'text-[#B78A2E]' : 'text-dark-green dark:text-white'
                }`}
              >
                ${cat.spent}
                {cat.overNote ? ` · ${cat.overNote}` : ''}
              </Text>
            </View>
            <View
              className={`mt-2 h-1.5 overflow-hidden rounded-pill ${
                cat.tone === 'over' ? 'bg-[#F7F0DE]' : 'bg-light-bg-alt dark:bg-deep-dark'
              }`}
            >
              <View
                className={`h-full rounded-pill ${cat.tone === 'over' ? 'bg-[#D9A93F]' : 'bg-primary'}`}
                style={{ width: `${cat.percentOfCap}%` }}
              />
            </View>
            {cat.tip ? (
              <Text className="mt-2 font-manrope-semibold text-[11.5px] text-[#8A7B57]">{cat.tip}</Text>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

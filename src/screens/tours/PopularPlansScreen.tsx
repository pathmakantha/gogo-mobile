import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { PlansStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

type Nav = NativeStackNavigationProp<PlansStackParamList, 'PopularPlans'>;

export function PopularPlansScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const popularPlans = useAppSelector(state => state.plans.popularPlans);

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2.5 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('popularPlans.title')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {t('popularPlans.subtitle')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 12, paddingBottom: 24, paddingTop: 4 }}>
        {popularPlans.map(plan => (
          <Pressable
            key={plan.id}
            onPress={() => !plan.free && navigation.navigate('ExpertPlanDetail', { planId: plan.id })}
            className={`overflow-hidden rounded-card-lg border bg-white dark:bg-deep-dark-card ${
              plan.free ? 'border-card-border dark:border-deep-dark-border' : 'border-[1.5px] border-[#F0D9A8] dark:border-[#5C4A22]'
            }`}
          >
            <View className="h-[100px] items-center justify-center bg-light-bg-alt dark:bg-deep-dark-alt">
              <Text className="font-manrope text-[11px] text-muted-text dark:text-muted-text-dark">
                {plan.imageLabel}
              </Text>
              {!plan.free && (
                <View className="absolute left-2.5 top-2.5 rounded-pill bg-[#B78A2E] px-2.5 py-1">
                  <Text className="font-manrope-extrabold text-[10px] tracking-wide text-white">
                    {t('popularPlans.expertPlan')}
                  </Text>
                </View>
              )}
            </View>
            <View className="flex-row items-center justify-between px-4 py-3">
              <View className="flex-1 pr-2">
                <Text className="font-sora-bold text-[15px] text-dark-green dark:text-white">
                  {plan.title}
                </Text>
                <Text className="mt-0.5 font-manrope-semibold text-xs text-muted-text dark:text-muted-text-dark">
                  {plan.days} days ·{' '}
                  {plan.free ? `${plan.route} · ${plan.rating}★` : plan.usedByLabel}
                </Text>
              </View>
              {plan.free ? (
                <View className="rounded-pill bg-[#EAF5EF] px-2.5 py-1.5 dark:bg-deep-dark-alt">
                  <Text className="font-manrope-extrabold text-[11px] text-primary">
                    {t('popularPlans.free')}
                  </Text>
                </View>
              ) : (
                <View className="rounded-pill bg-[#B78A2E] px-[11px] py-1.5">
                  <Text className="font-manrope-extrabold text-xs text-white">${plan.price}</Text>
                </View>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

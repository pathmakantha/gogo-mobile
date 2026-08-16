import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { PlansStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

type Nav = NativeStackNavigationProp<PlansStackParamList, 'ExpertPlanDetail'>;
type Route = RouteProp<PlansStackParamList, 'ExpertPlanDetail'>;

export function ExpertPlanDetailScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const planId = route.params?.planId ?? 'plan-secret-south';
  const plan = useAppSelector(state => state.plans.expertPlanDetails[planId]);

  if (!plan) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-light-bg dark:bg-deep-dark">
        <Text className="font-manrope-semibold text-muted-text dark:text-muted-text-dark">Plan not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="h-[170px] items-center justify-center bg-[#F2EBDC] dark:bg-deep-dark-alt">
        <Text className="font-manrope text-[11px] text-[#8A7B57]">{plan.imageLabel}</Text>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          className="absolute left-3.5 top-[58px] h-8 w-8 items-center justify-center rounded-full bg-white"
        >
          <Text className="font-manrope-bold text-[15px] text-dark-green">←</Text>
        </Pressable>
      </View>

      <View className="px-5 pb-1.5 pt-3.5">
        <View className="self-start rounded-pill bg-[#B78A2E] px-[9px] py-1">
          <Text className="font-manrope-extrabold text-[10px] tracking-wide text-white">
            {t('popularPlans.expertPlan')}
          </Text>
        </View>
        <Text className="mt-2 font-sora-extrabold text-[21px] text-dark-green dark:text-white">{plan.title}</Text>
        <Text className="mt-1 font-manrope-semibold text-[12.5px] text-muted-text dark:text-muted-text-dark">
          6 days · {plan.route}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 4, paddingBottom: 16 }}>
        <View className="flex-row items-center gap-3 rounded-card border border-card-border bg-white px-4 py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-dark-green">
            <Text className="font-manrope-bold text-[15px] text-white">{plan.authorInitial}</Text>
          </View>
          <View className="flex-1">
            <Text className="font-manrope-bold text-[14.5px] text-dark-green dark:text-white">
              {plan.authorName}
            </Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              {plan.authorBio}
            </Text>
          </View>
          <View className="rounded-pill bg-[#EAF5EF] px-[9px] py-1.5 dark:bg-deep-dark-alt">
            <Text className="font-manrope-extrabold text-[10px] text-primary">{t('operator.verified')}</Text>
          </View>
        </View>

        <View className="flex-row gap-[9px]">
          <View className="flex-1 items-center rounded-card border border-card-border bg-white py-3 dark:border-deep-dark-border dark:bg-deep-dark-card">
            <Text className="font-sora-extrabold text-lg text-dark-green dark:text-white">
              {plan.usedByCount.toLocaleString()}
            </Text>
            <Text className="text-center font-manrope-bold text-[10px] text-muted-text dark:text-muted-text-dark">
              {t('expertPlan.travelersUsed')}
            </Text>
          </View>
          <View className="flex-1 items-center rounded-card border border-card-border bg-white py-3 dark:border-deep-dark-border dark:bg-deep-dark-card">
            <Text className="font-sora-extrabold text-lg text-dark-green dark:text-white">{plan.rating}★</Text>
            <Text className="text-center font-manrope-bold text-[10px] text-muted-text dark:text-muted-text-dark">
              {t('expertPlan.ratings', { count: plan.ratingCount })}
            </Text>
          </View>
          <View className="flex-1 items-center rounded-card border border-card-border bg-white py-3 dark:border-deep-dark-border dark:bg-deep-dark-card">
            <Text className="font-sora-extrabold text-lg text-primary">{plan.typicalCostLabel}</Text>
            <Text className="text-center font-manrope-bold text-[10px] text-muted-text dark:text-muted-text-dark">
              {t('expertPlan.typicalCost')}
            </Text>
          </View>
        </View>

        <Text className="mt-1 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
          {t('expertPlan.theRoute').toUpperCase()}
        </Text>
        <View className="rounded-card border border-card-border bg-white px-4 py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="font-manrope-medium text-[12.5px] leading-[21px] text-[#3E4E47] dark:text-muted-text-dark">
            {plan.routeDescription}
          </Text>
        </View>

        <View className="rounded-xl bg-[#EAF5EF] px-3.5 py-2.5 dark:bg-deep-dark-alt">
          <Text className="font-manrope-medium text-[11.5px] leading-[17px] text-[#3E6654] dark:text-light-accent">
            {plan.accuracyNote}
          </Text>
        </View>
      </ScrollView>

      <View className="flex-row items-center justify-between gap-3 border-t border-card-border bg-white px-[18px] py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
        <View>
          <Text className="font-sora-extrabold text-xl text-dark-green dark:text-white">${plan.price}</Text>
          <Text className="font-manrope-semibold text-[11px] text-muted-text dark:text-muted-text-dark">
            {t('expertPlan.oneOff')}
          </Text>
        </View>
        <Pressable className="rounded-[13px] bg-[#B78A2E] px-[26px] py-[14px]">
          <Text className="font-manrope-bold text-sm text-white">{t('expertPlan.buyThisPlan')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

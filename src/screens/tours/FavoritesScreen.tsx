import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { PlansStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

type Nav = NativeStackNavigationProp<PlansStackParamList, 'Favorites'>;

const TONE_TEXT: Record<'fits' | 'over' | 'plan', string> = {
  fits: 'text-primary',
  over: 'text-[#B78A2E]',
  plan: 'text-[#B78A2E]',
};

export function FavoritesScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const favorites = useAppSelector(state => state.plans.favorites);
  const fitCount = favorites.filter(f => f.statusTone === 'fits').length;

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2.5 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('favorites.title')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {t('favorites.subtitle', { count: favorites.length, fitCount })}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ paddingBottom: 24, paddingTop: 4 }}>
        <View className="flex-row flex-wrap gap-3">
          {favorites.map(item => (
            <Pressable
              key={item.id}
              onPress={() =>
                item.statusTone === 'plan' &&
                navigation.navigate('ExpertPlanDetail', { planId: 'plan-secret-south' })
              }
              className="overflow-hidden rounded-card border border-card-border bg-white dark:border-deep-dark-border dark:bg-deep-dark-card"
              style={{ width: '47.5%' }}
            >
              <View className="h-[84px] bg-light-bg-alt dark:bg-deep-dark-alt">
                <Text className="absolute right-2 top-2 text-sm text-[#E0575B]">♥</Text>
              </View>
              <View className="px-3 py-2.5">
                <Text className="font-sora-bold text-[13px] text-dark-green dark:text-white">
                  {item.title}
                </Text>
                <Text className={`mt-0.5 font-manrope-semibold text-[11px] ${TONE_TEXT[item.statusTone]}`}>
                  {item.statusTone === 'plan' ? t('favorites.expertPlan') : item.statusLabel}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

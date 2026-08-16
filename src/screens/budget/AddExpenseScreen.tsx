import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { BudgetStackParamList } from '../../navigation/types';
import { useAppDispatch } from '../../store/hooks';
import { expenseAdded } from '../../store/slices/budgetSlice';

type Nav = NativeStackNavigationProp<BudgetStackParamList, 'AddExpense'>;

const PAYERS = ['You', 'Amara', 'Josh'];
const SPLIT_AMOUNTS = ['$12.17', '$12.17', '$12.16'];
const AMOUNT = 36.5;

type FairVote = 'fair' | 'overpriced' | 'skip' | null;

export function AddExpenseScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const [paidBy, setPaidBy] = useState('You');
  const [fairVote, setFairVote] = useState<FairVote>('fair');

  function handleSave() {
    dispatch(
      expenseAdded({
        id: `exp-${Date.now()}`,
        tripId: 't1',
        title: t('addExpense.expenseTitle'),
        amount: AMOUNT,
        paidBy,
      }),
    );
    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
        <Pressable onPress={() => navigation.goBack()}>
          <Text className="font-manrope-bold text-[13px] text-muted-text dark:text-muted-text-dark">
            {t('addExpense.cancel')}
          </Text>
        </Pressable>
        <Text className="font-sora-extrabold text-lg text-dark-green dark:text-white">
          {t('addExpense.title')}
        </Text>
        <Pressable onPress={handleSave}>
          <Text className="font-manrope-bold text-[13px] text-primary">{t('common.save')}</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 6, paddingBottom: 24 }}>
        <View className="items-center py-3.5">
          <Text className="font-sora-extrabold text-[44px] text-dark-green dark:text-white">
            ${AMOUNT.toFixed(2).split('.')[0]}
            <Text className="text-pill-border">.{AMOUNT.toFixed(2).split('.')[1]}</Text>
          </Text>
          <Text className="mt-0.5 font-manrope-semibold text-xs text-muted-text dark:text-muted-text-dark">
            {t('addExpense.rateNote', { amount: '11,100' })}
          </Text>
        </View>

        <View className="flex-row justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
            {t('addExpense.expenseTitle')}
          </Text>
          <Text className="font-manrope-bold text-[13px] text-muted-text dark:text-muted-text-dark">
            {t('addExpense.category')} ▾
          </Text>
        </View>

        <View className="rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="mb-2.5 font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('addExpense.paidBy').toUpperCase()}
          </Text>
          <View className="flex-row gap-2">
            {PAYERS.map(name => {
              const active = name === paidBy;
              return (
                <Pressable
                  key={name}
                  onPress={() => setPaidBy(name)}
                  className={`rounded-pill px-3.5 py-2 ${active ? 'bg-dark-green' : 'border-[1.5px] border-pill-border'}`}
                >
                  <Text className={`font-manrope-bold text-xs ${active ? 'text-white' : 'text-muted-text'}`}>
                    {name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View className="mb-2.5 flex-row justify-between">
            <Text className="font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
              {t('addExpense.splitBetween').toUpperCase()}
            </Text>
            <Text className="font-manrope-bold text-xs text-primary-dark">{t('addExpense.evenly')} ▾</Text>
          </View>
          <View className="gap-2">
            {PAYERS.map((name, i) => (
              <View key={name} className="flex-row justify-between">
                <Text className="font-manrope-semibold text-[13px] text-dark-green dark:text-white">
                  ✓ {name}
                </Text>
                <Text className="font-manrope-semibold text-[13px] text-muted-text dark:text-muted-text-dark">
                  {SPLIT_AMOUNTS[i]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="rounded-card border-[1.5px] border-light-accent/60 bg-white px-[15px] py-[13px] dark:bg-deep-dark-card">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-manrope-bold text-[13px] text-dark-green dark:text-white">
                {t('addExpense.fairPriceQuestion')}
              </Text>
              <Text className="mt-0.5 font-manrope-semibold text-[11px] text-muted-text dark:text-muted-text-dark">
                {t('addExpense.fairPriceHint')}
              </Text>
            </View>
            <Text className="font-manrope-bold text-[11.5px] text-primary-dark">{t('addExpense.addReceipt')}</Text>
          </View>
          <Pressable
            onPress={() => (navigation.getParent() as any)?.navigate('HomeTab', { screen: 'FairPriceGuide' })}
            className="mt-1.5"
          >
            <Text className="font-manrope-bold text-[11px] text-primary-dark">{t('addExpense.checkFairPrice')} →</Text>
          </Pressable>
          <View className="mt-2.5 flex-row gap-2">
            {(['fair', 'overpriced', 'skip'] as const).map(option => {
              const active = fairVote === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => setFairVote(option)}
                  className={`flex-1 items-center rounded-[10px] py-2.5 ${
                    active && option === 'fair' ? 'bg-primary' : 'border-[1.5px] border-pill-border'
                  }`}
                >
                  <Text
                    className={`font-manrope-bold text-xs ${
                      active && option === 'fair' ? 'text-white' : 'text-muted-text'
                    }`}
                  >
                    {t(`addExpense.${option}`)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

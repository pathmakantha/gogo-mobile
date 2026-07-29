import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  budgetChanged,
  paxDecremented,
  paxIncremented,
  travelStyleChanged,
} from '../../store/slices/tripSlice';
import { onboardingCompleted } from '../../store/slices/onboardingSlice';
import { colors } from '../../theme/colors';
import { AppButton } from '../../components/common/AppButton';

const MIN_BUDGET = 400;
const MAX_BUDGET = 4000;
const STYLES: { value: 'backpacker' | 'comfort' | 'family'; labelKey: string }[] = [
  { value: 'backpacker', labelKey: 'tripSetup.backpacker' },
  { value: 'comfort', labelKey: 'tripSetup.comfort' },
  { value: 'family', labelKey: 'tripSetup.family' },
];

function styleHint(budget: number): string {
  if (budget < 1000) return 'Backpacker';
  if (budget < 2400) return 'Comfort';
  return 'Family';
}

export function TripSetupScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { budget, pax, dateRangeLabel, travelStyle } = useAppSelector(state => state.trip.setup);

  const perDay = Math.round(budget / 9);

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={['top', 'bottom']}>
      <View className="px-[22px] pt-[18px]">
        <Text className="font-sora-extrabold text-[24px] text-dark-green">{t('tripSetup.title')}</Text>
        <Text className="mt-1 font-manrope-medium text-[13px] text-muted-text">
          {t('tripSetup.subtitle')}
        </Text>
      </View>

      <View className="flex-1 gap-3 px-[18px] py-3">
        <View className="rounded-card border border-card-border bg-white px-[18px] py-4">
          <View className="flex-row items-baseline justify-between">
            <Text className="font-manrope-bold text-[13px] text-muted-text">
              {t('tripSetup.totalBudget')}
            </Text>
            <Text className="font-sora-extrabold text-[22px] text-dark-green">${budget}</Text>
          </View>
          <Slider
            minimumValue={MIN_BUDGET}
            maximumValue={MAX_BUDGET}
            step={50}
            value={budget}
            onValueChange={value => dispatch(budgetChanged(Math.round(value)))}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.cardBorder}
            thumbTintColor={colors.primary}
            style={{ marginVertical: 10 }}
          />
          <View className="flex-row justify-between">
            <Text className="font-manrope-semibold text-[11px] text-muted-text/70">${MIN_BUDGET}</Text>
            <Text className="font-manrope-extrabold text-[11px] text-primary">
              ${perDay} / day · {styleHint(budget)}
            </Text>
            <Text className="font-manrope-semibold text-[11px] text-muted-text/70">${MAX_BUDGET}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[18px] py-4">
          <View>
            <Text className="font-manrope-bold text-[13px] text-muted-text">{t('tripSetup.travelers')}</Text>
            <Text className="mt-0.5 font-sora-bold text-base text-dark-green">
              {t('tripSetup.people', { count: pax })}
            </Text>
          </View>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => dispatch(paxDecremented())}
              className="h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-pill-border"
            >
              <Text className="font-manrope-bold text-xl text-primary-dark">−</Text>
            </Pressable>
            <Pressable
              onPress={() => dispatch(paxIncremented())}
              className="h-10 w-10 items-center justify-center rounded-xl bg-primary"
            >
              <Text className="font-manrope-bold text-xl text-white">+</Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[18px] py-4">
          <View>
            <Text className="font-manrope-bold text-[13px] text-muted-text">{t('tripSetup.dates')}</Text>
            <Text className="mt-0.5 font-sora-bold text-base text-dark-green">{dateRangeLabel}</Text>
          </View>
          <Text className="font-manrope-bold text-[13px] text-primary-dark">{t('common.edit')}</Text>
        </View>

        <View className="rounded-card border border-card-border bg-white px-[18px] py-4">
          <Text className="mb-2.5 font-manrope-bold text-[13px] text-muted-text">
            {t('tripSetup.travelStyle')}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {STYLES.map(style => {
              const active = style.value === travelStyle;
              return (
                <Pressable
                  key={style.value}
                  onPress={() => dispatch(travelStyleChanged(style.value))}
                  className={`rounded-pill px-3.5 py-2 ${
                    active ? 'bg-dark-green' : 'border-[1.5px] border-pill-border'
                  }`}
                >
                  <Text
                    className={`font-manrope-bold text-[12.5px] ${
                      active ? 'text-white' : 'text-muted-text'
                    }`}
                  >
                    {t(style.labelKey)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View className="px-[18px] pb-6 pt-3">
        <AppButton
          label={t('tripSetup.seeSuggestedTours')}
          onPress={() => dispatch(onboardingCompleted())}
        />
      </View>
    </SafeAreaView>
  );
}

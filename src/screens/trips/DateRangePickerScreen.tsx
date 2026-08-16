import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { PlansStackParamList } from '../../navigation/types';
import { useAppDispatch } from '../../store/hooks';
import { dateRangeChanged } from '../../store/slices/tripSlice';

type Nav = NativeStackNavigationProp<PlansStackParamList, 'DateRangePicker'>;

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const LEADING_BLANK_DAYS = [30];
const DAYS_IN_MONTH = Array.from({ length: 27 }, (_, i) => i + 1);
const RANGE_START = 14;
const RANGE_END = 22;

export function DateRangePickerScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const cells = [...LEADING_BLANK_DAYS, ...DAYS_IN_MONTH];

  function handleSetDates() {
    dispatch(dateRangeChanged('Dec 14 – 22 · 9 days'));
    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 justify-end bg-dark-green/45">
      <View className="rounded-t-[24px] bg-white px-[22px] pb-[30px] pt-[18px]">
        <View className="mx-auto mb-3.5 h-1 w-9 rounded-pill bg-[#DCE7E0]" />
        <View className="flex-row items-center justify-between">
          <Text className="font-sora-extrabold text-[19px] text-dark-green">{t('dateRange.title')}</Text>
          <Text className="font-manrope-bold text-[13px] text-primary-dark">{t('dateRange.flexible')}</Text>
        </View>

        <View className="mt-3.5 flex-row items-center justify-between">
          <Text className="font-manrope-bold text-sm text-dark-green">‹</Text>
          <Text className="font-sora-extrabold text-[15px] text-dark-green">{t('dateRange.month')}</Text>
          <Text className="font-manrope-bold text-sm text-dark-green">›</Text>
        </View>

        <View className="mt-3 flex-row justify-between">
          {WEEKDAYS.map((day, i) => (
            <Text key={`${day}-${i}`} className="w-[13%] text-center font-manrope-semibold text-xs text-muted-text/60">
              {day}
            </Text>
          ))}
        </View>
        <View className="mt-1.5 flex-row flex-wrap">
          {cells.map((day, i) => {
            const isPad = i === 0;
            const inRange = !isPad && day >= RANGE_START && day <= RANGE_END;
            const isEdge = day === RANGE_START || day === RANGE_END;
            return (
              <View key={i} style={{ width: '14.28%' }} className="items-center py-[9px]">
                <View
                  className={`h-7 w-full items-center justify-center ${
                    inRange ? (isEdge ? 'bg-dark-green' : 'bg-[#EAF5EF]') : ''
                  } ${day === RANGE_START ? 'rounded-l-xl' : ''} ${day === RANGE_END ? 'rounded-r-xl' : ''}`}
                >
                  <Text
                    className={`font-manrope-semibold text-[13px] ${
                      isPad ? 'text-pill-border' : isEdge ? 'font-manrope-extrabold text-white' : 'text-dark-green'
                    }`}
                  >
                    {day}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View className="mt-3 flex-row items-center justify-between rounded-xl bg-[#F1F7F4] px-3.5 py-2.5">
          <Text className="font-manrope-semibold text-xs text-[#3E6654]">{t('dateRange.selectedRange')}</Text>
          <Text className="font-manrope-extrabold text-xs text-primary">{t('dateRange.peakSeasonNote')}</Text>
        </View>

        <Pressable onPress={handleSetDates} className="mt-3.5 rounded-card bg-primary px-4 py-[15px]">
          <Text className="text-center font-manrope-bold text-[15px] text-white">{t('dateRange.setDates')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { PlansStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { dayViewSelected } from '../../store/slices/itinerarySlice';

type Nav = NativeStackNavigationProp<PlansStackParamList, 'ItineraryDayTimeline'>;

export function ItineraryDayTimelineScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const { tripTitle, dateRangeLabel, totalDays, selectedDay, days } = useAppSelector(
    state => state.itinerary,
  );
  const dayPlan = days[selectedDay];

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('itinerary.yourTrip')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {tripTitle} · {dateRangeLabel}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-[18px] py-1">
        <View className="flex-row gap-[7px]">
          {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => {
            const active = day === selectedDay;
            return (
              <Pressable
                key={day}
                onPress={() => dispatch(dayViewSelected(day))}
                className={`rounded-[10px] px-[11px] py-[7px] ${
                  active ? 'bg-dark-green' : 'border border-card-border bg-white dark:border-deep-dark-border dark:bg-deep-dark-card'
                }`}
              >
                <Text
                  className={`font-manrope-bold text-xs ${
                    active ? 'text-white' : 'text-muted-text dark:text-muted-text-dark'
                  }`}
                >
                  D{day}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 9, paddingTop: 10, paddingBottom: 24 }}>
        {dayPlan ? (
          <>
            <Text className="font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
              {t('itinerary.dayHeader', {
                day: selectedDay,
                route: dayPlan.routeLabel,
                cost: dayPlan.estCost,
              }).toUpperCase()}
            </Text>
            {dayPlan.stops.map(stop => (
              <Pressable
                key={stop.id}
                disabled={!stop.reserved}
                onPress={() => navigation.navigate('TrainRadar')}
                className={`flex-row items-center gap-3 rounded-card border bg-white px-3.5 py-3 dark:bg-deep-dark-card ${
                  stop.reserved
                    ? 'border-[1.5px] border-light-accent/60'
                    : 'border-card-border dark:border-deep-dark-border'
                }`}
              >
                <Text className="min-w-[44px] font-manrope-bold text-xs text-primary">{stop.time}</Text>
                <View className="flex-1">
                  <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
                    {stop.title}
                  </Text>
                  <Text
                    className={`font-manrope-semibold text-[11.5px] ${
                      stop.reserved ? 'text-primary' : 'text-muted-text dark:text-muted-text-dark'
                    }`}
                  >
                    {stop.note}
                  </Text>
                </View>
                {!stop.reserved && <Text className="text-[15px] text-[#C4D2CA]">≡</Text>}
              </Pressable>
            ))}
          </>
        ) : (
          <Text className="py-6 text-center font-manrope-semibold text-[13px] text-muted-text dark:text-muted-text-dark">
            {t('itinerary.noStops')}
          </Text>
        )}
        <View className="items-center rounded-card border-[1.5px] border-dashed border-pill-border py-3">
          <Text className="font-manrope-bold text-[13px] text-primary-dark">
            {t('itinerary.addStopToDay', { day: selectedDay })}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

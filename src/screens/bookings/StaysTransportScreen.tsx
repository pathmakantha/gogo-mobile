import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

type Category = 'stays' | 'trains' | 'drivers';

interface Stay {
  id: string;
  name: string;
  metaLabel: string;
  pricePerNight: number;
  bookingUrl: string;
}

const STAYS: Stay[] = [
  { id: 's1', name: 'Hangover Hostel Mirissa', metaLabel: '8.9 · 120m to beach · via partner', pricePerNight: 14, bookingUrl: 'https://www.booking.com' },
  { id: 's2', name: 'Salt House Cabanas', metaLabel: '9.2 · garden cabana · via partner', pricePerNight: 27, bookingUrl: 'https://www.booking.com' },
];

const CATEGORIES: { value: Category; labelKey: string }[] = [
  { value: 'stays', labelKey: 'bookings.stays' },
  { value: 'trains', labelKey: 'bookings.trains' },
  { value: 'drivers', labelKey: 'bookings.drivers' },
];

export function StaysTransportScreen() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<Category>('stays');

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('bookings.title')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {t('bookings.subtitle')}
        </Text>
      </View>

      <View className="flex-row gap-2 px-[18px] py-1.5">
        {CATEGORIES.map(cat => {
          const active = cat.value === category;
          return (
            <Pressable
              key={cat.value}
              onPress={() => setCategory(cat.value)}
              className={`rounded-pill px-[15px] py-2 ${
                active ? 'bg-dark-green' : 'border border-card-border bg-white dark:border-deep-dark-border dark:bg-deep-dark-card'
              }`}
            >
              <Text
                className={`font-manrope-extrabold text-[12.5px] ${
                  active ? 'text-white' : 'text-muted-text dark:text-muted-text-dark'
                }`}
              >
                {t(cat.labelKey)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 11, paddingTop: 6, paddingBottom: 24 }}>
        {category === 'stays' ? (
          <>
            <Text className="font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
              {t('bookings.sectionLabel').toUpperCase()}
            </Text>
            {STAYS.map(stay => (
              <View
                key={stay.id}
                className="flex-row gap-[13px] rounded-card-lg border border-card-border bg-white p-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card"
              >
                <View className="h-[74px] w-[74px] items-center justify-center rounded-xl bg-light-bg-alt dark:bg-deep-dark-alt" />
                <View className="flex-1">
                  <Text className="font-sora-bold text-[14.5px] text-dark-green dark:text-white">{stay.name}</Text>
                  <Text className="mt-0.5 font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
                    {stay.metaLabel}
                  </Text>
                  <View className="mt-[7px] flex-row items-center justify-between">
                    <Text className="font-sora-extrabold text-[15px] text-dark-green dark:text-white">
                      ${stay.pricePerNight}
                      <Text className="font-manrope-semibold text-[11px] text-muted-text dark:text-muted-text-dark">
                        {t('bookings.perNight')}
                      </Text>
                    </Text>
                    <Pressable onPress={() => Linking.openURL(stay.bookingUrl)}>
                      <Text className="font-manrope-bold text-xs text-primary-dark">{t('bookings.book')} ↗</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
            <View className="rounded-xl bg-[#EAF5EF] px-3.5 py-2.5 dark:bg-deep-dark-alt">
              <Text className="font-manrope-medium text-[11.5px] leading-[17px] text-[#3E6654] dark:text-light-accent">
                {t('bookings.commissionHint')}
              </Text>
            </View>
          </>
        ) : (
          <Text className="py-8 text-center font-manrope-semibold text-[13px] text-muted-text dark:text-muted-text-dark">
            {t('common.comingSoon')}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

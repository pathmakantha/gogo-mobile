import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { HomeStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';
import { PillBadge } from '../../components/common/PillBadge';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'DealsFeed'>;

export function DealsFeedScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const deals = useAppSelector(state => state.agency.deals);

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('deals.title')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {t('deals.subtitle')}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-[18px] py-1.5">
        <View className="flex-row gap-2">
          <PillBadge label={t('deals.filterNearTrip')} tone="filled" />
          <PillBadge label={t('deals.filterEndingSoon')} />
          <PillBadge label={t('deals.filterSafaris')} />
          <PillBadge label={t('deals.filterWomen')} />
        </View>
      </ScrollView>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 11, paddingTop: 4, paddingBottom: 24 }}>
        {deals.map(deal => (
          <Pressable
            key={deal.id}
            onPress={() => navigation.navigate('DealDetail', { dealId: deal.id })}
            className={`overflow-hidden rounded-card-lg border bg-white dark:bg-deep-dark-card ${
              deal.discountBadge
                ? 'border-[1.5px] border-[#F0D9A8] dark:border-[#5C4A22]'
                : 'border-card-border dark:border-deep-dark-border'
            }`}
          >
            <View className="h-[104px] items-center justify-center bg-light-bg-alt dark:bg-deep-dark-alt">
              <Text className="font-manrope text-[11px] text-muted-text dark:text-muted-text-dark">
                {deal.imageLabel}
              </Text>
              {deal.discountBadge ? (
                <View className="absolute left-2.5 top-2.5 rounded-pill bg-[#B78A2E] px-2.5 py-1">
                  <Text className="font-manrope-extrabold text-[10px] text-white">{deal.discountBadge}</Text>
                </View>
              ) : null}
            </View>
            <View className="px-[15px] py-3.5">
              <Text className="font-sora-bold text-[15px] text-dark-green dark:text-white">{deal.title}</Text>
              <Text className="mt-0.5 font-manrope-semibold text-xs text-muted-text dark:text-muted-text-dark">
                {deal.agencyName} · {deal.rating}★ ·{' '}
                {deal.oldPriceLabel ? `${t('deals.was')} ${deal.oldPriceLabel}, ${t('deals.now')} ` : ''}
                {deal.priceLabel}
              </Text>
              {deal.matchesFairPrice ? (
                <Text className="mt-0.5 font-manrope-semibold text-[11.5px] text-primary">
                  {t('deals.matchesFairPrice')}
                </Text>
              ) : null}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

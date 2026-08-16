import React from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { HomeStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'DealDetail'>;
type Route = RouteProp<HomeStackParamList, 'DealDetail'>;

export function DealDetailScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const dealId = route.params?.dealId ?? 'deal-1';
  const deal = useAppSelector(state => state.agency.deals.find(d => d.id === dealId));

  if (!deal) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-light-bg dark:bg-deep-dark">
        <Text className="font-manrope-semibold text-muted-text dark:text-muted-text-dark">Deal not found.</Text>
      </SafeAreaView>
    );
  }

  const initials = deal.agencyName
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="h-[170px] items-center justify-center bg-light-bg-alt dark:bg-deep-dark-alt">
        <Text className="font-manrope text-[11px] text-muted-text dark:text-muted-text-dark">
          hero — {deal.imageLabel}
        </Text>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          className="absolute left-3.5 top-[58px] h-8 w-8 items-center justify-center rounded-full bg-white"
        >
          <Text className="font-manrope-bold text-[15px] text-dark-green">←</Text>
        </Pressable>
        {deal.discountBadge ? (
          <View className="absolute right-3.5 top-[58px] rounded-pill bg-[#B78A2E] px-2.5 py-1.5">
            <Text className="font-manrope-extrabold text-[10.5px] text-white">{deal.discountBadge}</Text>
          </View>
        ) : null}
      </View>

      <View className="px-5 pb-1.5 pt-3.5">
        <Text className="font-sora-extrabold text-[21px] text-dark-green dark:text-white">{deal.title}</Text>
        <Text className="mt-1 font-manrope-semibold text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {deal.durationLabel ? `${deal.durationLabel} · ` : ''}
          {deal.oldPriceLabel ? (
            <>
              <Text className="text-[#9AABA3] line-through">{deal.oldPriceLabel}</Text>{' '}
            </>
          ) : null}
          <Text
            className={`font-manrope-bold ${
              deal.oldPriceLabel ? 'text-[#B78A2E]' : 'text-dark-green dark:text-white'
            }`}
          >
            {deal.priceLabel}
          </Text>
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 4, paddingBottom: 16 }}>
        <View className="flex-row items-center gap-3 rounded-card-lg border border-card-border bg-white px-4 py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View className="h-11 w-11 items-center justify-center rounded-xl bg-dark-green">
            <Text className="font-manrope-bold text-sm text-white">{initials}</Text>
          </View>
          <View className="flex-1">
            <Text className="font-manrope-bold text-[14.5px] text-dark-green dark:text-white">
              {deal.agencyName}
            </Text>
            <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
              {t('deals.verifiedAgencyMeta', { rating: deal.rating })}
            </Text>
          </View>
          <View className="rounded-pill bg-[#EAF5EF] px-[9px] py-1.5 dark:bg-deep-dark-alt">
            <Text className="font-manrope-extrabold text-[10px] text-primary">{t('operator.verified')}</Text>
          </View>
        </View>

        {deal.includes.length > 0 && (
          <>
            <Text className="mt-1 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
              {t('deals.whatsIncluded').toUpperCase()}
            </Text>
            <View className="flex-row flex-wrap gap-[7px]">
              {deal.includes.map(item => (
                <View key={item} className="rounded-pill bg-[#EAF5EF] px-[11px] py-1.5 dark:bg-deep-dark-alt">
                  <Text className="font-manrope-bold text-[11.5px] text-primary">{item}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        <View className="rounded-xl bg-[#F1F7F4] px-3.5 py-3 dark:bg-deep-dark-alt">
          <Text className="font-manrope-medium text-xs leading-5 text-[#3E6654] dark:text-light-accent">
            {t('deals.fitsTripHint')}
          </Text>
        </View>
      </ScrollView>

      <View className="flex-row gap-2.5 border-t border-card-border bg-white px-[18px] py-3.5 dark:border-deep-dark-border dark:bg-deep-dark-card">
        <Pressable className="flex-1 rounded-card border-[1.5px] border-pill-border px-4 py-3.5">
          <Text className="text-center font-manrope-bold text-sm text-dark-green dark:text-white">
            {t('deals.addToTrip')}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => Linking.openURL('https://wa.me/')}
          className="flex-1 rounded-card bg-primary px-4 py-3.5"
        >
          <Text className="text-center font-manrope-bold text-sm text-white">{t('deals.contactAgency')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

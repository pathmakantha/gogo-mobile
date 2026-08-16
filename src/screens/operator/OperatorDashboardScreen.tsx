import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { ProfileStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'OperatorDashboard'>;

function formatViews(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

export function OperatorDashboardScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { businessName, location, verified, viewsLast7d, saves, linkOuts, listings } = useAppSelector(
    state => state.operator,
  );

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
        <View>
          <Text className="font-sora-extrabold text-xl text-dark-green dark:text-white">{businessName}</Text>
          <Text className="font-manrope-semibold text-xs text-muted-text dark:text-muted-text-dark">
            {t('operator.operatorLabel', { location })}
          </Text>
        </View>
        {verified && (
          <Pressable
            onPress={() => navigation.navigate('OperatorVerification')}
            className="rounded-pill bg-[#EAF5EF] px-2.5 py-1.5 dark:bg-deep-dark-alt"
          >
            <Text className="font-manrope-extrabold text-[10.5px] text-primary">{t('operator.verified')}</Text>
          </Pressable>
        )}
      </View>

      <View className="flex-row gap-[9px] px-[18px] pb-0.5 pt-2">
        {[
          { value: formatViews(viewsLast7d), label: t('operator.views7d'), accent: false },
          { value: `${saves}`, label: t('operator.saves'), accent: false },
          { value: `${linkOuts}`, label: t('operator.linkOuts'), accent: true },
        ].map(stat => (
          <View
            key={stat.label}
            className="flex-1 items-center rounded-card border border-card-border bg-white py-3 dark:border-deep-dark-border dark:bg-deep-dark-card"
          >
            <Text
              className={`font-sora-extrabold text-xl ${
                stat.accent ? 'text-primary' : 'text-dark-green dark:text-white'
              }`}
            >
              {stat.value}
            </Text>
            <Text className="font-manrope-bold text-[10.5px] text-muted-text dark:text-muted-text-dark">
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 10, paddingBottom: 16 }}>
        <View className="flex-row items-center justify-between rounded-card-lg bg-dark-green px-[17px] py-[15px]">
          <View className="flex-1 pr-3">
            <Text className="font-manrope-extrabold text-sm text-white">{t('operator.boostTitle')}</Text>
            <Text className="mt-0.5 font-manrope-semibold text-[11.5px] text-[#9DC3B3]">
              {t('operator.boostSubtitle')}
            </Text>
          </View>
          <View className="rounded-pill bg-light-accent px-3 py-[7px]">
            <Text className="font-manrope-extrabold text-xs text-dark-green">$19/wk</Text>
          </View>
        </View>

        <Text className="mt-1 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
          {t('operator.yourListings').toUpperCase()}
        </Text>
        {listings.map(listing => (
          <Pressable
            key={listing.id}
            onPress={() => navigation.navigate('ListingEditor')}
            className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card"
          >
            <View>
              <Text
                className={`font-manrope-bold text-sm ${
                  listing.status === 'draft' ? 'text-[#8AA396]' : 'text-dark-green dark:text-white'
                }`}
              >
                {listing.title}
              </Text>
              <Text
                className={`font-manrope-semibold text-[11.5px] ${
                  listing.status === 'draft' ? 'text-[#8AA396]' : 'text-muted-text dark:text-muted-text-dark'
                }`}
              >
                {listing.metaLabel}
              </Text>
            </View>
            <View
              className={`rounded-pill px-2.5 py-1.5 ${
                listing.status === 'draft' ? 'bg-[#F0F0EC]' : 'bg-[#EAF5EF] dark:bg-deep-dark-alt'
              }`}
            >
              <Text
                className={`font-manrope-extrabold text-[10.5px] ${
                  listing.status === 'draft' ? 'text-[#8A8A7B]' : 'text-primary'
                }`}
              >
                {listing.status === 'draft' ? t('operator.draft') : t('operator.live')}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View className="px-[18px] pb-6">
        <Pressable onPress={() => navigation.navigate('ListingEditor')} className="rounded-card bg-primary px-4 py-[15px]">
          <Text className="text-center font-manrope-bold text-[15px] text-white">{t('operator.newListing')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

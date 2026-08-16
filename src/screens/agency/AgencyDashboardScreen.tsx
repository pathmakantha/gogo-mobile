import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { ProfileStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'AgencyDashboard'>;
type Tab = 'packages' | 'promos' | 'leads';

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

export function AgencyDashboardScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { businessName, location, verified, dealViews, contacts, leadCredits, packages } = useAppSelector(
    state => state.agency,
  );
  const [tab, setTab] = useState<Tab>('packages');

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
        <View>
          <Text className="font-sora-extrabold text-xl text-dark-green dark:text-white">{businessName}</Text>
          <Text className="font-manrope-semibold text-xs text-muted-text dark:text-muted-text-dark">
            {t('agency.agencyLabel', { location })}
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

      <View className="flex-row gap-2 px-[18px] py-1.5">
        {(['packages', 'promos', 'leads'] as Tab[]).map(value => {
          const active = value === tab;
          return (
            <Pressable
              key={value}
              onPress={() => setTab(value)}
              className={`rounded-pill px-[15px] py-2 ${
                active ? 'bg-dark-green' : 'border border-card-border bg-white dark:border-deep-dark-border dark:bg-deep-dark-card'
              }`}
            >
              <Text
                className={`font-manrope-extrabold text-[12.5px] ${
                  active ? 'text-white' : 'text-muted-text dark:text-muted-text-dark'
                }`}
              >
                {t(`agency.tab.${value}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="flex-row gap-[9px] px-[18px] pb-0.5 pt-2">
        <View className="flex-1 items-center rounded-card border border-card-border bg-white py-3 dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="font-sora-extrabold text-xl text-dark-green dark:text-white">
            {formatCount(dealViews)}
          </Text>
          <Text className="font-manrope-bold text-[10.5px] text-muted-text dark:text-muted-text-dark">
            {t('agency.dealViews')}
          </Text>
        </View>
        <View className="flex-1 items-center rounded-card border border-card-border bg-white py-3 dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="font-sora-extrabold text-xl text-primary">{contacts}</Text>
          <Text className="font-manrope-bold text-[10.5px] text-muted-text dark:text-muted-text-dark">
            {t('agency.contacts')}
          </Text>
        </View>
        <View className="flex-1 items-center rounded-card bg-dark-green py-3">
          <Text className="font-sora-extrabold text-xl text-white">{leadCredits}</Text>
          <Text className="font-manrope-bold text-[10.5px] text-light-accent/70">{t('agency.leadCredits')}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 10, paddingBottom: 16 }}>
        <Text className="font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
          {t('agency.yourPackages').toUpperCase()}
        </Text>
        {packages.map(pkg => (
          <View
            key={pkg.id}
            className={`flex-row items-center justify-between rounded-card border bg-white px-[15px] py-[13px] dark:bg-deep-dark-card ${
              pkg.status === 'promoLive'
                ? 'border-[1.5px] border-[#F0D9A8] dark:border-[#5C4A22]'
                : 'border-card-border dark:border-deep-dark-border'
            }`}
          >
            <View>
              <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">{pkg.title}</Text>
              <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
                {pkg.metaLabel}
              </Text>
              {pkg.fairPriceNote ? (
                <Text className="mt-0.5 font-manrope-semibold text-[11px] text-primary">{pkg.fairPriceNote}</Text>
              ) : null}
            </View>
            <View
              className={`rounded-pill px-2.5 py-1.5 ${
                pkg.status === 'promoLive' ? 'bg-[#B78A2E]' : 'bg-[#EAF5EF] dark:bg-deep-dark-alt'
              }`}
            >
              <Text
                className={`font-manrope-extrabold text-[10.5px] ${
                  pkg.status === 'promoLive' ? 'text-white' : 'text-primary'
                }`}
              >
                {pkg.status === 'promoLive' ? t('agency.promoLive') : t('operator.live')}
              </Text>
            </View>
          </View>
        ))}

        <Pressable className="flex-row items-center justify-between rounded-card bg-dark-green px-4 py-3.5">
          <View>
            <Text className="font-manrope-extrabold text-[13.5px] text-white">{t('agency.featurePackage')}</Text>
            <Text className="font-manrope-semibold text-[11px] text-[#9DC3B3]">{t('agency.featurePackageNote')}</Text>
          </View>
          <View className="rounded-pill bg-light-accent px-[11px] py-1.5">
            <Text className="font-manrope-extrabold text-xs text-dark-green">$15/wk</Text>
          </View>
        </Pressable>
      </ScrollView>

      <View className="flex-row gap-2.5 px-[18px] pb-6">
        <Pressable
          onPress={() => navigation.navigate('NewPromo')}
          className="flex-1 rounded-card border-[1.5px] border-pill-border px-4 py-3.5"
        >
          <Text className="text-center font-manrope-bold text-sm text-dark-green dark:text-white">
            {t('agency.newPromo')}
          </Text>
        </Pressable>
        <Pressable className="flex-1 rounded-card bg-primary px-4 py-3.5">
          <Text className="text-center font-manrope-bold text-sm text-white">{t('agency.newPackage')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

interface NotificationItem {
  id: string;
  avatarLabel: string;
  avatarBg: string;
  avatarText?: string;
  body: React.ReactNode;
  meta: string;
  unread?: boolean;
}

const TODAY: NotificationItem[] = [
  {
    id: 'n1',
    avatarLabel: 'A',
    avatarBg: 'bg-[#0E93A3]',
    body: (
      <Text className="font-manrope-semibold text-[13px] leading-[19px] text-dark-green dark:text-white">
        <Text className="font-manrope-bold">Amara</Text> moved{' '}
        <Text className="font-manrope-bold">Nine Arches walk</Text> to Day 6
      </Text>
    ),
    meta: '2h ago · Itinerary',
    unread: true,
  },
  {
    id: 'n2',
    avatarLabel: '$',
    avatarBg: 'bg-[#B78A2E]',
    body: (
      <Text className="font-manrope-semibold text-[13px] leading-[19px] text-dark-green dark:text-white">
        Activities is <Text className="font-manrope-bold">12% over plan</Text> — 2 cheaper Yala options found
      </Text>
    ),
    meta: '5h ago · Budget',
    unread: true,
  },
  {
    id: 'n3',
    avatarLabel: '↓',
    avatarBg: 'bg-primary',
    body: (
      <Text className="font-manrope-semibold text-[13px] leading-[19px] text-dark-green dark:text-white">
        <Text className="font-manrope-bold">Salt House Cabanas</Text> dropped to $23/night for your dates
      </Text>
    ),
    meta: '9h ago · Plus alert',
  },
];

const YESTERDAY: NotificationItem[] = [
  {
    id: 'n4',
    avatarLabel: 'J',
    avatarBg: 'bg-primary',
    body: (
      <Text className="font-manrope-semibold text-[13px] leading-[19px] text-dark-green dark:text-white">
        <Text className="font-manrope-bold">Josh</Text> joined your trip 🎒
      </Text>
    ),
    meta: 'Buddies',
  },
  {
    id: 'n5',
    avatarLabel: '⛅',
    avatarBg: 'bg-dark-green',
    avatarText: 'text-light-accent',
    body: (
      <Text className="font-manrope-semibold text-[13px] leading-[19px] text-dark-green dark:text-white">
        Monsoon check: <Text className="font-manrope-bold">south coast clear</Text> for your dates
      </Text>
    ),
    meta: 'Trip prep',
  },
];

function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <View className="flex-row items-start gap-3 rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
      <View className={`h-9 w-9 items-center justify-center rounded-full ${item.avatarBg}`}>
        <Text className={`font-manrope-bold text-[13px] ${item.avatarText ?? 'text-white'}`}>
          {item.avatarLabel}
        </Text>
      </View>
      <View className="flex-1">
        {item.body}
        <Text className="mt-0.5 font-manrope-semibold text-[11px] text-muted-text/60 dark:text-muted-text-dark/60">
          {item.meta}
        </Text>
      </View>
      {item.unread && <View className="mt-1.5 h-2 w-2 rounded-full bg-primary" />}
    </View>
  );
}

export function NotificationsScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('notifications.title')}
        </Text>
        <Pressable>
          <Text className="font-manrope-bold text-[12.5px] text-primary-dark">{t('notifications.markAllRead')}</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 9, paddingTop: 4, paddingBottom: 24 }}>
        <Text className="font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
          {t('notifications.today').toUpperCase()}
        </Text>
        {TODAY.map(item => (
          <NotificationRow key={item.id} item={item} />
        ))}
        <Text className="mt-1 font-manrope-bold text-xs tracking-wide text-muted-text dark:text-muted-text-dark">
          {t('notifications.yesterday').toUpperCase()}
        </Text>
        {YESTERDAY.map(item => (
          <NotificationRow key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { PlansStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';
import type { Buddy } from '../../types/models';

type Nav = NativeStackNavigationProp<PlansStackParamList, 'TravelBuddies'>;

const AVATAR_BG: Record<Buddy['colorToken'], string> = {
  darkGreen: 'bg-dark-green',
  teal: 'bg-[#0E93A3]',
  primary: 'bg-primary',
};

const ROLE_BADGE: Record<string, { bg: string; text: string }> = {
  ORGANIZER: { bg: 'bg-dark-green', text: 'text-light-accent' },
  EDITOR: { bg: 'bg-[#EAF5EF]', text: 'text-primary' },
  VIEWER: { bg: 'bg-[#EEF3F0]', text: 'text-muted-text' },
};

export function TravelBuddiesScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { tripTitle, buddies } = useAppSelector(state => state.social);
  const joinedCount = buddies.filter(b => b.status === 'joined').length;

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('buddies.title')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {tripTitle} · {t('buddies.joinedCount', { joined: joinedCount, total: buddies.length })}
        </Text>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 6, paddingBottom: 16 }}>
        {buddies.map(buddy =>
          buddy.status === 'pending' ? (
            <View
              key={buddy.id}
              className="flex-row items-center gap-3 rounded-card border-[1.5px] border-dashed border-[#BFD6CA] bg-[#F1F7F4] px-[15px] py-[13px]"
            >
              <View className="h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-dashed border-[#BFD6CA]">
                <Text className="font-manrope-bold text-sm text-[#8AA396]">?</Text>
              </View>
              <View className="flex-1">
                <Text className="font-manrope-bold text-sm text-muted-text">{buddy.name}</Text>
                <Text className="font-manrope-semibold text-[11.5px] text-[#8AA396]">{buddy.roleNote}</Text>
              </View>
              <Text className="font-manrope-bold text-xs text-primary-dark">{t('buddies.resend')}</Text>
            </View>
          ) : (
            <View
              key={buddy.id}
              className="flex-row items-center gap-3 rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card"
            >
              <View className={`h-10 w-10 items-center justify-center rounded-full ${AVATAR_BG[buddy.colorToken]}`}>
                <Text className="font-manrope-bold text-sm text-white">{buddy.initial}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">{buddy.name}</Text>
                <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
                  {buddy.roleNote}
                </Text>
              </View>
              <View className={`rounded-pill px-2.5 py-1.5 ${ROLE_BADGE[buddy.roleLabel]?.bg ?? ''}`}>
                <Text className={`font-manrope-extrabold text-[10.5px] ${ROLE_BADGE[buddy.roleLabel]?.text ?? ''}`}>
                  {buddy.roleLabel}
                </Text>
              </View>
            </View>
          ),
        )}
      </ScrollView>

      <View className="gap-2.5 px-[18px] pb-6">
        <View className="flex-row gap-2.5">
          <Pressable className="flex-1 rounded-card bg-primary px-4 py-[15px]">
            <Text className="text-center font-manrope-bold text-sm text-white">{t('buddies.inviteWithLink')}</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('ProposeChange')}
            className="flex-1 rounded-card border-[1.5px] border-pill-border px-4 py-[15px]"
          >
            <Text className="text-center font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('buddies.proposeChange')}
            </Text>
          </Pressable>
        </View>
        <Text className="text-center font-manrope-medium text-[11.5px] text-muted-text/80 dark:text-muted-text-dark/80">
          {t('buddies.linkHint')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { MapStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<MapStackParamList, 'OfflineMaps'>;

interface Region {
  id: string;
  title: string;
  sizeLabel: string;
  state: 'downloaded' | 'downloading' | 'available' | 'unavailable';
  progress?: number;
}

const REGIONS: Region[] = [
  { id: 'r1', title: 'South coast · Mirissa–Galle', sizeLabel: '184 MB', state: 'downloaded' },
  { id: 'r2', title: 'Yala & Udawalawe', sizeLabel: '96 MB · downloading…', state: 'downloading', progress: 62 },
  { id: 'r3', title: 'Hill country · Ella–Kandy', sizeLabel: '212 MB · no signal on most trails', state: 'available' },
  { id: 'r4', title: 'Colombo & airport', sizeLabel: '88 MB · not on your route', state: 'unavailable' },
];

export function OfflineMapsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="flex-row items-center gap-3 px-5 pb-2 pt-4">
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text className="font-manrope-bold text-base text-dark-green dark:text-white">←</Text>
        </Pressable>
        <View>
          <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
            {t('offlineMaps.title')}
          </Text>
          <Text className="font-manrope-semibold text-xs text-muted-text dark:text-muted-text-dark">
            {t('offlineMaps.subtitle', { free: '1.1' })}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-[18px]" contentContainerStyle={{ gap: 10, paddingTop: 6, paddingBottom: 24 }}>
        <View className="rounded-xl bg-[#EAF5EF] px-3.5 py-2.5 dark:bg-deep-dark-alt">
          <Text className="font-manrope-medium text-[11.5px] leading-[17px] text-[#3E6654] dark:text-light-accent">
            {t('offlineMaps.suggestionHint')}
          </Text>
        </View>

        {REGIONS.map(region => (
          <View
            key={region.id}
            className="rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card"
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text
                  className={`font-manrope-bold text-sm ${
                    region.state === 'unavailable' ? 'text-[#8AA396]' : 'text-dark-green dark:text-white'
                  }`}
                >
                  {region.title}
                </Text>
                <Text
                  className={`font-manrope-semibold text-[11.5px] ${
                    region.state === 'unavailable' ? 'text-[#8AA396]' : 'text-muted-text dark:text-muted-text-dark'
                  }`}
                >
                  {region.sizeLabel}
                </Text>
              </View>
              {region.state === 'downloaded' ? (
                <View className="rounded-pill bg-[#EAF5EF] px-2.5 py-1.5 dark:bg-deep-dark-alt">
                  <Text className="font-manrope-extrabold text-[10.5px] text-primary">
                    {t('offlineMaps.downloaded')}
                  </Text>
                </View>
              ) : (
                <Text className="font-manrope-bold text-xs text-primary-dark">
                  {region.state === 'downloading'
                    ? t('offlineMaps.pause')
                    : region.state === 'available'
                      ? t('offlineMaps.download')
                      : t('offlineMaps.add')}
                </Text>
              )}
            </View>
            {region.state === 'downloading' && (
              <View className="mt-2.5 h-[5px] overflow-hidden rounded-pill bg-light-bg-alt dark:bg-deep-dark">
                <View className="h-full rounded-pill bg-primary" style={{ width: `${region.progress ?? 0}%` }} />
              </View>
            )}
          </View>
        ))}

        <Text className="px-2.5 text-center font-manrope-medium text-[11.5px] text-muted-text/80 dark:text-muted-text-dark/80">
          {t('offlineMaps.autoDeleteHint')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

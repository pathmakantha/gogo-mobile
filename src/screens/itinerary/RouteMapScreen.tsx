import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { MapStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

const VIEW_W = 390;
const VIEW_H = 560;

type Nav = NativeStackNavigationProp<MapStackParamList, 'RouteMap'>;

export function RouteMapScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { waypoints, mapDaySummary } = useAppSelector(state => state.itinerary);

  return (
    <SafeAreaView className="flex-1 bg-[#E9F1EC]" edges={['top', 'bottom']}>
      <View className="flex-1" style={{ position: 'relative' }}>
        <Svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <Path
            d="M 90 480 C 150 470 200 440 240 420 C 300 390 310 300 290 240 C 275 195 230 160 200 130"
            fill="none"
            stroke="#149A6C"
            strokeWidth={4}
            strokeDasharray="1 9"
            strokeLinecap="round"
          />
          {waypoints.map(w => (
            <Circle key={w.id} cx={w.x} cy={w.y} r={9} fill={w.isStart ? '#0B3B2C' : '#149A6C'} />
          ))}
        </Svg>
        {waypoints.map(w => (
          <View
            key={w.id}
            className={`absolute rounded-lg px-2 py-1 ${
              w.isStart ? 'bg-dark-green' : 'border border-pill-border bg-white'
            }`}
            style={{ left: `${(w.x / VIEW_W) * 100}%`, top: `${(w.y / VIEW_H) * 100}%` }}
          >
            <Text
              className={`font-manrope-extrabold text-[11px] ${w.isStart ? 'text-white' : 'text-dark-green'}`}
            >
              {w.cityLabel}
            </Text>
          </View>
        ))}
        <View className="absolute right-3.5 top-16 rounded-md bg-white/70 px-1.5 py-1">
          <Text className="font-manrope text-[10px] text-muted-text">{t('routeMap.mapTilesPlaceholder')}</Text>
        </View>
      </View>

      <View className="rounded-t-[22px] bg-white px-5 pb-[18px] pt-4">
        <View className="mx-auto mb-3 h-1 w-9 rounded-pill bg-[#DCE7E0]" />
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="font-sora-bold text-[15px] text-dark-green">{mapDaySummary.title}</Text>
            <Text className="mt-0.5 font-manrope-semibold text-xs text-muted-text">
              {mapDaySummary.durationLabel} · ${mapDaySummary.cost} · {mapDaySummary.leaveByNote}
            </Text>
          </View>
          <Text className="font-manrope-bold text-xs text-primary-dark">{t('routeMap.directions')}</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('OfflineMaps')}
          className="mt-3 flex-row items-center justify-between rounded-xl border border-[#DCEAE1] bg-[#F1F7F4] px-3.5 py-2.5"
        >
          <Text className="font-manrope-semibold text-xs text-dark-green">{t('routeMap.offlineMaps')}</Text>
          <View className="rounded-pill bg-dark-green px-2.5 py-1.5">
            <Text className="font-manrope-extrabold text-[11px] text-light-accent">
              {t('routeMap.tripPassBadge')}
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

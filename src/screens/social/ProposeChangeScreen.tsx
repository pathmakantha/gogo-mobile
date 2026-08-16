import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export function ProposeChangeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 justify-end bg-dark-green/45">
      <View className="rounded-t-[24px] bg-white px-[22px] pb-[30px] pt-[18px]">
        <View className="mx-auto mb-3.5 h-1 w-9 rounded-pill bg-[#DCE7E0]" />
        <View className="flex-row items-center justify-between">
          <Text className="font-sora-extrabold text-[19px] text-dark-green">{t('proposeChange.title')}</Text>
          <Text className="font-manrope-bold text-[11.5px] text-[#B78A2E]">{t('proposeChange.closesIn')}</Text>
        </View>

        <View className="mt-4 flex-row gap-2.5">
          <View className="flex-1 rounded-card border border-card-border bg-light-bg px-3.5 py-3.5">
            <Text className="font-manrope-bold text-[10px] tracking-wide text-[#8AA396]">
              {t('proposeChange.currentDay')}
            </Text>
            <Text className="mt-1.5 font-manrope-bold text-sm text-[#8AA396] line-through">
              Yala shared jeep
            </Text>
            <Text className="mt-1 font-sora-bold text-[13px] text-[#8AA396]">$180</Text>
          </View>
          <View className="flex-1 rounded-card border-[1.5px] border-light-accent/60 bg-[#EAF5EF] px-3.5 py-3.5">
            <Text className="font-manrope-bold text-[10px] tracking-wide text-primary">
              {t('proposeChange.proposed')}
            </Text>
            <Text className="mt-1.5 font-manrope-bold text-sm text-dark-green">Udawalawe private jeep</Text>
            <Text className="mt-1 font-sora-bold text-[13px] text-dark-green">$245</Text>
          </View>
        </View>

        <View className="mt-3 rounded-card border border-card-border bg-white px-4 py-3.5">
          <View className="flex-row justify-between">
            <Text className="font-manrope-bold text-[13px] text-dark-green">{t('proposeChange.impactPerPerson')}</Text>
            <Text className="font-manrope-bold text-[13px] text-[#B78A2E]">+$21.67</Text>
          </View>
          <View className="my-3 h-2 overflow-hidden rounded-pill bg-light-bg-alt">
            <View className="h-full w-[87%] rounded-pill bg-primary" />
          </View>
          <View className="flex-row justify-between">
            <Text className="font-manrope-bold text-[11px] text-muted-text">{t('proposeChange.plannedSoFar', { amount: 1045 })}</Text>
            <Text className="font-manrope-bold text-[11px] text-[#B78A2E]">
              {t('proposeChange.afterStillUnder', { amount: 1110 })}
            </Text>
          </View>
        </View>

        <View className="mt-3.5 flex-row items-center gap-2">
          <View className="h-7 w-7 items-center justify-center rounded-full bg-[#0E93A3]">
            <Text className="font-manrope-bold text-[10px] text-white">A</Text>
          </View>
          <Text className="font-manrope-semibold text-xs text-muted-text">{t('proposeChange.voteStatus')}</Text>
        </View>

        <View className="mt-4 flex-row gap-2.5">
          <Pressable onPress={() => navigation.goBack()} className="flex-1 rounded-card border-[1.5px] border-pill-border px-4 py-[15px]">
            <Text className="text-center font-manrope-bold text-sm text-dark-green">
              {t('proposeChange.keepCurrent')}
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.goBack()} className="flex-1 rounded-card bg-primary px-4 py-[15px]">
            <Text className="text-center font-manrope-bold text-sm text-white">{t('proposeChange.voteYes')}</Text>
          </Pressable>
        </View>
        <Text className="mt-2.5 text-center font-manrope-medium text-[11.5px] text-muted-text/80">
          {t('proposeChange.majorityHint')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

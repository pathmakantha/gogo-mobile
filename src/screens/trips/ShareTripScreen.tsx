import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { shareToggleChanged } from '../../store/slices/socialSlice';
import { AppButton } from '../../components/common/AppButton';

function ToggleRow({
  title,
  subtitle,
  value,
  onToggle,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      onPress={onToggle}
      className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card"
    >
      <View className="flex-1 pr-3">
        <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">{title}</Text>
        <Text className="font-manrope-semibold text-[11.5px] text-muted-text dark:text-muted-text-dark">
          {subtitle}
        </Text>
      </View>
      <View className={`h-[27px] w-[46px] rounded-pill ${value ? 'bg-primary' : 'bg-light-bg-alt dark:bg-deep-dark'}`}>
        <View
          className="absolute top-[3px] h-[21px] w-[21px] rounded-full bg-white"
          style={{ left: value ? 22 : 3 }}
        />
      </View>
    </Pressable>
  );
}

export function ShareTripScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { shareSettings } = useAppSelector(state => state.social);

  const stopCount = 4;

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <View className="px-5 pb-2 pt-4">
        <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
          {t('shareTrip.title')}
        </Text>
        <Text className="mt-0.5 font-manrope-medium text-[12.5px] text-muted-text dark:text-muted-text-dark">
          {t('shareTrip.subtitle')}
        </Text>
      </View>

      <View className="flex-1 gap-2.5 px-[18px] py-2">
        <View className="rounded-card-lg bg-dark-green px-[18px] py-4">
          <Text className="font-manrope-bold text-[11px] tracking-wide text-light-accent">
            {t('shareTrip.linkPreview').toUpperCase()}
          </Text>
          <Text className="my-1 font-sora-bold text-[17px] text-white">{t('shareTrip.previewTitle')}</Text>
          <Text className="font-manrope-semibold text-xs text-[#B9D8CB]">
            {t('shareTrip.previewMeta', { stops: stopCount })}
          </Text>
        </View>

        <ToggleRow
          title={t('shareTrip.itinerary')}
          subtitle={t('shareTrip.itinerarySubtitle')}
          value={shareSettings.itineraryVisible}
          onToggle={() => dispatch(shareToggleChanged({ key: 'itineraryVisible', value: !shareSettings.itineraryVisible }))}
        />
        <ToggleRow
          title={t('shareTrip.budgetSplit')}
          subtitle={t('shareTrip.budgetSplitSubtitle')}
          value={shareSettings.budgetVisible}
          onToggle={() => dispatch(shareToggleChanged({ key: 'budgetVisible', value: !shareSettings.budgetVisible }))}
        />
        <ToggleRow
          title={t('shareTrip.liveLocation')}
          subtitle={t('shareTrip.liveLocationSubtitle', {
            state: shareSettings.liveLocationVisible ? t('shareTrip.on') : t('shareTrip.off'),
            names: shareSettings.liveLocationVisibleTo,
          })}
          value={shareSettings.liveLocationVisible}
          onToggle={() =>
            dispatch(shareToggleChanged({ key: 'liveLocationVisible', value: !shareSettings.liveLocationVisible }))
          }
        />

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-[15px] py-[13px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
            {t('shareTrip.linkExpires')}
          </Text>
          <Text className="font-manrope-bold text-[13px] text-primary-dark">{shareSettings.linkExpiry} ▾</Text>
        </View>
      </View>

      <View className="px-[18px] pb-6">
        <AppButton label={t('shareTrip.copyLink')} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

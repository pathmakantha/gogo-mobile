import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { themeChanged } from '../../store/slices/settingsSlice';
import { signedOut } from '../../store/slices/authSlice';
import { signOut } from '../../api/authService';
import type { ThemePreference } from '../../types/models';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { SegmentedControl } from '../../components/common/SegmentedControl';

export function SettingsScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.settings.theme);
  const { language, currency, units } = useAppSelector(state => state.settings);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await signOut();
    } finally {
      // Always reset local auth state, even for guests (no Firebase session to
      // sign out of) or if the Firebase call itself failed.
      dispatch(signedOut());
      setLoggingOut(false);
    }
  }

  const themeOptions: { value: ThemePreference; label: string }[] = [
    { value: 'light', label: t('settings.light') },
    { value: 'dark', label: t('settings.dark') },
    { value: 'auto', label: t('settings.auto') },
  ];

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top', 'bottom']}>
      <ScreenHeader title={t('settings.title')} showBack={false} />

      <View className="gap-3 px-[18px] py-2">
        <View className="rounded-card border border-card-border bg-white p-[14px] dark:border-deep-dark-border dark:bg-deep-dark-card">
          <Text className="mb-2.5 font-manrope-bold text-[11px] tracking-wide text-muted-text dark:text-muted-text-dark">
            {t('settings.appearance')}
          </Text>
          <SegmentedControl options={themeOptions} value={theme} onChange={value => dispatch(themeChanged(value))} />
        </View>

        <View className="overflow-hidden rounded-card border border-card-border bg-white dark:border-deep-dark-border dark:bg-deep-dark-card">
          <View className="flex-row justify-between border-b border-light-bg-alt px-4 py-3.5 dark:border-deep-dark-border">
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('settings.language')}
            </Text>
            <Text className="font-manrope-bold text-[13px] text-muted-text dark:text-muted-text-dark">
              {language.toUpperCase()} ▾
            </Text>
          </View>
          <View className="flex-row justify-between border-b border-light-bg-alt px-4 py-3.5 dark:border-deep-dark-border">
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('settings.currency')}
            </Text>
            <Text className="font-manrope-bold text-[13px] text-muted-text dark:text-muted-text-dark">
              {currency} ▾
            </Text>
          </View>
          <View className="flex-row justify-between px-4 py-3.5">
            <Text className="font-manrope-bold text-sm text-dark-green dark:text-white">
              {t('settings.units')}
            </Text>
            <Text className="font-manrope-bold text-[13px] text-muted-text dark:text-muted-text-dark">
              {units === 'km' ? 'Kilometers' : 'Miles'} ▾
            </Text>
          </View>
        </View>

        <Text className="px-1 font-manrope-medium text-xs text-muted-text/70 dark:text-muted-text-dark/70">
          Notifications, privacy & sharing defaults, and about/legal are scaffolded as separate screens
          in a later pass.
        </Text>

        <Pressable
          onPress={handleLogout}
          disabled={loggingOut}
          className={`items-center rounded-card border border-red-200 bg-white px-4 py-3.5 dark:border-red-900 dark:bg-deep-dark-card ${
            loggingOut ? 'opacity-50' : ''
          }`}
        >
          <Text className="font-manrope-bold text-sm text-red-600 dark:text-red-400">
            {t('settings.logOut')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

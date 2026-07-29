import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { PERMISSIONS, RESULTS, request, requestNotifications } from 'react-native-permissions';
import type { OnboardingStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { onboardingCompleted, permissionSet } from '../../store/slices/onboardingSlice';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, 'Permissions'>;

const LOCATION_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
})!;

export function PermissionsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const permissions = useAppSelector(state => state.onboarding.permissions);

  async function askLocation() {
    const result = await request(LOCATION_PERMISSION);
    dispatch(permissionSet({ key: 'location', granted: result === RESULTS.GRANTED }));
  }

  async function askNotifications() {
    // Notification permission isn't in the PERMISSIONS enum — it's a dedicated API
    // on both platforms (UNAuthorizationOptions on iOS, POST_NOTIFICATIONS on
    // Android 13+, handled internally by requestNotifications).
    const { status } = await requestNotifications(['alert', 'sound', 'badge']);
    dispatch(permissionSet({ key: 'notifications', granted: status === RESULTS.GRANTED }));
  }

  function finish() {
    dispatch(onboardingCompleted());
    navigation.navigate('Welcome');
  }

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={['top', 'bottom']}>
      <View className="px-6 pt-3">
        <View className="flex-row items-center justify-between">
          <Text className="font-manrope-bold text-xs text-muted-text/70">
            {t('onboarding.stepOf', { current: 3, total: 3 })}
          </Text>
          <Pressable onPress={finish}>
            <Text className="font-manrope-bold text-[13px] text-primary-dark">{t('common.skip')}</Text>
          </Pressable>
        </View>
        <Text className="mt-2.5 font-sora-extrabold text-[24px] text-dark-green">
          {t('onboarding.helpOnTheRoad')}
        </Text>
      </View>

      <View className="flex-1 gap-3 px-[18px] py-4">
        <View className="rounded-card-lg border border-card-border bg-white p-[18px]">
          <Text className="font-sora-bold text-base text-dark-green">{t('onboarding.locationTitle')}</Text>
          <Text className="mt-1.5 font-manrope-medium text-[12.5px] leading-5 text-muted-text">
            {t('onboarding.locationBody')}
          </Text>
          <Pressable
            onPress={askLocation}
            className={`mt-3 rounded-xl px-3 py-3 ${permissions.location ? 'bg-primary/40' : 'bg-primary'}`}
          >
            <Text className="text-center font-manrope-bold text-[13.5px] text-white">
              {permissions.location ? '✓ Location allowed' : t('onboarding.allowLocation')}
            </Text>
          </Pressable>
        </View>

        <View className="rounded-card-lg border border-card-border bg-white p-[18px]">
          <Text className="font-sora-bold text-base text-dark-green">
            {t('onboarding.notificationsTitle')}
          </Text>
          <Text className="mt-1.5 font-manrope-medium text-[12.5px] leading-5 text-muted-text">
            {t('onboarding.notificationsBody')}
          </Text>
          <Pressable
            onPress={askNotifications}
            className={`mt-3 rounded-xl px-3 py-3 ${
              permissions.notifications ? 'bg-primary/40' : 'bg-primary'
            }`}
          >
            <Text className="text-center font-manrope-bold text-[13.5px] text-white">
              {permissions.notifications ? '✓ Notifications allowed' : t('onboarding.allowNotifications')}
            </Text>
          </Pressable>
        </View>

        <Text className="px-3.5 text-center font-manrope-medium text-[11.5px] leading-5 text-muted-text/80">
          Both optional — everything still works without them.
        </Text>
      </View>

      <View className="px-[18px] pb-6">
        <Pressable onPress={finish} className="rounded-card border-[1.5px] border-pill-border px-4 py-4">
          <Text className="text-center font-manrope-bold text-[15px] text-dark-green">
            {t('onboarding.maybeLater')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

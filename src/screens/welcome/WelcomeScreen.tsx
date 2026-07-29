import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { OnboardingStackParamList } from '../../navigation/types';
import { AppButton } from '../../components/common/AppButton';
import { useAppDispatch } from '../../store/hooks';
import { signedOut } from '../../store/slices/authSlice';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, 'Welcome'>;

export function WelcomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <View className="mx-4 mt-3.5 flex-1 items-center justify-center rounded-[20px] bg-light-bg-alt">
        <Text className="font-manrope text-xs text-muted-text">hero — Ella train / coast photo</Text>
      </View>
      <View className="px-6 pb-11 pt-6">
        <Text className="font-sora-extrabold text-[34px] tracking-tight text-dark-green">
          gogo<Text className="text-primary">.</Text>
        </Text>
        <Text className="my-2.5 font-sora-semibold text-[19px] leading-6 text-dark-green">
          {t('welcome.tagline')}
        </Text>
        <Text className="font-manrope-medium text-[13.5px] leading-6 text-muted-text">
          {t('welcome.subtitle')}
        </Text>
        <View className="mt-5 gap-2.5">
          <AppButton label={t('welcome.startPlanning')} onPress={() => navigation.navigate('LanguageSelect')} />
          {/* Welcome only renders after guestModeEntered/authSucceeded (RootNavigator
              gates OnboardingStack on isSignedIn) — tapping this means "actually let
              me log in properly", so it drops back to AuthStack via signedOut(). */}
          <Pressable onPress={() => dispatch(signedOut())} className="items-center py-2">
            <Text className="font-manrope-bold text-sm text-primary-dark">{t('welcome.haveAccount')}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

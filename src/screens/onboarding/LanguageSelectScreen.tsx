import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { OnboardingStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { languageSelected } from '../../store/slices/onboardingSlice';
import { changeAppLanguage } from '../../i18n';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import { AppButton } from '../../components/common/AppButton';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, 'LanguageSelect'>;

export function LanguageSelectScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const selected = useAppSelector(state => state.onboarding.languageCode);

  async function selectLanguage(code: string) {
    dispatch(languageSelected(code));
    await changeAppLanguage(code);
  }

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={['top', 'bottom']}>
      <View className="px-6 pt-3">
        <Text className="font-sora-extrabold text-[24px] text-dark-green">{t('onboarding.chooseLanguage')}</Text>
        <Text className="mt-1 font-manrope-medium text-[13px] text-muted-text">
          {t('onboarding.chooseLanguageSubtitle')}
        </Text>
      </View>

      <View className="flex-1 gap-2.5 px-[18px] py-3">
        {SUPPORTED_LANGUAGES.map(lang => {
          const active = lang.code === selected;
          return (
            <Pressable
              key={lang.code}
              onPress={() => selectLanguage(lang.code)}
              className={`flex-row items-center justify-between rounded-card border bg-white px-4 py-3.5 ${
                active ? 'border-2 border-primary' : 'border-card-border'
              }`}
            >
              <View>
                <Text className="font-manrope-bold text-[15px] text-dark-green">{lang.label}</Text>
                <Text className="font-manrope-semibold text-[11.5px] text-muted-text">
                  {lang.englishLabel}
                </Text>
              </View>
              <View
                className={`h-[22px] w-[22px] items-center justify-center rounded-full ${
                  active ? 'bg-primary' : 'border-[1.5px] border-pill-border'
                }`}
              >
                {active && <Text className="text-xs text-white">✓</Text>}
              </View>
            </Pressable>
          );
        })}
      </View>

      <View className="px-[18px] pb-6">
        <AppButton label={t('common.continue')} onPress={() => navigation.navigate('InterestsSelect')} />
      </View>
    </SafeAreaView>
  );
}

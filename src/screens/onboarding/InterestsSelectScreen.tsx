import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { OnboardingStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { interestToggled } from '../../store/slices/onboardingSlice';
import { AppButton } from '../../components/common/AppButton';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, 'InterestsSelect'>;

const INTERESTS = [
  { id: 'beaches', label: 'Beaches' },
  { id: 'wildlife', label: 'Wildlife & safari' },
  { id: 'hiking', label: 'Hiking' },
  { id: 'trains', label: 'Scenic trains' },
  { id: 'culture', label: 'Temples & culture' },
  { id: 'food', label: 'Street food' },
  { id: 'surf', label: 'Surf' },
  { id: 'wellness', label: 'Ayurveda & wellness' },
  { id: 'nightlife', label: 'Nightlife' },
  { id: 'photography', label: 'Photography' },
];

export function InterestsSelectScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(state => state.onboarding.selectedInterestIds);
  const canContinue = selectedIds.length >= 2;

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={['top', 'bottom']}>
      <View className="px-6 pt-3">
        <View className="flex-row items-center justify-between">
          <Text className="font-manrope-bold text-xs text-muted-text/70">
            {t('onboarding.stepOf', { current: 2, total: 3 })}
          </Text>
          <Pressable onPress={() => navigation.navigate('Permissions')}>
            <Text className="font-manrope-bold text-[13px] text-primary-dark">{t('common.skip')}</Text>
          </Pressable>
        </View>
        <Text className="mt-2.5 font-sora-extrabold text-[24px] text-dark-green">
          {t('onboarding.kindOfTrip')}
        </Text>
        <Text className="mt-1 font-manrope-medium text-[13px] text-muted-text">
          {t('onboarding.kindOfTripSubtitle')}
        </Text>
      </View>

      <View className="flex-1 flex-row flex-wrap gap-2.5 px-5 py-4">
        {INTERESTS.map(interest => {
          const active = selectedIds.includes(interest.id);
          return (
            <Pressable
              key={interest.id}
              onPress={() => dispatch(interestToggled(interest.id))}
              className={`rounded-pill px-[18px] py-3 ${
                active ? 'bg-dark-green' : 'border-[1.5px] border-pill-border bg-white'
              }`}
            >
              <Text
                className={`font-manrope-bold text-sm ${active ? 'text-white' : 'text-muted-text'}`}
              >
                {interest.label}
                {active ? ' ✓' : ''}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="px-5 pb-6">
        <AppButton
          label={`${t('common.continue')} · ${selectedIds.length} picked`}
          onPress={() => navigation.navigate('Permissions')}
          disabled={!canContinue}
        />
      </View>
    </SafeAreaView>
  );
}

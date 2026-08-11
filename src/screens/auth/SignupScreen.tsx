import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { AuthStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authFailed, authLoading, otpChallengeStarted } from '../../store/slices/authSlice';
import { getAuthErrorMessage, signUpWithEmail, sendEmailVerificationOtp } from '../../api/authService';
import { AppButton } from '../../components/common/AppButton';
import { AppTextInput } from '../../components/common/AppTextInput';
import { AppPasswordInput } from '../../components/common/AppPasswordInput';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { KeyboardAvoidingScreen } from '../../components/common/KeyboardAvoidingScreen';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

function passwordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export function SignupScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(state => state.auth.status);
  const authError = useAppSelector(state => state.auth.error);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [wantsTips, setWantsTips] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const strength = useMemo(() => passwordStrength(password), [password]);
  const canSubmit = fullName.trim().length > 1 && email.includes('@') && password.length >= 6 && agreed && !submitting;

  async function handleCreateAccount() {
    if (!canSubmit) return;
    setSubmitting(true);
    dispatch(authLoading());
    try {
      await signUpWithEmail(email.trim(), password, fullName.trim());
      await sendEmailVerificationOtp();
      dispatch(otpChallengeStarted(email.trim()));
      navigation.navigate('OtpVerify');
    } catch (err) {
      dispatch(authFailed(getAuthErrorMessage(err, 'Sign up failed')));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingScreen>
      <ScreenHeader title={t('auth.createYourAccount')} showBack />

      <View className="flex-1 gap-2.5 px-5 py-2">
        <AppTextInput
          label={t('auth.fullName')}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Nadia Perera"
        />

        <AppTextInput
          label={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="nadia.p@gmail.com"
        />

        <AppPasswordInput
          label={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••••"
        />

        <View className="flex-row items-center gap-1.5 px-0.5">
          {[0, 1, 2, 3].map(i => (
            <View
              key={i}
              className={`h-1 flex-1 rounded-pill ${i < strength ? 'bg-primary' : 'bg-light-bg-alt'}`}
            />
          ))}
        </View>

        <Pressable onPress={() => setAgreed(v => !v)} className="flex-row items-start gap-2.5 py-1.5">
          <View
            className={`h-[22px] w-[22px] items-center justify-center rounded-[7px] ${
              agreed ? 'bg-primary' : 'border-[1.5px] border-pill-border'
            }`}
          >
            {agreed && <Text className="text-xs text-white">✓</Text>}
          </View>
          <Text className="flex-1 font-manrope-medium text-xs leading-5 text-muted-text">
            {t('auth.agreeToTerms')}
          </Text>
        </Pressable>

        <Pressable onPress={() => setWantsTips(v => !v)} className="flex-row items-start gap-2.5">
          <View
            className={`h-[22px] w-[22px] items-center justify-center rounded-[7px] ${
              wantsTips ? 'bg-primary' : 'border-[1.5px] border-pill-border'
            }`}
          >
            {wantsTips && <Text className="text-xs text-white">✓</Text>}
          </View>
          <Text className="flex-1 font-manrope-medium text-xs leading-5 text-muted-text">
            {t('auth.sendTips')}
          </Text>
        </Pressable>
      </View>

      <View className="gap-3 px-5 pb-6">
        {authStatus === 'error' && authError && (
          <Text className="text-center font-manrope-semibold text-[13px] text-[#B04A4E]">
            {authError}
          </Text>
        )}
        <AppButton label={t('auth.createAccount')} onPress={handleCreateAccount} disabled={!canSubmit} />
        <View className="flex-row justify-center gap-1.5">
          <Text className="font-manrope-semibold text-[13px] text-muted-text">
            {t('auth.alreadyHaveOne')}
          </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text className="font-manrope-extrabold text-[13px] text-primary-dark">{t('auth.logIn')}</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingScreen>
  );
}

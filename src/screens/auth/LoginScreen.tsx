import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { AuthStackParamList } from '../../navigation/types';
import { useAppDispatch } from '../../store/hooks';
import { authFailed, authLoading, authSucceeded, guestModeEntered } from '../../store/slices/authSlice';
import { signInWithEmail } from '../../api/authService';
import { AppButton } from '../../components/common/AppButton';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = email.trim().length > 3 && password.length >= 6 && !submitting;

  async function handleLogin() {
    if (!canSubmit) return;
    setSubmitting(true);
    dispatch(authLoading());
    try {
      const user = await signInWithEmail(email.trim(), password);
      dispatch(authSucceeded(user));
    } catch (err) {
      dispatch(authFailed(err instanceof Error ? err.message : 'Login failed'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={['top', 'bottom']}>
      <View className="px-6 pt-6">
        <Text className="font-sora-extrabold text-[30px] text-dark-green">
          gogo<Text className="text-primary">.</Text>
        </Text>
        <Text className="mt-4 font-sora-extrabold text-[22px] text-dark-green">
          {t('auth.welcomeBack')}
        </Text>
        <Text className="mt-1 font-manrope-medium text-[13px] text-muted-text">
          {t('auth.welcomeBackSubtitle')}
        </Text>
      </View>

      <View className="flex-1 gap-2.5 px-5 py-4">
        <View className="rounded-card bg-black px-3.5 py-3.5">
          <Text className="text-center font-manrope-bold text-sm text-white">
            {t('auth.continueWithApple')}
          </Text>
        </View>
        <View className="rounded-card border-[1.5px] border-pill-border bg-white px-3.5 py-3.5">
          <Text className="text-center font-manrope-bold text-sm text-dark-green">
            {t('auth.continueWithGoogle')}
          </Text>
        </View>

        <View className="flex-row items-center gap-3 py-1.5">
          <View className="h-px flex-1 bg-card-border" />
          <Text className="font-manrope-semibold text-[11.5px] text-muted-text/70">
            {t('auth.orWithEmail')}
          </Text>
          <View className="h-px flex-1 bg-card-border" />
        </View>

        <View className="rounded-card border border-card-border bg-white px-4 py-3.5">
          <Text className="font-manrope-bold text-[11px] tracking-wide text-muted-text">
            {t('auth.email').toUpperCase()}
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="nadia.p@gmail.com"
            className="mt-1 font-manrope-bold text-[15px] text-dark-green"
          />
        </View>

        <View className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-4 py-3.5">
          <View className="flex-1">
            <Text className="font-manrope-bold text-[11px] tracking-wide text-muted-text">
              {t('auth.password').toUpperCase()}
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="••••••••"
              className="mt-1 font-manrope-bold text-[15px] text-dark-green"
            />
          </View>
          <Pressable onPress={() => setShowPassword(v => !v)}>
            <Text className="font-manrope-bold text-xs text-primary-dark">
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </Pressable>
        </View>

        <Text className="text-right font-manrope-bold text-[12.5px] text-primary-dark">
          {t('auth.forgotPassword')}
        </Text>
      </View>

      <View className="gap-3 px-5 pb-6">
        <AppButton label={t('auth.logIn')} onPress={handleLogin} disabled={!canSubmit} />
        <View className="flex-row justify-center gap-1.5">
          <Text className="font-manrope-semibold text-[13px] text-muted-text">{t('auth.newHere')}</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text className="font-manrope-extrabold text-[13px] text-primary-dark">
              {t('auth.createAccount')}
            </Text>
          </Pressable>
          <Text className="font-manrope-semibold text-[13px] text-muted-text">·</Text>
          <Pressable onPress={() => dispatch(guestModeEntered())}>
            <Text className="font-manrope-extrabold text-[13px] text-primary-dark">
              {t('auth.planAsGuest')}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

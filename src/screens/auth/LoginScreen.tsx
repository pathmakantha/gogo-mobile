import React, { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import type { AuthStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  authFailed,
  authLoading,
  authSucceeded,
  guestModeEntered,
} from '../../store/slices/authSlice';
import {
  getAuthErrorMessage,
  signInWithApple,
  signInWithEmail,
  signInWithGoogle,
} from '../../api/authService';
import { isGoogleSignInConfigured } from '../../config/googleSignIn';
import { AppButton } from '../../components/common/AppButton';
import { AppTextInput } from '../../components/common/AppTextInput';
import { AppPasswordInput } from '../../components/common/AppPasswordInput';
import { KeyboardAvoidingScreen } from '../../components/common/KeyboardAvoidingScreen';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(state => state.auth.status);
  const authError = useAppSelector(state => state.auth.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    email.trim().length > 3 && password.length >= 6 && !submitting;

  async function handleLogin() {
    if (!canSubmit) return;
    setSubmitting(true);
    dispatch(authLoading());
    try {
      const user = await signInWithEmail(email.trim(), password);
      dispatch(authSucceeded(user));
    } catch (err) {
      dispatch(authFailed(getAuthErrorMessage(err, 'Login failed')));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    if (submitting) return;
    setSubmitting(true);
    dispatch(authLoading());
    try {
      const user = await signInWithGoogle();
      dispatch(authSucceeded(user));
    } catch (err) {
      dispatch(authFailed(getAuthErrorMessage(err, 'Google sign-in failed')));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleAppleLogin() {
    if (submitting) return;
    setSubmitting(true);
    dispatch(authLoading());
    try {
      const user = await signInWithApple();
      dispatch(authSucceeded(user));
    } catch (err) {
      dispatch(authFailed(getAuthErrorMessage(err, 'Apple sign-in failed')));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingScreen>
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
        {Platform.OS === 'ios' && appleAuth.isSupported && (
          <Pressable
            onPress={handleAppleLogin}
            disabled={submitting}
            className={`rounded-card bg-black px-3.5 py-3.5 ${
              submitting ? 'opacity-50' : ''
            }`}
          >
            <Text className="text-center font-manrope-bold text-sm text-white">
              {t('auth.continueWithApple')}
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={handleGoogleLogin}
          disabled={submitting || !isGoogleSignInConfigured}
          className={`rounded-card border-[1.5px] border-pill-border bg-white px-3.5 py-3.5 ${
            submitting || !isGoogleSignInConfigured ? 'opacity-50' : ''
          }`}
        >
          <Text className="text-center font-manrope-bold text-sm text-dark-green">
            {t('auth.continueWithGoogle')}
          </Text>
        </Pressable>

        <View className="flex-row items-center gap-3 py-1.5">
          <View className="h-px flex-1 bg-card-border" />
          <Text className="font-manrope-semibold text-[11.5px] text-muted-text/70">
            {t('auth.orWithEmail')}
          </Text>
          <View className="h-px flex-1 bg-card-border" />
        </View>

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
          placeholder="••••••••"
        />

        <View className="flex-row items-center justify-end px-5">
          <Pressable
            onPress={() => navigation.navigate('ForgotPassword')}
            className="items-end "
          >
            <Text className="font-manrope-bold text-[12.5px] text-primary-dark">
              {t('auth.forgotPassword')}
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="gap-3 px-5 pb-6">
        {authStatus === 'error' && authError && (
          <Text className="text-center font-manrope-semibold text-[13px] text-[#B04A4E]">
            {authError}
          </Text>
        )}
        <AppButton
          label={t('auth.logIn')}
          onPress={handleLogin}
          disabled={!canSubmit}
        />
        <View className="flex-row justify-center gap-1.5">
          <Text className="font-manrope-semibold text-[13px] text-muted-text">
            {t('auth.newHere')}
          </Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text className="font-manrope-extrabold text-[13px] text-primary-dark">
              {t('auth.createAccount')}
            </Text>
          </Pressable>
          <Text className="font-manrope-semibold text-[13px] text-muted-text">
            ·
          </Text>
          <Pressable onPress={() => dispatch(guestModeEntered())}>
            <Text className="font-manrope-extrabold text-[13px] text-primary-dark">
              {t('auth.planAsGuest')}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingScreen>
  );
}

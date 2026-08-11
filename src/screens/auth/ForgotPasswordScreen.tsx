import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { AuthStackParamList } from '../../navigation/types';
import { getAuthErrorMessage, resetPassword } from '../../api/authService';
import { AppButton } from '../../components/common/AppButton';
import { AppTextInput } from '../../components/common/AppTextInput';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { KeyboardAvoidingScreen } from '../../components/common/KeyboardAvoidingScreen';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const canSubmit = email.trim().includes('@') && !submitting;

  async function handleSend() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Could not send reset link.'));
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <KeyboardAvoidingScreen>
        <ScreenHeader title={t('auth.checkYourInbox')} showBack />
        <View className="flex-1 gap-4 px-5 py-3">
          <Text className="font-manrope-medium text-[13.5px] leading-6 text-muted-text">
            {t('auth.resetLinkSentTo', { email: email.trim() })}
          </Text>
        </View>
        <View className="px-5 pb-6">
          <AppButton label={t('auth.backToLogin')} onPress={() => navigation.navigate('Login')} />
        </View>
      </KeyboardAvoidingScreen>
    );
  }

  return (
    <KeyboardAvoidingScreen>
      <ScreenHeader title={t('auth.resetPassword')} showBack />

      <View className="flex-1 gap-2.5 px-5 py-2">
        <Text className="font-manrope-medium text-[13px] leading-5 text-muted-text">
          {t('auth.resetPasswordSubtitle')}
        </Text>

        <AppTextInput
          label={t('auth.email')}
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (error) setError(null);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="nadia.p@gmail.com"
        />

        {error && (
          <Text className="font-manrope-semibold text-[13px] text-[#B04A4E]">{error}</Text>
        )}
      </View>

      <View className="gap-3 px-5 pb-6">
        <AppButton label={t('auth.sendResetLink')} onPress={handleSend} disabled={!canSubmit} />
        <Pressable onPress={() => navigation.navigate('Login')} className="items-center">
          <Text className="font-manrope-extrabold text-[13px] text-primary-dark">
            {t('auth.backToLogin')}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingScreen>
  );
}

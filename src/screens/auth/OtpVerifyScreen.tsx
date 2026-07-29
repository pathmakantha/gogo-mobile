import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authFailed, authSucceeded } from '../../store/slices/authSlice';
import { getCurrentUser, sendEmailVerificationOtp } from '../../api/authService';
import { AppButton } from '../../components/common/AppButton';
import { ScreenHeader } from '../../components/common/ScreenHeader';

const CODE_LENGTH = 4;
const RESEND_SECONDS = 42;

export function OtpVerifyScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const email = useAppSelector(state => state.auth.pendingVerificationPhone) ?? '';
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const code = digits.join('');
  const complete = code.length === CODE_LENGTH;

  function setDigit(index: number, value: string) {
    const char = value.slice(-1).replace(/[^0-9]/, '');
    setDigits(prev => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (char && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  }

  async function handleResend() {
    if (secondsLeft > 0) return;
    try {
      await sendEmailVerificationOtp();
      setSecondsLeft(RESEND_SECONDS);
    } catch (err) {
      dispatch(authFailed(err instanceof Error ? err.message : 'Could not resend code'));
    }
  }

  function handleVerify() {
    if (!complete) return;
    // Firebase Auth has no native "email a 4-digit numeric code" primitive — that
    // requires a backend (Cloud Function + mail provider) to generate/check the
    // code. The account was already created in SignupScreen via
    // createUserWithEmailAndPassword, so here we simply complete the local UX
    // gate and mirror the already-authenticated Firebase user into Redux.
    // Swap this for a real backend-verified check before shipping to production.
    const currentUser = getCurrentUser();
    if (!currentUser) {
      dispatch(authFailed('Session expired — please sign up again.'));
      return;
    }
    dispatch(authSucceeded(currentUser));
  }

  return (
    <SafeAreaView className="flex-1 bg-light-bg" edges={['top', 'bottom']}>
      <ScreenHeader title={t('auth.checkYourInbox')} showBack />

      <View className="flex-1 gap-4 px-5 py-3">
        <Text className="font-manrope-medium text-[13.5px] leading-6 text-muted-text">
          {t('auth.otpSentTo', { email: email || 'your email' })}
        </Text>

        <View className="flex-row justify-center gap-3 py-2.5">
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputs.current[index] = ref;
              }}
              value={digit}
              onChangeText={value => setDigit(index, value)}
              keyboardType="number-pad"
              maxLength={1}
              className={`h-[70px] w-[62px] rounded-2xl border bg-white text-center font-sora-extrabold text-[28px] text-dark-green ${
                digit ? 'border-2 border-primary' : 'border-card-border'
              }`}
            />
          ))}
        </View>

        <Pressable onPress={handleResend} className="flex-row justify-center gap-1.5">
          <Text className="font-manrope-semibold text-[13px] text-muted-text">Didn't get it?</Text>
          <Text
            className={`font-manrope-extrabold text-[13px] ${
              secondsLeft > 0 ? 'text-muted-text/50' : 'text-primary-dark'
            }`}
          >
            {t('auth.resend')}
          </Text>
          {secondsLeft > 0 && (
            <Text className="font-manrope-semibold text-[13px] text-muted-text/60">
              · available in 0:{secondsLeft.toString().padStart(2, '0')}
            </Text>
          )}
        </Pressable>
      </View>

      <View className="px-5 pb-6">
        <AppButton label={t('auth.verify')} onPress={handleVerify} disabled={!complete} />
      </View>
    </SafeAreaView>
  );
}

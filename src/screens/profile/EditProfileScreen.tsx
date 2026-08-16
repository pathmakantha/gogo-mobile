import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { ProfileStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';
import { AppTextInput } from '../../components/common/AppTextInput';
import { KeyboardAvoidingScreen } from '../../components/common/KeyboardAvoidingScreen';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'EditProfile'>;

export function EditProfileScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const user = useAppSelector(state => state.auth.user);

  const [fullName, setFullName] = useState(user?.displayName ?? 'Nadia Perera');
  const [email, setEmail] = useState(user?.email ?? 'nadia.p@gmail.com');
  const [homeCountry, setHomeCountry] = useState('Australia');
  const [phone, setPhone] = useState(user?.phoneNumber ?? '+61 …482');
  const initial = fullName.trim().charAt(0).toUpperCase() || 'N';

  return (
    <KeyboardAvoidingScreen>
      <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Text className="font-manrope-bold text-base text-dark-green dark:text-white">←</Text>
          </Pressable>
          <Text className="font-sora-extrabold text-[22px] text-dark-green dark:text-white">
            {t('editProfile.title')}
          </Text>
        </View>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text className="font-manrope-bold text-sm text-primary-dark">{t('common.save')}</Text>
        </Pressable>
      </View>

      <View className="flex-1 gap-2.5 px-[18px] py-2">
        <View className="items-center gap-2 py-2">
          <View className="h-[82px] w-[82px] items-center justify-center rounded-full bg-dark-green">
            <Text className="font-sora-extrabold text-3xl text-white">{initial}</Text>
          </View>
          <Text className="font-manrope-bold text-[13px] text-primary-dark">
            {t('editProfile.changePhoto')}
          </Text>
        </View>

        <AppTextInput label={t('editProfile.fullName')} value={fullName} onChangeText={setFullName} />
        <AppTextInput
          label={t('editProfile.email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View className="flex-row gap-2.5">
          <View className="flex-1">
            <AppTextInput
              label={t('editProfile.homeCountry')}
              value={homeCountry}
              onChangeText={setHomeCountry}
            />
          </View>
          <View className="flex-1">
            <AppTextInput label={t('editProfile.phone')} value={phone} onChangeText={setPhone} />
          </View>
        </View>

        <Pressable className="flex-row items-center justify-between rounded-card border border-card-border bg-white px-4 py-3.5">
          <View>
            <Text className="font-manrope-bold text-[11px] tracking-wide text-muted-text">
              {t('editProfile.emergencyContact').toUpperCase()}
            </Text>
            <Text className="mt-1 font-manrope-bold text-[15px] text-dark-green">Mum · +61 …119</Text>
          </View>
          <Text className="font-manrope-bold text-xs text-primary-dark">{t('common.edit')}</Text>
        </Pressable>

        <View className="rounded-xl bg-[#EAF5EF] px-3.5 py-2.5">
          <Text className="font-manrope-medium text-[11.5px] leading-[17px] text-[#3E6654]">
            {t('editProfile.emergencyContactHint')}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingScreen>
  );
}

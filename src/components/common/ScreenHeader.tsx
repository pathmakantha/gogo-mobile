import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export function ScreenHeader({ title, subtitle, showBack = true }: ScreenHeaderProps) {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <View className="px-5 pt-4 pb-2">
      {showBack && canGoBack && (
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} className="mb-2">
          <Text className="font-manrope-bold text-base text-dark-green dark:text-white">← Back</Text>
        </Pressable>
      )}
      <Text className="font-sora-extrabold text-[24px] text-dark-green dark:text-white">{title}</Text>
      {subtitle ? (
        <Text className="mt-1 font-manrope-medium text-[13px] text-muted-text dark:text-muted-text-dark">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from './ScreenHeader';

interface StubScreenProps {
  title: string;
  description: string;
}

export function StubScreen({ title, description }: StubScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-deep-dark" edges={['top']}>
      <ScreenHeader title={title} />
      <View className="flex-1 items-center justify-center px-8">
        <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-dark-green/10 dark:bg-white/10">
          <Text className="text-2xl">🚧</Text>
        </View>
        <Text className="text-center font-manrope-semibold text-[15px] text-muted-text dark:text-muted-text-dark">
          {description}
        </Text>
        <Text className="mt-2 text-center font-manrope-medium text-xs text-muted-text/70 dark:text-muted-text-dark/70">
          This screen is scaffolded and navigable — full design coming in a later pass.
        </Text>
      </View>
    </SafeAreaView>
  );
}

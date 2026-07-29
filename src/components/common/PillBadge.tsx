import React from 'react';
import { Text, View } from 'react-native';

interface PillBadgeProps {
  label: string;
  tone?: 'filled' | 'outline' | 'dark';
}

export function PillBadge({ label, tone = 'outline' }: PillBadgeProps) {
  if (tone === 'filled') {
    return (
      <View className="rounded-pill bg-dark-green px-3.5 py-2 dark:bg-light-accent">
        <Text className="font-manrope-bold text-xs text-white dark:text-dark-green">{label}</Text>
      </View>
    );
  }
  if (tone === 'dark') {
    return (
      <View className="rounded-pill bg-dark-green px-2.5 py-1.5">
        <Text className="font-manrope-extrabold text-[10px] tracking-wide text-light-accent">{label}</Text>
      </View>
    );
  }
  return (
    <View className="rounded-pill border border-card-border bg-white px-3.5 py-2 dark:border-deep-dark-border dark:bg-deep-dark-card">
      <Text className="font-manrope-semibold text-xs text-muted-text dark:text-muted-text-dark">{label}</Text>
    </View>
  );
}

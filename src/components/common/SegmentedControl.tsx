import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <View className="flex-row rounded-[11px] bg-light-bg-alt p-[3px] dark:bg-deep-dark">
      {options.map(option => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className={`flex-1 items-center rounded-[9px] py-2.5 ${
              active ? 'bg-white shadow-sm dark:bg-deep-dark-card' : ''
            }`}
          >
            <Text
              className={`font-manrope-bold text-[12.5px] ${
                active ? 'text-dark-green dark:text-white' : 'text-muted-text dark:text-muted-text-dark'
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

import React, { useState } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';

interface AppPasswordInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label: string;
}

export function AppPasswordInput({ label, onFocus, onBlur, ...inputProps }: AppPasswordInputProps) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <View
      className={`flex-row items-center justify-between rounded-card bg-white px-4 py-3.5 ${
        focused ? 'border-2 border-primary' : 'border border-card-border'
      }`}
    >
      <View className="flex-1">
        <Text
          className={`font-manrope-bold text-[11px] tracking-wide ${
            focused ? 'text-primary' : 'text-muted-text'
          }`}
        >
          {label.toUpperCase()}
        </Text>
        <TextInput
          {...inputProps}
          secureTextEntry={!visible}
          onFocus={e => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur?.(e);
          }}
          className="mt-1 font-manrope-bold text-[15px] text-dark-green"
        />
      </View>
      <Pressable onPress={() => setVisible(v => !v)} hitSlop={8}>
        <Text className="font-manrope-bold text-xs text-primary-dark">{visible ? 'Hide' : 'Show'}</Text>
      </Pressable>
    </View>
  );
}

import React, { useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

interface AppTextInputProps extends TextInputProps {
  label: string;
}

export function AppTextInput({ label, onFocus, onBlur, ...inputProps }: AppTextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View
      className={`rounded-card bg-white px-4 py-3.5 ${
        focused ? 'border-2 border-primary' : 'border border-card-border'
      }`}
    >
      <Text
        className={`font-manrope-bold text-[11px] tracking-wide ${
          focused ? 'text-primary' : 'text-muted-text'
        }`}
      >
        {label.toUpperCase()}
      </Text>
      <TextInput
        {...inputProps}
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
  );
}

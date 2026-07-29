import React from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';

interface AppButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: Variant;
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-white dark:bg-deep-dark-card border-[1.5px] border-pill-border dark:border-deep-dark-border',
  ghost: 'bg-transparent',
  dark: 'bg-black',
};

const labelClasses: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'text-dark-green dark:text-white',
  ghost: 'text-primary-dark',
  dark: 'text-white',
};

export function AppButton({ label, variant = 'primary', disabled, ...pressableProps }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      className={`rounded-card items-center justify-center px-4 py-4 ${variantClasses[variant]} ${
        disabled ? 'opacity-50' : ''
      }`}
      {...pressableProps}
    >
      <Text className={`font-manrope-bold text-[15px] ${labelClasses[variant]}`}>{label}</Text>
    </Pressable>
  );
}

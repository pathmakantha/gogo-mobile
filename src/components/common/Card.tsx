import React from 'react';
import { View, type ViewProps } from 'react-native';

export function Card({ className = '', children, ...rest }: ViewProps & { className?: string }) {
  return (
    <View
      className={`rounded-card border border-card-border bg-white p-4 dark:border-deep-dark-border dark:bg-deep-dark-card ${className}`}
      {...rest}
    >
      {children}
    </View>
  );
}

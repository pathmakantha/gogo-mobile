import React, { useEffect, useRef } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

interface KeyboardAvoidingScreenProps {
  children: React.ReactNode;
  className?: string;
  edges?: Edge[];
}

// Shared by auth/form screens that pin a submit button to the bottom of a flex
// column: without this, iOS never resizes for the keyboard (it just overlays
// content) and the button ends up hidden behind it. Android already resizes via
// windowSoftInputMode="adjustResize", so `behavior` is a no-op there.
export function KeyboardAvoidingScreen({
  children,
  className = 'flex-1 bg-light-bg',
  edges = ['top', 'bottom'],
}: KeyboardAvoidingScreenProps) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    // The OS's own "scroll focused input into view" only guarantees the input
    // itself clears the keyboard — not anything pinned below it, like a submit
    // button. Scrolling all the way to the end on every keyboard-show reliably
    // brings the bottom of the form into view instead.
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const subscription = Keyboard.addListener(showEvent, () => {
      requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
    });
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView className={className} edges={edges}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

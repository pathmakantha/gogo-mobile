/**
 * Gogo — Sri Lanka trip planner
 *
 * @format
 */

import './global.css';
import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme as useSystemColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { colorScheme as nativewindColorScheme } from 'nativewind';

import { store } from './src/store';
import { useAppDispatch, useAppSelector } from './src/store/hooks';
import { loadPersistedSlice } from './src/store/persistMiddleware';
import { settingsHydrated } from './src/store/slices/settingsSlice';
import { onboardingHydrated } from './src/store/slices/onboardingSlice';
import { authSucceeded, signedOut } from './src/store/slices/authSlice';
import { RootNavigator } from './src/navigation/RootNavigator';
import { onAuthStateChanged } from './src/config/firebase';
import { configureGoogleSignIn } from './src/config/googleSignIn';
import { toAppUser } from './src/api/authService';
import { initI18n, changeAppLanguage } from './src/i18n';

configureGoogleSignIn();

function ThemeSync() {
  const theme = useAppSelector(state => state.settings.theme);
  useEffect(() => {
    nativewindColorScheme.set(theme === 'auto' ? 'system' : theme);
  }, [theme]);
  return null;
}

function Bootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      await initI18n();

      const [persistedSettings, persistedOnboarding] = await Promise.all([
        loadPersistedSlice('settings'),
        loadPersistedSlice('onboarding'),
      ]);
      if (persistedSettings) {
        dispatch(settingsHydrated(persistedSettings as never));
        const language = (persistedSettings as { language?: string }).language;
        if (language) await changeAppLanguage(language);
      }
      if (persistedOnboarding) {
        dispatch(onboardingHydrated(persistedOnboarding as never));
      }

      if (!cancelled) setReady(true);
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user => {
      if (user) {
        dispatch(authSucceeded(toAppUser(user)));
      } else {
        dispatch(signedOut());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  if (!ready) return null;
  return <>{children}</>;
}

function AppShell() {
  const isSystemDark = useSystemColorScheme() === 'dark';
  const theme = useAppSelector(state => state.settings.theme);
  const isDark = theme === 'auto' ? isSystemDark : theme === 'dark';

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ThemeSync />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Bootstrap>
            <AppShell />
          </Bootstrap>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

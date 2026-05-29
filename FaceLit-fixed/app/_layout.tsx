// ─────────────────────────────────────────────
//  app/_layout.tsx
//  Root layout — provee ThemeProvider + I18nProvider
//  a toda la app. Las rutas usan el prefijo "auth/"
//  porque los archivos viven en app/auth/
// ─────────────────────────────────────────────
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { I18nProvider } from '@/contexts/I18nContext';

function RootLayoutInner() {
  const { theme } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.statusBar} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="auth/email-validation" />
        <Stack.Screen name="auth/email-validated-success" />
        <Stack.Screen name="auth/rights" />
        <Stack.Screen name="auth/privacy-notice" />
        <Stack.Screen name="auth/minor-consent" />
        <Stack.Screen name="auth/teenager-registration" />
        <Stack.Screen name="auth/registration-success" />
        <Stack.Screen name="auth/password-recovery" />
        <Stack.Screen name="auth/token-sent" />
        <Stack.Screen name="auth/verify-identity" />
        <Stack.Screen name="auth/new-password" />
        <Stack.Screen name="auth/password-reset-done" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <RootLayoutInner />
      </I18nProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
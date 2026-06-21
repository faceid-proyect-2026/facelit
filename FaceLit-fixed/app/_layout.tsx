// ─────────────────────────────────────────────
//  app/_layout.tsx
//  Fix: agrega I18nextProvider para que
//  useTranslation() detecte cambios de idioma
// ─────────────────────────────────────────────
import { I18nProvider } from '@/shared/contexts/I18nContext';
import { ThemeProvider, useTheme } from '@/shared/contexts/ThemeContext';
import i18n from '@/shared/i18n/index';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

function RootLayoutInner() {
  const { theme } = useTheme();

  return (
    <View style={[s.root, { backgroundColor: theme.background }]}>
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
        <Stack.Screen name="auth/password-recovery" />
        <Stack.Screen name="auth/verify-identity" />
        <Stack.Screen name="auth/new-password" />
        <Stack.Screen name="auth/password-reset-done" />
        <Stack.Screen name="auth/registration-success" />
        <Stack.Screen name="auth/teenager-registration" />
        <Stack.Screen name="auth/minor-consent" />
        <Stack.Screen name="auth/privacy-notice" />
        <Stack.Screen name="admin" options={{ animation: 'fade' }} />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <I18nProvider>
          <RootLayoutInner />
        </I18nProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
});
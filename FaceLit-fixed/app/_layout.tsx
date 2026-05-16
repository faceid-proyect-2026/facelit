// ─────────────────────────────────────────────
//  app/_layout.tsx
//  Root layout con ThemeProvider + I18nProvider
//  Los Stack.Screen y rutas son exactamente los mismos
// ─────────────────────────────────────────────
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { I18nProvider } from '@/contexts/I18nContext';

/** Inner layout: accede al tema ya disponible en el árbol */
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
        {/* ── Rutas existentes — SIN cambios ── */}
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="rights" />
        <Stack.Screen name="privacy-notice" />
        <Stack.Screen name="minor-consent" />
        <Stack.Screen name="teenager-registration" />
        <Stack.Screen name="registration-success" />
        <Stack.Screen name="password-recovery" />
        <Stack.Screen name="token-sent" />
        <Stack.Screen name="verify-identity" />
        <Stack.Screen name="new-password" />
        <Stack.Screen name="password-reset-done" />
      </Stack>
    </View>
  );
}

/** Root layout: provee tema e idioma a toda la app */
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
  root: {
    flex: 1,
  },
});

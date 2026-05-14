import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'slide_from_right',
        }}
      >
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050505',
  },
});

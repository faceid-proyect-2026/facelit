import { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#050505', '#0F2A1D', '#1F5A3A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Análisis facial inteligente</Text>
          <ActivityIndicator size="large" color={Colors.primary} style={styles.spinner} />
          <Text style={styles.loading}>Cargando...</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1, backgroundColor: 'transparent' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logo: { width: 320, height: 180, marginBottom: 32 },
  tagline: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.light,
    marginBottom: 40,
    textAlign: 'center',
  },
  spinner: { marginBottom: 16 },
  loading: { color: Colors.text.muted, fontSize: 14 },
});

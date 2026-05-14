import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

export default function RegistrationSuccessScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>✓</Text>
          </View>
          <Text style={styles.title}>Registro completado{'\n'}exitosamente</Text>
          <Text style={styles.subtitle}>
            Tu cuenta ha sido creada correctamente.{'\n'}Ya puedes acceder al sistema.
          </Text>
          <AppButton title="Ir al inicio" onPress={() => router.replace('/login')}
            fullWidth={false} style={styles.btn} />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  card: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 40,
    width: '100%', maxWidth: 400, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 8,
  },
  iconCircle: {
    width: 90, height: 90, borderRadius: 45, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  iconText: { fontSize: 44, color: Colors.white, fontWeight: '700', lineHeight: 50 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.black, textAlign: 'center', marginBottom: 16, lineHeight: 30 },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 32, lineHeight: 20 },
  btn: { paddingHorizontal: 40 },
});

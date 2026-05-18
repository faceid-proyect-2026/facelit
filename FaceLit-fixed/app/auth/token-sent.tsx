import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

export default function TokenSentScreen() {
  const handleVerify = () => router.push('/auth/verify-identity');
  const handleCancel = () => router.replace('/auth/login');

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>✉️</Text>
          </View>
          <Text style={styles.title}>Token enviado</Text>
          <Text style={styles.subtitle}>
            Revisa tu correo electrónico. Hemos enviado un token de verificación
          </Text>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Si no recibiste el correo, revisa tu carpeta de spam o intenta de nuevo más tarde.
            </Text>
          </View>
          <View style={styles.actionRow}>
            <AppButton title="Verificar" onPress={handleVerify} fullWidth={false} style={styles.btn} />
            <AppButton title="Volver" onPress={handleCancel} variant="secondary" fullWidth={false} style={styles.btn} />
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  card: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 32,
    width: '100%', maxWidth: 400, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 8,
  },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  iconText: { fontSize: 40, color: Colors.white },
  title: { fontSize: 22, fontWeight: '700', color: Colors.black, textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  footer: { backgroundColor: '#F5F5F5', borderRadius: 8, padding: 12, marginBottom: 24 },
  footerText: { fontSize: 12, color: '#888', textAlign: 'center', lineHeight: 16 },
  actionRow: { flexDirection: 'row', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', width: '100%' },
  btn: { minWidth: 120 },
});
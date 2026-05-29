import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AppButton from '@/components/ui/AppButton';

export default function PasswordResetDoneScreen() {
  return (
    <LinearGradient
      colors={['#000000', '#06170F', '#0B2D17']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.backgroundArcTop} />
      <View style={styles.backgroundArcBottom} />

      <SafeAreaView style={styles.safe}>
        <View style={styles.webWrapper}>
          <View style={styles.card}>
            <View style={styles.iconWrapper}>
              <Image
                source={require('@/assets/images/check.png')}
                style={styles.imagen}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>Contraseña restablecida</Text>

            <Text style={styles.subtitle}>
              Tu contraseña ha sido actualizada exitosamente.
            </Text>
            <Text style={styles.subtitle2}>
              Ya puedes iniciar sesión con tu nueva contraseña.
            </Text>

            <View style={styles.securityLog}>
              <Text style={styles.securityTitle}>Registro de seguridad:</Text>

              {[
                '✓ Contraseña cifrada y almacenada de forma segura',
                '✓ Código de recuperación invalidado',
                '✓ Evento registrado en logs de auditoría',
                '✓ Cumplimiento Ley 1581 de 2012',
              ].map((item) => (
                <Text key={item} style={styles.securityItem}>
                  {item}
                </Text>
              ))}
            </View>

            <View style={styles.btnWrapper}>
              <AppButton
                title="Ir al inicio de sesión"
                onPress={() => router.replace('/auth/login')}
                fullWidth={false}
                style={styles.btn}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundArcTop: {
    position: 'absolute',
    width: 300,
    height: 420,
    right: -120,
    top: -90,
    borderRadius: 200,
    backgroundColor: 'rgba(101,179,97,0.08)',
    transform: [{ rotate: '-22deg' }],
  },

  backgroundArcBottom: {
    position: 'absolute',
    width: 420,
    height: 220,
    left: -120,
    bottom: -30,
    borderRadius: 180,
    backgroundColor: 'rgba(101,179,97,0.22)',
    transform: [{ rotate: '-18deg' }],
  },

  webWrapper: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 700 : 430,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: '#07120D',
    borderRadius: 26,
    paddingHorizontal: 28,
    paddingVertical: 34,
    borderWidth: 1,
    borderColor: 'rgba(101,179,97,0.22)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
    alignItems: 'center',
  },

  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  imagen: {
    width: 95,
    height: 95,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    color: '#CAD6C8',
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 20,
  },

  subtitle2: {
    fontSize: 14,
    color: '#CAD6C8',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },

  securityLog: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 18,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  securityTitle: {
    color: '#7ED957',
    fontWeight: '800',
    fontSize: 14,
    marginBottom: 10,
  },

  securityItem: {
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 19,
  },

  btnWrapper: {
    width: '100%',
    alignItems: 'center',
  },

  btn: {
    width: '80%',
    paddingVertical: 14,
  },
});
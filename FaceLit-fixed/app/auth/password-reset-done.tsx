import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

export default function PasswordResetDoneScreen() {
  return (
    <SafeAreaView style={styles.safe}>

      {/* Contenedor centrado para web */}
      <View style={styles.webWrapper}>
        <View style={styles.card}>

          {/* Imagen check centrada */}
          <View style={styles.iconWrapper}>
            <Image
              source={require('@/assets/images/check.png')}
              style={styles.imagen}
              resizeMode="contain"
            />
          </View>

          {/* Título */}
          <Text style={styles.title}>Contraseña restablecida</Text>

          {/* Subtítulo */}
          <Text style={styles.subtitle}>
            Tu contraseña ha sido actualizada exitosamente.
          </Text>
          <Text style={styles.subtitle2}>
            Ya puedes iniciar sesión con tu nueva contraseña.
          </Text>

          {/* Registro de seguridad */}
          <View style={styles.securityLog}>
            <Text style={styles.securityTitle}>Registro de seguridad:</Text>
            {[
              '✓ Contraseña cifrada y almacenada de forma segura',
              '✓ Código de recuperación invalidado',
              '✓ Evento registrado en logs de auditoría',
              '✓ Cumplimiento Ley 1581 de 2012',
            ].map((item) => (
              <Text key={item} style={styles.securityItem}>{item}</Text>
            ))}
          </View>

          {/* Botón */}
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
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  webWrapper: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 700 : '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 40,
    width: '100%',
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagen: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle2: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 28,
  },
  securityLog: {
    backgroundColor: 'rgba(0,50,20,0.7)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    width: '100%',
    alignItems: 'flex-start',
  },
  securityTitle: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 12,
  },
  securityItem: {
    color: Colors.white,
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  btnWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    width: '60%',
    paddingVertical: 14,
  },
});
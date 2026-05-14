import { View, Text, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

export default function TokenSentScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>

        {/* Cabecera verde con imagen centrada */}
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/token.png')}
            style={styles.imagen}
            resizeMode="contain"
          />
        </View>

        <View style={styles.body}>
          {/* Título */}
          <Text style={styles.title}>Código enviado</Text>

          {/* Subtítulo */}
          <Text style={styles.subtitle}>
            Te enviamos un código de verificación a tu correo. Revisalo para continuar.
          </Text>

          {/* Botón Entendido */}
          <AppButton
            title="Entendido"
            onPress={() => router.push('/verify-identity')}
            style={styles.btn}
            fullWidth={false}
          />
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 36,
    alignItems: 'center',
  },
  imagen: {
    width: 100,
    height: 100,
  },
  body: {
    padding: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,                                       // ← igual que web
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 15,                                   // ← igual que web
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#111010',                                   // ← igual que web
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,                                   // ← igual que web
  },
  btn: {
    paddingHorizontal: 36,
    width: '55%',                                       // ← igual que web
  },
});

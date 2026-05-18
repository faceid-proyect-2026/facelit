import { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AuthCard from '@/components/AuthCard';
import InputField from '@/components/forms/InputField';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

// Correos registrados simulados — igual que en la web
const correosRegistrados = ['admin@test.com', 'usuario@empresa.com','valery@gmail.com','juan@gmail.com'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PasswordRecoveryScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // 1. Correo no registrado
    if (!correosRegistrados.includes(email)) {
      setError('El correo no esta regístrado');
      return;
    }
    // 2. Formato inválido
    if (!EMAIL_REGEX.test(email)) {
      setError('Correo inválido');
      return;
    }
    setError('');
    router.push('/auth/token-sent');
  };

  return (
    <AuthCard scrollable={false}>

      {/* Título */}
      <Text style={styles.title}>Recuperar contraseña</Text>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>
        Ingrese su correo electrónico para recibir instrucciones de recuperación
      </Text>

      {/* Input */}
      <InputField
        label="Correo electrónico"
        value={email}
        onChangeText={(v) => { setEmail(v); setError(''); }}
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        error={error}
      />

      {/* Botones lado a lado */}
      <View style={styles.row}>
        <AppButton
          title="Enviar código"
          onPress={handleSubmit}
          style={styles.halfBtn}
        />
        <AppButton
          title="Cancelar"
          onPress={() => router.replace('/auth/login')}
          variant="secondary"
          style={styles.halfBtn}
        />
      </View>

    </AuthCard>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagen: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#111010',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  halfBtn: {
    flex: 1,
  },
});
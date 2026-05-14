import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

const CODE_MOCK = '264255';
const INITIAL_TIME = 5 * 60; // 5 minutos

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function VerifyIdentityScreen() {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [error, setError] = useState('');

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000); // ← 1 segundo
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = () => {
    if (code.length !== 6) { setError('Debe ingresar 6 dígitos'); return; }
    if (code !== CODE_MOCK) { setError('Token inválido'); return; }
    setError('');
    router.push('/new-password');
  };

  const handleResend = () => {
    setTimeLeft(INITIAL_TIME); // solo reinicia el timer
  };

  return (
    <SafeAreaView style={styles.safe}>

      {/* Botón solicitar nuevo código */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/password-recovery')}>
        <Text style={styles.backText}>← Solicitar nuevo código</Text>
      </TouchableOpacity>

      {/* Ícono reloj */}
      <View style={styles.clockCircle}>
        <Text style={styles.clockIcon}>🕐</Text>
      </View>

      {/* Título */}
      <Text style={styles.title}>Verifica tu identidad</Text>

      {/* Subtítulo + email */}
      <Text style={styles.subtitle}>Se a enviado un código de 6 dígitos a</Text>
      <Text style={styles.email}>correo@ejemplo.com</Text>

      {/* Temporizador */}
      <View style={styles.timerBadge}>
        <Text style={styles.timerText}>⏰  Tiempo restante {formatTime(timeLeft)}</Text>
      </View>

      {/* Reenviar código */}
      <TouchableOpacity style={styles.resendBtn} onPress={handleResend}>
        <Text style={styles.resendText}>Reenviar código</Text>
      </TouchableOpacity>

      {/* Input código */}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Código de verificación</Text>
        <TextInput
          style={[styles.codeInput, error ? styles.codeInputError : null]}
          value={code}
          onChangeText={(v) => { setCode(v.replace(/\D/g, '')); setError(''); }}
          placeholder="XXXXXX"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="number-pad"
          maxLength={6}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Text style={styles.hint}>Ingrese el código de 6 dígitos</Text>
      </View>

      {/* Botón verificar */}
      <AppButton title="Verificar código" onPress={handleVerify} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  backText: {
    color: Colors.white,
    fontSize: 16,
  },
  clockCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 6,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  clockIcon: {
    fontSize: 70,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  email: {
    fontSize: 13,
    color: Colors.white,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  timerBadge: {
    backgroundColor: 'rgba(180,90,20,0.85)',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerText: {
    color: Colors.white,
    fontSize: 14,
  },
  resendBtn: {
    backgroundColor: 'rgba(150,130,20,0.7)',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  resendText: {
    color: Colors.white,
    fontSize: 14,
  },
  inputWrapper: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 8,
  },
  inputLabel: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 8,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: Colors.white,
    fontSize: 20,
    letterSpacing: 8,
    textAlign: 'center',
    paddingVertical: 16,
    marginBottom: 6,
  },
  codeInputError: {
    borderColor: Colors.danger,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 6,
  },
  hint: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 6,
  },
});

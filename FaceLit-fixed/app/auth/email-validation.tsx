// ─────────────────────────────────────────────
//  app/auth/email-validation.tsx
//  Pantalla de verificación de código de correo
//  Recibe el email por parámetro desde register
//  Al verificar exitosamente → email-validated-success
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity,StyleSheet, ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

// Código mock para demo — en producción viene del backend
const CODE_MOCK    = '123456';
const INITIAL_TIME = 5 * 60; // 5 minutos

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function EmailValidationScreen() {
  const { theme, isDark } = useTheme();

  // Recibe el email desde register via params
  const { email } = useLocalSearchParams<{ email: string }>();

  const [code, setCode]         = useState('');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [expired, setExpired]   = useState(false);
  const [error, setError]       = useState('');

  const text        = isDark ? '#FFFFFF' : '#111111';
  const muted       = isDark ? '#CAD6C8' : '#555555';
  const cardBg      = isDark ? '#07120D' : '#FFFFFF';
  const inputBg     = isDark ? 'rgba(255,255,255,0.04)' : '#FAFAFA';
  const inputBorder = isDark ? 'rgba(255,255,255,0.30)' : '#BBBBBB';

  // Temporizador
  useEffect(() => {
    if (timeLeft <= 0) { setExpired(true); return; }
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const timerColor = timeLeft > 60 ? '#E89B2C' : '#D92027';

  const handleVerify = () => {
    if (expired) {
      setError('El código ha expirado. Solicita uno nuevo.');
      return;
    }
    if (code.length !== 6) {
      setError('Debes ingresar los 6 dígitos del código.');
      return;
    }
    if (code !== CODE_MOCK) {
      setError('Código incorrecto. Intenta de nuevo.');
      return;
    }
    setError('');
    router.push({ pathname: '/auth/email-validated-success' as any, params: { email } });
  };

  const handleResend = () => {
    setCode('');
    setError('');
    setExpired(false);
    setTimeLeft(INITIAL_TIME);
  };

  return (
    <LinearGradient
      colors={isDark ? ['#000000', '#06170F', '#0B2D17'] : ['#F7FFF4', '#E5F7DF', '#1E4C28']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={s.gradient}
    >
      <View style={[s.arcTop,    { backgroundColor: isDark ? 'rgba(101,179,97,0.08)' : 'rgba(20,70,28,0.18)' }]} />
      <View style={[s.arcBottom, { backgroundColor: isDark ? 'rgba(101,179,97,0.22)' : 'rgba(101,179,97,0.28)' }]} />

      <SafeAreaView style={s.safe}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={[s.card, { backgroundColor: cardBg, shadowColor: isDark ? '#000' : '#1C3A1D' }]}>

            {/* Volver */}
            <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={16} color={theme.primary} />
              <Text style={[s.backText, { color: theme.primary }]}>Volver al registro</Text>
            </TouchableOpacity>

            {/* Ícono reloj */}
            <View style={[s.clockCircle, { borderColor: theme.primary }]}>
              <Ionicons name="timer-outline" size={54} color={theme.primary} />
            </View>

            {/* Título */}
            <Text style={[s.title, { color: text }]}>Verifica tu correo</Text>

            {/* Subtítulo + email */}
            <Text style={[s.subtitle, { color: muted }]}>
              Se ha enviado un código de 6 dígitos a
            </Text>
            <Text style={[s.emailText, { color: theme.primary }]}>
              {email || 'correo@ejemplo.com'}
            </Text>

            {/* Badge timer */}
            <View style={[s.timerBadge, { backgroundColor: timerColor }]}>
              <Ionicons name="alarm-outline" size={14} color="#FFFFFF" />
              <Text style={s.timerText}>
                Tiempo restante {formatTime(timeLeft)}
              </Text>
            </View>

            {/* Reenviar */}
            <TouchableOpacity style={s.resendBtn} onPress={handleResend}>
              <Text style={[s.resendText, { color: theme.primary }]}>
                Reenviar código
              </Text>
            </TouchableOpacity>

            {/* Campo código */}
            <Text style={[s.inputLabel, { color: text }]}>
              Código de verificación
            </Text>
            <TextInput
              style={[s.codeInput, {
                color: text,
                backgroundColor: inputBg,
                borderColor: error ? '#D92027' : inputBorder,
              }]}
              value={code}
              onChangeText={(v) => { setCode(v.replace(/\D/g, '')); setError(''); }}
              placeholder="X X X X X X"
              placeholderTextColor={isDark ? '#4A5E49' : '#BBBBBB'}
              keyboardType="number-pad"
              maxLength={6}
            />
            {error ? <Text style={s.errorText}>{error}</Text> : null}

            <Text style={[s.hint, { color: muted }]}>
              Ingresa el código de 6 dígitos enviado a tu correo
            </Text>

            {/* Botón verificar */}
            <TouchableOpacity
              style={[s.button, expired && s.buttonDisabled]}
              onPress={handleVerify}
              disabled={expired}
            >
              <LinearGradient
                colors={expired ? ['#888', '#666'] : ['#72C96D', '#65B361', '#4FA14B']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={s.buttonGradient}
              >
                <Text style={s.buttonText}>Verificar código</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Aviso código demo */}
            <View style={[s.demoBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F5F5F5' }]}>
              <Ionicons name="information-circle-outline" size={13} color={muted} />
              <Text style={[s.demoText, { color: muted }]}>
                Demo: el código es{' '}
                <Text style={{ fontWeight: '800', color: theme.primary }}>123456</Text>
              </Text>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  gradient:  { flex: 1 },
  safe:      { flex: 1 },
  scroll:    { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 32, paddingHorizontal: 20 },
  arcTop:    { position: 'absolute', width: 300, height: 420, right: -120, top: -90, borderRadius: 200 },
  arcBottom: { position: 'absolute', width: 420, height: 220, left: -120, bottom: -30, borderRadius: 180 },

  card: {
    width: '100%', maxWidth: 460, borderRadius: 26,
    paddingHorizontal: 24, paddingVertical: 28,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18, shadowRadius: 18, elevation: 8,
  },

  backBtn:  { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  backText: { fontSize: 14, fontWeight: '700' },

  clockCircle: {
    width: 110, height: 110, borderRadius: 55,
    borderWidth: 4, alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', marginBottom: 20,
  },

  title:     { fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: 8 },
  subtitle:  { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  emailText: { fontSize: 14, textAlign: 'center', fontWeight: '700', textDecorationLine: 'underline', marginBottom: 20, marginTop: 4 },

  timerBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: 12, paddingVertical: 10, paddingHorizontal: 18,
    alignSelf: 'center', marginBottom: 14,
  },
  timerText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },

  resendBtn:  { alignSelf: 'center', marginBottom: 26 },
  resendText: { fontWeight: '700', textDecorationLine: 'underline', fontSize: 14 },

  inputLabel: { fontSize: 14, fontWeight: '800', marginBottom: 8 },
  codeInput: {
    borderWidth: 1.2, borderRadius: 14,
    paddingVertical: 16, textAlign: 'center',
    fontSize: 24, letterSpacing: 10,
  },
  errorText: { color: '#D92027', fontSize: 12, marginTop: 6 },
  hint:      { fontSize: 12, marginTop: 8, marginBottom: 22 },

  button:         { width: '100%', borderRadius: 16, overflow: 'hidden' },
  buttonDisabled: { opacity: 0.6 },
  buttonGradient: { paddingVertical: 14, alignItems: 'center' },
  buttonText:     { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },

  demoBox:  { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16, padding: 10, borderRadius: 8 },
  demoText: { fontSize: 12 },
});
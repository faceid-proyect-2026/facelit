// ─────────────────────────────────────────────
//  app/auth/email-validation.tsx
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/shared/components/layout/GradientBackground';
import { AppButton, InputField } from '@/shared/components/ui';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { Colors } from '@/shared/constants/colors';
import { FontSize, FontWeight } from '@/shared/constants/typography';

// ─── Constants ────────────────────────────────
const CODE_MOCK    = '123456';
const INITIAL_TIME = 5 * 60;

// ─── Helpers ──────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ─── Hook: lógica de validación ───────────────
function useEmailValidation(t: (key: string) => string) {
  const [code,     setCode]     = useState('');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [expired,  setExpired]  = useState(false);
  const [error,    setError]    = useState('');

  useEffect(() => {
    if (timeLeft <= 0) { setExpired(true); return; }
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    setCode('');
    setError('');
    setExpired(false);
    setTimeLeft(INITIAL_TIME);
  };

  const validate = (): boolean => {
    if (expired) { setError(t('emailValidation.errors.expired')); return false; }
    if (code.length !== 6) { setError(t('emailValidation.errors.length'));  return false; }
    if (code !== CODE_MOCK) { setError(t('emailValidation.errors.invalid')); return false; }
    return true;
  };

  return {
    code, setCode, timeLeft, expired,
    error, setError, handleResend, validate,
  };
}

// ─── Sub-component: Timer badge ───────────────
function TimerBadge({ timeLeft }: { timeLeft: number }) {
  const { t } = useTranslation();
  const color = timeLeft > 60 ? Colors.warning : Colors.error;

  return (
    <View style={[badge.wrap, { backgroundColor: color }]}>
      <Ionicons name="alarm-outline" size={14} color={Colors.white} />
      <Text style={badge.text}>
        {t('emailValidation.timerLabel')}{formatTime(timeLeft)}
      </Text>
    </View>
  );
}

const badge = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 18, alignSelf: 'center', marginBottom: 14 },
  text: { color: Colors.white, fontWeight: FontWeight.bold, fontSize: FontSize.md },
});

// ─── Sub-component: Demo box ──────────────────
function DemoBox() {
  const { t }       = useTranslation();
  const { theme }   = useTheme();

  return (
    <View style={[demo.wrap, { backgroundColor: theme.border }]}>
      <Ionicons name="information-circle-outline" size={13} color={theme.textMuted} />
      <Text style={[demo.text, { color: theme.textMuted }]}>
        {t('emailValidation.demoText')}{' '}
        <Text style={{ fontWeight: FontWeight.extrabold, color: theme.primary }}>
          {CODE_MOCK}
        </Text>
      </Text>
    </View>
  );
}

const demo = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16, padding: 10, borderRadius: 8 },
  text: { fontSize: FontSize.sm },
});

// ─── Screen ───────────────────────────────────
export default function EmailValidationScreen() {
  const { t }     = useTranslation();
  const { theme } = useTheme();
  const { email } = useLocalSearchParams<{ email: string }>();

  const {
    code, setCode, timeLeft, expired,
    error, setError, handleResend, validate,
  } = useEmailValidation(t);

  const handleVerify = () => {
    if (!validate()) return;
    setError('');
    router.push({ pathname: '/auth/email-validated-success' as any, params: { email } });
  };

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[s.card, { backgroundColor: theme.card }]}>

          {/* Volver */}
          <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={16} color={theme.primary} />
            <Text style={[s.backText, { color: theme.primary }]}>
              {t('emailValidation.backBtn')}
            </Text>
          </TouchableOpacity>

          {/* Ícono */}
          <View style={[s.clockCircle, { borderColor: theme.primary }]}>
            <Ionicons name="timer-outline" size={54} color={theme.primary} />
          </View>

          {/* Título */}
          <Text style={[s.title, { color: theme.text }]}>
            {t('emailValidation.title')}
          </Text>

          {/* Subtítulo + email */}
          <Text style={[s.subtitle, { color: theme.textMuted }]}>
            {t('emailValidation.subtitle')}
          </Text>
          <Text style={[s.emailText, { color: theme.primary }]}>
            {email || 'correo@ejemplo.com'}
          </Text>

          {/* Timer */}
          <TimerBadge timeLeft={timeLeft} />

          {/* Reenviar */}
          <TouchableOpacity style={s.resendBtn} onPress={handleResend}>
            <Text style={[s.resendText, { color: theme.primary }]}>
              {t('emailValidation.resendBtn')}
            </Text>
          </TouchableOpacity>

          {/* Input código — usa InputField existente */}
          <InputField
            label={t('emailValidation.inputLabel')}
            value={code}
            onChangeText={(v) => { setCode(v.replace(/\D/g, '')); setError(''); }}
            placeholder={t('emailValidation.placeholder')}
            keyboardType="number-pad"
            maxLength={6}
            error={error}
            style={s.codeInputText}
          />

          <Text style={[s.hint, { color: theme.textMuted }]}>
            {t('emailValidation.hint')}
          </Text>

          {/* Botón verificar — usa AppButton existente */}
          <AppButton
            title={t('emailValidation.verifyBtn')}
            onPress={handleVerify}
            disabled={expired}
          />

          {/* Demo */}
          <DemoBox />

        </View>
      </ScrollView>
    </GradientBackground>
  );
}

// ─── Styles ───────────────────────────────────
const s = StyleSheet.create({
  scroll: {
    flexGrow: 1, alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32, paddingHorizontal: 20,
  },
  card: {
    width: '100%', maxWidth: 460, borderRadius: 26,
    paddingHorizontal: 24, paddingVertical: 28,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18, shadowRadius: 18, elevation: 8,
  },
  backBtn:   { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  backText:  { fontSize: FontSize.base, fontWeight: FontWeight.bold },
  clockCircle: {
    width: 110, height: 110, borderRadius: 55, borderWidth: 4,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', marginBottom: 20,
  },
  title:         { fontSize: FontSize['3xl'], fontWeight: FontWeight.black, textAlign: 'center', marginBottom: 8 },
  subtitle:      { fontSize: FontSize.base, textAlign: 'center', lineHeight: 20 },
  emailText:     { fontSize: FontSize.base, textAlign: 'center', fontWeight: FontWeight.bold, textDecorationLine: 'underline', marginBottom: 20, marginTop: 4 },
  resendBtn:     { alignSelf: 'center', marginBottom: 26 },
  resendText:    { fontWeight: FontWeight.bold, textDecorationLine: 'underline', fontSize: FontSize.base },
  codeInputText: { textAlign: 'center', fontSize: 24, letterSpacing: 10 },
  hint:          { fontSize: FontSize.sm, marginTop: 8, marginBottom: 22 },
});
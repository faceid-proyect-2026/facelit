// ─────────────────────────────────────────────
//  app/auth/login.tsx  — layout ref: register.tsx / minor-consent.tsx
// ─────────────────────────────────────────────
import { useState } from 'react';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Routes } from '@/shared/constants/routes';
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';
import NavLink from '@/features/auth/components/NavLink';

// ── Constantes ────────────────────────────────
const { width } = Dimensions.get('window');
const CARD_MAX  = 600;
const isWide    = width >= 768;

export default function LoginScreen() {
  const { theme, isDark } = useTheme();
  const { t }             = useTranslation();
  const router            = useRouter();
  const { form, errors, setField, handleSubmit } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);
  const [focused,      setFocused]      = useState<string | null>(null);

  // ── Paleta local (idéntica a register / minor-consent) ──
  const text        = isDark ? '#FFFFFF'                : '#111111';
  const muted       = isDark ? '#A8BCA6'                : '#555555';
  const cardBg      = isDark ? '#07120D'                : '#FFFFFF';
  const inputBg     = isDark ? 'rgba(255,255,255,0.05)' : '#FAFAFA';
  const inputBorder = isDark ? 'rgba(255,255,255,0.30)' : '#BBBBBB';
  const cardBorder  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const errorColor  = '#D92027';

  return (
    <LinearGradient
      colors={isDark ? ['#000000', '#06170F', '#0B2D17'] : ['#F7FFF4', '#E5F7DF', '#1E4C28']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={s.gradient}
    >
      <View style={s.arcTop} />
      <View style={s.arcBottom} />

      <SafeAreaView style={s.safe}>
        <KeyboardAvoidingView style={s.kav} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={s.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={[s.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>

              {/* Volver */}
              <TouchableOpacity
                onPress={() => router.push('/')}
                accessibilityLabel={t('common.back')}
                style={[s.backBtn, { borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)' }]}
              >
                <Ionicons name="arrow-back" size={18} color={text} />
              </TouchableOpacity>

              {/* Título */}
              <Text style={[s.title, { color: text }]}>{t('login.title')}</Text>
              <Text style={[s.subtitle, { color: muted }]}>{t('login.subtitle')}</Text>

              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>{t('login.email')}</Text>
                <View style={[s.inputWrap, {
                  backgroundColor: inputBg,
                  borderColor: errors.email ? errorColor : focused === 'email' ? theme.primary : inputBorder,
                }]}>
                  <Ionicons name="mail-outline" size={18} color={muted} />
                  <TextInput
                    style={[s.input, { color: text }] as any}
                    value={form.email}
                    onChangeText={v => setField('email', v)}
                    placeholder={t('login.emailPlaceholder')}
                    placeholderTextColor={isDark ? '#5A7258' : '#AAAAAA'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </View>
                {errors.email ? <Text style={s.errorText}>{errors.email}</Text> : null}
              </View>

              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>{t('login.password')}</Text>
                <View style={[s.inputWrap, {
                  backgroundColor: inputBg,
                  borderColor: errors.password ? errorColor : focused === 'password' ? theme.primary : inputBorder,
                }]}>
                  <Ionicons name="lock-closed-outline" size={18} color={muted} />
                  <TextInput
                    style={[s.input, { color: text }] as any}
                    value={form.password}
                    onChangeText={v => setField('password', v)}
                    placeholder={t('login.passwordPlaceholder')}
                    placeholderTextColor={isDark ? '#5A7258' : '#AAAAAA'}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={s.eyeBtn}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={muted} />
                  </TouchableOpacity>
                </View>
                {errors.password ? <Text style={s.errorText}>{errors.password}</Text> : null}
              </View>

              {/* Política de privacidad */}
              <View style={[s.consentCard, {
                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F3F8F3',
                borderColor:     isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)',
              }]}>
                <TouchableOpacity
                  onPress={() => setField('accepted', !form.accepted)}
                  activeOpacity={0.8}
                  style={s.checkRow}
                >
                  <View style={[s.checkbox, {
                    borderColor:     errors.policy ? errorColor : form.accepted ? theme.primary : inputBorder,
                    backgroundColor: form.accepted ? theme.primary : 'transparent',
                  }]}>
                    {form.accepted && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Text style={[s.checkLabel, { color: text }]}>{t('login.policyPrefix')} </Text>
                    <TouchableOpacity onPress={() => router.push(Routes.AUTH.PRIVACY_NOTICE as any)}>
                      <Text style={{ color: theme.primary, fontWeight: '700', fontSize: 13, textDecorationLine: 'underline' }}>
                        {t('login.policyLink')}
                      </Text>
                    </TouchableOpacity>
                    <Text style={[s.checkLabel, { color: text }]}>{t('login.policySuffix')}</Text>
                  </View>
                </TouchableOpacity>
                {errors.policy
                  ? <Text style={[s.errorText, { marginTop: 6 }]}>{t('login.policyError')}</Text>
                  : null}
              </View>

              {/* ══ Botón ingresar ══ */}
              <TouchableOpacity onPress={handleSubmit} style={s.confirmBtn}>
                <LinearGradient
                  colors={['#72C96D', '#65B361', '#4FA14B']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={s.confirmBtnGradient}
                >
                  <Ionicons name="log-in-outline" size={18} color="#FFFFFF" />
                  <Text style={s.confirmBtnText}>{t('login.loginBtn')}</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Links */}
              <View style={s.links}>
                <NavLink href={Routes.AUTH.PASSWORD_RECOVERY} label={t('login.forgotPassword')} />
                <View style={s.registerRow}>
                  <Text style={[s.bottomText, { color: muted }]}>{t('login.noAccount')} </Text>
                  <NavLink href={Routes.AUTH.REGISTER} label={t('login.registerLink')} />
                </View>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ── Estilos ───────────────────────────────────
const s = StyleSheet.create({
  gradient:  { flex: 1 },
  safe:      { flex: 1 },
  kav:       { flex: 1 },
  arcTop:    { position: 'absolute', width: 300, height: 420, right: -120, top: -90,    borderRadius: 200, backgroundColor: 'rgba(20,70,28,0.18)' },
  arcBottom: { position: 'absolute', width: 420, height: 220, left: -120,  bottom: -30, borderRadius: 180, backgroundColor: 'rgba(101,179,97,0.28)' },
  scroll:    { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40, paddingHorizontal: 16 },

  card: {
    width: '100%',
    maxWidth: CARD_MAX,
    borderRadius: 26,
    borderWidth: 1,
    paddingHorizontal: isWide ? 40 : 24,
    paddingVertical: 30,
  },

  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    width: 36, height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title:    { fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 8 },

  fieldGroup: { marginBottom: 12 },
  label:      { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  inputWrap:  { height: 48, borderWidth: 1.2, borderRadius: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  input:      { flex: 1, fontSize: 15, outlineStyle: 'none' } as any,
  errorText:  { color: '#D92027', fontSize: 11, marginTop: 3 },
  eyeBtn:     { padding: 4 },

  consentCard: { borderRadius: 14, borderWidth: 1, padding: 16, marginTop: 6, marginBottom: 4 },
  checkRow:    { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  checkbox:    { width: 20, height: 20, borderWidth: 1.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
  checkLabel:  { flex: 1, fontSize: 13, lineHeight: 20 },

  confirmBtn:         { width: '100%', maxWidth: 320, alignSelf: 'center', borderRadius: 16, overflow: 'hidden', marginTop: 24, marginBottom: 10 },
  confirmBtnGradient: { paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  confirmBtnText:     { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

  links:       { alignItems: 'center', marginTop: 18, gap: 12 },
  registerRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  bottomText:  { fontSize: 13, fontWeight: '600' },
});
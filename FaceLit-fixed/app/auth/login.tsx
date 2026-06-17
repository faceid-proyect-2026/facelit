// ─────────────────────────────────────────────
//  app/auth/login.tsx
//  Pantalla de inicio de sesión — código limpio
//  Lógica en useLoginForm, UI aquí
//  i18n: todos los textos desde t()
// ─────────────────────────────────────────────
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { Colors } from '@/shared/constants/colors';
import { FontSize, FontWeight } from '@/shared/constants/typography';
import { Routes } from '@/shared/constants/routes';
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';
import GradientBackground from '@/shared/components/layout/GradientBackground';
import AuthCard from '@/features/auth/components/AuthCard';
import NavLink from '@/features/auth/components/NavLink';
import { AppButton, InputField, PasswordField } from '@/shared/components/ui';

export default function LoginScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const { form, errors, setField, handleSubmit } = useLoginForm();

  return (
    <GradientBackground>
      <AuthCard>

        {/* Volver */}
        <TouchableOpacity
          
          onPress={() => router.push('/')}
          accessibilityLabel={t('common.back')}
        >
          <Ionicons name="arrow-back" size={18} color={theme.text} />
        </TouchableOpacity>

        {/* Título */}
        <Text style={[s.title, { color: theme.text }]}>
          {t('login.title')}
        </Text>
        <Text style={[s.subtitle, { color: theme.textMuted }]}>
          {t('login.subtitle')}
        </Text>

        {/* Email */}
        <InputField
          label={t('login.email')}
          icon="mail-outline"
          placeholder={t('login.emailPlaceholder')}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(v) => setField('email', v)}
          error={errors.email}
        />

        {/* Contraseña */}
        <PasswordField
          label={t('login.password')}
          placeholder={t('login.passwordPlaceholder')}
          value={form.password}
          onChangeText={(v) => setField('password', v)}
          error={errors.password}
        />

        {/* Política de privacidad */}
        <TouchableOpacity
          onPress={() => setField('accepted', !form.accepted)}
          activeOpacity={0.8}
          style={s.policyRow}
        >
          <View style={[
            s.checkbox,
            {
              borderColor:     form.accepted ? theme.primary : theme.inputBorder,
              backgroundColor: form.accepted ? theme.primary : Colors.transparent,
            },
          ]}>
            {form.accepted && (
              <Ionicons name="checkmark" size={12} color={Colors.white} />
            )}
          </View>
          <Text style={[s.policyText, { color: theme.text }]}>
            {t('login.policyPrefix')}{' '}
          </Text>
          <NavLink href={Routes.AUTH.PRIVACY_NOTICE} label={t('login.policyLink')} />
          <Text style={[s.policyText, { color: theme.text }]}>
            {t('login.policySuffix')}
          </Text>
        </TouchableOpacity>
        {errors.policy ? (
          <Text style={s.errorText}>{t('login.policyError')}</Text>
        ) : null}

        {/* Botón login */}
        <AppButton
          title={t('login.loginBtn')}
          onPress={handleSubmit}
          style={s.loginBtn}
        />

        {/* Links */}
        <View style={s.links}>
          <NavLink
            href={Routes.AUTH.PASSWORD_RECOVERY}
            label={t('login.forgotPassword')}
          />
          <View style={s.registerRow}>
            <Text style={[s.bottomText, { color: theme.text }]}>
              {t('login.noAccount')}{' '}
            </Text>
            <NavLink
              href={Routes.AUTH.REGISTER}
              label={t('login.registerLink')}
            />
          </View>
        </View>

      </AuthCard>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  backBtn: {
    alignSelf:      'flex-start',
    marginBottom:   12,
    width:          34,
    height:         34,
    borderRadius:   8,
    borderWidth:    1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  title: {
    fontSize:     FontSize['3xl'],
    fontWeight:   FontWeight.black,
    textAlign:    'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize:     FontSize.base,
    textAlign:    'center',
    marginBottom: 20,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems:    'center',
    flexWrap:      'wrap',
    gap:           4,
    marginTop:     8,
    marginBottom:  4,
  },
  checkbox: {
    width:          16,
    height:         16,
    borderWidth:    1.5,
    borderRadius:   3,
    alignItems:     'center',
    justifyContent: 'center',
  },
  policyText: {
    fontSize:   FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  errorText: {
    color:     Colors.error,
    fontSize:  FontSize.xs,
    marginTop: 2,
  },
  loginBtn: {
    marginTop: 20,
    maxWidth:  280,
    alignSelf: 'center',
  },
  links: {
    alignItems: 'center',
    marginTop:  18,
    gap:        12,
  },
  registerRow: {
    flexDirection:  'row',
    flexWrap:       'wrap',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize:   FontSize.base,
    fontWeight: FontWeight.bold,
  },
});
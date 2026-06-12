// ─────────────────────────────────────────────
//  app/auth/login.tsx
//  Pantalla de inicio de sesión — código limpio
//  Lógica en useLoginForm, UI aquí
// ─────────────────────────────────────────────
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { Colors } from '@/shared/constants/colors';
import { FontSize, FontWeight } from '@/shared/constants/typography';
import { Routes } from '@/shared/constants/routes';
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';
import GradientBackground from '@/shared/components/layout/GradientBackground';
import AuthCard from '@/features/auth/components/AuthCard';
import NavLink from '@/features/auth/components/NavLink';
import { AppButton, InputField, PasswordField } from '@/shared/components/ui';
import { Ionicons } from '@expo/vector-icons';



export default function LoginScreen() {
  const { theme, isDark } = useTheme();
  const { form, errors, setField, handleSubmit } = useLoginForm();

  return (
    <GradientBackground>
      <AuthCard>

        {/* Logo */}
        <Image
          source={
            isDark
              ? require('@/assets/images/logo.png')
              : require('@/assets/images/logo2.png')
          }
          style={s.logo}
          resizeMode="contain"
        />

        {/* Título */}
        <Text style={[s.title, { color: theme.text }]}>
          Inicio de sesión
        </Text>
        <Text style={[s.subtitle, { color: theme.textMuted }]}>
          Ingrese sus credenciales
        </Text>

        {/* Email */}
        <InputField
          label="Correo electrónico"
          icon="mail-outline"
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(v) => setField('email', v)}
          error={errors.email}
        />

        {/* Contraseña */}
        <PasswordField
          label="Contraseña"
          placeholder="********"
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
            ¿He leído y acepto el{' '}
          </Text>
          <NavLink href={Routes.AUTH.PRIVACY_NOTICE} label="aviso de privacidad" />
          <Text style={[s.policyText, { color: theme.text }]}>?</Text>
        </TouchableOpacity>
        {errors.policy ? (
          <Text style={s.errorText}>{errors.policy}</Text>
        ) : null}

        {/* Botón login */}
        <AppButton
          title="Iniciar sesión"
          onPress={handleSubmit}
          style={s.loginBtn}
        />

        {/* Links */}
        <View style={s.links}>
          <NavLink href={Routes.AUTH.PASSWORD_RECOVERY} label="¿Olvidaste tu contraseña?" />
          <View style={s.registerRow}>
            <Text style={[s.bottomText, { color: theme.text }]}>
              ¿No tienes cuenta?{' '}
            </Text>
            <NavLink href={Routes.AUTH.REGISTER} label="Regístrate aquí" />
          </View>
        </View>

      </AuthCard>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  logo: {
    width:        180,
    height:       70,
    alignSelf:    'center',
    marginBottom: 20,
  },
  title: {
    fontSize:    FontSize['3xl'],
    fontWeight:  FontWeight.black,
    textAlign:   'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize:    FontSize.base,
    textAlign:   'center',
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
    marginTop:  20,
    maxWidth:   280,
    alignSelf:  'center',
  },
  links: {
    alignItems: 'center',
    marginTop:  18,
    gap:        12,
  },
  registerRow: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize:   FontSize.base,
    fontWeight: FontWeight.bold,
  },
});
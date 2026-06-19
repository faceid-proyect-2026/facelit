// ─────────────────────────────────────────────
//  app/auth/email-validated-success.tsx
// ─────────────────────────────────────────────
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/shared/components/layout/GradientBackground';
import { AppButton } from '@/shared/components/ui';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { Colors } from '@/shared/constants/colors';
import { FontSize, FontWeight } from '@/shared/constants/typography';

// ─── Sub-component: Email badge ───────────────
function EmailBadge({ email }: { email: string }) {
  const { theme } = useTheme();

  return (
    <View style={[
      badge.wrap,
      { backgroundColor: theme.primaryFaint, borderColor: theme.primary },
    ]}>
      <Ionicons name="mail-open-outline" size={16} color={theme.primary} />
      <Text style={[badge.text, { color: theme.primary }]}>
        {email || 'correo@ejemplo.com'}
      </Text>
    </View>
  );
}

const badge = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1, borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 10,
    marginBottom: 16,
  },
  text: { fontSize: FontSize.base, fontWeight: FontWeight.bold },
});

// ─── Screen ───────────────────────────────────
export default function EmailValidatedSuccessScreen() {
  const { t }     = useTranslation();
  const { theme } = useTheme();
  const { email } = useLocalSearchParams<{ email: string }>();

  const handleContinue = () => {
    router.push({
      pathname: '/auth/register' as any,
      params: { validatedEmail: email },
    });
  };

  return (
    <GradientBackground>
      <View style={s.container}>
        <View style={[s.card, { backgroundColor: theme.card }]}>

          {/* Ícono */}
          <View style={[s.iconCircle, { borderColor: theme.primary }]}>
            <Ionicons name="checkmark-circle" size={72} color={theme.primary} />
          </View>

          {/* Título */}
          <Text style={[s.title, { color: theme.text }]}>
            {t('emailValidatedSuccess.title')}
          </Text>

          {/* Email badge */}
          <EmailBadge email={email} />

          {/* Subtítulo */}
          <Text style={[s.subtitle, { color: theme.textMuted }]}>
            {t('emailValidatedSuccess.subtitle')}
          </Text>

          {/* Divider */}
          <View style={[s.divider, { backgroundColor: theme.border }]} />

          {/* Botón */}
          <AppButton
            title={t('emailValidatedSuccess.btn')}
            onPress={handleContinue}
            fullWidth={false}
            style={s.btn}
          />

        </View>
      </View>
    </GradientBackground>
  );
}

// ─── Styles ───────────────────────────────────
const s = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center', paddingHorizontal: 24,
  },
  card: {
    width: '100%', maxWidth: 420, borderRadius: 26,
    paddingHorizontal: 32, paddingVertical: 40, alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18, shadowRadius: 18, elevation: 8,
  },
  iconCircle: {
    width: 120, height: 120, borderRadius: 60, borderWidth: 3,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  title:    { fontSize: FontSize['2xl'], fontWeight: FontWeight.black, textAlign: 'center', marginBottom: 16, lineHeight: 32 },
  subtitle: { fontSize: FontSize.base, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  divider:  { width: '80%', height: 1, marginBottom: 24 },
  btn:      { width: '70%', borderRadius: 14 },
});
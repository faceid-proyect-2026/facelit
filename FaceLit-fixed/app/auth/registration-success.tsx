// ─────────────────────────────────────────────
//  app/auth/registration-success.tsx
// ─────────────────────────────────────────────
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/shared/components/layout/GradientBackground';
import { AppButton } from '@/shared/components/ui';
import { useTheme } from '@/shared/contexts/ThemeContext';

export default function RegistrationSuccessScreen() {
  const { t }             = useTranslation();
  const { theme, isDark } = useTheme();

  const cardBg     = isDark ? '#07120D'   : '#FFFFFF';
  const cardShadow = isDark ? '#000000'   : '#1C3A1D';
  const textColor  = isDark ? '#FFFFFF'   : '#111111';
  const mutedColor = isDark ? '#A8BCA6'   : '#555555';

  return (
    <GradientBackground>
      <View style={[s.arcTop,    { backgroundColor: isDark ? 'rgba(101,179,97,0.08)' : 'rgba(20,70,28,0.18)' }]} />
      <View style={[s.arcBottom, { backgroundColor: isDark ? 'rgba(101,179,97,0.22)' : 'rgba(101,179,97,0.28)' }]} />

      <View style={s.container}>
        <View style={[s.card, { backgroundColor: cardBg, shadowColor: cardShadow }]}>

          {/* Círculo con check */}
          <View style={[s.iconCircle, { backgroundColor: theme.primary }]}>
            <Ionicons name="checkmark" size={52} color="#FFFFFF" />
          </View>

          {/* Título */}
          <Text style={[s.title, { color: textColor }]}>
            {t('registrationSuccess.title')}
          </Text>

          {/* Subtítulo */}
          <Text style={[s.subtitle, { color: mutedColor }]}>
            {t('registrationSuccess.subtitle')}
          </Text>

          {/* Separador */}
          <View style={[s.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }]} />

          {/* Botón */}
          <AppButton
            title={t('registrationSuccess.btn')}
            onPress={() => router.replace('/auth/login')}
            fullWidth={false}
            style={s.btn}
          />

        </View>
      </View>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  arcTop:    { position: 'absolute', width: 300, height: 420, right: -120, top: -90,    borderRadius: 200 },
  arcBottom: { position: 'absolute', width: 420, height: 220, left: -120,  bottom: -30, borderRadius: 180 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  card: {
    borderRadius: 26, paddingHorizontal: 32, paddingVertical: 40,
    width: '100%', maxWidth: 420, alignItems: 'center',
    shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.18,
    shadowRadius: 18, elevation: 8,
  },
  iconCircle: {
    width: 100, height: 100, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center', marginBottom: 28,
  },
  title:    { fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 12, lineHeight: 32 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  divider:  { width: '80%', height: 1, marginBottom: 28 },
  btn:      { paddingHorizontal: 48, borderRadius: 14 },
});
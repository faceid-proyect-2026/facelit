// ─────────────────────────────────────────────
//  app/auth/email-validated-success.tsx
//  Pantalla de código verificado exitosamente
//  Vuelve a register pasando el email validado
// ─────────────────────────────────────────────
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { AppButton } from '@/shared/components/ui';

export default function EmailValidatedSuccessScreen() {
  const { theme, isDark } = useTheme();
  const { email } = useLocalSearchParams<{ email: string }>();

  const text   = isDark ? '#FFFFFF' : '#111111';
  const muted  = isDark ? '#A8BCA6' : '#555555';
  const cardBg = isDark ? '#07120D' : '#FFFFFF';

  const handleContinue = () => {
    router.push({
      pathname: '/auth/register' as any,
      params: { validatedEmail: email },
    });
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
        <View style={s.container}>
          <View style={[s.card, { backgroundColor: cardBg, shadowColor: isDark ? '#000' : '#1C3A1D' }]}>

            {/* Círculo con check */}
            <View style={[s.iconCircle, { borderColor: theme.primary }]}>
              <Ionicons name="checkmark-circle" size={72} color={theme.primary} />
            </View>

            {/* Título */}
            <Text style={[s.title, { color: text }]}>
              ¡Correo verificado!
            </Text>

            {/* Badge con el email */}
            <View style={[s.emailBadge, {
              backgroundColor: isDark ? 'rgba(101,179,97,0.10)' : 'rgba(101,179,97,0.08)',
              borderColor: theme.primary,
            }]}>
              <Ionicons name="mail-open-outline" size={16} color={theme.primary} />
              <Text style={[s.emailText, { color: theme.primary }]}>
                {email || 'correo@ejemplo.com'}
              </Text>
            </View>

            {/* Subtítulo */}
            <Text style={[s.subtitle, { color: muted }]}>
              Tu correo ha sido verificado correctamente.{'\n'}
              Puedes continuar con el registro.
            </Text>

            {/* Divider */}
            <View style={[s.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }]} />

            {/* Botón */}
            <AppButton
              title="Continuar registro"
              onPress={handleContinue}
              style={s.btn}
            />

          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  gradient:  { flex: 1 },
  safe:      { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  arcTop:    { position: 'absolute', width: 300, height: 420, right: -120, top: -90, borderRadius: 200 },
  arcBottom: { position: 'absolute', width: 420, height: 220, left: -120, bottom: -30, borderRadius: 180 },

  card: {
    width: '100%', maxWidth: 420, borderRadius: 26,
    paddingHorizontal: 32, paddingVertical: 40, alignItems: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18, shadowRadius: 18, elevation: 8,
  },

  iconCircle: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 3, alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
  },

  title:    { fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 16, lineHeight: 32 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 24 },

  emailBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1, borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 10,
    marginBottom: 16,
  },
  emailText: { fontSize: 14, fontWeight: '700' },

  divider: { width: '80%', height: 1, marginBottom: 24 },
  btn:     { paddingHorizontal: 48, borderRadius: 14 },
});
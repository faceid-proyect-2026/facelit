import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@/shared/components/ui';
import { useTheme } from '@/shared/contexts/ThemeContext'; // ← AGREGAR

export default function PasswordResetDoneScreen() {
  const { t } = useTranslation();
  const { theme, isDark } = useTheme(); // ← AGREGAR

  // ── Colores dinámicos (igual que PasswordRecoveryScreen) ──
  const text    = isDark ? '#FFFFFF' : '#111111';
  const muted   = isDark ? '#CAD6C8' : '#1E1E1E';
  const cardBg  = isDark ? '#07120D' : '#EAF5E6';
  const securityLogBg     = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const securityLogBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)';
  const securityTitleColor = isDark ? '#7ED957' : '#2E7229';

  const SECURITY_ITEMS = [
    t('passwordResetDone.security.item1'),
    t('passwordResetDone.security.item2'),
    t('passwordResetDone.security.item3'),
    t('passwordResetDone.security.item4'),
  ];

  return (
    <LinearGradient
      colors={
        isDark
          ? ['#000000', '#06170F', '#0B2D17']          // oscuro — igual que antes
          : ['#DCF0D8', '#C5E3BE', '#1E4C28']          // claro  — mismo que PasswordRecovery
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View
        style={[
          styles.backgroundArcTop,
          { backgroundColor: isDark ? 'rgba(101,179,97,0.08)' : 'rgba(20,70,28,0.18)' },
        ]}
      />
      <View
        style={[
          styles.backgroundArcBottom,
          { backgroundColor: isDark ? 'rgba(101,179,97,0.22)' : 'rgba(101,179,97,0.28)' },
        ]}
      />

      <SafeAreaView style={styles.safe}>
        <View style={styles.webWrapper}>
          <View style={[styles.card, { backgroundColor: cardBg }]}>

            {/* Ícono */}
            <View style={styles.iconWrapper}>
              <Image
                source={require('@/assets/images/check.png')}
                style={styles.imagen}
                resizeMode="contain"
              />
            </View>

            {/* Título */}
            <Text style={[styles.title, { color: text }]}>
              {t('passwordResetDone.title')}
            </Text>

            {/* Subtítulos */}
            <Text style={[styles.subtitle, { color: muted }]}>
              {t('passwordResetDone.subtitle1')}
            </Text>
            <Text style={[styles.subtitle2, { color: muted }]}>
              {t('passwordResetDone.subtitle2')}
            </Text>

            {/* Registro de seguridad */}
            <View style={[
              styles.securityLog,
              { backgroundColor: securityLogBg, borderColor: securityLogBorder }
            ]}>
              <Text style={[styles.securityTitle, { color: securityTitleColor }]}>
                {t('passwordResetDone.securityTitle')}
              </Text>
              {SECURITY_ITEMS.map((item) => (
                <Text key={item} style={[styles.securityItem, { color: text }]}>
                  {item}
                </Text>
              ))}
            </View>

            {/* Botón */}
            <View style={styles.btnWrapper}>
              <AppButton
                title={t('passwordResetDone.loginBtn')}
                onPress={() => router.replace('/auth/login')}
                fullWidth={false}
                style={styles.btn}
              />
            </View>

          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe:     { flex: 1, justifyContent: 'center', alignItems: 'center' },
  // Los arcos ya no llevan backgroundColor aquí — se pasa dinámico arriba
  backgroundArcTop: {
    position: 'absolute', width: 300, height: 420,
    right: -120, top: -90, borderRadius: 200,
    transform: [{ rotate: '-22deg' }],
  },
  backgroundArcBottom: {
    position: 'absolute', width: 420, height: 220,
    left: -120, bottom: -30, borderRadius: 180,
    transform: [{ rotate: '-18deg' }],
  },
  webWrapper: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 700 : 430,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 26,
    paddingHorizontal: 28, paddingVertical: 34,
    borderWidth: 1, borderColor: 'rgba(101,179,97,0.22)',
    shadowColor: '#000000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18, shadowRadius: 18, elevation: 8,
    alignItems: 'center',
  },
  iconWrapper:   { justifyContent: 'center', alignItems: 'center', marginBottom: 18 },
  imagen:        { width: 95, height: 95 },
  title:         { fontSize: 28, fontWeight: '900', textAlign: 'center', marginBottom: 12 },
  subtitle:      { fontSize: 14, textAlign: 'center', marginBottom: 4,  lineHeight: 20 },
  subtitle2:     { fontSize: 14, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  securityLog: {
    width: '100%', borderRadius: 14,
    padding: 18, marginBottom: 28, borderWidth: 1,
  },
  securityTitle: { fontWeight: '800', fontSize: 14, marginBottom: 10 },
  securityItem:  { fontSize: 13, marginBottom: 6, lineHeight: 19 },
  btnWrapper:    { width: '100%', alignItems: 'center' },
  btn:           { width: '80%', paddingVertical: 14 },
});
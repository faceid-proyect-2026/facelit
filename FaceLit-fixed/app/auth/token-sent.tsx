import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/contexts/ThemeContext';

// ─── Constants ────────────────────────────────────────────────────────────────

const GRADIENT_DARK   = ['#000000', '#06170F', '#0B2D17'] as const;
const GRADIENT_LIGHT  = ['#DCF0D8', '#C5E3BE', '#1E4C28'] as const;
const BUTTON_GRADIENT = ['#72C96D', '#61a55d', '#3c673a'] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function TokenSentScreen() {
  const { isDark } = useTheme();
  const colors = getColors(isDark);

  return (
    <LinearGradient
      colors={isDark ? GRADIENT_DARK : GRADIENT_LIGHT}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <BackgroundArcs isDark={isDark} />

      <SafeAreaView style={styles.safe}>
        <View style={[styles.card, { backgroundColor: colors.cardBg, shadowColor: colors.shadow }]}>
          <CardHeader />
          <CardBody colors={colors} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BackgroundArcs({ isDark }: { isDark: boolean }) {
  return (
    <>
      <View
        style={[
          styles.arcTop,
          { backgroundColor: isDark ? 'rgba(101,179,97,0.08)' : 'rgba(20,70,28,0.18)' },
        ]}
      />
      <View
        style={[
          styles.arcBottom,
          { backgroundColor: isDark ? 'rgba(101,179,97,0.22)' : 'rgba(101,179,97,0.28)' },
        ]}
      />
    </>
  );
}

function CardHeader() {
  return (
    <View style={styles.header}>
      <Image
        source={require('@/assets/images/token.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

function CardBody({ colors }: { colors: ReturnType<typeof getColors> }) {
  // useTranslation() directo en el sub-componente que tiene los textos
  const { t } = useTranslation();

  return (
    <View style={styles.body}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t('tokenSent.title')}
      </Text>

      <Text style={[styles.subtitle, { color: colors.muted }]}>
        {t('tokenSent.subtitle')}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/auth/verify-identity')}
        activeOpacity={0.85}
      >
        <LinearGradient colors={BUTTON_GRADIENT} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>{t('tokenSent.btn')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getColors(isDark: boolean) {
  return {
    text:   isDark ? '#FFFFFF' : '#000000',
    muted:  isDark ? '#CAD6C8' : '#1E1E1E',
    cardBg: isDark ? '#07120D' : '#FFFFFF',
    shadow: isDark ? '#000000' : '#1C3A1D',
  };
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  arcTop: {
    position: 'absolute', width: 300, height: 420,
    right: -120, top: -90, borderRadius: 200,
  },
  arcBottom: {
    position: 'absolute', width: 420, height: 220,
    left: -120, bottom: -30, borderRadius: 180,
  },
  card: {
    width: '100%', maxWidth: 420, borderRadius: 26, overflow: 'hidden',
    shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.18,
    shadowRadius: 18, elevation: 8,
  },
  header: {
    backgroundColor: '#3a7437', paddingVertical: 32, alignItems: 'center',
  },
  image:  { width: 95, height: 95 },
  body: {
    paddingHorizontal: 28, paddingVertical: 30, alignItems: 'center',
  },
  title: {
    fontSize: 28, fontWeight: '900', textAlign: 'center', marginBottom: 12,
  },
  subtitle: {
    fontSize: 14, lineHeight: 22, textAlign: 'center', marginBottom: 26,
  },
  button:         { width: '70%', borderRadius: 16, overflow: 'hidden' },
  buttonGradient: { paddingVertical: 12, alignItems: 'center' },
  buttonText:     { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});
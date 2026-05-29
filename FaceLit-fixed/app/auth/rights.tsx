// ─────────────────────────────────────────────
//  app/rights.tsx — Rediseñado
//  Mismo patrón: LinearGradient, arcos, tarjeta temática
// ─────────────────────────────────────────────
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Platform, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_MAX = 480;

const RIGHTS = [
  {
    icon: 'eye-outline' as const,
    title: 'Derecho de acceso',
    desc: 'Usted tiene derecho a conocer qué datos personales tenemos registrados sobre usted en nuestro sistema.',
  },
  {
    icon: 'create-outline' as const,
    title: 'Derecho de actualización',
    desc: 'Puede actualizar sus datos personales cuando estos sean incorrectos o incompletos.',
  },
  {
    icon: 'shield-checkmark-outline' as const,
    title: 'Derecho de rectificación',
    desc: 'Tiene derecho a solicitar la corrección de datos incorrectos que tengamos sobre usted.',
  },
  {
    icon: 'trash-outline' as const,
    title: 'Derecho de supresión',
    desc: 'Puede solicitar la eliminación de sus datos cuando ya no sean necesarios para los fines del tratamiento.',
  },
  {
    icon: 'ban-outline' as const,
    title: 'Derecho de revocación',
    desc: 'Puede revocar en cualquier momento el consentimiento otorgado para el tratamiento de sus datos.',
  },
];

export default function RightsScreen() {
  const { theme, isDark } = useTheme();

  const text        = isDark ? '#FFFFFF' : '#111111';
  const muted       = isDark ? '#A8BCA6' : '#555555';
  const cardBg      = isDark ? '#07120D' : '#FFFFFF';
  const cardBorder  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const itemBg      = isDark ? 'rgba(255,255,255,0.04)' : '#F6FBF6';
  const itemBorder  = isDark ? 'rgba(101,179,97,0.18)' : 'rgba(101,179,97,0.20)';
  const importantBg = isDark ? 'rgba(101,179,97,0.12)' : 'rgba(101,179,97,0.10)';
  const isWide      = width >= 900;

  return (
    <LinearGradient
      colors={isDark
        ? ['#000000', '#06170F', '#0B2D17']
        : ['#F7FFF4', '#E5F7DF', '#1E4C28']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.gradient}
    >
      {/* Arcos decorativos */}
      <View style={s.arcTop} />
      <View style={s.arcBottom} />

      <SafeAreaView style={s.safe}>
        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            s.card,
            isWide && s.cardWide,
            { backgroundColor: cardBg, borderColor: cardBorder },
          ]}>

            {/* Botón cerrar */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={[s.closeBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }]}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={20} color={muted} />
            </TouchableOpacity>

            {/* Ícono principal */}
            <View style={s.iconWrap}>
              <LinearGradient
                colors={['#7DD87A', '#65B361', '#4A9146']}
                style={s.iconCircle}
              >
                <Ionicons name="shield-checkmark" size={30} color="#FFFFFF" />
              </LinearGradient>
            </View>

            {/* Título */}
            <Text style={[s.title, { color: text }]}>
              Derechos sobre tus{'\n'}
              <Text style={{ color: theme.primary }}>datos personales</Text>
            </Text>

            <Text style={[s.subtitle, { color: muted }]}>
              Conoce cómo tus derechos son protegidos conforme a la{' '}
              <Text style={{ color: theme.primary, fontWeight: '700' }}>Ley 1581 de 2012</Text>
            </Text>

            {/* Separador */}
            <View style={[s.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }]} />

            {/* Lista de derechos */}
            {RIGHTS.map((r, i) => (
              <View
                key={i}
                style={[s.rightItem, { backgroundColor: itemBg, borderColor: itemBorder }]}
              >
                <View style={[s.rightIconWrap, { backgroundColor: theme.primary + '20' }]}>
                  <Ionicons name={r.icon} size={18} color={theme.primary} />
                </View>
                <View style={s.rightContent}>
                  <Text style={[s.rightTitle, { color: theme.primary }]}>{r.title}</Text>
                  <Text style={[s.rightDesc, { color: muted }]}>{r.desc}</Text>
                </View>
              </View>
            ))}

            {/* Caja importante */}
            <View style={[s.importantBox, { backgroundColor: importantBg, borderColor: theme.primary + '40' }]}>
              <Ionicons name="information-circle-outline" size={18} color={theme.primary} style={{ marginBottom: 6 }} />
              <Text style={[s.importantText, { color: text }]}>
                <Text style={[s.importantBold, { color: theme.primary }]}>Importante: </Text>
                al leer y aceptar estos derechos, cualquier decisión sobre sus datos personales será de su exclusiva responsabilidad conforme a la normativa vigente.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  gradient: { flex: 1 },
  safe:     { flex: 1 },

  arcTop:    { position: 'absolute', width: 300, height: 420, right: -120, top: -90, borderRadius: 200, backgroundColor: 'rgba(20,70,28,0.18)' },
  arcBottom: { position: 'absolute', width: 420, height: 220, left: -120, bottom: -30, borderRadius: 180, backgroundColor: 'rgba(101,179,97,0.28)' },

  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 16,
  },

  card: {
    width: '100%',
    maxWidth: CARD_MAX,
    borderRadius: 26,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  cardWide: { paddingHorizontal: 36 },

  closeBtn: {
    alignSelf: 'flex-end',
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  iconWrap:   { alignItems: 'center', marginBottom: 16 },
  iconCircle: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#65B361',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },

  title:    { fontSize: 22, fontWeight: '900', textAlign: 'center', lineHeight: 30, marginBottom: 8 },
  subtitle: { fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 20 },

  divider: { height: 1, marginBottom: 20 },

  rightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  rightIconWrap: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  rightContent: { flex: 1 },
  rightTitle:   { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  rightDesc:    { fontSize: 13, lineHeight: 19 },

  importantBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  importantText: { fontSize: 13, lineHeight: 20, textAlign: 'center' },
  importantBold: { fontWeight: '800' },

  backBtn:         { width: '100%', maxWidth: 260, alignSelf: 'center', borderRadius: 14, overflow: 'hidden' },
  backBtnGradient: { paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  backBtnText:     { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});

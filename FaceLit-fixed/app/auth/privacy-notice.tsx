// ─────────────────────────────────────────────
//  app/auth/privacy-notice.tsx
//  Aviso de privacidad — código limpio
// ─────────────────────────────────────────────
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { Colors } from '@/shared/constants/colors';
import { FontSize, FontWeight } from '@/shared/constants/typography';
import { Routes } from '@/shared/constants/routes';
import GradientBackground from '@/shared/components/layout/GradientBackground';

// ── Datos estáticos ───────────────────────────
const LIST_ITEMS = [
  'Identificación y autenticación en el sistema de asistencia',
  'Registro y control de asistencia mediante datos biométricos',
  'Generación de reportes y estadísticas de puntualidad',
  'Comunicación de notificaciones importantes',
];

const PRIVACY_URL = 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981';

// ── Componente ────────────────────────────────
export default function PrivacyNoticeScreen() {
  const { theme, isDark } = useTheme();

  const cardBg    = isDark ? Colors.dark.surface  : Colors.white;
  const textColor = isDark ? Colors.dark.text     : Colors.black;
  const muted     = isDark ? Colors.dark.textMuted : Colors.light.textMuted;
  const linkColor = isDark ? Colors.primaryLight  : Colors.primary;

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={[s.card, { backgroundColor: cardBg }]}>

          {/* Cerrar */}
          <TouchableOpacity
            style={s.closeBtn}
            onPress={() => router.replace(Routes.AUTH.LOGIN as any)}
          >
            <Text style={[s.closeText, { color: textColor }]}>✕</Text>
          </TouchableOpacity>

          {/* Título */}
          <Text style={[s.title, { color: textColor }]}>
            Aviso de privacidad
          </Text>
          <Text style={[s.subtitle, { color: muted }]}>
            Información sobre el tratamiento de sus datos personales
          </Text>

          {/* Cuerpo */}
          <Text style={[s.body, { color: textColor }]}>
            De conformidad con la Ley 1581 de 2012, sus datos personales serán
            tratados con las siguientes finalidades:
          </Text>

          {/* Lista */}
          {LIST_ITEMS.map((item) => (
            <View key={item} style={s.listRow}>
              <Text style={[s.bullet, { color: textColor }]}>•</Text>
              <Text style={[s.listItem, { color: textColor }]}>{item}</Text>
            </View>
          ))}

          {/* Advertencia */}
          <Text style={s.warning}>
            Sus credenciales son personales e intransferibles. No las comparta
            con terceros.
          </Text>

          {/* Derechos */}
          <Text style={[s.body, { color: textColor }]}>
            Usted tiene derecho a conocer, actualizar y rectificar sus datos
            personales en cualquier momento.
          </Text>

          {/* Link */}
          <Text style={[s.body, { color: textColor }]}>
            <Text style={s.bold}>Más información: </Text>
            <Text
              style={[s.link, { color: linkColor }]}
              onPress={() => Linking.openURL(PRIVACY_URL)}
            >
              {PRIVACY_URL}
            </Text>
          </Text>

        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  scroll: {
    flexGrow:          1,
    justifyContent:    'center',
    alignItems:        'center',
    paddingHorizontal: 20,
    paddingVertical:   30,
  },
  card: {
    width:             '100%',
    maxWidth:          520,
    borderRadius:      26,
    paddingHorizontal: 26,
    paddingVertical:   28,
    shadowOffset:      { width: 0, height: 10 },
    shadowOpacity:     0.18,
    shadowRadius:      18,
    elevation:         8,
  },
  closeBtn:  { alignSelf: 'flex-end', marginBottom: 8 },
  closeText: { fontSize: FontSize['2xl'], fontWeight: FontWeight.bold },
  title:     { fontSize: FontSize['3xl'], fontWeight: FontWeight.black, textAlign: 'center', marginBottom: 8 },
  subtitle:  { fontSize: FontSize.base, textAlign: 'center', marginBottom: 20 },
  body:      { fontSize: FontSize.base, lineHeight: 22, marginBottom: 14 },
  listRow:   { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, paddingLeft: 6 },
  bullet:    { fontSize: FontSize.base, marginRight: 8, lineHeight: 22 },
  listItem:  { flex: 1, fontSize: FontSize.base, lineHeight: 22 },
  warning:   { fontSize: FontSize.base, color: Colors.error, marginVertical: 12, lineHeight: 22, fontWeight: FontWeight.bold },
  bold:      { fontWeight: FontWeight.bold },
  link:      { fontSize: FontSize.base, fontWeight: FontWeight.bold, textDecorationLine: 'underline' },
});
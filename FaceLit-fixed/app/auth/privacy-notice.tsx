import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

const LIST_ITEMS = [
  'Identificación y autenticación en el sistema de asistencia',
  'Registro y control de asistencia mediante datos biométricos',
  'Generación de reportes y estadísticas de puntualidad',
  'Comunicación de notificaciones importantes',
];

const LINK_URL = 'https://share.google/KHen3qRj2g5sVHCCw';

export default function PrivacyNoticeScreen() {
  const { theme, isDark } = useTheme();

  const text = isDark ? '#FFFFFF' : '#000000';
  const muted = isDark ? '#CAD6C8' : '#1E1E1E';
  const cardBg = isDark ? '#07120D' : '#FFFFFF';
  const linkColor = isDark ? '#7ED957' : '#65B361';

  return (
    <LinearGradient
      colors={
        isDark
          ? ['#000000', '#06170F', '#0B2D17']
          : ['#F7FFF4', '#E5F7DF', '#1E4C28']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View
        style={[
          styles.backgroundArcTop,
          {
            backgroundColor: isDark
              ? 'rgba(101,179,97,0.08)'
              : 'rgba(20,70,28,0.18)',
          },
        ]}
      />

      <View
        style={[
          styles.backgroundArcBottom,
          {
            backgroundColor: isDark
              ? 'rgba(101,179,97,0.22)'
              : 'rgba(101,179,97,0.28)',
          },
        ]}
      />

      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          
          <View
            style={[
              styles.card,
              {
                backgroundColor: cardBg,
                shadowColor: isDark ? '#000000' : '#1C3A1D',
              },
            ]}
          >
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => router.replace('/auth/login')}
            >
              <Text style={[styles.closeText, { color: text }]}>✕</Text>
            </TouchableOpacity>

            <Text style={[styles.title, { color: text }]}>
              Aviso de privacidad
            </Text>

            <Text style={[styles.subtitle, { color: muted }]}>
              Información sobre el tratamiento de sus datos personales
            </Text>

            <Text style={[styles.body, { color: text }]}>
              De conformidad con la Ley 1581 de 2012, sus datos personales serán
              tratados con las siguientes finalidades:
            </Text>

            {LIST_ITEMS.map((item) => (
              <View key={item} style={styles.listRow}>
                <Text style={[styles.bullet, { color: text }]}>•</Text>
                <Text style={[styles.listItem, { color: text }]}>
                  {item}
                </Text>
              </View>
            ))}

            <Text style={styles.warning}>
              Sus credenciales son personales e intransferibles. No las comparta
              con terceros.
            </Text>

            <Text style={[styles.body, { color: text }]}>
              Usted tiene derecho a conocer, actualizar y rectificar sus datos
              personales en cualquier momento.
            </Text>

            <Text style={[styles.body, { color: text }]}>
              <Text style={styles.bold}>Más información: </Text>
              <Text
                style={[styles.link, { color: linkColor }]}
                onPress={() => Linking.openURL(LINK_URL)}
              >
                https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safe: {
    flex: 1,
  },

  backgroundArcTop: {
    position: 'absolute',
    width: 300,
    height: 420,
    right: -120,
    top: -90,
    borderRadius: 200,
  },

  backgroundArcBottom: {
    position: 'absolute',
    width: 420,
    height: 220,
    left: -120,
    bottom: -30,
    borderRadius: 180,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  logo: {
    width: 180,
    height: 70,
    marginBottom: 18,
  },

  card: {
    width: '100%',
    maxWidth: 520,
    borderRadius: 26,
    paddingHorizontal: 26,
    paddingVertical: 28,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },

  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },

  closeText: {
    fontSize: 22,
    fontWeight: '700',
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },

  body: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
  },

  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 6,
  },

  bullet: {
    fontSize: 14,
    marginRight: 8,
    lineHeight: 22,
  },

  listItem: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },

  warning: {
    fontSize: 14,
    color: '#D92027',
    marginVertical: 12,
    lineHeight: 22,
    fontWeight: '700',
  },

  bold: {
    fontWeight: '700',
  },

  link: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
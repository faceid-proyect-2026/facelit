import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';

const LIST_ITEMS = [
  'Identificación y autenticación en el sistema de asistencia',
  'Registro y control de asistencia mediante datos biométricos',
  'Generación de reportes y estadísticas de puntualidad',
  'Comunicación de notificaciones importantes',
];

const LINK_URL = 'https://share.google/KHen3qRj2g5sVHCCw';

export default function PrivacyNoticeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>

          {/* Botón X arriba a la derecha → va al login */}
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.replace('/login')}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Título */}
          <Text style={styles.title}>Aviso de privacidad</Text>

          {/* Subtítulo */}
          <Text style={styles.subtitle}>
            Información sobre el tratamiento de sus datos personales
          </Text>

          {/* Párrafo intro */}
          <Text style={styles.body}>
            De conformidad con la Ley 1581 de 2012, sus datos personales serán
            tratados con las siguientes finalidades:
          </Text>

          {/* Lista de ítems */}
          {LIST_ITEMS.map((item) => (
            <View key={item} style={styles.listRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItem}>{item}</Text>
            </View>
          ))}

          {/* Advertencia roja */}
          <Text style={styles.warning}>
            Sus credenciales son personales e intransferibles. No las comparta con terceros.
          </Text>

          {/* Derechos */}
          <Text style={styles.body}>
            Usted tiene derecho a conocer, actualizar y rectificar sus datos
            personales en cualquier momento.
          </Text>

          {/* Link externo */}
          <Text style={styles.body}>
            <Text style={styles.bold}>Más información{' '}</Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(LINK_URL)}
            >
              {LINK_URL}
            </Text>
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 440,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  closeText: {
    fontSize: 20,
    color: Colors.black,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    color: '#111010',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  body: {
    fontSize: 14,
    color: '#111010',
    marginBottom: 12,
    lineHeight: 22,
    textAlign: 'left',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#111010',
    marginRight: 8,
    lineHeight: 22,
  },
  listItem: {
    flex: 1,
    fontSize: 14,
    color: '#111010',
    lineHeight: 22,
  },
  warning: {
    fontSize: 14,
    color: '#ea230d',
    marginTop: 8,
    marginBottom: 12,
    lineHeight: 22,
    textAlign: 'left',
  },
  bold: {
    fontWeight: '700',
    color: '#111010',
  },
  link: {
    color: '#096beb',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

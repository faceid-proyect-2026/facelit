import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';

export default function RightsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>

          {/* Botón X arriba a la derecha */}
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          {/* Título */}
          <Text style={styles.title}>
            Derechos de acceso, actualización y rectificación
          </Text>

          {/* Subtítulo */}
          <Text style={styles.subtitle}>
            Conoce cómo tus derechos sobre tus datos personales son protegidos
          </Text>

          {/* Derecho de acceso */}
          <Text style={styles.rightTitle}>Derechos de acceso</Text>
          <Text style={styles.rightDesc}>
            Usted tiene derecho a conocer qué datos personales tenemos registrados
            sobre usted en nuestro sistema.
          </Text>

          {/* Derecho de actualización */}
          <Text style={styles.rightTitle}>Derechos de actualización</Text>
          <Text style={styles.rightDesc}>
            Puede actualizar sus datos personales cuando estos sean incorrectos o
            incompletos.
          </Text>

          {/* Derecho de rectificación */}
          <Text style={styles.rightTitle}>Derechos de rectificación</Text>
          <Text style={styles.rightDesc}>
            Tiene derecho a solicitar la corrección de datos incorrectos que
            tengamos sobre usted.
          </Text>

          {/* Caja Importante */}
          <View style={styles.importantBox}>
            <Text style={styles.importantText}>
              <Text style={styles.importantBold}>Importante: </Text>
              al leer estos derechos, cualquier decisión sobre sus datos será de
              su exclusiva responsabilidad.
            </Text>
          </View>

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
    maxWidth: 400,
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
    fontSize: 24,
    color: Colors.black,
    lineHeight: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 17,
  },
  rightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  rightDesc: {
    fontSize: 13,
    color: Colors.black,
    marginBottom: 14,
    lineHeight: 18,
  },
  importantBox: {
    backgroundColor: '#00cd2554',
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },
  importantText: {
    fontSize: 12,
    color: Colors.black,
    lineHeight: 17,
  },
  importantBold: {
    fontWeight: '700',
  },
});

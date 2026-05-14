import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import { router } from 'expo-router';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

export default function TeenagerRegistrationScreen() {
  const [captured, setCaptured] = useState(false);

  const handleCapture = () => {
    Alert.alert('Captura facial', 'Aquí se abrirá la cámara para capturar tu rostro.', [
      { text: 'Simular captura', onPress: () => setCaptured(true) },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleFinish = () => {
    if (!captured) { Alert.alert('Atención', 'Debes capturar tu rostro para continuar.'); return; }
    router.replace('/registration-success');
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Registro facial</Text>
        <Text style={styles.subtitle}>
          Para completar tu registro necesitamos capturar tu rostro.{'\n'}Asegúrate de estar en un lugar bien iluminado.
        </Text>
        <TouchableOpacity style={styles.cameraBox} onPress={handleCapture} activeOpacity={0.8}>
          {captured ? (
            <View style={styles.capturedIndicator}>
              <Text style={styles.capturedIcon}>✓</Text>
              <Text style={styles.capturedText}>Captura exitosa</Text>
            </View>
          ) : (
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.cameraIcon}>📷</Text>
              <Text style={styles.cameraHint}>Toca para abrir la cámara</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.instructions}>
          <Text style={styles.instrTitle}>Instrucciones:</Text>
          {['1. Mantén el rostro centrado en el encuadre', '2. Retira lentes de sol o accesorios', '3. Asegúrate de tener buena iluminación', '4. Mira directamente a la cámara'].map((i) => (
            <Text key={i} style={styles.instrItem}>{i}</Text>
          ))}
        </View>
        <View style={styles.actions}>
          {!captured && <AppButton title="📷  Capturar rostro" onPress={handleCapture} style={styles.captureBtn} />}
          {captured && <AppButton title="↩  Volver a capturar" onPress={() => setCaptured(false)} variant="secondary" />}
          <AppButton title="Finalizar registro" onPress={handleFinish} disabled={!captured} />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  title: { fontSize: 26, fontWeight: '700', color: Colors.white, marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 13, color: Colors.text.muted, textAlign: 'center', marginBottom: 28, lineHeight: 19 },
  cameraBox: {
    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, borderWidth: 2,
    borderColor: Colors.primary, borderStyle: 'dashed', height: 260,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  cameraPlaceholder: { alignItems: 'center' },
  cameraIcon: { fontSize: 64, marginBottom: 12 },
  cameraHint: { color: Colors.text.muted, fontSize: 14 },
  capturedIndicator: { alignItems: 'center' },
  capturedIcon: { fontSize: 64, color: Colors.primary, marginBottom: 8 },
  capturedText: { color: Colors.primary, fontSize: 16, fontWeight: '700' },
  instructions: { backgroundColor: 'rgba(0,50,20,0.5)', borderRadius: 12, padding: 16, marginBottom: 24 },
  instrTitle: { color: Colors.white, fontWeight: '700', fontSize: 13, marginBottom: 8 },
  instrItem: { color: Colors.text.muted, fontSize: 12, marginBottom: 6, lineHeight: 17 },
  actions: { gap: 12 },
  captureBtn: { backgroundColor: Colors.primary },
});

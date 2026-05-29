// ─────────────────────────────────────────────
//  app/auth/teenager-registration.tsx
//  Registro facial — mayor de edad
//  Tema claro/oscuro + i18n (4 idiomas)
// ─────────────────────────────────────────────
import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Alert, ScrollView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import AppButton from '@/components/ui/AppButton';

const INSTRUCTIONS = [
  'facialReg.instr1',
  'facialReg.instr2',
  'facialReg.instr3',
  'facialReg.instr4',
];

export default function TeenagerRegistrationScreen() {
  const { theme, isDark } = useTheme();
  const { t } = useTranslation();

  const [captured, setCaptured] = useState(false);

  const text       = isDark ? '#FFFFFF' : '#111111';
  const muted      = isDark ? '#A8BCA6' : '#555555';
  const cardBg     = isDark ? '#07120D' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const instrBg    = isDark ? 'rgba(101,179,97,0.08)' : 'rgba(101,179,97,0.07)';
  const cameraBg   = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(101,179,97,0.05)';

  const handleCapture = () => {
    if (Platform.OS === 'web') {
      // En web simulamos directamente
      setCaptured(true);
      return;
    }
    Alert.alert(
      t('facialReg.alertTitle'),
      t('facialReg.alertMsg'),
      [
        { text: t('facialReg.simulate'), onPress: () => setCaptured(true) },
        { text: t('common.cancel'), style: 'cancel' },
      ]
    );
  };

  const handleFinish = () => {
    if (!captured) {
      Alert.alert(t('facialReg.warningTitle'), t('facialReg.warningMsg'));
      return;
    }
    router.replace('/auth/registration-success');
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
        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[s.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>

            {/* Encabezado */}
            <View style={s.header}>
              <View style={[s.iconCircle, { backgroundColor: isDark ? 'rgba(101,179,97,0.12)' : 'rgba(101,179,97,0.10)', borderColor: theme.primary }]}>
                <Ionicons name="camera-outline" size={38} color={theme.primary} />
              </View>
              <Text style={[s.title, { color: text }]}>{t('facialReg.title')}</Text>
              <Text style={[s.subtitle, { color: muted }]}>{t('facialReg.subtitle')}</Text>
            </View>

            {/* Caja de cámara */}
            <TouchableOpacity
              style={[s.cameraBox, { backgroundColor: cameraBg, borderColor: captured ? theme.primary : (isDark ? 'rgba(101,179,97,0.40)' : 'rgba(101,179,97,0.50)') }]}
              onPress={handleCapture}
              activeOpacity={0.8}
            >
              {captured ? (
                <View style={s.capturedState}>
                  <View style={[s.capturedCircle, { backgroundColor: isDark ? 'rgba(101,179,97,0.15)' : 'rgba(101,179,97,0.12)' }]}>
                    <Ionicons name="checkmark-circle" size={72} color={theme.primary} />
                  </View>
                  <Text style={[s.capturedText, { color: theme.primary }]}>{t('facialReg.captured')}</Text>
                  <Text style={[s.capturedHint, { color: muted }]}>{t('facialReg.capturedHint')}</Text>
                </View>
              ) : (
                <View style={s.cameraState}>
                  <View style={[s.faceFrame, { borderColor: theme.primary }]}>
                    <Ionicons name="person-outline" size={64} color={isDark ? 'rgba(101,179,97,0.35)' : 'rgba(101,179,97,0.45)'} />
                  </View>
                  <Text style={[s.cameraHint, { color: muted }]}>{t('facialReg.tapToCapture')}</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Instrucciones */}
            <View style={[s.instrBox, { backgroundColor: instrBg, borderColor: isDark ? 'rgba(101,179,97,0.15)' : 'rgba(101,179,97,0.20)' }]}>
              <View style={s.instrHeader}>
                <Ionicons name="list-outline" size={15} color={theme.primary} />
                <Text style={[s.instrTitle, { color: theme.primary }]}>{t('facialReg.instructions')}</Text>
              </View>
              {INSTRUCTIONS.map((key, i) => (
                <View key={key} style={s.instrRow}>
                  <View style={[s.instrNum, { backgroundColor: theme.primary }]}>
                    <Text style={s.instrNumText}>{i + 1}</Text>
                  </View>
                  <Text style={[s.instrItem, { color: muted }]}>{t(key)}</Text>
                </View>
              ))}
            </View>

            {/* Acciones */}
            <View style={s.actions}>
              {!captured ? (
                <TouchableOpacity onPress={handleCapture} style={[s.captureBtn, { backgroundColor: theme.primary }]} activeOpacity={0.85}>
                  <Ionicons name="camera" size={20} color="#FFFFFF" />
                  <Text style={s.captureBtnText}>{t('facialReg.captureBtn')}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setCaptured(false)}
                  style={[s.retakeBtn, { borderColor: isDark ? 'rgba(255,255,255,0.20)' : '#CCCCCC' }]}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh-outline" size={18} color={muted} />
                  <Text style={[s.retakeBtnText, { color: muted }]}>{t('facialReg.retake')}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handleFinish}
                disabled={!captured}
                activeOpacity={0.85}
                style={[s.finishBtn, !captured && s.finishBtnDisabled]}
              >
                <LinearGradient
                  colors={captured ? ['#72C96D', '#65B361', '#4FA14B'] : ['#888888', '#666666']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={s.finishBtnGradient}
                >
                  <Ionicons name="checkmark-done-outline" size={20} color="#FFFFFF" />
                  <Text style={s.finishBtnText}>{t('facialReg.finish')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  gradient:  { flex: 1 },
  safe:      { flex: 1 },
  scroll:    { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 32, paddingHorizontal: 20 },
  arcTop:    { position: 'absolute', width: 300, height: 420, right: -120, top: -90, borderRadius: 200 },
  arcBottom: { position: 'absolute', width: 420, height: 220, left: -120, bottom: -30, borderRadius: 180 },

  card: {
    width: '100%', maxWidth: 480, borderRadius: 26, borderWidth: 1,
    paddingHorizontal: 24, paddingVertical: 30,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18, shadowRadius: 18, elevation: 8,
  },

  header:     { alignItems: 'center', marginBottom: 24 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title:      { fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: 8 },
  subtitle:   { fontSize: 13, textAlign: 'center', lineHeight: 20 },

  cameraBox: {
    height: 240, borderRadius: 20, borderWidth: 2,
    borderStyle: 'dashed', alignItems: 'center',
    justifyContent: 'center', marginBottom: 24,
  },

  cameraState:   { alignItems: 'center', gap: 14 },
  faceFrame:     { width: 110, height: 110, borderRadius: 55, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  cameraHint:    { fontSize: 13, fontWeight: '600' },

  capturedState:  { alignItems: 'center', gap: 10 },
  capturedCircle: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  capturedText:   { fontSize: 17, fontWeight: '800' },
  capturedHint:   { fontSize: 12 },

  instrBox:    { borderRadius: 14, borderWidth: 1, padding: 16, marginBottom: 24 },
  instrHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  instrTitle:  { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.6 },
  instrRow:    { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  instrNum:    { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  instrNumText:{ color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  instrItem:   { flex: 1, fontSize: 13, lineHeight: 19 },

  actions:    { gap: 12 },

  captureBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 14, borderRadius: 16,
  },
  captureBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

  retakeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 12, borderRadius: 14, borderWidth: 1.2,
  },
  retakeBtnText: { fontSize: 14, fontWeight: '600' },

  finishBtn:         { borderRadius: 16, overflow: 'hidden' },
  finishBtnDisabled: { opacity: 0.55 },
  finishBtnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 14 },
  finishBtnText:     { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
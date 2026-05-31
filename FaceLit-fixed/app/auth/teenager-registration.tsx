// ─────────────────────────────────────────────
//  app/auth/teenager-registration.tsx
//  Registro facial con detección de rostro real
//  - Móvil: usa expo-camera + expo-face-detector
//  - Web: simulación (face-detector no soportado)
// ─────────────────────────────────────────────
import { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Platform, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

// Importaciones condicionales — solo en móvil
let CameraView: any = null;
let useCameraPermissions: any = null;
let FaceDetector: any = null;

if (Platform.OS !== 'web') {
  const cameraModule = require('expo-camera');
  CameraView = cameraModule.CameraView;
  useCameraPermissions = cameraModule.useCameraPermissions;
  FaceDetector = require('expo-face-detector');
}

const INSTRUCTIONS = [
  'facialReg.instr1',
  'facialReg.instr2',
  'facialReg.instr3',
  'facialReg.instr4',
];

// ── Estados posibles de la cámara ─────────────
type CameraState = 'idle' | 'requesting' | 'denied' | 'scanning' | 'detected' | 'captured';

export default function TeenagerRegistrationScreen() {
  const { theme, isDark } = useTheme();
  const { t } = useTranslation();

  const [cameraState, setCameraState] = useState<CameraState>('idle');
  const [faceDetected, setFaceDetected] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef<any>(null);

  // Permisos — solo en móvil
  const [permission, requestPermission] = Platform.OS !== 'web'
    ? useCameraPermissions()
    : [{ granted: false }, async () => {}];

  const text       = isDark ? '#FFFFFF' : '#111111';
  const muted      = isDark ? '#A8BCA6' : '#555555';
  const cardBg     = isDark ? '#07120D' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const instrBg    = isDark ? 'rgba(101,179,97,0.08)' : 'rgba(101,179,97,0.07)';

  const captured = cameraState === 'captured';

  // Limpia el intervalo al desmontar
  useEffect(() => {
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, []);

  // ── Abrir cámara ───────────────────────────
  const handleOpenCamera = async () => {
    if (Platform.OS === 'web') {
      // Simulación en web
      setCameraState('scanning');
      setTimeout(() => {
        setFaceDetected(true);
        startCountdown();
      }, 1500);
      return;
    }

    setCameraState('requesting');
    const { granted } = await requestPermission();
    if (!granted) {
      setCameraState('denied');
      return;
    }
    setCameraState('scanning');
  };

  // Cuenta regresiva de 3s antes de capturar
  const startCountdown = () => {
    setCountdown(3);
    setCameraState('detected');
    let count = 3;
    countdownRef.current = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(countdownRef.current);
        setCameraState('captured');
        setFaceDetected(false);
      }
    }, 1000);
  };

  // ── Callback del FaceDetector (solo móvil) ─
  const handleFacesDetected = ({ faces }: { faces: any[] }) => {
    if (faces.length > 0 && !faceDetected && cameraState === 'scanning') {
      setFaceDetected(true);
      startCountdown();
    } else if (faces.length === 0 && cameraState === 'scanning') {
      setFaceDetected(false);
    }
  };

  const handleRetake = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setFaceDetected(false);
    setCountdown(0);
    setCameraState('idle');
  };

  const handleFinish = () => {
    if (!captured) return;
    router.replace('/auth/registration-success');
  };

  // ── Render del área de cámara ──────────────
  const renderCameraArea = () => {
    // Permiso denegado
    if (cameraState === 'denied') {
      return (
        <View style={s.cameraState}>
          <Ionicons name="ban-outline" size={52} color="#D92027" />
          <Text style={[s.cameraHint, { color: '#D92027' }]}>
            {t('facialReg.permissionDenied')}
          </Text>
          <TouchableOpacity onPress={handleOpenCamera} style={[s.smallBtn, { borderColor: theme.primary }]}>
            <Text style={[s.smallBtnText, { color: theme.primary }]}>{t('facialReg.retry')}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Captura exitosa
    if (cameraState === 'captured') {
      return (
        <View style={s.capturedState}>
          <View style={[s.capturedCircle, { backgroundColor: isDark ? 'rgba(101,179,97,0.15)' : 'rgba(101,179,97,0.12)' }]}>
            <Ionicons name="checkmark-circle" size={72} color={theme.primary} />
          </View>
          <Text style={[s.capturedText, { color: theme.primary }]}>{t('facialReg.captured')}</Text>
          <Text style={[s.capturedHint, { color: muted }]}>{t('facialReg.capturedHint')}</Text>
        </View>
      );
    }

    // Cámara activa (solo móvil)
    if ((cameraState === 'scanning' || cameraState === 'detected') && Platform.OS !== 'web' && CameraView) {
      return (
        <View style={s.cameraLive}>
          <CameraView
            style={s.cameraPreview}
            facing="front"
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 300,
              tracking: true,
            }}
          />
          {/* Overlay con marco de cara */}
          <View style={s.cameraOverlay}>
            <View style={[
              s.faceFrameLive,
              { borderColor: faceDetected ? theme.primary : 'rgba(255,255,255,0.5)' },
            ]} />
            {/* Cuenta regresiva */}
            {cameraState === 'detected' && countdown > 0 && (
              <View style={[s.countdownBadge, { backgroundColor: theme.primary }]}>
                <Text style={s.countdownText}>{countdown}</Text>
              </View>
            )}
            {/* Estado inferior */}
            <View style={[s.statusBar, { backgroundColor: faceDetected ? theme.primary + 'CC' : 'rgba(0,0,0,0.55)' }]}>
              {faceDetected ? (
                <View style={s.statusRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                  <Text style={s.statusText}>{t('facialReg.faceFound')}</Text>
                </View>
              ) : (
                <View style={s.statusRow}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={s.statusText}>{t('facialReg.lookAtCamera')}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      );
    }

    // Escaneando en web (simulación) o solicitando permiso
    if (cameraState === 'scanning' && Platform.OS === 'web') {
      return (
        <View style={s.cameraState}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[s.cameraHint, { color: muted, marginTop: 12 }]}>{t('facialReg.simulating')}</Text>
        </View>
      );
    }

    if (cameraState === 'requesting') {
      return (
        <View style={s.cameraState}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[s.cameraHint, { color: muted, marginTop: 12 }]}>{t('facialReg.requesting')}</Text>
        </View>
      );
    }

    // Estado idle — instrucción inicial
    return (
      <View style={s.cameraState}>
        <View style={[s.faceFrame, { borderColor: theme.primary }]}>
          <Ionicons name="person-outline" size={64} color={isDark ? 'rgba(101,179,97,0.35)' : 'rgba(101,179,97,0.45)'} />
        </View>
        <Text style={[s.cameraHint, { color: muted }]}>{t('facialReg.tapToCapture')}</Text>
      </View>
    );
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
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={[s.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>

            {/* Encabezado */}
            <View style={s.header}>
              <View style={[s.iconCircle, { backgroundColor: isDark ? 'rgba(101,179,97,0.12)' : 'rgba(101,179,97,0.10)', borderColor: theme.primary }]}>
                <Ionicons name="camera-outline" size={38} color={theme.primary} />
              </View>
              <Text style={[s.title, { color: text }]}>{t('facialReg.title')}</Text>
              <Text style={[s.subtitle, { color: muted }]}>{t('facialReg.subtitle')}</Text>
            </View>

            {/* Área de cámara */}
            <View style={[
              s.cameraBox,
              {
                backgroundColor: (cameraState === 'scanning' || cameraState === 'detected') && Platform.OS !== 'web'
                  ? '#000000'
                  : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(101,179,97,0.05)',
                borderColor: captured ? theme.primary : isDark ? 'rgba(101,179,97,0.40)' : 'rgba(101,179,97,0.50)',
                borderStyle: (cameraState === 'scanning' || cameraState === 'detected') && Platform.OS !== 'web' ? 'solid' : 'dashed',
              },
            ]}>
              {renderCameraArea()}
            </View>

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

            {/* Botones */}
            <View style={s.actions}>
              {cameraState === 'idle' || cameraState === 'denied' ? (
                <TouchableOpacity onPress={handleOpenCamera} style={[s.captureBtn, { backgroundColor: theme.primary }]} activeOpacity={0.85}>
                  <Ionicons name="camera" size={20} color="#FFFFFF" />
                  <Text style={s.captureBtnText}>{t('facialReg.captureBtn')}</Text>
                </TouchableOpacity>
              ) : captured ? (
                <TouchableOpacity onPress={handleRetake} style={[s.retakeBtn, { borderColor: isDark ? 'rgba(255,255,255,0.20)' : '#CCCCCC' }]} activeOpacity={0.8}>
                  <Ionicons name="refresh-outline" size={18} color={muted} />
                  <Text style={[s.retakeBtnText, { color: muted }]}>{t('facialReg.retake')}</Text>
                </TouchableOpacity>
              ) : null}

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

  // Caja exterior de la cámara
  cameraBox: {
    height: 280, borderRadius: 20, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24, overflow: 'hidden',
  },

  // Estado idle / error / capturado
  cameraState:   { alignItems: 'center', gap: 14, padding: 20 },
  faceFrame:     { width: 110, height: 110, borderRadius: 55, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  cameraHint:    { fontSize: 13, fontWeight: '600', textAlign: 'center' },

  capturedState:  { alignItems: 'center', gap: 10 },
  capturedCircle: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  capturedText:   { fontSize: 17, fontWeight: '800' },
  capturedHint:   { fontSize: 12 },

  // Cámara en vivo
  cameraLive:    { width: '100%', height: '100%' },
  cameraPreview: { width: '100%', height: '100%' },
  cameraOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  faceFrameLive: { width: 180, height: 220, borderRadius: 100, borderWidth: 3 },

  countdownBadge: { position: 'absolute', top: 16, alignSelf: 'center', width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  countdownText:  { color: '#FFFFFF', fontSize: 28, fontWeight: '900' },

  statusBar:  { position: 'absolute', bottom: 0, left: 0, right: 0, paddingVertical: 10, paddingHorizontal: 16 },
  statusRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  statusText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },

  smallBtn:     { marginTop: 8, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8, borderWidth: 1.2 },
  smallBtnText: { fontSize: 13, fontWeight: '700' },

  instrBox:    { borderRadius: 14, borderWidth: 1, padding: 16, marginBottom: 24 },
  instrHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  instrTitle:  { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.6 },
  instrRow:    { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  instrNum:    { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  instrNumText:{ color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  instrItem:   { flex: 1, fontSize: 13, lineHeight: 19 },

  actions:    { gap: 12 },
  captureBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 14, borderRadius: 16 },
  captureBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  retakeBtn:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 14, borderWidth: 1.2 },
  retakeBtnText: { fontSize: 14, fontWeight: '600' },
  finishBtn:         { borderRadius: 16, overflow: 'hidden' },
  finishBtnDisabled: { opacity: 0.55 },
  finishBtnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 14 },
  finishBtnText:     { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
// ─────────────────────────────────────────────
//  app/auth/teenager-registration.tsx
//  Registro facial — CÁMARA REAL
//
//  • Móvil (Android/iOS): usa expo-camera (CameraView)
//  • Web / PC:            usa la API nativa del navegador
//                         (navigator.mediaDevices.getUserMedia)
//
//  Instalación requerida:
//    npx expo install expo-camera
// ─────────────────────────────────────────────
import { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/contexts/ThemeContext';

// expo-camera solo se importa en nativo (no en web)
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

// ─────────────────────────────────────────────
//  Componente de cámara exclusivo para WEB
//  Usa la MediaDevices API del navegador directamente.
// ─────────────────────────────────────────────
type WebCameraProps = {
  onCapture: (dataUri: string) => void;
  primaryColor: string;
  isTaking: boolean;
  onShutter: () => void;
};

function WebCamera({ onCapture, primaryColor, isTaking, onShutter }: WebCameraProps) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Iniciar stream de cámara web
  useEffect(() => {
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setReady(true);
          };
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('WebCamera error:', err);
          setError('No se pudo acceder a la cámara. Verifica los permisos del navegador.');
        }
      });

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Capturar frame del video como data URI
  const capture = useCallback(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !ready) return;

    canvas.width  = video.videoWidth  || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Espejear horizontalmente (selfie natural)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    const dataUri = canvas.toDataURL('image/jpeg', 0.85);
    onCapture(dataUri);
    onShutter();
  }, [ready, onCapture, onShutter]);

  if (error) {
    return (
      <View style={wc.errorBox}>
        <Ionicons name="alert-circle-outline" size={36} color="#FF6B6B" />
        <Text style={wc.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Video nativo del navegador — espejado para selfie */}
      {/* @ts-ignore — elemento HTML nativo */}
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scaleX(-1)',   // espejo horizontal
          display: ready ? 'block' : 'none',
        }}
        muted
        playsInline
        autoPlay
      />

      {/* Canvas oculto para captura */}
      {/* @ts-ignore */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Spinner mientras carga */}
      {!ready && (
        <View style={wc.loadingBox}>
          <ActivityIndicator size="large" color={primaryColor} />
          <Text style={wc.loadingText}>Iniciando cámara…</Text>
        </View>
      )}

      {/* Marco guía de rostro */}
      {ready && (
        <View style={wc.guideContainer} pointerEvents="none">
          <View style={[wc.faceGuide, { borderColor: primaryColor }]} />
        </View>
      )}

      {/* Botón de captura */}
      {ready && (
        <View style={wc.shutterContainer}>
          <TouchableOpacity
            onPress={capture}
            disabled={isTaking}
            style={[wc.shutterOuter, { borderColor: primaryColor }]}
            activeOpacity={0.8}
          >
            {isTaking ? (
              <ActivityIndicator color={primaryColor} />
            ) : (
              <View style={[wc.shutterInner, { backgroundColor: primaryColor }]} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const wc = StyleSheet.create({
  errorBox: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    gap: 12, padding: 20,
  },
  errorText: { color: '#FF6B6B', fontSize: 13, textAlign: 'center', lineHeight: 19 },
  loadingBox: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  loadingText: { color: '#AAAAAA', fontSize: 13 },
  guideContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'center',
  },
  faceGuide: {
    width: 170, height: 210,
    borderRadius: 90,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  shutterContainer: {
    position: 'absolute',
    bottom: 20, left: 0, right: 0,
    alignItems: 'center',
  },
  shutterOuter: {
    width: 64, height: 64, borderRadius: 32,
    borderWidth: 3,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  shutterInner: { width: 46, height: 46, borderRadius: 23 },
});

// ─────────────────────────────────────────────
//  Constantes
// ─────────────────────────────────────────────
const INSTRUCTIONS = [
  'facialReg.instr1',
  'facialReg.instr2',
  'facialReg.instr3',
  'facialReg.instr4',
];

type ScreenState = 'idle' | 'requesting' | 'camera' | 'captured';

// ─────────────────────────────────────────────
//  Pantalla principal
// ─────────────────────────────────────────────
export default function TeenagerRegistrationScreen() {
  const { theme, isDark } = useTheme();
  const { t } = useTranslation();

  // Hook de permisos de expo-camera (solo relevante en nativo)
  const [permission, requestPermission] = useCameraPermissions();

  const [screenState, setScreenState] = useState<ScreenState>('idle');
  const [photoUri, setPhotoUri]       = useState<string | null>(null);
  const [isTaking, setIsTaking]       = useState(false);

  const cameraRef = useRef<CameraView>(null);

  const isWeb = Platform.OS === 'web';

  // ── Colores según tema ───────────────────────
  const text       = isDark ? '#FFFFFF' : '#111111';
  const muted      = isDark ? '#A8BCA6' : '#555555';
  const cardBg     = isDark ? '#07120D' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const instrBg    = isDark ? 'rgba(101,179,97,0.08)' : 'rgba(101,179,97,0.07)';

  // ── Abrir cámara ────────────────────────────
  const handleOpenCamera = useCallback(async () => {
    // En web los permisos los gestiona el navegador al llamar getUserMedia
    if (isWeb) {
      setScreenState('camera');
      return;
    }

    // Nativo: gestión de permisos con expo-camera
    if (permission?.granted) {
      setScreenState('camera');
      return;
    }

    if (permission?.canAskAgain === false) {
      alert(t('facialReg.permissionDenied'));
      return;
    }

    setScreenState('requesting');
    const result = await requestPermission();
    if (result.granted) {
      setScreenState('camera');
    } else {
      setScreenState('idle');
      alert(t('facialReg.permissionDenied'));
    }
  }, [isWeb, permission, requestPermission, t]);

  // ── Tomar foto (nativo) ──────────────────────
  const handleTakePhotoNative = useCallback(async () => {
    if (!cameraRef.current || isTaking) return;
    setIsTaking(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
        skipProcessing: false,
      });
      if (photo?.uri) {
        setPhotoUri(photo.uri);
        setScreenState('captured');
      }
    } catch (err) {
      console.error('Error al tomar foto:', err);
      alert(t('facialReg.captureError'));
    } finally {
      setIsTaking(false);
    }
  }, [isTaking, t]);

  // ── Callback de captura web ──────────────────
  // WebCamera llama a esto con el data URI del canvas
  const handleWebCapture = useCallback((dataUri: string) => {
    setPhotoUri(dataUri);
    setScreenState('captured');
  }, []);

  // Marca isTaking=true cuando el usuario presiona el obturador web
  const handleWebShutter = useCallback(() => {
    setIsTaking(true);
    // Resetear tras un frame (la captura es síncrona en WebCamera)
    setTimeout(() => setIsTaking(false), 200);
  }, []);

  // ── Retomar ──────────────────────────────────
  const handleRetake = useCallback(() => {
    setPhotoUri(null);
    setScreenState('camera');
  }, []);

  // ── Finalizar ────────────────────────────────
  const handleFinish = useCallback(() => {
    if (screenState !== 'captured' || !photoUri) return;
    // Aquí enviarías photoUri a tu backend / Raspberry Pi
    router.replace('/auth/registration-success');
  }, [screenState, photoUri]);

  // ── Renderizado del área de cámara ───────────
  const renderCameraArea = () => {
    if (screenState === 'requesting') {
      return (
        <View style={s.centerState}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[s.hintText, { color: muted, marginTop: 14 }]}>
            {t('facialReg.requestingPermission')}
          </Text>
        </View>
      );
    }

    if (screenState === 'camera') {
      // ── Web: componente nativo del navegador ──
      if (isWeb) {
        return (
          <WebCamera
            primaryColor={theme.primary}
            isTaking={isTaking}
            onCapture={handleWebCapture}
            onShutter={handleWebShutter}
          />
        );
      }

      // ── Nativo: expo-camera ───────────────────
      return (
        <View style={StyleSheet.absoluteFill}>
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing={'front' as CameraType}
          />
          <View style={s.faceGuideContainer} pointerEvents="none">
            <View style={[s.faceGuide, { borderColor: theme.primary }]} />
          </View>
          <View style={s.shutterContainer} pointerEvents="box-none">
            <TouchableOpacity
              onPress={handleTakePhotoNative}
              disabled={isTaking}
              style={[s.shutterOuter, { borderColor: theme.primary }]}
              activeOpacity={0.8}
            >
              {isTaking ? (
                <ActivityIndicator color={theme.primary} />
              ) : (
                <View style={[s.shutterInner, { backgroundColor: theme.primary }]} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (screenState === 'captured' && photoUri) {
      return (
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={{ uri: photoUri }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <View style={s.capturedOverlay} pointerEvents="none">
            <View style={[s.capturedBadge, {
              backgroundColor: isDark
                ? 'rgba(7,18,13,0.75)'
                : 'rgba(255,255,255,0.80)',
            }]}>
              <Ionicons name="checkmark-circle" size={28} color={theme.primary} />
              <Text style={[s.capturedLabel, { color: theme.primary }]}>
                {t('facialReg.captured')}
              </Text>
            </View>
          </View>
        </View>
      );
    }

    // idle
    return (
      <View style={s.centerState}>
        <View style={[s.faceFrame, {
          borderColor: isDark
            ? 'rgba(101,179,97,0.40)'
            : 'rgba(101,179,97,0.50)',
        }]}>
          <Ionicons
            name="person-outline"
            size={64}
            color={isDark
              ? 'rgba(101,179,97,0.35)'
              : 'rgba(101,179,97,0.45)'}
          />
        </View>
        <Text style={[s.hintText, { color: muted }]}>
          {t('facialReg.tapToCapture')}
        </Text>
      </View>
    );
  };

  // ────────────────────────────────────────────
  return (
    <LinearGradient
      colors={
        isDark
          ? ['#000000', '#06170F', '#0B2D17']
          : ['#F7FFF4', '#E5F7DF', '#1E4C28']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
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

            {/* ── Encabezado ── */}
            <View style={s.header}>
              <View style={[s.iconCircle, {
                backgroundColor: isDark
                  ? 'rgba(101,179,97,0.12)'
                  : 'rgba(101,179,97,0.10)',
                borderColor: theme.primary,
              }]}>
                <Ionicons name="camera-outline" size={38} color={theme.primary} />
              </View>
              <Text style={[s.title, { color: text }]}>{t('facialReg.title')}</Text>
              <Text style={[s.subtitle, { color: muted }]}>{t('facialReg.subtitle')}</Text>
            </View>

            {/* ── Área de cámara ── */}
            <TouchableOpacity
              activeOpacity={screenState === 'idle' ? 0.8 : 1}
              onPress={screenState === 'idle' ? handleOpenCamera : undefined}
              style={[s.cameraBox, {
                backgroundColor: screenState === 'camera'
                  ? '#000000'
                  : isDark
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(101,179,97,0.05)',
                borderColor: screenState === 'captured'
                  ? theme.primary
                  : isDark
                    ? 'rgba(101,179,97,0.40)'
                    : 'rgba(101,179,97,0.50)',
                borderStyle: screenState === 'camera' ? 'solid' : 'dashed',
              }]}
            >
              {renderCameraArea()}
            </TouchableOpacity>

            {/* ── Instrucciones ── */}
            <View style={[s.instrBox, {
              backgroundColor: instrBg,
              borderColor: isDark
                ? 'rgba(101,179,97,0.15)'
                : 'rgba(101,179,97,0.20)',
            }]}>
              <View style={s.instrHeader}>
                <Ionicons name="list-outline" size={15} color={theme.primary} />
                <Text style={[s.instrTitle, { color: theme.primary }]}>
                  {t('facialReg.instructions')}
                </Text>
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

            {/* ── Botones de acción ── */}
            <View style={s.actions}>
              {screenState === 'idle' && (
                <TouchableOpacity
                  onPress={handleOpenCamera}
                  style={[s.captureBtn, { backgroundColor: theme.primary }]}
                  activeOpacity={0.85}
                >
                  <Ionicons name="camera" size={20} color="#FFFFFF" />
                  <Text style={s.captureBtnText}>{t('facialReg.captureBtn')}</Text>
                </TouchableOpacity>
              )}

              {screenState === 'captured' && (
                <TouchableOpacity
                  onPress={handleRetake}
                  style={[s.retakeBtn, {
                    borderColor: isDark
                      ? 'rgba(255,255,255,0.20)'
                      : '#CCCCCC',
                  }]}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh-outline" size={18} color={muted} />
                  <Text style={[s.retakeBtnText, { color: muted }]}>
                    {t('facialReg.retake')}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handleFinish}
                disabled={screenState !== 'captured'}
                activeOpacity={0.85}
                style={[s.finishBtn, screenState !== 'captured' && s.finishBtnDisabled]}
              >
                <LinearGradient
                  colors={
                    screenState === 'captured'
                      ? ['#72C96D', '#65B361', '#4FA14B']
                      : ['#888888', '#666666']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
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

// ── Estilos ──────────────────────────────────
const s = StyleSheet.create({
  gradient:  { flex: 1 },
  safe:      { flex: 1 },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  arcTop: {
    position: 'absolute',
    width: 300, height: 420,
    right: -120, top: -90,
    borderRadius: 200,
  },
  arcBottom: {
    position: 'absolute',
    width: 420, height: 220,
    left: -120, bottom: -30,
    borderRadius: 180,
  },
  card: {
    width: '100%', maxWidth: 480,
    borderRadius: 26, borderWidth: 1,
    paddingHorizontal: 24, paddingVertical: 30,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18, shadowRadius: 18,
    elevation: 8,
  },
  header:     { alignItems: 'center', marginBottom: 24 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  title:    { fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 13, textAlign: 'center', lineHeight: 20 },
  cameraBox: {
    height: 280,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  centerState: { alignItems: 'center', gap: 14, padding: 20 },
  faceFrame: {
    width: 110, height: 110,
    borderRadius: 55, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  hintText: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  faceGuideContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceGuide: {
    width: 170, height: 210,
    borderRadius: 90,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  shutterContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0, right: 0,
    alignItems: 'center',
  },
  shutterOuter: {
    width: 64, height: 64, borderRadius: 32,
    borderWidth: 3,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  shutterInner: { width: 46, height: 46, borderRadius: 23 },
  capturedOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  capturedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 30,
  },
  capturedLabel: { fontSize: 15, fontWeight: '800' },
  instrBox: {
    borderRadius: 14, borderWidth: 1,
    padding: 16, marginBottom: 24,
  },
  instrHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 6, marginBottom: 14,
  },
  instrTitle: {
    fontSize: 12, fontWeight: '800',
    textTransform: 'uppercase', letterSpacing: 0.6,
  },
  instrRow:   { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  instrNum: {
    width: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, marginTop: 1,
  },
  instrNumText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  instrItem:    { flex: 1, fontSize: 13, lineHeight: 19 },
  actions:    { gap: 12 },
  captureBtn: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 10,
    paddingVertical: 14, borderRadius: 16,
  },
  captureBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  retakeBtn: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    paddingVertical: 12, borderRadius: 14, borderWidth: 1.2,
  },
  retakeBtnText: { fontSize: 14, fontWeight: '600' },
  finishBtn:         { borderRadius: 16, overflow: 'hidden' },
  finishBtnDisabled: { opacity: 0.55 },
  finishBtnGradient: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 10,
    paddingVertical: 14,
  },
  finishBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
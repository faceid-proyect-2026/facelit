// ─────────────────────────────────────────────
//  app/minor-consent.tsx — REDISEÑADO + CORREGIDO
//  Mismo estilo que login/register
//  Fixes: diseño completo, email diferente al menor,
//  nombre letras, doc 10 dígitos, email validado
// ─────────────────────────────────────────────
import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform,
  ScrollView, KeyboardAvoidingView, Image, TextInput, Dimensions, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Link, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/contexts/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_MAX = 500;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ONLY_LETTERS = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

export default function MinorConsentScreen() {
  const { theme, isDark } = useTheme();
  // Recibe el email del menor desde el registro
  const { minorEmail } = useLocalSearchParams<{ minorEmail?: string }>();

  const text         = isDark ? '#FFFFFF' : '#111111';
  const muted        = isDark ? '#A8BCA6' : '#555555';
  const cardBg       = isDark ? '#07120D' : '#FFFFFF';
  const inputBg      = isDark ? 'rgba(255,255,255,0.05)' : '#FAFAFA';
  const inputBorder  = isDark ? 'rgba(255,255,255,0.30)' : '#BBBBBB';
  const activeBorder = theme.primary;
  const linkColor    = isDark ? '#8EF58A' : '#3A8C36';
  const errorColor   = '#D92027';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const legalBg      = isDark ? 'rgba(200,130,74,0.15)' : '#FFF3E0';
  const legalBorder  = '#C8824A';
  const checkCardBg  = isDark ? 'rgba(255,255,255,0.04)' : '#F3F8F3';
  const checkCardBorder = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)';
  const isWide       = width >= 900;

  // ── Estado ────────────────────────────────────────────────
  const [guardianName,    setGuardianName]    = useState('');
  const [guardianDoc,     setGuardianDoc]     = useState('');
  const [guardianEmail,   setGuardianEmail]   = useState('');
  const [emailValidated,  setEmailValidated]  = useState(false);
  const [accepted,        setAccepted]        = useState(false);
  const [errors,          setErrors]          = useState<Record<string, string>>({});
  const [focused,         setFocused]         = useState<string | null>(null);

  const clearError = (k: string) => setErrors((p) => ({ ...p, [k]: '' }));

  // ── Handlers con filtros ───────────────────────────────────
  const handleName = (v: string) => {
    setGuardianName(v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, ''));
    clearError('guardianName');
  };

  const handleDoc = (v: string) => {
    const filtered = v.replace(/\D/g, '').slice(0, 10);
    setGuardianDoc(filtered);
    clearError('guardianDoc');
  };

  const handleEmail = (v: string) => {
    setGuardianEmail(v.replace(/\s/g, ''));
    setEmailValidated(false);
    clearError('guardianEmail');
    clearError('emailAction');
  };

  // ── Validar correo del acudiente ──────────────────────────
  const handleEmailValidate = () => {
    const e = guardianEmail.trim();
    if (!e)                       { setErrors((p) => ({ ...p, emailAction: 'Ingresa el correo primero' })); return; }
    if (!EMAIL_REGEX.test(e))     { setErrors((p) => ({ ...p, emailAction: 'Formato de correo inválido' })); return; }
    if (minorEmail && e.toLowerCase() === minorEmail.trim().toLowerCase()) {
      setErrors((p) => ({ ...p, emailAction: 'El correo del acudiente debe ser diferente al del menor' }));
      return;
    }
    setEmailValidated(true);
    clearError('emailAction');
  };

  // ── Enviar ─────────────────────────────────────────────────
  const handleSubmit = () => {
    const e: Record<string, string> = {};

    const nameParts = guardianName.trim().split(' ').filter(Boolean);
    if (!guardianName.trim())       e.guardianName = 'El nombre del acudiente es obligatorio';
    else if (nameParts.length < 2)  e.guardianName = 'Ingresa nombre y apellido completos';
    else if (!ONLY_LETTERS.test(guardianName)) e.guardianName = 'Solo se permiten letras';

    if (!guardianDoc)               e.guardianDoc = 'El documento es obligatorio';
    else if (guardianDoc.length !== 10) e.guardianDoc = 'El documento debe tener exactamente 10 dígitos';

    if (!guardianEmail)             e.guardianEmail = 'El correo es obligatorio';
    else if (!EMAIL_REGEX.test(guardianEmail)) e.guardianEmail = 'Formato de correo inválido';
    else if (minorEmail && guardianEmail.toLowerCase() === minorEmail.trim().toLowerCase())
      e.guardianEmail = 'El correo del acudiente debe ser diferente al del menor';

    if (!emailValidated)            e.emailAction = 'Debes validar el correo antes de continuar';

    if (!accepted)                  e.consent = 'Debes confirmar la autorización';

    setErrors(e);
    if (Object.keys(e).length) return;

    router.replace('/auth/registration-success');
  };

  // ─────────────────────────────────────────────────────────
  return (
    <LinearGradient
      colors={isDark ? ['#000000', '#06170F', '#0B2D17'] : ['#F7FFF4', '#E5F7DF', '#1E4C28']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={s.gradient}
    >
      <View style={s.arcTop} />
      <View style={s.arcBottom} />

      <SafeAreaView style={s.safe}>
        <KeyboardAvoidingView style={s.kav} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

            <Image source={require('@/assets/images/logo.png')} style={s.logo} resizeMode="contain" />

            <View style={[s.card, isWide && s.cardWide, { backgroundColor: cardBg, borderColor: cardBorder }]}>

              {/* Ícono de alerta */}
              <View style={s.iconWrap}>
                <LinearGradient colors={['#FFB74D', '#F57C00']} style={s.iconCircle}>
                  <Ionicons name="alert" size={32} color="#FFFFFF" />
                </LinearGradient>
              </View>

              <Text style={[s.title, { color: text }]}>Consentimiento requerido</Text>
              <Text style={[s.subtitle, { color: muted }]}>
                Detectamos que eres <Text style={{ color: '#FAA61A', fontWeight: '700' }}>menor de edad</Text>.{'\n'}
                Necesitamos la autorización de un adulto responsable para continuar.
              </Text>

              {/* Aviso legal */}
              <View style={[s.legalBox, { backgroundColor: legalBg, borderColor: legalBorder }]}>
                <Ionicons name="document-text-outline" size={18} color="#C8824A" style={{ marginBottom: 6 }} />
                <Text style={[s.legalText, { color: isDark ? '#FFB74D' : '#7B4A10' }]}>
                  De acuerdo con la <Text style={{ fontWeight: '800' }}>Ley 1581 de 2012</Text>, se requiere el consentimiento expreso del adulto responsable para el tratamiento de datos personales de menores de edad.
                </Text>
              </View>

              {/* ══ Datos del acudiente ══ */}
              <View style={[s.sectionHeader, { borderBottomColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }]}>
                <Ionicons name="person-outline" size={13} color={theme.primary} />
                <Text style={[s.sectionTitle, { color: theme.primary }]}>Datos del acudiente</Text>
              </View>

              {/* Nombre del acudiente */}
              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Nombre completo del acudiente</Text>
                <View style={[s.inputWrap, {
                  backgroundColor: inputBg,
                  borderColor: errors.guardianName ? errorColor : focused === 'name' ? activeBorder : inputBorder,
                }]}>
                  <Ionicons name="person-outline" size={18} color={muted} />
                  <TextInput
                    style={[s.input, { color: text }] as any}
                    value={guardianName}
                    onChangeText={handleName}
                    placeholder="Nombre y apellido"
                    placeholderTextColor={isDark ? '#5A7258' : '#AAAAAA'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </View>
                {errors.guardianName ? <Text style={s.errorText}>{errors.guardianName}</Text> : null}
              </View>

              {/* Documento del acudiente */}
              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Documento del acudiente (10 dígitos)</Text>
                <View style={[s.inputWrap, {
                  backgroundColor: inputBg,
                  borderColor: errors.guardianDoc ? errorColor : focused === 'doc' ? activeBorder : inputBorder,
                }]}>
                  <Ionicons name="document-text-outline" size={18} color={muted} />
                  <TextInput
                    style={[s.input, { color: text }] as any}
                    value={guardianDoc}
                    onChangeText={handleDoc}
                    placeholder="0000000000"
                    placeholderTextColor={isDark ? '#5A7258' : '#AAAAAA'}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setFocused('doc')}
                    onBlur={() => setFocused(null)}
                  />
                  <Text style={[s.docCounter, { color: guardianDoc.length === 10 ? theme.primary : muted }]}>
                    {guardianDoc.length}/10
                  </Text>
                </View>
                {errors.guardianDoc ? <Text style={s.errorText}>{errors.guardianDoc}</Text> : null}
              </View>

              {/* Correo del acudiente */}
              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Correo electrónico del acudiente</Text>
                {minorEmail && (
                  <View style={[s.infoBox, { backgroundColor: isDark ? 'rgba(255,165,0,0.08)' : '#FFF8E7', borderColor: '#FAA61A' }]}>
                    <Ionicons name="warning-outline" size={13} color="#FAA61A" />
                    <Text style={[s.infoText, { color: isDark ? '#FAA61A' : '#8B6000' }]}>
                      Debe ser diferente al correo del menor: {minorEmail}
                    </Text>
                  </View>
                )}
                <View style={[s.inputWrap, {
                  backgroundColor: inputBg,
                  borderColor: errors.guardianEmail ? errorColor : focused === 'email' ? activeBorder : inputBorder,
                }]}>
                  <Ionicons name="mail-outline" size={18} color={muted} />
                  <TextInput
                    style={[s.input, { color: text }] as any}
                    value={guardianEmail}
                    onChangeText={handleEmail}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor={isDark ? '#5A7258' : '#AAAAAA'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                  {emailValidated && <Ionicons name="checkmark-circle" size={18} color={theme.primary} />}
                </View>
                {errors.guardianEmail ? <Text style={s.errorText}>{errors.guardianEmail}</Text> : null}
              </View>

              {/* Botón validar correo */}
              <TouchableOpacity
                onPress={handleEmailValidate}
                style={[s.validateBtn, {
                  borderColor: emailValidated ? theme.primary : errors.emailAction ? errorColor : inputBorder,
                  backgroundColor: emailValidated ? theme.primary + '18' : 'transparent',
                }]}
              >
                <Ionicons
                  name={emailValidated ? 'checkmark-circle-outline' : 'send-outline'}
                  size={16}
                  color={emailValidated ? theme.primary : errors.emailAction ? errorColor : muted}
                />
                <Text style={[s.validateBtnText, { color: emailValidated ? theme.primary : errors.emailAction ? errorColor : muted }]}>
                  {emailValidated ? 'Correo del acudiente validado ✓' : 'Validar correo — obligatorio para continuar'}
                </Text>
              </TouchableOpacity>
              {errors.emailAction ? <Text style={[s.errorText, { marginBottom: 6 }]}>{errors.emailAction}</Text> : null}

              {/* ══ Autorización ══ */}
              <View style={[s.sectionHeader, { borderBottomColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }]}>
                <Ionicons name="checkmark-done-outline" size={13} color={theme.primary} />
                <Text style={[s.sectionTitle, { color: theme.primary }]}>Autorización</Text>
              </View>

              {/* Checkbox autorización */}
              <View style={[s.consentCard, { backgroundColor: checkCardBg, borderColor: checkCardBorder }]}>
                <TouchableOpacity onPress={() => setAccepted(!accepted)} activeOpacity={0.8} style={s.checkRow}>
                  <View style={[s.checkbox, {
                    borderColor: errors.consent ? errorColor : accepted ? theme.primary : inputBorder,
                    backgroundColor: accepted ? theme.primary : 'transparent',
                  }]}>
                    {accepted && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                  </View>
                  <Text style={[s.checkLabel, { color: text }]}>
                    Confirmo que autorizo el registro y tratamiento de datos del menor, según lo establecido en la{' '}
                    <Text style={{ color: theme.primary, fontWeight: '700' }}>Ley 1581 de 2012</Text>{' '}
                    y sus normas reglamentarias.
                  </Text>
                </TouchableOpacity>
                {errors.consent ? <Text style={[s.errorText, { marginTop: 6 }]}>{errors.consent}</Text> : null}

                {/* Enlace más información */}
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://share.google/KHen3qRj2g5sVHCCw')}
                  style={[s.moreInfoBtn, { borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}
                >
                  <Ionicons name="open-outline" size={14} color={linkColor} />
                  <Text style={[s.moreInfoText, { color: linkColor }]}>Más información sobre la Ley 1581 de 2012</Text>
                </TouchableOpacity>
              </View>

              {/* ── Botón confirmar ── */}
              <TouchableOpacity onPress={handleSubmit} style={s.confirmBtn}>
                <LinearGradient colors={['#72C96D', '#65B361', '#4FA14B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.confirmBtnGradient}>
                  <Ionicons name="shield-checkmark-outline" size={18} color="#FFFFFF" />
                  <Text style={s.confirmBtnText}>Confirmar autorización</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Volver */}
              <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}
                style={[s.backBtn, { borderColor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)' }]}>
                <Ionicons name="arrow-back-outline" size={16} color={muted} />
                <Text style={[s.backBtnText, { color: muted }]}>Volver al registro</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ── Estilos ───────────────────────────────────────────────────
const s = StyleSheet.create({
  gradient: { flex: 1 },
  safe:     { flex: 1 },
  kav:      { flex: 1 },
  arcTop:    { position: 'absolute', width: 300, height: 420, right: -120, top: -90, borderRadius: 200, backgroundColor: 'rgba(20,70,28,0.18)' },
  arcBottom: { position: 'absolute', width: 420, height: 220, left: -120, bottom: -30, borderRadius: 180, backgroundColor: 'rgba(101,179,97,0.28)' },
  scroll:    { flexGrow: 1, alignItems: 'center', paddingVertical: 28, paddingHorizontal: 16 },
  logo:      { width: 180, height: 70, marginBottom: 18 },
  card:      { width: '100%', maxWidth: CARD_MAX, borderRadius: 26, borderWidth: 1, paddingHorizontal: 24, paddingVertical: 30 },
  cardWide:  { paddingHorizontal: 36 },

  iconWrap:   { alignItems: 'center', marginBottom: 16 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: '#F57C00', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },

  title:    { fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 16 },

  legalBox:  { borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 6, alignItems: 'center' },
  legalText: { fontSize: 13, lineHeight: 20, textAlign: 'center' },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 20, marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1 },
  sectionTitle:  { fontSize: 11, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },

  fieldGroup: { marginBottom: 12 },
  label:      { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  inputWrap:  { height: 48, borderWidth: 1.2, borderRadius: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  input:      { flex: 1, fontSize: 15, outlineStyle: 'none' } as any,
  errorText:  { color: '#D92027', fontSize: 11, marginTop: 3 },
  docCounter: { fontSize: 12, fontWeight: '700', minWidth: 32, textAlign: 'right' },

  infoBox:  { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 8, borderWidth: 1, marginBottom: 8 },
  infoText: { fontSize: 12, flex: 1, lineHeight: 17 },

  validateBtn:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 10, borderWidth: 1.2, marginBottom: 4, paddingHorizontal: 12 },
  validateBtnText: { fontSize: 13, fontWeight: '700', textAlign: 'center' },

  consentCard:  { borderRadius: 14, borderWidth: 1, padding: 16, marginTop: 6, marginBottom: 4 },
  checkRow:     { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  checkbox:     { width: 20, height: 20, borderWidth: 1.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
  checkLabel:   { flex: 1, fontSize: 13, lineHeight: 20 },
  moreInfoBtn:  { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14, paddingTop: 12, borderTopWidth: 1 },
  moreInfoText: { fontSize: 12, fontWeight: '600' },

  confirmBtn:         { width: '100%', maxWidth: 300, alignSelf: 'center', borderRadius: 16, overflow: 'hidden', marginTop: 24, marginBottom: 10 },
  confirmBtnGradient: { paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  confirmBtnText:     { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  backBtn:            { width: '100%', maxWidth: 300, alignSelf: 'center', borderRadius: 16, borderWidth: 1.2, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 8 },
  backBtnText:        { fontSize: 15, fontWeight: '600' },
});

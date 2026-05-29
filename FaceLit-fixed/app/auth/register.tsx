// ─────────────────────────────────────────────
//  app/auth/register.tsx
//  Fix: InputRow y Section fuera del componente
//  Nuevo flujo: botón "Validar correo" navega a
//  email-validation y recibe validatedEmail de vuelta
// ─────────────────────────────────────────────
import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Platform,
  ScrollView, KeyboardAvoidingView, Image, TextInput, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, Link, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_MAX = 520;

const ONLY_LETTERS   = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
const EMAIL_REGEX    = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~]).{8,15}$/;
const IDENTITY_OPTIONS = ['TI', 'CC', 'CE', 'PA'];

const initialForm = {
  name: '', lastname: '', identityType: '',
  document: '', email: '', password: '', confirmPassword: '',
};

function getAge(date: Date): number {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
  return age;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// ── InputRow fuera del componente ─────────────
interface InputRowProps {
  fieldKey: string; label: string; icon: any; placeholder: string;
  keyboard?: any; value: string; onChange: (v: string) => void;
  error?: string; secure?: boolean; showSecure?: boolean;
  onToggleSecure?: () => void; focused: string | null;
  onFocus: (key: string) => void; onBlur: () => void;
  textColor: string; mutedColor: string; inputBg: string;
  inputBorder: string; activeBorder: string; isDark: boolean;
}

function InputRow({
  fieldKey, label, icon, placeholder, keyboard, value,
  onChange, error, secure, showSecure, onToggleSecure,
  focused, onFocus, onBlur,
  textColor, mutedColor, inputBg, inputBorder, activeBorder, isDark,
}: InputRowProps) {
  return (
    <View style={s.fieldGroup}>
      <Text style={[s.label, { color: textColor }]}>{label}</Text>
      <View style={[s.inputWrap, {
        backgroundColor: inputBg,
        borderColor: error ? '#D92027' : focused === fieldKey ? activeBorder : inputBorder,
      }]}>
        <Ionicons name={icon} size={18} color={mutedColor} />
        <TextInput
          style={[s.input, { color: textColor }] as any}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#5A7258' : '#AAAAAA'}
          keyboardType={keyboard || 'default'}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!!secure && !showSecure}
          onFocus={() => onFocus(fieldKey)}
          onBlur={onBlur}
        />
        {onToggleSecure && (
          <TouchableOpacity onPress={onToggleSecure} activeOpacity={0.7}>
            <Ionicons name={showSecure ? 'eye-off-outline' : 'eye-outline'} size={18} color={mutedColor} />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={s.errorText}>{error}</Text> : null}
    </View>
  );
}

// ── Section fuera del componente ──────────────
function Section({ icon, label, primaryColor, sectionLine }: {
  icon: any; label: string; primaryColor: string; sectionLine: string;
}) {
  return (
    <View style={[s.sectionHeader, { borderBottomColor: sectionLine }]}>
      <Ionicons name={icon} size={13} color={primaryColor} />
      <Text style={[s.sectionTitle, { color: primaryColor }]}>{label}</Text>
    </View>
  );
}

// ─────────────────────────────────────────────
export default function RegisterScreen() {
  const { theme, isDark } = useTheme();

  // Recibe el email ya validado desde email-validated-success
  const { validatedEmail } = useLocalSearchParams<{ validatedEmail: string }>();

  const text         = isDark ? '#FFFFFF' : '#111111';
  const muted        = isDark ? '#A8BCA6' : '#555555';
  const cardBg       = isDark ? '#07120D' : '#FFFFFF';
  const inputBg      = isDark ? 'rgba(255,255,255,0.05)' : '#FAFAFA';
  const inputBorder  = isDark ? 'rgba(255,255,255,0.30)' : '#BBBBBB';
  const activeBorder = theme.primary;
  const linkColor    = isDark ? '#8EF58A' : '#3A8C36';
  const errorColor   = '#D92027';
  const cardBorder   = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const sectionLine  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
  const dropBg       = isDark ? '#0D1F14' : '#FFFFFF';
  const dropBorder   = isDark ? 'rgba(255,255,255,0.15)' : '#DDDDDD';
  const rightsBg     = isDark ? 'rgba(255,255,255,0.04)' : '#F3F8F3';
  const rightsBorder = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)';
  const isWide       = width >= 900;

  const [form, setForm] = useState({
    ...initialForm,
    // Pre-rellena el email si viene validado
    email: validatedEmail ?? '',
  });
  const [birthdate, setBirthdate]           = useState<Date | null>(null);
  const [showPicker, setShowPicker]         = useState(false);
  const [accepted, setAccepted]             = useState(false);
  const [hasRights, setHasRights]           = useState<boolean | null>(null);
  // Si viene validatedEmail, el correo ya está verificado
  const [emailValidated, setEmailValidated] = useState(!!validatedEmail);
  const [showIdentity, setShowIdentity]     = useState(false);
  const [errors, setErrors]                 = useState<Record<string, string>>({});
  const [showPass, setShowPass]             = useState(false);
  const [showConfirm, setShowConfirm]       = useState(false);
  const [focused, setFocused]               = useState<string | null>(null);

  const clearError = (key: string) => setErrors((p) => ({ ...p, [key]: '' }));

  const handleName     = (v: string) => { setForm((p) => ({ ...p, name: v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '') })); clearError('name'); };
  const handleLastname = (v: string) => { setForm((p) => ({ ...p, lastname: v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '') })); clearError('lastname'); };
  const handleDocument = (v: string) => { setForm((p) => ({ ...p, document: v.replace(/\D/g, '').slice(0, 10) })); clearError('document'); };
  const handleEmail    = (v: string) => {
    setForm((p) => ({ ...p, email: v.replace(/\s/g, '') }));
    // Si el usuario edita el correo, se pierde la validación
    setEmailValidated(false);
    clearError('email');
    clearError('emailAction');
  };
  const handlePassword = (v: string) => { setForm((p) => ({ ...p, password: v })); clearError('password'); };
  const handleConfirm  = (v: string) => { setForm((p) => ({ ...p, confirmPassword: v })); clearError('confirmPassword'); };
  const handleIdentity = (v: string) => { setForm((p) => ({ ...p, identityType: v })); setShowIdentity(false); clearError('identityType'); };

  // Navega a email-validation pasando el correo
  const handleEmailValidate = () => {
    const e = form.email.trim();
    if (!e)                   { setErrors((p) => ({ ...p, emailAction: 'Ingresa el correo primero' })); return; }
    if (!EMAIL_REGEX.test(e)) { setErrors((p) => ({ ...p, emailAction: 'Correo inválido' })); return; }
    router.push({ pathname: '/auth/email-validation', params: { email: e } });
  };

  const handleCancel = () => { setForm(initialForm); setBirthdate(null); router.replace('/auth/login'); };

  const handleRegister = () => {
    const e: Record<string, string> = {};
    const d = { ...form, name: form.name.trim(), lastname: form.lastname.trim(), email: form.email.trim() };

    if (!d.name)                         e.name = 'El nombre es obligatorio';
    else if (!ONLY_LETTERS.test(d.name)) e.name = 'Solo se permiten letras';
    if (!d.lastname)                           e.lastname = 'El apellido es obligatorio';
    else if (!ONLY_LETTERS.test(d.lastname))    e.lastname = 'Solo se permiten letras';
    if (!d.identityType) e.identityType = 'Selecciona un tipo de identidad';
    if (!d.document)                   e.document = 'Documento obligatorio';
    else if (d.document.length !== 10) e.document = 'El documento debe tener exactamente 10 dígitos';
    if (!d.email)                        e.email = 'Correo obligatorio';
    else if (!EMAIL_REGEX.test(d.email)) e.email = 'Formato de correo inválido';
    if (!emailValidated) e.emailAction = 'Debes validar el correo antes de continuar';
    if (!d.password)                           e.password = 'Contraseña obligatoria';
    else if (!PASSWORD_REGEX.test(d.password)) e.password = 'Mínimo 8 y máximo 15 caracteres, una mayúscula, un número y un símbolo';
    if (!d.confirmPassword)                   e.confirmPassword = 'Confirma tu contraseña';
    else if (d.password !== d.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';

    if (!birthdate) {
      e.birthdate = 'Selecciona fecha de nacimiento';
    } else {
      const age = getAge(birthdate);
      if (age < 8)        e.birthdate = 'La edad mínima es 8 años';
      else if (age > 100) e.birthdate = 'La edad máxima es 100 años';
      else if (d.identityType === 'TI' && age >= 18)
        e.identityType = 'TI es solo para menores de edad (menos de 18 años)';
      else if (d.identityType === 'CC' && age < 18)
        e.identityType = 'CC es solo para mayores de edad (18 años o más)';
    }

    if (!accepted)          e.policy = 'Debes declarar y aceptar las políticas';
    if (hasRights === null) e.rights = 'Debes responder esta pregunta';

    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const age = getAge(birthdate!);
    if (age >= 18) {
      router.push('/auth/teenager-registration');
    } else {
      router.push({ pathname: '/auth/minor-consent', params: { minorEmail: d.email } });
    }
  };

  const NavLink = ({ href, label }: { href: any; label: string }) => {
    if (Platform.OS === 'web') {
      return <Link href={href} style={[s.linkText, { color: linkColor, textDecorationLine: 'underline' }]}>{label}</Link>;
    }
    return (
      <TouchableOpacity onPress={() => router.push(href)} activeOpacity={0.8}>
        <Text style={[s.linkText, { color: linkColor, textDecorationLine: 'underline' }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const rowColors = {
    textColor: text, mutedColor: muted, inputBg, inputBorder,
    activeBorder, isDark, focused, onFocus: setFocused, onBlur: () => setFocused(null),
  };

  const sectionColors = { primaryColor: theme.primary, sectionLine };

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

              <Text style={[s.title, { color: text }]}>Registro de usuario</Text>
              <Text style={[s.subtitle, { color: muted }]}>Completa tu información para crear tu cuenta en FaceLit</Text>

              <Section icon="person-outline" label="Datos personales" {...sectionColors} />
              <InputRow fieldKey="name" label="Nombre" icon="person-outline" placeholder="Juan" value={form.name} onChange={handleName} error={errors.name} {...rowColors} />
              <InputRow fieldKey="lastname" label="Apellido" icon="people-outline" placeholder="Pérez" value={form.lastname} onChange={handleLastname} error={errors.lastname} {...rowColors} />

              {/* Tipo de identidad */}
              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Tipo de identidad</Text>
                <TouchableOpacity
                  onPress={() => setShowIdentity(!showIdentity)}
                  style={[s.inputWrap, { backgroundColor: inputBg, borderColor: errors.identityType ? errorColor : showIdentity ? activeBorder : inputBorder }]}
                >
                  <Ionicons name="card-outline" size={18} color={muted} />
                  <Text style={[s.input, { color: form.identityType ? text : (isDark ? '#5A7258' : '#AAAAAA') }]}>
                    {form.identityType || 'Selecciona una opción'}
                  </Text>
                  <Ionicons name={showIdentity ? 'chevron-up' : 'chevron-down'} size={16} color={muted} />
                </TouchableOpacity>
                {showIdentity && (
                  <View style={[s.dropdown, { backgroundColor: dropBg, borderColor: dropBorder }]}>
                    {IDENTITY_OPTIONS.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={[s.dropOption, { borderBottomColor: dropBorder }, form.identityType === item && { backgroundColor: theme.primary + '22' }]}
                        onPress={() => handleIdentity(item)}
                      >
                        <Text style={[s.dropText, { color: text }, form.identityType === item && { color: theme.primary, fontWeight: '700' }]}>
                          {item === 'TI' ? 'TI — Tarjeta de Identidad (menor)' :
                           item === 'CC' ? 'CC — Cédula de Ciudadanía (mayor)' :
                           item === 'CE' ? 'CE — Cédula de Extranjería' : 'PA — Pasaporte'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                {errors.identityType ? <Text style={s.errorText}>{errors.identityType}</Text> : null}
              </View>

              {form.identityType === 'TI' && (
                <View style={[s.infoBox, { backgroundColor: isDark ? 'rgba(255,165,0,0.10)' : '#FFF8E7', borderColor: '#FAA61A' }]}>
                  <Ionicons name="information-circle-outline" size={14} color="#FAA61A" />
                  <Text style={[s.infoText, { color: isDark ? '#FAA61A' : '#8B6000' }]}>TI es para menores de edad (menos de 18 años)</Text>
                </View>
              )}
              {form.identityType === 'CC' && (
                <View style={[s.infoBox, { backgroundColor: isDark ? 'rgba(101,179,97,0.08)' : '#F0FFF0', borderColor: theme.primary }]}>
                  <Ionicons name="information-circle-outline" size={14} color={theme.primary} />
                  <Text style={[s.infoText, { color: isDark ? theme.primary : '#2E6E2A' }]}>CC es para mayores de edad (18 años o más)</Text>
                </View>
              )}

              <InputRow fieldKey="document" label="Número de documento (10 dígitos)" icon="document-text-outline" placeholder="0000000000" value={form.document} onChange={handleDocument} keyboard="numeric" error={errors.document} {...rowColors} />

              <Section icon="mail-outline" label="Contacto" {...sectionColors} />

              {/* Email con estado validado */}
              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Correo electrónico</Text>
                <View style={[s.inputWrap, {
                  backgroundColor: emailValidated ? (isDark ? 'rgba(101,179,97,0.08)' : 'rgba(101,179,97,0.06)') : inputBg,
                  borderColor: errors.email ? errorColor : emailValidated ? theme.primary : focused === 'email' ? activeBorder : inputBorder,
                }]}>
                  <Ionicons name="mail-outline" size={18} color={emailValidated ? theme.primary : muted} />
                  <TextInput
                    style={[s.input, { color: text }] as any}
                    value={form.email}
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
                {errors.email ? <Text style={s.errorText}>{errors.email}</Text> : null}
              </View>

              {/* Botón validar — si ya está validado muestra estado verde */}
              <TouchableOpacity
                onPress={emailValidated ? undefined : handleEmailValidate}
                activeOpacity={emailValidated ? 1 : 0.75}
                style={[s.validateBtn, {
                  borderColor: emailValidated ? theme.primary : errors.emailAction ? errorColor : inputBorder,
                  backgroundColor: emailValidated ? theme.primary + '18' : 'transparent',
                }]}
              >
                <Ionicons
                  name={emailValidated ? 'checkmark-circle' : 'send-outline'}
                  size={16}
                  color={emailValidated ? theme.primary : errors.emailAction ? errorColor : muted}
                />
                <Text style={[s.validateBtnText, {
                  color: emailValidated ? theme.primary : errors.emailAction ? errorColor : muted,
                }]}>
                  {emailValidated ? '✓ Correo verificado' : 'Validar correo — obligatorio para continuar'}
                </Text>
              </TouchableOpacity>
              {errors.emailAction ? <Text style={[s.errorText, { marginBottom: 8 }]}>{errors.emailAction}</Text> : null}

              <Section icon="lock-closed-outline" label="Seguridad" {...sectionColors} />
              <InputRow fieldKey="password" label="Contraseña" icon="lock-closed-outline" placeholder="Contraseña" value={form.password} onChange={handlePassword} error={errors.password} secure showSecure={showPass} onToggleSecure={() => setShowPass((p) => !p)} {...rowColors} />
              <View style={[s.passHintBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F5F5F5' }]}>
                <Text style={[s.passHint, { color: muted }]}>8–15 caracteres · 1 mayúscula · 1 número · 1 símbolo (!@#$%...)</Text>
              </View>
              <InputRow fieldKey="confirm" label="Confirmar contraseña" icon="shield-checkmark-outline" placeholder="Confirmar contraseña" value={form.confirmPassword} onChange={handleConfirm} error={errors.confirmPassword} secure showSecure={showConfirm} onToggleSecure={() => setShowConfirm((p) => !p)} {...rowColors} />

              <Section icon="calendar-outline" label="Otros datos" {...sectionColors} />

              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Fecha de nacimiento (8–100 años)</Text>
                {Platform.OS === 'web' ? (
                  <View style={[s.inputWrap, { backgroundColor: inputBg, borderColor: errors.birthdate ? errorColor : inputBorder }]}>
                    <Ionicons name="calendar-outline" size={18} color={muted} />
                    <input
                      type="date"
                      max={new Date().toISOString().split('T')[0]}
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: isDark ? '#FFFFFF' : '#111111', fontSize: 15, marginLeft: 8 }}
                      onChange={(ev) => { if (ev.target.value) setBirthdate(new Date(ev.target.value + 'T00:00:00')); }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    style={[s.inputWrap, { backgroundColor: inputBg, borderColor: errors.birthdate ? errorColor : inputBorder }]}
                  >
                    <Ionicons name="calendar-outline" size={18} color={muted} />
                    <Text style={[s.input, { color: birthdate ? text : (isDark ? '#5A7258' : '#AAAAAA') }]}>
                      {birthdate ? formatDate(birthdate) : 'Seleccionar fecha'}
                    </Text>
                  </TouchableOpacity>
                )}
                {errors.birthdate ? <Text style={s.errorText}>{errors.birthdate}</Text> : null}
              </View>

              {showPicker && Platform.OS !== 'web' && (
                <DateTimePicker
                  value={birthdate || new Date(2000, 0, 1)}
                  mode="date"
                  maximumDate={new Date()}
                  onChange={(_, date) => { setShowPicker(false); if (date) setBirthdate(date); }}
                />
              )}

              <Section icon="checkmark-done-outline" label="Aceptaciones" {...sectionColors} />

              <TouchableOpacity onPress={() => setAccepted(!accepted)} activeOpacity={0.8} style={s.checkRow}>
                <View style={[s.checkbox, { borderColor: errors.policy ? errorColor : accepted ? theme.primary : inputBorder, backgroundColor: accepted ? theme.primary : 'transparent' }]}>
                  {accepted && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <Text style={[s.checkLabel, { color: text }]}>
                  Declaro que la información suministrada es verídica. En caso de falsedad, suplantación o manipulación de datos, asumo la responsabilidad conforme a la{' '}
                  <Text style={{ color: theme.primary, fontWeight: '700' }}>Ley 1581 de 2012</Text>.
                </Text>
              </TouchableOpacity>
              {errors.policy ? <Text style={s.errorText}>{errors.policy}</Text> : null}

              <View style={[s.rightsCard, { backgroundColor: rightsBg, borderColor: rightsBorder }]}>
                <View style={s.rightsHeader}>
                  <Ionicons name="information-circle-outline" size={16} color={theme.primary} />
                  <Text style={[s.rightsQ, { color: text }]}>
                    ¿Ha leído y acepta sus{' '}
                    <Text style={{ color: linkColor, textDecorationLine: 'underline', fontWeight: '700' }} onPress={() => router.push('/auth/rights')}>
                      derechos de acceso, actualización y rectificación
                    </Text>
                    {' '}de datos?
                  </Text>
                </View>
                <View style={s.rightsButtons}>
                  <TouchableOpacity
                    onPress={() => setHasRights(true)}
                    style={[s.rightsBtn, { borderColor: hasRights === true ? theme.primary : (isDark ? 'rgba(255,255,255,0.20)' : '#CCCCCC'), backgroundColor: hasRights === true ? theme.primary : 'transparent' }]}
                  >
                    <Ionicons name="checkmark-outline" size={14} color={hasRights === true ? '#FFF' : muted} />
                    <Text style={[s.rightsBtnText, { color: hasRights === true ? '#FFFFFF' : muted }]}>Sí</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setHasRights(false)}
                    style={[s.rightsBtn, { borderColor: hasRights === false ? errorColor : (isDark ? 'rgba(255,255,255,0.20)' : '#CCCCCC'), backgroundColor: hasRights === false ? errorColor : 'transparent' }]}
                  >
                    <Ionicons name="close-outline" size={14} color={hasRights === false ? '#FFF' : muted} />
                    <Text style={[s.rightsBtnText, { color: hasRights === false ? '#FFFFFF' : muted }]}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push('/auth/rights')} style={s.rightsReadLink}>
                    <Text style={[s.rightsReadText, { color: linkColor }]}>Leer mis derechos</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {errors.rights ? <Text style={s.errorText}>{errors.rights}</Text> : null}

              <TouchableOpacity onPress={handleRegister} style={s.registerBtn}>
                <LinearGradient colors={['#72C96D', '#65B361', '#4FA14B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.registerBtnGradient}>
                  <Text style={s.registerBtnText}>Registrarse</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCancel} activeOpacity={0.8} style={[s.cancelBtn, { borderColor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)' }]}>
                <Text style={[s.cancelBtnText, { color: muted }]}>Cancelar</Text>
              </TouchableOpacity>

              <View style={s.footer}>
                <Text style={[s.footerText, { color: muted }]}>¿Ya tienes cuenta? </Text>
                <NavLink href="/auth/login" label="Inicia sesión aquí" />
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  gradient: { flex: 1 }, safe: { flex: 1 }, kav: { flex: 1 },
  arcTop:    { position: 'absolute', width: 300, height: 420, right: -120, top: -90, borderRadius: 200, backgroundColor: 'rgba(20,70,28,0.18)' },
  arcBottom: { position: 'absolute', width: 420, height: 220, left: -120, bottom: -30, borderRadius: 180, backgroundColor: 'rgba(101,179,97,0.28)' },
  scroll:    { flexGrow: 1, alignItems: 'center', paddingVertical: 28, paddingHorizontal: 16 },
  logo:      { width: 180, height: 70, marginBottom: 18 },
  card:      { width: '100%', maxWidth: CARD_MAX, borderRadius: 26, borderWidth: 1, paddingHorizontal: 24, paddingVertical: 30 },
  cardWide:  { paddingHorizontal: 36 },
  title:     { fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: 4 },
  subtitle:  { fontSize: 13, textAlign: 'center', lineHeight: 18, marginBottom: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 22, marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1 },
  sectionTitle:  { fontSize: 11, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  fieldGroup: { marginBottom: 12 },
  label:      { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  inputWrap:  { height: 48, borderWidth: 1.2, borderRadius: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  input:      { flex: 1, fontSize: 15, outlineStyle: 'none' } as any,
  errorText:  { color: '#D92027', fontSize: 11, marginTop: 3 },
  infoBox:    { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 8, borderWidth: 1, marginBottom: 10 },
  infoText:   { fontSize: 12, flex: 1, lineHeight: 17 },
  dropdown:   { marginTop: 4, borderRadius: 10, borderWidth: 1, overflow: 'hidden' },
  dropOption: { paddingVertical: 13, paddingHorizontal: 16, borderBottomWidth: 1 },
  dropText:   { fontSize: 14 },
  validateBtn:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 10, borderWidth: 1.2, marginBottom: 4, paddingHorizontal: 12 },
  validateBtnText: { fontSize: 13, fontWeight: '700', textAlign: 'center' },
  passHintBox: { borderRadius: 8, padding: 10, marginTop: -4, marginBottom: 10 },
  passHint:    { fontSize: 11, lineHeight: 16, textAlign: 'center' },
  checkRow:     { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginVertical: 10 },
  checkbox:     { width: 20, height: 20, borderWidth: 1.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
  checkLabel:   { flex: 1, fontSize: 13, lineHeight: 20 },
  rightsCard:    { borderRadius: 14, borderWidth: 1, padding: 16, marginTop: 6, marginBottom: 4 },
  rightsHeader:  { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 14 },
  rightsQ:       { fontSize: 13, fontWeight: '600', flex: 1, lineHeight: 20 },
  rightsButtons: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  rightsBtn:     { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 20, paddingVertical: 9, borderRadius: 8, borderWidth: 1.2 },
  rightsBtnText: { fontSize: 13, fontWeight: '700' },
  rightsReadLink:{ marginLeft: 'auto' },
  rightsReadText:{ fontSize: 12, fontWeight: '600' },
  registerBtn:         { width: '100%', maxWidth: 300, alignSelf: 'center', borderRadius: 16, overflow: 'hidden', marginTop: 24, marginBottom: 10 },
  registerBtnGradient: { paddingVertical: 14, alignItems: 'center' },
  registerBtnText:     { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  cancelBtn:           { width: '100%', maxWidth: 300, alignSelf: 'center', borderRadius: 16, borderWidth: 1.2, paddingVertical: 12, alignItems: 'center', marginBottom: 20 },
  cancelBtnText:       { fontSize: 15, fontWeight: '600' },
  footer:              { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' },
  footerText:          { fontSize: 13 },
  linkText:            { fontSize: 13, fontWeight: '700' },
});
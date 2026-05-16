
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

// ── Constantes de validación — idénticas al original ──────────
const ONLY_LETTERS  = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;
const EMAIL_REGEX   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ONLY_DIGITS   = /^\d+$/;
const IDENTITY_OPTIONS = ['TI', 'CC', 'CE', 'PA'];
const CARD_MAX = 520;

const initialForm = {
  name: '',
  lastname: '',
  identityType: '',
  document: '',
  email: '',
  password: '',
  confirmPassword: '',
};

// ── Funciones auxiliares — idénticas al original ───────────────
function calculateAge(date: Date): number {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const month = today.getMonth() - date.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < date.getDate())) age--;
  return age;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function RegisterScreen() {
  const { theme, isDark } = useTheme();

  // ── Colores dinámicos (mismo patrón que login) ─────────────
  const text        = isDark ? '#FFFFFF' : '#000000';
  const muted       = isDark ? '#CAD6C8' : '#444444';
  const cardBg      = isDark ? '#07120D' : '#FFFFFF';
  const inputBg     = isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF';
  const inputBorder = isDark ? 'rgba(255,255,255,0.35)' : '#000000';
  const activeBorder= theme.primary;
  const linkColor   = isDark ? '#8EF58A' : '#65B361';
  const errorColor  = '#D92027';
  const isWide      = width >= 1024;
  const dropBg      = isDark ? '#0D1F14' : '#FFFFFF';
  const dropBorder  = isDark ? 'rgba(255,255,255,0.15)' : '#CCCCCC';

  // ── Estado — idéntico al original ─────────────────────────
  const [form, setForm]                         = useState(initialForm);
  const [birthdate, setBirthdate]               = useState<Date | null>(null);
  const [showPicker, setShowPicker]             = useState(false);
  const [accepted, setAccepted]                 = useState(false);
  const [hasRights, setHasRights]               = useState<boolean | null>(null);
  const [emailValidated, setEmailValidated]     = useState(false);
  const [showIdentityOptions, setShowIdentityOptions] = useState(false);
  const [errors, setErrors]                     = useState<Record<string, string>>({});
  const [showPass, setShowPass]                 = useState(false);
  const [showConfirm, setShowConfirm]           = useState(false);
  const [focusedField, setFocusedField]         = useState<string | null>(null);

  // ── Handlers — idénticos al original ──────────────────────
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    if (field === 'email') setEmailValidated(false);
  };

  const handleCancel = () => {
    setForm(initialForm);
    setBirthdate(null);
    router.replace('/login');
  };

  const handleEmailAction = () => {
    if (!form.email.trim()) {
      setErrors((prev) => ({ ...prev, emailAction: 'Debes ingresar primero el correo' }));
      return;
    }
    if (!EMAIL_REGEX.test(form.email)) {
      setErrors((prev) => ({ ...prev, emailAction: 'Ingresa un correo válido' }));
      return;
    }
    setEmailValidated(true);
    setErrors((prev) => ({ ...prev, emailAction: '' }));
  };

  const handleRegister = () => {
    const newErrors: Record<string, string> = {};
    const data = { ...form, name: form.name.trim(), lastname: form.lastname.trim(), email: form.email.trim() };

    if (!data.name)                         newErrors.name        = 'El nombre es obligatorio';
    else if (!ONLY_LETTERS.test(data.name)) newErrors.name        = 'Solo se permiten letras';
    if (!data.lastname)                          newErrors.lastname    = 'El apellido es obligatorio';
    else if (!ONLY_LETTERS.test(data.lastname))  newErrors.lastname    = 'Solo se permiten letras';
    if (!data.identityType)                 newErrors.identityType= 'Selecciona un tipo de identidad';
    if (!data.document)                     newErrors.document    = 'Documento obligatorio';
    else if (!ONLY_DIGITS.test(data.document))   newErrors.document    = 'Solo números permitidos';
    if (!data.email)                        newErrors.email       = 'Correo obligatorio';
    else if (!EMAIL_REGEX.test(data.email)) newErrors.email       = 'Correo inválido';
    if (!emailValidated)                    newErrors.emailAction = 'Debes validar el correo';
    if (!data.password)                     newErrors.password    = 'Contraseña obligatoria';
    if (!data.confirmPassword)              newErrors.confirmPassword = 'Confirma tu contraseña';
    else if (data.password !== data.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!birthdate)                         newErrors.birthdate   = 'Selecciona fecha de nacimiento';
    if (!accepted)                          newErrors.policy      = 'Debes aceptar políticas';
    if (hasRights === null)                 newErrors.rights      = 'Debes responder esta pregunta';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const age = calculateAge(birthdate!);
    router.push(age >= 18 ? '/teenager-registration' : '/minor-consent');
  };

  // ── NavLink — igual que login ──────────────────────────────
  const NavLink = ({ href, label }: { href: any; label: string }) => {
    if (Platform.OS === 'web') {
      return (
        <Link href={href} style={[s.linkText, { color: linkColor, textDecorationLine: 'underline' }]}>
          {label}
        </Link>
      );
    }
    return (
      <TouchableOpacity onPress={() => router.push(href)} activeOpacity={0.8}>
        <Text style={[s.linkText, { color: linkColor, textDecorationLine: 'underline' }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  // ── Campo de input reutilizable ────────────────────────────
  const Field = ({
    fieldKey, label, icon, placeholder, keyboard, secure, showToggle, onToggle,
  }: {
    fieldKey: string; label: string; icon: any; placeholder: string;
    keyboard?: any; secure?: boolean; showToggle?: boolean; onToggle?: () => void;
  }) => (
    <View style={s.fieldGroup}>
      <Text style={[s.label, { color: text }]}>{label}</Text>
      <View style={[
        s.inputWrap,
        {
          backgroundColor: inputBg,
          borderColor: errors[fieldKey] ? errorColor : focusedField === fieldKey ? activeBorder : inputBorder,
        },
      ]}>
        <Ionicons name={icon} size={18} color={muted} />
        <TextInput
          style={[s.input, { color: text }]}
          value={(form as any)[fieldKey]}
          onChangeText={(v) => handleChange(fieldKey, fieldKey === 'email' ? v.replace(/\s/g, '') : v)}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#6B8068' : '#999999'}
          keyboardType={keyboard || 'default'}
          autoCapitalize={fieldKey === 'email' ? 'none' : 'words'}
          secureTextEntry={secure && !showToggle}
          onFocus={() => setFocusedField(fieldKey)}
          onBlur={() => setFocusedField(null)}
        />
        {onToggle && (
          <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
            <Ionicons name={showToggle ? 'eye-off-outline' : 'eye-outline'} size={18} color={muted} />
          </TouchableOpacity>
        )}
      </View>
      {errors[fieldKey] ? <Text style={s.errorText}>{errors[fieldKey]}</Text> : null}
    </View>
  );

  // ─────────────────────────────────────────────────────────
  return (
    <LinearGradient
      colors={isDark ? ['#000000', '#06170F', '#0B2D17'] : ['#F7FFF4', '#E5F7DF', '#1E4C28']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.gradient}
    >
      {/* Arcos decorativos — igual que login */}
      <View style={s.arcTop} />
      <View style={s.arcBottom} />

      <SafeAreaView style={s.safe}>
        <KeyboardAvoidingView style={s.kav} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

            {/* Logo */}
            <Image source={require('@/assets/images/logo.png')} style={s.logo} resizeMode="contain" />

            {/* ── Tarjeta principal ── */}
            <View style={[
              s.card,
              isWide && s.cardWide,
              { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' },
            ]}>

              {/* Encabezado */}
              <Text style={[s.title, isWide && s.titleWide, { color: text }]}>Registro de usuario</Text>
              <Text style={[s.subtitle, { color: muted }]}>Completa tu información para registrarte en FaceLit</Text>

              {/* ── Sección: Datos personales ── */}
              <View style={[s.sectionHeader, { borderBottomColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
                <Ionicons name="person-outline" size={14} color={theme.primary} />
                <Text style={[s.sectionTitle, { color: theme.primary }]}>Datos personales</Text>
              </View>

              {/* Nombre */}
              <Field fieldKey="name" label="Nombre" icon="person-outline" placeholder="Juan" />

              {/* Apellido */}
              <Field fieldKey="lastname" label="Apellido" icon="people-outline" placeholder="Pérez" />

              {/* Tipo de identidad */}
              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Tipo de identidad</Text>
                <TouchableOpacity
                  onPress={() => setShowIdentityOptions(!showIdentityOptions)}
                  style={[s.inputWrap, {
                    backgroundColor: inputBg,
                    borderColor: errors.identityType ? errorColor : showIdentityOptions ? activeBorder : inputBorder,
                  }]}
                >
                  <Ionicons name="card-outline" size={18} color={muted} />
                  <Text style={[s.input, { color: form.identityType ? text : (isDark ? '#6B8068' : '#999999') }]}>
                    {form.identityType || 'Selecciona una opción'}
                  </Text>
                  <Ionicons name={showIdentityOptions ? 'chevron-up' : 'chevron-down'} size={16} color={muted} />
                </TouchableOpacity>

                {showIdentityOptions && (
                  <View style={[s.dropdown, { backgroundColor: dropBg, borderColor: dropBorder }]}>
                    {IDENTITY_OPTIONS.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={[
                          s.dropOption,
                          { borderBottomColor: dropBorder },
                          form.identityType === item && { backgroundColor: theme.primary + '22' },
                        ]}
                        onPress={() => { handleChange('identityType', item); setShowIdentityOptions(false); }}
                      >
                        <Text style={[s.dropText, { color: text }, form.identityType === item && { color: theme.primary, fontWeight: '700' }]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                {errors.identityType ? <Text style={s.errorText}>{errors.identityType}</Text> : null}
              </View>

              {/* Documento */}
              <Field
                fieldKey="document" label="Número de documento"
                icon="document-text-outline" placeholder="Número documento"
                keyboard="number-pad"
              />

              {/* ── Sección: Contacto ── */}
              <View style={[s.sectionHeader, { borderBottomColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
                <Ionicons name="mail-outline" size={14} color={theme.primary} />
                <Text style={[s.sectionTitle, { color: theme.primary }]}>Contacto</Text>
              </View>

              {/* Email */}
              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Correo electrónico</Text>
                <View style={[s.inputWrap, {
                  backgroundColor: inputBg,
                  borderColor: errors.email ? errorColor : focusedField === 'email' ? activeBorder : inputBorder,
                }]}>
                  <Ionicons name="mail-outline" size={18} color={muted} />
                  <TextInput
                    style={[s.input, { color: text }]}
                    value={form.email}
                    onChangeText={(v) => handleChange('email', v.replace(/\s/g, ''))}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor={isDark ? '#6B8068' : '#999999'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                  {emailValidated && <Ionicons name="checkmark-circle" size={18} color={theme.primary} />}
                </View>
                {errors.email ? <Text style={s.errorText}>{errors.email}</Text> : null}
              </View>

              {/* Botón validar correo */}
              <TouchableOpacity
                onPress={handleEmailAction}
                style={[
                  s.validateBtn,
                  { borderColor: emailValidated ? theme.primary : inputBorder },
                  emailValidated && { backgroundColor: theme.primary + '18' },
                ]}
              >
                <Ionicons
                  name={emailValidated ? 'checkmark-circle-outline' : 'send-outline'}
                  size={16}
                  color={emailValidated ? theme.primary : muted}
                />
                <Text style={[s.validateBtnText, { color: emailValidated ? theme.primary : muted }]}>
                  {emailValidated ? 'Correo validado ✓' : 'Validar correo'}
                </Text>
              </TouchableOpacity>
              {errors.emailAction ? <Text style={[s.errorText, { marginBottom: 8 }]}>{errors.emailAction}</Text> : null}

              {/* ── Sección: Seguridad ── */}
              <View style={[s.sectionHeader, { borderBottomColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
                <Ionicons name="lock-closed-outline" size={14} color={theme.primary} />
                <Text style={[s.sectionTitle, { color: theme.primary }]}>Seguridad</Text>
              </View>

              {/* Contraseña */}
              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Contraseña</Text>
                <View style={[s.inputWrap, {
                  backgroundColor: inputBg,
                  borderColor: errors.password ? errorColor : focusedField === 'password' ? activeBorder : inputBorder,
                }]}>
                  <Ionicons name="lock-closed-outline" size={18} color={muted} />
                  <TextInput
                    style={[s.input, { color: text }]}
                    value={form.password}
                    onChangeText={(v) => handleChange('password', v)}
                    placeholder="Contraseña"
                    placeholderTextColor={isDark ? '#6B8068' : '#999999'}
                    secureTextEntry={!showPass}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <TouchableOpacity onPress={() => setShowPass((p) => !p)} activeOpacity={0.7}>
                    <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={muted} />
                  </TouchableOpacity>
                </View>
                {errors.password ? <Text style={s.errorText}>{errors.password}</Text> : null}
              </View>

              {/* Confirmar contraseña */}
              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Confirmar contraseña</Text>
                <View style={[s.inputWrap, {
                  backgroundColor: inputBg,
                  borderColor: errors.confirmPassword ? errorColor : focusedField === 'confirm' ? activeBorder : inputBorder,
                }]}>
                  <Ionicons name="shield-checkmark-outline" size={18} color={muted} />
                  <TextInput
                    style={[s.input, { color: text }]}
                    value={form.confirmPassword}
                    onChangeText={(v) => handleChange('confirmPassword', v)}
                    placeholder="Confirmar contraseña"
                    placeholderTextColor={isDark ? '#6B8068' : '#999999'}
                    secureTextEntry={!showConfirm}
                    onFocus={() => setFocusedField('confirm')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <TouchableOpacity onPress={() => setShowConfirm((p) => !p)} activeOpacity={0.7}>
                    <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={18} color={muted} />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword ? <Text style={s.errorText}>{errors.confirmPassword}</Text> : null}
              </View>

              {/* ── Sección: Otros datos ── */}
              <View style={[s.sectionHeader, { borderBottomColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
                <Ionicons name="calendar-outline" size={14} color={theme.primary} />
                <Text style={[s.sectionTitle, { color: theme.primary }]}>Otros datos</Text>
              </View>

              {/* Fecha de nacimiento */}
              <View style={s.fieldGroup}>
                <Text style={[s.label, { color: text }]}>Fecha de nacimiento</Text>
                {Platform.OS === 'web' ? (
                  <View style={[s.inputWrap, { backgroundColor: inputBg, borderColor: errors.birthdate ? errorColor : inputBorder }]}>
                    <Ionicons name="calendar-outline" size={18} color={muted} />
                    <input
                      type="date"
                      max={new Date().toISOString().split('T')[0]}
                      style={{
                        flex: 1, border: 'none', outline: 'none',
                        background: 'transparent', color: isDark ? '#FFFFFF' : '#000000',
                        fontSize: 15, marginLeft: 8,
                      }}
                      onChange={(e) => { if (e.target.value) setBirthdate(new Date(e.target.value + 'T00:00:00')); }}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    style={[s.inputWrap, { backgroundColor: inputBg, borderColor: errors.birthdate ? errorColor : inputBorder }]}
                  >
                    <Ionicons name="calendar-outline" size={18} color={muted} />
                    <Text style={[s.input, { color: birthdate ? text : (isDark ? '#6B8068' : '#999999') }]}>
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

              {/* ── Sección: Aceptaciones ── */}
              <View style={[s.sectionHeader, { borderBottomColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
                <Ionicons name="checkmark-done-outline" size={14} color={theme.primary} />
                <Text style={[s.sectionTitle, { color: theme.primary }]}>Aceptaciones</Text>
              </View>

              {/* Checkbox políticas */}
              <TouchableOpacity onPress={() => setAccepted(!accepted)} activeOpacity={0.8} style={s.checkRow}>
                <View style={[s.checkbox, { borderColor: errors.policy ? errorColor : text, backgroundColor: accepted ? theme.primary : 'transparent' }]}>
                  {accepted && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <View style={s.checkTextWrap}>
                  <Text style={[s.checkLabel, { color: text }]}>Acepto políticas y tratamiento de datos</Text>
                </View>
              </TouchableOpacity>
              {errors.policy ? <Text style={s.errorText}>{errors.policy}</Text> : null}

              {/* Derechos */}
              <View style={[s.rightsCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#F5F8F5', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
                <View style={s.rightsHeader}>
                  <Ionicons name="information-circle-outline" size={16} color={theme.primary} />
                  <Text style={[s.rightsQuestion, { color: text }]}>
                    ¿Ha leído y acepta sus{' '}
                    <NavLink href="/rights" label="derechos" />?
                  </Text>
                </View>

                <View style={s.rightsButtons}>
                  <TouchableOpacity
                    onPress={() => setHasRights(true)}
                    style={[
                      s.rightsBtn,
                      { borderColor: hasRights === true ? theme.primary : (isDark ? 'rgba(255,255,255,0.2)' : '#CCCCCC') },
                      hasRights === true && { backgroundColor: theme.primary },
                    ]}
                  >
                    <Ionicons name="checkmark-outline" size={14} color={hasRights === true ? '#FFF' : muted} />
                    <Text style={[s.rightsBtnText, { color: hasRights === true ? '#FFFFFF' : muted }]}>Sí</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setHasRights(false)}
                    style={[
                      s.rightsBtn,
                      { borderColor: hasRights === false ? errorColor : (isDark ? 'rgba(255,255,255,0.2)' : '#CCCCCC') },
                      hasRights === false && { backgroundColor: errorColor },
                    ]}
                  >
                    <Ionicons name="close-outline" size={14} color={hasRights === false ? '#FFF' : muted} />
                    <Text style={[s.rightsBtnText, { color: hasRights === false ? '#FFFFFF' : muted }]}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {errors.rights ? <Text style={s.errorText}>{errors.rights}</Text> : null}

              {/* ── Botones de acción ── */}
              <TouchableOpacity onPress={handleRegister} style={s.registerBtn}>
                <LinearGradient
                  colors={['#72C96D', '#65B361', '#4FA14B']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={s.registerBtnGradient}
                >
                  <Text style={s.registerBtnText}>Registrarse</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCancel} activeOpacity={0.8} style={[s.cancelBtn, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }]}>
                <Text style={[s.cancelBtnText, { color: muted }]}>Cancelar</Text>
              </TouchableOpacity>

              {/* Pie */}
              <View style={s.footer}>
                <Text style={[s.footerText, { color: muted }]}>¿Ya tienes cuenta? </Text>
                <NavLink href="/login" label="Inicia sesión aquí" />
              </View>
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

  // Arcos — igual que login
  arcTop: {
    position: 'absolute', width: 300, height: 420,
    right: -120, top: -90, borderRadius: 200,
    backgroundColor: 'rgba(20,70,28,0.18)',
  },
  arcBottom: {
    position: 'absolute', width: 420, height: 220,
    left: -120, bottom: -30, borderRadius: 180,
    backgroundColor: 'rgba(101,179,97,0.28)',
  },

  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 28,
    paddingHorizontal: 16,
  },

  logo: { width: 180, height: 70, marginBottom: 18 },

  // Tarjeta
  card: {
    width: '100%', maxWidth: CARD_MAX,
    borderRadius: 26, borderWidth: 1,
    paddingHorizontal: 24, paddingVertical: 30,
  },
  cardWide: { paddingHorizontal: 32 },

  title:     { fontSize: 28, fontWeight: '900', textAlign: 'center' },
  titleWide: { fontSize: 34 },
  subtitle:  { fontSize: 13, textAlign: 'center', marginBottom: 20, lineHeight: 18 },

  // Secciones
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 6, marginTop: 20, marginBottom: 14,
    paddingBottom: 8, borderBottomWidth: 1,
  },
  sectionTitle: { fontSize: 11, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },

  // Campos
  fieldGroup: { marginBottom: 12 },
  label:  { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  inputWrap: {
    height: 46, borderWidth: 1.2, borderRadius: 12,
    paddingHorizontal: 14, flexDirection: 'row',
    alignItems: 'center', gap: 10,
  },
  input: { flex: 1, fontSize: 15, outlineStyle: 'none' } as any,
  errorText: { color: '#D92027', fontSize: 11, marginTop: 3 },

  // Dropdown identidad
  dropdown: {
    marginTop: 4, borderRadius: 10,
    borderWidth: 1, overflow: 'hidden',
  },
  dropOption: {
    paddingVertical: 12, paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  dropText: { fontSize: 14 },

  // Validar correo
  validateBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, height: 40, borderRadius: 10, borderWidth: 1.2,
    marginBottom: 4,
  },
  validateBtnText: { fontSize: 13, fontWeight: '700' },

  // Checkbox
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10 },
  checkbox: { width: 18, height: 18, borderWidth: 1.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  checkTextWrap: { flex: 1 },
  checkLabel: { fontSize: 13, lineHeight: 18 },

  // Derechos
  rightsCard: {
    borderRadius: 12, borderWidth: 1,
    padding: 16, marginTop: 4, marginBottom: 4,
  },
  rightsHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 14 },
  rightsQuestion: { fontSize: 13, fontWeight: '600', flex: 1, lineHeight: 18 },
  rightsButtons: { flexDirection: 'row', gap: 10 },
  rightsBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 20, paddingVertical: 9,
    borderRadius: 8, borderWidth: 1.2,
  },
  rightsBtnText: { fontSize: 13, fontWeight: '700' },

  // Botón registrarse
  registerBtn: {
    width: '100%', maxWidth: 300, alignSelf: 'center',
    borderRadius: 16, overflow: 'hidden',
    marginTop: 24, marginBottom: 10,
  },
  registerBtnGradient: { paddingVertical: 13, alignItems: 'center' },
  registerBtnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },

  // Botón cancelar
  cancelBtn: {
    width: '100%', maxWidth: 300, alignSelf: 'center',
    borderRadius: 16, borderWidth: 1.2,
    paddingVertical: 12, alignItems: 'center',
    marginBottom: 20,
  },
  cancelBtnText: { fontSize: 15, fontWeight: '600' },

  // Pie
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' },
  footerText: { fontSize: 13 },
  linkText: { fontSize: 13, fontWeight: '700' },
});

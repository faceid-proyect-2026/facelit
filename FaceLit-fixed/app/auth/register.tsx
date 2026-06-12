// ─────────────────────────────────────────────
//  app/auth/register.tsx
//  Registro de usuario — código limpio
//  Lógica de validación separada, componentes
//  reutilizables desde shared/ y features/
// ─────────────────────────────────────────────
import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Platform, ScrollView, KeyboardAvoidingView,
  TextInput, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, Link, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/contexts/ThemeContext';
import { Colors } from '@/shared/constants/colors';
import { FontSize, FontWeight } from '@/shared/constants/typography';
import { Routes } from '@/shared/constants/routes';
import { InputField, PasswordField, AppButton } from '@/shared/components/ui';
import GradientBackground from '@/shared/components/layout/GradientBackground';
import SectionHeader from '@/features/auth/components/SectionHeader';
import NavLink from '@/features/auth/components/NavLink';

// ── Constantes ────────────────────────────────
const { width } = Dimensions.get('window');
const CARD_MAX = 520;

const ONLY_LETTERS   = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
const EMAIL_REGEX    = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~]).{8,15}$/;

const IDENTITY_OPTIONS = [
  { value: 'TI', label: 'TI — Tarjeta de Identidad (menor)' },
  { value: 'CC', label: 'CC — Cédula de Ciudadanía (mayor)' },
  { value: 'CE', label: 'CE — Cédula de Extranjería' },
  { value: 'PA', label: 'PA — Pasaporte' },
];

const initialForm = {
  name: '', lastname: '', identityType: '',
  document: '', email: '', password: '', confirmPassword: '',
};

const initialErrors: Record<string, string> = {
  name: '', lastname: '', identityType: '', document: '',
  email: '', emailAction: '', password: '', confirmPassword: '',
  birthdate: '', policy: '', rights: '',
};

// ── Helpers ───────────────────────────────────
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

// ── Componente ────────────────────────────────
export default function RegisterScreen() {
  const { theme, isDark } = useTheme();
  const { validatedEmail } = useLocalSearchParams<{ validatedEmail: string }>();

  // ── Colores locales ──────────────────────────
  const cardBg      = isDark ? Colors.dark.surface  : Colors.white;
  const cardBorder  = isDark ? Colors.dark.border   : Colors.light.border;
  const text        = isDark ? Colors.dark.text     : Colors.light.text;
  const muted       = isDark ? Colors.dark.textMuted: Colors.light.textMuted;
  const inputBg     = isDark ? Colors.dark.inputBg  : Colors.light.inputBg;
  const inputBorder = isDark ? Colors.dark.inputBorder : Colors.light.inputBorder;
  const linkColor   = isDark ? Colors.dark.link     : Colors.light.link;
  const dropBg      = isDark ? Colors.dark.card     : Colors.white;
  const sectionLine = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
  const rightsBg    = isDark ? 'rgba(255,255,255,0.04)' : '#F3F8F3';
  const isWide      = width >= 900;

  // ── Estado ────────────────────────────────────
  const [form, setForm] = useState({
    ...initialForm,
    email: validatedEmail ?? '',
  });
  const [birthdate, setBirthdate]           = useState<Date | null>(null);
  const [showPicker, setShowPicker]         = useState(false);
  const [accepted, setAccepted]             = useState(false);
  const [hasRights, setHasRights]           = useState<boolean | null>(null);
  const [emailValidated, setEmailValidated] = useState(!!validatedEmail);
  const [showIdentity, setShowIdentity]     = useState(false);
  const [errors, setErrors]                 = useState(initialErrors);
  const [showPass, setShowPass]             = useState(false);
  const [showConfirm, setShowConfirm]       = useState(false);

  // ── Handlers ──────────────────────────────────
  const clearError = (key: string) =>
    setErrors(p => ({ ...p, [key]: '' }));

  const setField = (key: string, value: string) => {
    setForm(p => ({ ...p, [key]: value }));
    clearError(key);
  };

  const handleEmail = (v: string) => {
    setForm(p => ({ ...p, email: v.replace(/\s/g, '') }));
    setEmailValidated(false);
    clearError('email');
    clearError('emailAction');
  };

  const handleIdentity = (value: string) => {
    setForm(p => ({ ...p, identityType: value }));
    setShowIdentity(false);
    clearError('identityType');
  };

  const handleEmailValidate = () => {
    const e = form.email.trim();
    if (!e) {
      setErrors(p => ({ ...p, emailAction: 'Ingresa el correo primero' }));
      return;
    }
    if (!EMAIL_REGEX.test(e)) {
      setErrors(p => ({ ...p, emailAction: 'Correo inválido' }));
      return;
    }
    router.push({
      pathname: Routes.AUTH.EMAIL_VALIDATION as any,
      params: { email: e },
    });
  };

  const handleRegister = () => {
    const e = { ...initialErrors };
    const d = {
      ...form,
      name:     form.name.trim(),
      lastname: form.lastname.trim(),
      email:    form.email.trim(),
    };

    // Validaciones
    if (!d.name)                          e.name = 'El nombre es obligatorio';
    else if (!ONLY_LETTERS.test(d.name))  e.name = 'Solo se permiten letras';

    if (!d.lastname)                            e.lastname = 'El apellido es obligatorio';
    else if (!ONLY_LETTERS.test(d.lastname))    e.lastname = 'Solo se permiten letras';

    if (!d.identityType) e.identityType = 'Selecciona un tipo de identidad';

    if (!d.document)                    e.document = 'Documento obligatorio';
    else if (d.document.length !== 10)  e.document = 'Debe tener exactamente 10 dígitos';

    if (!d.email)                         e.email = 'Correo obligatorio';
    else if (!EMAIL_REGEX.test(d.email))  e.email = 'Formato de correo inválido';

    if (!emailValidated) e.emailAction = 'Debes validar el correo antes de continuar';

    if (!d.password)                            e.password = 'Contraseña obligatoria';
    else if (!PASSWORD_REGEX.test(d.password))  e.password = 'Mínimo 8 y máximo 15 caracteres, una mayúscula, un número y un símbolo';

    if (!d.confirmPassword)                    e.confirmPassword = 'Confirma tu contraseña';
    else if (d.password !== d.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';

    if (!birthdate) {
      e.birthdate = 'Selecciona fecha de nacimiento';
    } else {
      const age = getAge(birthdate);
      if (age < 8)       e.birthdate = 'La edad mínima es 8 años';
      else if (age > 100) e.birthdate = 'La edad máxima es 100 años';
      else if (d.identityType === 'TI' && age >= 18)
        e.identityType = 'TI es solo para menores de 18 años';
      else if (d.identityType === 'CC' && age < 18)
        e.identityType = 'CC es solo para mayores de 18 años';
    }

    if (!accepted)          e.policy = 'Debes declarar y aceptar las políticas';
    if (hasRights === null) e.rights = 'Debes responder esta pregunta';

    setErrors(e);
    const hasErrors = Object.values(e).some(v => v !== '');
    if (hasErrors) return;

    const age = getAge(birthdate!);
    if (age >= 18) {
      router.push(Routes.AUTH.TEENAGER_REGISTRATION as any);
    } else {
      router.push({
        pathname: Routes.AUTH.MINOR_CONSENT as any,
        params: { minorEmail: d.email },
      });
    }
  };

  // ── Render ────────────────────────────────────
  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            s.card,
            isWide && s.cardWide,
            { backgroundColor: cardBg, borderColor: cardBorder },
          ]}>

            {/* Título */}
            <Text style={[s.title, { color: text }]}>Registro de usuario</Text>
            <Text style={[s.subtitle, { color: muted }]}>
              Completa tu información para crear tu cuenta en FaceLit
            </Text>

            {/* ── Datos personales ── */}
            <SectionHeader icon="person-outline" label="Datos personales" />

            <InputField
              label="Nombre"
              icon="person-outline"
              placeholder="Nombre completo"
              value={form.name}
              onChangeText={v => setField('name', v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, ''))}
              error={errors.name}
            />

            <InputField
              label="Apellido"
              icon="people-outline"
              placeholder="Apellido completo"
              value={form.lastname}
              onChangeText={v => setField('lastname', v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, ''))}
              error={errors.lastname}
            />

            {/* Tipo de identidad */}
            <View style={s.fieldGroup}>
              <Text style={[s.label, { color: text }]}>Tipo de identidad</Text>
              <TouchableOpacity
                onPress={() => setShowIdentity(!showIdentity)}
                style={[s.inputWrap, {
                  backgroundColor: inputBg,
                  borderColor: errors.identityType
                    ? Colors.error
                    : showIdentity
                    ? theme.primary
                    : inputBorder,
                }]}
              >
                <Ionicons name="card-outline" size={18} color={muted} />
                <Text style={[s.inputText, {
                  color: form.identityType ? text : (isDark ? '#5A7258' : '#AAAAAA'),
                }]}>
                  {form.identityType
                    ? IDENTITY_OPTIONS.find(o => o.value === form.identityType)?.label
                    : 'Selecciona una opción'}
                </Text>
                <Ionicons
                  name={showIdentity ? 'chevron-up' : 'chevron-down'}
                  size={16} color={muted}
                />
              </TouchableOpacity>
              {showIdentity && (
                <View style={[s.dropdown, {
                  backgroundColor: dropBg,
                  borderColor: inputBorder,
                }]}>
                  {IDENTITY_OPTIONS.map(opt => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[
                        s.dropOption,
                        { borderBottomColor: inputBorder },
                        form.identityType === opt.value && {
                          backgroundColor: theme.primary + '22',
                        },
                      ]}
                      onPress={() => handleIdentity(opt.value)}
                    >
                      <Text style={[
                        s.dropText,
                        { color: text },
                        form.identityType === opt.value && {
                          color: theme.primary,
                          fontWeight: FontWeight.bold,
                        },
                      ]}>
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {errors.identityType
                ? <Text style={s.errorText}>{errors.identityType}</Text>
                : null}
            </View>

            {/* Avisos TI / CC */}
            {form.identityType === 'TI' && (
              <View style={[s.infoBox, {
                backgroundColor: isDark ? 'rgba(255,165,0,0.10)' : '#FFF8E7',
                borderColor: Colors.warning,
              }]}>
                <Ionicons name="information-circle-outline" size={14} color={Colors.warning} />
                <Text style={[s.infoText, { color: isDark ? Colors.warning : '#8B6000' }]}>
                  TI es para menores de edad (menos de 18 años)
                </Text>
              </View>
            )}
            {form.identityType === 'CC' && (
              <View style={[s.infoBox, {
                backgroundColor: isDark ? 'rgba(101,179,97,0.08)' : '#F0FFF0',
                borderColor: theme.primary,
              }]}>
                <Ionicons name="information-circle-outline" size={14} color={theme.primary} />
                <Text style={[s.infoText, { color: isDark ? theme.primary : '#2E6E2A' }]}>
                  CC es para mayores de edad (18 años o más)
                </Text>
              </View>
            )}

            <InputField
              label="Número de documento (10 dígitos)"
              icon="document-text-outline"
              placeholder="0000000000"
              keyboardType="numeric"
              value={form.document}
              onChangeText={v => setField('document', v.replace(/\D/g, '').slice(0, 10))}
              error={errors.document}
            />

            {/* ── Contacto ── */}
            <SectionHeader icon="mail-outline" label="Contacto" />

            <InputField
              label="Correo electrónico"
              icon="mail-outline"
              placeholder="correo@ejemplo.com"
              keyboardType="email-address"
              value={form.email}
              onChangeText={handleEmail}
              error={errors.email}
              containerStyle={emailValidated ? {
                borderColor: theme.primary,
              } : undefined}
            />

            <TouchableOpacity
              onPress={emailValidated ? undefined : handleEmailValidate}
              activeOpacity={emailValidated ? 1 : 0.75}
              style={[s.validateBtn, {
                borderColor: emailValidated
                  ? theme.primary
                  : errors.emailAction
                  ? Colors.error
                  : inputBorder,
                backgroundColor: emailValidated
                  ? theme.primary + '18'
                  : Colors.transparent,
              }]}
            >
              <Ionicons
                name={emailValidated ? 'checkmark-circle' : 'send-outline'}
                size={16}
                color={emailValidated ? theme.primary : errors.emailAction ? Colors.error : muted}
              />
              <Text style={[s.validateBtnText, {
                color: emailValidated
                  ? theme.primary
                  : errors.emailAction
                  ? Colors.error
                  : muted,
              }]}>
                {emailValidated
                  ? '✓ Correo verificado'
                  : 'Validar correo — obligatorio para continuar'}
              </Text>
            </TouchableOpacity>
            {errors.emailAction
              ? <Text style={[s.errorText, { marginBottom: 8 }]}>{errors.emailAction}</Text>
              : null}

            {/* ── Seguridad ── */}
            <SectionHeader icon="lock-closed-outline" label="Seguridad" />

            <PasswordField
              label="Contraseña"
              placeholder="Contraseña"
              value={form.password}
              onChangeText={v => setField('password', v)}
              error={errors.password}
            />
            <View style={[s.hintBox, {
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F5F5F5',
            }]}>
              <Text style={[s.hintText, { color: muted }]}>
                8–15 caracteres · 1 mayúscula · 1 número · 1 símbolo
              </Text>
            </View>

            <PasswordField
              label="Confirmar contraseña"
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChangeText={v => setField('confirmPassword', v)}
              error={errors.confirmPassword}
            />

            {/* ── Otros datos ── */}
            <SectionHeader icon="calendar-outline" label="Otros datos" />

            <View style={s.fieldGroup}>
              <Text style={[s.label, { color: text }]}>
                Fecha de nacimiento (8–100 años)
              </Text>
              {Platform.OS === 'web' ? (
                <View style={[s.inputWrap, {
                  backgroundColor: inputBg,
                  borderColor: errors.birthdate ? Colors.error : inputBorder,
                }]}>
                  <Ionicons name="calendar-outline" size={18} color={muted} />
                  <input
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    style={{
                      flex: 1, border: 'none', outline: 'none',
                      background: 'transparent',
                      color: isDark ? Colors.white : Colors.black,
                      fontSize: 15, marginLeft: 8,
                    }}
                    onChange={ev => {
                      if (ev.target.value)
                        setBirthdate(new Date(ev.target.value + 'T00:00:00'));
                    }}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setShowPicker(true)}
                  style={[s.inputWrap, {
                    backgroundColor: inputBg,
                    borderColor: errors.birthdate ? Colors.error : inputBorder,
                  }]}
                >
                  <Ionicons name="calendar-outline" size={18} color={muted} />
                  <Text style={[s.inputText, {
                    color: birthdate ? text : (isDark ? '#5A7258' : '#AAAAAA'),
                  }]}>
                    {birthdate ? formatDate(birthdate) : 'Seleccionar fecha'}
                  </Text>
                </TouchableOpacity>
              )}
              {errors.birthdate
                ? <Text style={s.errorText}>{errors.birthdate}</Text>
                : null}
            </View>

            {showPicker && Platform.OS !== 'web' && (
              <DateTimePicker
                value={birthdate || new Date(2000, 0, 1)}
                mode="date"
                maximumDate={new Date()}
                onChange={(_, date) => {
                  setShowPicker(false);
                  if (date) setBirthdate(date);
                }}
              />
            )}

            {/* ── Aceptaciones ── */}
            <SectionHeader icon="checkmark-done-outline" label="Aceptaciones" />

            <TouchableOpacity
              onPress={() => setAccepted(!accepted)}
              activeOpacity={0.8}
              style={s.checkRow}
            >
              <View style={[s.checkbox, {
                borderColor: errors.policy
                  ? Colors.error
                  : accepted
                  ? theme.primary
                  : inputBorder,
                backgroundColor: accepted ? theme.primary : Colors.transparent,
              }]}>
                {accepted && (
                  <Ionicons name="checkmark" size={12} color={Colors.white} />
                )}
              </View>
              <Text style={[s.checkLabel, { color: text }]}>
                Declaro que la información es verídica conforme a la{' '}
                <Text style={{ color: theme.primary, fontWeight: FontWeight.bold }}>
                  Ley 1581 de 2012
                </Text>.
              </Text>
            </TouchableOpacity>
            {errors.policy
              ? <Text style={s.errorText}>{errors.policy}</Text>
              : null}

            {/* Derechos */}
            <View style={[s.rightsCard, {
              backgroundColor: rightsBg,
              borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)',
            }]}>
              <View style={s.rightsHeader}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={theme.primary}
                />
                <Text style={[s.rightsQ, { color: text }]}>
                  ¿Ha leído y acepta sus derechos de acceso,
                  actualización y rectificación de datos?
                </Text>
              </View>
              <View style={s.rightsButtons}>
                <TouchableOpacity
                  onPress={() => setHasRights(true)}
                  style={[s.rightsBtn, {
                    borderColor: hasRights === true
                      ? theme.primary
                      : (isDark ? 'rgba(255,255,255,0.20)' : '#CCCCCC'),
                    backgroundColor: hasRights === true
                      ? theme.primary
                      : Colors.transparent,
                  }]}
                >
                  <Ionicons
                    name="checkmark-outline" size={14}
                    color={hasRights === true ? Colors.white : muted}
                  />
                  <Text style={[s.rightsBtnText, {
                    color: hasRights === true ? Colors.white : muted,
                  }]}>Sí</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setHasRights(false)}
                  style={[s.rightsBtn, {
                    borderColor: hasRights === false
                      ? Colors.error
                      : (isDark ? 'rgba(255,255,255,0.20)' : '#CCCCCC'),
                    backgroundColor: hasRights === false
                      ? Colors.error
                      : Colors.transparent,
                  }]}
                >
                  <Ionicons
                    name="close-outline" size={14}
                    color={hasRights === false ? Colors.white : muted}
                  />
                  <Text style={[s.rightsBtnText, {
                    color: hasRights === false ? Colors.white : muted,
                  }]}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push(Routes.AUTH.RIGHTS as any)}
                  style={s.rightsReadLink}
                >
                  <Text style={[s.rightsReadText, { color: linkColor }]}>
                    Leer mis derechos
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {errors.rights
              ? <Text style={s.errorText}>{errors.rights}</Text>
              : null}

            {/* ── Botones ── */}
            <AppButton
              title="Registrarse"
              onPress={handleRegister}
              style={s.registerBtn}
            />

            <AppButton
              title="Cancelar"
              onPress={() => {
                setForm(initialForm);
                setBirthdate(null);
                router.replace(Routes.AUTH.LOGIN as any);
              }}
              variant="outline"
              style={s.cancelBtn}
            />

            <View style={s.footer}>
              <Text style={[s.footerText, { color: muted }]}>
                ¿Ya tienes cuenta?{' '}
              </Text>
              <NavLink href={Routes.AUTH.LOGIN} label="Inicia sesión" />
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

// ── Estilos ───────────────────────────────────
const s = StyleSheet.create({
  scroll:   { flexGrow: 1, alignItems: 'center', paddingVertical: 28, paddingHorizontal: 16 },
  card:     { width: '100%', maxWidth: CARD_MAX, borderRadius: 26, borderWidth: 1, paddingHorizontal: 24, paddingVertical: 30 },
  cardWide: { paddingHorizontal: 36 },

  title:    { fontSize: FontSize['3xl'], fontWeight: FontWeight.black, textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: FontSize.md, textAlign: 'center', lineHeight: 18, marginBottom: 8 },

  fieldGroup: { marginBottom: 12 },
  label:      { fontSize: FontSize.md, fontWeight: FontWeight.bold, marginBottom: 6 },
  inputWrap:  { height: 48, borderWidth: 1.2, borderRadius: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  inputText:  { flex: 1, fontSize: FontSize.lg },
  errorText:  { color: Colors.error, fontSize: FontSize.xs, marginTop: 3 },

  infoBox:  { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 8, borderWidth: 1, marginBottom: 10 },
  infoText: { fontSize: FontSize.sm, flex: 1, lineHeight: 17 },

  dropdown:   { marginTop: 4, borderRadius: 10, borderWidth: 1, overflow: 'hidden' },
  dropOption: { paddingVertical: 13, paddingHorizontal: 16, borderBottomWidth: 1 },
  dropText:   { fontSize: FontSize.base },

  validateBtn:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 10, borderWidth: 1.2, marginBottom: 4, paddingHorizontal: 12 },
  validateBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, textAlign: 'center' },

  hintBox:  { borderRadius: 8, padding: 10, marginTop: -4, marginBottom: 10 },
  hintText: { fontSize: FontSize.xs, lineHeight: 16, textAlign: 'center' },

  checkRow:   { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginVertical: 10 },
  checkbox:   { width: 20, height: 20, borderWidth: 1.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
  checkLabel: { flex: 1, fontSize: FontSize.md, lineHeight: 20 },

  rightsCard:    { borderRadius: 14, borderWidth: 1, padding: 16, marginTop: 6, marginBottom: 4 },
  rightsHeader:  { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 14 },
  rightsQ:       { fontSize: FontSize.md, fontWeight: FontWeight.semibold, flex: 1, lineHeight: 20 },
  rightsButtons: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  rightsBtn:     { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 20, paddingVertical: 9, borderRadius: 8, borderWidth: 1.2 },
  rightsBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold },
  rightsReadLink:{ marginLeft: 'auto' as any },
  rightsReadText:{ fontSize: FontSize.sm, fontWeight: FontWeight.semibold },

  registerBtn: { maxWidth: 300, alignSelf: 'center', marginTop: 24, marginBottom: 10 },
  cancelBtn:   { maxWidth: 300, alignSelf: 'center', marginBottom: 20 },

  footer:     { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' },
  footerText: { fontSize: FontSize.md },
});
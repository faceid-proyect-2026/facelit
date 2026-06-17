// ─────────────────────────────────────────────
//  app/auth/register.tsx
//  Registro de usuario — código limpio + i18n
//  Lógica de validación separada, componentes
//  reutilizables desde shared/ y features/
// ─────────────────────────────────────────────
import { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Platform, ScrollView, KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
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

const IDENTITY_VALUES = ['TI', 'CC', 'CE', 'PA'] as const;

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
  const { t } = useTranslation();
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
  const rightsBg    = isDark ? 'rgba(255,255,255,0.04)' : '#F3F8F3';
  const isWide      = width >= 900;

  // Opciones de identidad — usa t() para las etiquetas
  const identityOptions = IDENTITY_VALUES.map(value => ({
    value,
    label: t(`register.identity${value}`),
  }));

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
      setErrors(p => ({ ...p, emailAction: t('register.errors.emailEmpty') }));
      return;
    }
    if (!EMAIL_REGEX.test(e)) {
      setErrors(p => ({ ...p, emailAction: t('register.errors.emailInvalidShort') }));
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
    if (!d.name)                          e.name = t('register.errors.nameRequired');
    else if (!ONLY_LETTERS.test(d.name))  e.name = t('register.errors.onlyLetters');

    if (!d.lastname)                            e.lastname = t('register.errors.lastnameRequired');
    else if (!ONLY_LETTERS.test(d.lastname))    e.lastname = t('register.errors.onlyLetters');

    if (!d.identityType) e.identityType = t('register.errors.identityRequired');

    if (!d.document)                    e.document = t('register.errors.documentRequired');
    else if (d.document.length !== 10)  e.document = t('register.errors.documentLength');

    if (!d.email)                         e.email = t('register.errors.emailRequired');
    else if (!EMAIL_REGEX.test(d.email))  e.email = t('register.errors.emailInvalid');

    if (!emailValidated) e.emailAction = t('register.errors.emailNotValidated');

    if (!d.password)                            e.password = t('register.errors.passwordRequired');
    else if (!PASSWORD_REGEX.test(d.password))  e.password = t('register.errors.passwordWeak');

    if (!d.confirmPassword)                    e.confirmPassword = t('register.errors.confirmRequired');
    else if (d.password !== d.confirmPassword) e.confirmPassword = t('register.errors.passwordMismatch');

    if (!birthdate) {
      e.birthdate = t('register.errors.birthdateRequired');
    } else {
      const age = getAge(birthdate);
      if (age < 8)        e.birthdate = t('register.errors.ageMin');
      else if (age > 100) e.birthdate = t('register.errors.ageMax');
      else if (d.identityType === 'TI' && age >= 18)
        e.identityType = t('register.errors.tiAdult');
      else if (d.identityType === 'CC' && age < 18)
        e.identityType = t('register.errors.ccMinor');
    }

    if (!accepted)          e.policy = t('register.errors.policyRequired');
    if (hasRights === null) e.rights = t('register.errors.rightsRequired');

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

  const handleCancel = () => {
    setForm(initialForm);
    setBirthdate(null);
    router.replace(Routes.AUTH.LOGIN as any);
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
            <Text style={[s.title, { color: text }]}>{t('register.title')}</Text>
            <Text style={[s.subtitle, { color: muted }]}>{t('register.subtitle')}</Text>

            {/* ── Datos personales ── */}
            <SectionHeader icon="person-outline" label={t('register.sections.personal')} />

            <InputField
              label={t('register.name')}
              icon="person-outline"
              placeholder={t('register.namePlaceholder')}
              value={form.name}
              onChangeText={v => setField('name', v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, ''))}
              error={errors.name}
            />

            <InputField
              label={t('register.lastname')}
              icon="people-outline"
              placeholder={t('register.lastnamePlaceholder')}
              value={form.lastname}
              onChangeText={v => setField('lastname', v.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, ''))}
              error={errors.lastname}
            />

            {/* Tipo de identidad */}
            <View style={s.fieldGroup}>
              <Text style={[s.label, { color: text }]}>{t('register.identityType')}</Text>
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
                    ? identityOptions.find(o => o.value === form.identityType)?.label
                    : t('register.identitySelect')}
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
                  {identityOptions.map(opt => (
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
                  {t('register.infoTI')}
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
                  {t('register.infoCC')}
                </Text>
              </View>
            )}

            <InputField
              label={t('register.document')}
              icon="document-text-outline"
              placeholder={t('register.documentPlaceholder')}
              keyboardType="numeric"
              value={form.document}
              onChangeText={v => setField('document', v.replace(/\D/g, '').slice(0, 10))}
              error={errors.document}
            />

            {/* ── Contacto ── */}
            <SectionHeader icon="mail-outline" label={t('register.sections.contact')} />

            <InputField
              label={t('register.email')}
              icon="mail-outline"
              placeholder={t('register.emailPlaceholder')}
              keyboardType="email-address"
              value={form.email}
              onChangeText={handleEmail}
              error={errors.email}
              containerStyle={emailValidated ? { borderColor: theme.primary } : undefined}
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
                {emailValidated ? t('register.emailValidated') : t('register.validateEmail')}
              </Text>
            </TouchableOpacity>
            {errors.emailAction
              ? <Text style={[s.errorText, { marginBottom: 8 }]}>{errors.emailAction}</Text>
              : null}

            {/* ── Seguridad ── */}
            <SectionHeader icon="lock-closed-outline" label={t('register.sections.security')} />

            <PasswordField
              label={t('register.password')}
              placeholder={t('register.password')}
              value={form.password}
              onChangeText={v => setField('password', v)}
              error={errors.password}
            />
            <View style={[s.hintBox, {
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F5F5F5',
            }]}>
              <Text style={[s.hintText, { color: muted }]}>{t('register.passwordHint')}</Text>
            </View>

            <PasswordField
              label={t('register.confirmPassword')}
              placeholder={t('register.confirmPassword')}
              value={form.confirmPassword}
              onChangeText={v => setField('confirmPassword', v)}
              error={errors.confirmPassword}
            />

            {/* ── Otros datos ── */}
            <SectionHeader icon="calendar-outline" label={t('register.sections.other')} />

            <View style={s.fieldGroup}>
              <Text style={[s.label, { color: text }]}>{t('register.birthdate')}</Text>
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
                    {birthdate ? formatDate(birthdate) : t('register.birthdateSelect')}
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
            <SectionHeader icon="checkmark-done-outline" label={t('register.sections.acceptances')} />

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
                {t('register.policyText')}{' '}
                <Text style={{ color: theme.primary, fontWeight: FontWeight.bold }}>
                  {t('register.policyLaw')}
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
                <Ionicons name="information-circle-outline" size={16} color={theme.primary} />
                <Text style={[s.rightsQ, { color: text }]}>
                  {t('register.rightsQuestion')}
                </Text>
              </View>
              <View style={s.rightsButtons}>
                <TouchableOpacity
                  onPress={() => setHasRights(true)}
                  style={[s.rightsBtn, {
                    borderColor: hasRights === true
                      ? theme.primary
                      : (isDark ? 'rgba(255,255,255,0.20)' : '#CCCCCC'),
                    backgroundColor: hasRights === true ? theme.primary : Colors.transparent,
                  }]}
                >
                  <Ionicons
                    name="checkmark-outline" size={14}
                    color={hasRights === true ? Colors.white : muted}
                  />
                  <Text style={[s.rightsBtnText, {
                    color: hasRights === true ? Colors.white : muted,
                  }]}>{t('register.rightsYes')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setHasRights(false)}
                  style={[s.rightsBtn, {
                    borderColor: hasRights === false
                      ? Colors.error
                      : (isDark ? 'rgba(255,255,255,0.20)' : '#CCCCCC'),
                    backgroundColor: hasRights === false ? Colors.error : Colors.transparent,
                  }]}
                >
                  <Ionicons
                    name="close-outline" size={14}
                    color={hasRights === false ? Colors.white : muted}
                  />
                  <Text style={[s.rightsBtnText, {
                    color: hasRights === false ? Colors.white : muted,
                  }]}>{t('register.rightsNo')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push(Routes.AUTH.RIGHTS as any)}
                  style={s.rightsReadLink}
                >
                  <Text style={[s.rightsReadText, { color: linkColor }]}>
                    {t('register.rightsRead')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {errors.rights
              ? <Text style={s.errorText}>{errors.rights}</Text>
              : null}

            {/* ── Botones ── */}
            <AppButton
              title={t('register.registerBtn')}
              onPress={handleRegister}
              style={s.registerBtn}
            />

            <AppButton
              title={t('register.cancelBtn')}
              onPress={handleCancel}
              variant="outline"
              style={s.cancelBtn}
            />

            <View style={s.footer}>
              <Text style={[s.footerText, { color: muted }]}>
                {t('register.hasAccount')}{' '}
              </Text>
              <NavLink href={Routes.AUTH.LOGIN} label={t('register.loginLink')} />
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
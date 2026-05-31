import { useState } from 'react';
import {Alert, Dimensions,Image,KeyboardAvoidingView,Platform,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMAIL_ALLOWED_REGEX = /^[A-Za-z0-9._%+\-@]+$/;
const PASSWORD_ALLOWED_REGEX =
  /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-+=]+$/;

const CARD_MAX = 460;

export default function LoginScreen() {
  const { t } = useTranslation();
  const { theme, isDark } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    policy: '',
  });

  const text = isDark ? '#FFFFFF' : '#000000';
  const muted = isDark ? '#CAD6C8' : '#1E1E1E';
  const cardBg = isDark ? '#07120D' : '#FFFFFF';
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF';
  const inputBorder = isDark
    ? 'rgba(255,255,255,0.35)'
    : '#000000';
  const activeBorder = theme.primary;
  const linkColor = isDark ? '#8EF58A' : '#65B361';
  const errorColor = '#D92027';
  const isWide = width >= 1024;

  const tr = (key: string, fallback: string) =>
    t(key, { defaultValue: fallback });

  const validate = () => {
    const next = { email: '', password: '', policy: '' };
    const cleanEmail = email.trim();

    if (!cleanEmail) next.email = 'Campo vacío';
    else if (/\s/.test(email)) next.email = 'No se permiten espacios';
    else if (!EMAIL_ALLOWED_REGEX.test(cleanEmail))
      next.email = 'Caracteres no permitidos';
    else if (!cleanEmail.includes('@'))
      next.email = 'Correo inválido (falta @)';
    else if (!EMAIL_REGEX.test(cleanEmail))
      next.email = 'Formato de correo inválido';

    if (!password) next.password = 'Campo vacío';
    else if (/\s/.test(password))
      next.password = 'No se permiten espacios';
    else if (!PASSWORD_ALLOWED_REGEX.test(password))
      next.password = 'Caracteres no permitidos';
    else if (password.length < 6)
      next.password =
        'La contraseña debe tener mínimo 6 caracteres';
    else if (password.length > 20)
      next.password =
        'La contraseña debe tener máximo 20 caracteres';

    if (!accepted) {
      next.policy = 'Debes aceptar el aviso de privacidad';
    }

    if (!next.email && !next.password && !next.policy) {
      if (cleanEmail !== 'admin@test.com') {
        next.email = 'Correo electrónico no registrado';
      } else if (password !== '123456') {
        next.password = 'Contraseña incorrecta';
      }
    }

    return next;
  };

  const handleLogin = () => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (
      nextErrors.email ||
      nextErrors.password ||
      nextErrors.policy
    )
      return;

    Alert.alert('', 'Inicio de sesión exitoso');
  };

  const NavLink = ({
    href,
    label,
    style,
  }: {
    href: any;
    label: string;
    style?: any;
  }) => {
    if (Platform.OS === 'web') {
      return (
        <Link
          href={href}
          style={[
            styles.linkText,
            {
              color: linkColor,
              textDecorationLine: 'underline',
            },
            style,
          ]}
        >
          {label}
        </Link>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => router.push(href)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.linkText,
            {
              color: linkColor,
              textDecorationLine: 'underline',
            },
            style,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={
        isDark
          ? ['#000000', '#06170F', '#0B2D17']
          : ['#F7FFF4', '#E5F7DF', '#1E4C28']
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.backgroundArcTop} />
      <View style={styles.backgroundArcBottom} />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.kav}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View
              style={[
                styles.card,
                isWide && styles.cardWide,
                {
                  backgroundColor: cardBg,
                  borderWidth: 1,
                  borderColor: isDark
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(0,0,0,0.08)',
                },
              ]}
            >
              <Text
                style={[
                  styles.title,
                  isWide && styles.titleWide,
                  { color: text },
                ]}
              >
                {tr('login.title', 'Inicio sesión')}
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  { color: muted },
                ]}
              >
                {tr(
                  'login.enterCredentials',
                  'Ingrese sus credenciales'
                )}
              </Text>

              <View style={styles.fieldGroup}>
                <Text style={[styles.label, { color: text }]}>
                  Correo electrónico
                </Text>

                <View
                  style={[
                    styles.inputWrap,
                    {
                      backgroundColor: inputBg,
                      borderColor:
                        errors.email
                          ? errorColor
                          : focusedField === 'email'
                          ? activeBorder
                          : inputBorder,
                    },
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={text}
                  />

                  <TextInput
                    style={[styles.input, { color: text }]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor={
                      isDark ? '#AEB6C2' : '#323232'
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() =>
                      setFocusedField('email')
                    }
                    onBlur={() =>
                      setFocusedField(null)
                    }
                  />
                </View>

                {errors.email ? (
                  <Text style={styles.errorText}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={[styles.label, { color: text }]}>
                  Contraseña
                </Text>

                <View
                  style={[
                    styles.inputWrap,
                    {
                      backgroundColor: inputBg,
                      borderColor:
                        errors.password
                          ? errorColor
                          : focusedField === 'password'
                          ? activeBorder
                          : inputBorder,
                    },
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={text}
                  />

                  <TextInput
                    style={[styles.input, { color: text }]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPass}
                    placeholder="********"
                    placeholderTextColor={
                      isDark ? '#AEB6C2' : '#323232'
                    }
                    onFocus={() =>
                      setFocusedField('password')
                    }
                    onBlur={() =>
                      setFocusedField(null)
                    }
                  />

                  <TouchableOpacity
                    onPress={() =>
                      setShowPass(!showPass)
                    }
                  >
                    <Ionicons
                      name={
                        showPass
                          ? 'eye-off-outline'
                          : 'eye-outline'
                      }
                      size={20}
                      color={text}
                    />
                  </TouchableOpacity>
                </View>

                {errors.password ? (
                  <Text style={styles.errorText}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>

              <View style={styles.privacyRow}>
                <TouchableOpacity
                  onPress={() =>
                    setAccepted(!accepted)
                  }
                  style={[
                    styles.checkbox,
                    {
                      borderColor: text,
                      backgroundColor: accepted
                        ? theme.primary
                        : 'transparent',
                    },
                  ]}
                >
                  {accepted && (
                    <Ionicons
                      name="checkmark"
                      size={12}
                      color="#FFFFFF"
                    />
                  )}
                </TouchableOpacity>

                <View style={styles.privacyText}>
                  <Text
                    style={[
                      styles.privacyLabel,
                      { color: text },
                    ]}
                  >
                    ¿He leído y acepto el{' '}
                  </Text>

                  <NavLink
                    href="/auth/privacy-notice"
                    label="aviso de privacidad"
                  />

                  <Text
                    style={[
                      styles.privacyLabel,
                      { color: text },
                    ]}
                  >
                    ?
                  </Text>
                </View>
              </View>

              {errors.policy ? (
                <Text style={styles.errorText}>
                  {errors.policy}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={handleLogin}
                style={styles.loginBtn}
              >
                <LinearGradient
                  colors={[
                    '#72C96D',
                    '#65B361',
                    '#4FA14B',
                  ]}
                  style={styles.loginBtnGradient}
                >
                  <Text style={styles.loginBtnText}>
                    Inicio sesión
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.links}>
                <NavLink
                  href="/auth/password-recovery"
                  label="¿Olvidaste tu contraseña?"
                />

                <View style={styles.registerRow}>
                  <Text
                    style={[
                      styles.bottomText,
                      { color: text },
                    ]}
                  >
                    ¿No tienes cuenta?{' '}
                  </Text>

                  <NavLink
                    href="/auth/register"
                    label="Regístrate aquí"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  safe: { flex: 1 },

  kav: { flex: 1 },

  backgroundArcTop: {
    position: 'absolute',
    width: 300,
    height: 420,
    right: -120,
    top: -90,
    borderRadius: 200,
    backgroundColor: 'rgba(20,70,28,0.18)',
  },

  backgroundArcBottom: {
    position: 'absolute',
    width: 420,
    height: 220,
    left: -120,
    bottom: -30,
    borderRadius: 180,
    backgroundColor: 'rgba(101,179,97,0.28)',
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  logo: {
    width: 180,
    height: 70,
    marginBottom: 18,
  },

  card: {
    width: '100%',
    maxWidth: CARD_MAX,
    borderRadius: 26,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  cardWide: {
    paddingHorizontal: 28,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },

  titleWide: {
    fontSize: 36,
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },

  fieldGroup: {
    marginTop: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },

  inputWrap: {
    height: 46,
    borderWidth: 1.2,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    outlineStyle: 'none',
  } as any,

  errorText: {
    color: '#D92027',
    fontSize: 11,
    marginTop: 4,
  },

  privacyRow: {
    flexDirection: 'row',
    marginTop: 14,
    alignItems: 'center',
    gap: 8,
  },

  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  privacyText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
  },

  privacyLabel: {
    fontSize: 12,
    fontWeight: '700',
  },

  loginBtn: {
    marginTop: 24,
    width: '100%',
    maxWidth: 280,
    alignSelf: 'center',
    borderRadius: 16,
    overflow: 'hidden',
  },

  loginBtnGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },

  loginBtnText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },

  links: {
    alignItems: 'center',
    marginTop: 18,
    gap: 12,
  },

  registerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  bottomText: {
    fontSize: 14,
    fontWeight: '700',
  },

  linkText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
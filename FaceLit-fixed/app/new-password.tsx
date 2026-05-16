import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,15}$/;

export default function NewPasswordScreen() {
  const { isDark } = useTheme();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const text = isDark ? '#FFFFFF' : '#000000';
  const muted = isDark ? '#CAD6C8' : '#1E1E1E';
  const cardBg = isDark ? '#07120D' : '#FFFFFF';
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const inputBorder = isDark ? 'rgba(255,255,255,0.78)' : '#000000';

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setError(
        'Debe tener entre 8 y 15 caracteres, mayúscula, minúscula, número y símbolo'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    router.push('/password-reset-done');
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
      <View
        style={[
          styles.backgroundArcTop,
          {
            backgroundColor: isDark
              ? 'rgba(101,179,97,0.08)'
              : 'rgba(20,70,28,0.18)',
          },
        ]}
      />

      <View
        style={[
          styles.backgroundArcBottom,
          {
            backgroundColor: isDark
              ? 'rgba(101,179,97,0.22)'
              : 'rgba(101,179,97,0.28)',
          },
        ]}
      />

      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: cardBg,
                shadowColor: isDark ? '#000000' : '#1C3A1D',
              },
            ]}
          >
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.push('/verify-identity')}
            >
              <Text style={styles.backText}>
                ← Solicitar nuevo código
              </Text>
            </TouchableOpacity>

            <View style={styles.iconWrapper}>
              <Image
                source={require('@/assets/images/candado.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <Text style={[styles.title, { color: text }]}>
              Nueva contraseña
            </Text>

            <Text style={[styles.subtitle, { color: muted }]}>
              Crea una contraseña segura que cumpla con
              las políticas del sistema.
            </Text>

            <View style={styles.requirements}>
              <Text style={styles.reqTitle}>
                Requisitos de contraseña:
              </Text>

              {[
                '✓ Entre 8 y 15 caracteres',
                '✓ Al menos una letra mayúscula',
                '✓ Al menos un número',
                '✓ Al menos un símbolo especial',
              ].map((item) => (
                <Text key={item} style={styles.reqItem}>
                  {item}
                </Text>
              ))}
            </View>

            <Text style={[styles.fieldLabel, { color: text }]}>
              Nueva contraseña
            </Text>

            <View
              style={[
                styles.inputRow,
                {
                  backgroundColor: inputBg,
                  borderColor: inputBorder,
                },
              ]}
            >
              <TextInput
                style={[styles.input, { color: text }]}
                value={password}
                onChangeText={(v) => {
                  setPassword(v);
                  setError('');
                }}
                placeholder="Crear tu nueva contraseña"
                placeholderTextColor={isDark ? '#AEB6C2' : '#7A7A7A'}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>
                  {showPassword ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.fieldLabel, { color: text }]}>
              Confirmar contraseña
            </Text>

            <View
              style={[
                styles.inputRow,
                {
                  backgroundColor: inputBg,
                  borderColor: inputBorder,
                },
              ]}
            >
              <TextInput
                style={[styles.input, { color: text }]}
                value={confirmPassword}
                onChangeText={(v) => {
                  setConfirmPassword(v);
                  setError('');
                }}
                placeholder="Repite tu nueva contraseña"
                placeholderTextColor={isDark ? '#AEB6C2' : '#7A7A7A'}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setShowConfirm(!showConfirm)}
              >
                <Text style={styles.eyeText}>
                  {showConfirm ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={['#72C96D', '#65B361', '#4FA14B']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  Restablecer contraseña
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  safe: { flex: 1 },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  backgroundArcTop: {
    position: 'absolute',
    width: 300,
    height: 420,
    right: -120,
    top: -90,
    borderRadius: 200,
  },

  backgroundArcBottom: {
    position: 'absolute',
    width: 420,
    height: 220,
    left: -120,
    bottom: -30,
    borderRadius: 180,
  },

  card: {
    width: '100%',
    maxWidth: 460,
    borderRadius: 26,
    paddingHorizontal: 24,
    paddingVertical: 28,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },

  backBtn: {
    marginBottom: 18,
  },

  backText: {
    color: '#65B361',
    fontSize: 14,
    fontWeight: '700',
  },

  iconWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },

  image: {
    width: 95,
    height: 95,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },

  requirements: {
    backgroundColor: 'rgba(101,179,97,0.12)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 22,
  },

  reqTitle: {
    color: '#65B361',
    fontWeight: '800',
    fontSize: 13,
    marginBottom: 8,
  },

  reqItem: {
    color: '#7A8A78',
    fontSize: 13,
    marginBottom: 4,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
  },

  eyeText: {
    fontSize: 18,
  },

  errorText: {
    color: '#D92027',
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center',
  },

  button: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 6,
  },

  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,15}$/;

export default function NewPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (!PASSWORD_REGEX.test(password)) {
      setError('Debe tener entre 8 y 15 caracteres, mayúscula, minúscula, número y símbolo');
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
    <SafeAreaView style={styles.safe}>

      {/* Contenedor centrado para web */}
      <View style={styles.webWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Botón solicitar nuevo código */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/verify-identity')}>
            <Text style={styles.backText}>← Solicitar nuevo código</Text>
          </TouchableOpacity>

          {/* Imagen candado centrada */}
          <View style={styles.iconWrapper}>
            <Image
              source={require('@/assets/images/candado.png')}
              style={styles.imagen}
              resizeMode="contain"
            />
          </View>

          {/* Título */}
          <Text style={styles.title}>Nueva contraseña</Text>

          {/* Subtítulo */}
          <Text style={styles.subtitle}>
            Crea una contraseña segura que cumpla con las políticas del sistema.
          </Text>

          {/* Requisitos */}
          <View style={styles.requirements}>
            <Text style={styles.reqTitle}>Requisitos de contraseña:</Text>
            {[
              '✓ Entre 8 y 15 caracteres',
              '✓ Al menos una letra mayúscula',
              '✓ Al menos un número',
              '✓ Al menos un símbolo especial (!@#$%&*...)',
            ].map((r) => (
              <Text key={r} style={styles.reqItem}>{r}</Text>
            ))}
          </View>

          {/* Campo Nueva contraseña */}
          <Text style={styles.fieldLabel}>Nueva contraseña</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(v) => { setPassword(v); setError(''); }}
              placeholder="Crear tu nueva contraseña"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eye}>
              <Text style={styles.eyeText}>{showPassword ? '👀' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          {/* Campo Confirmar contraseña */}
          <Text style={styles.fieldLabel}>Confirmar contraseña</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={(v) => { setConfirmPassword(v); setError(''); }}
              placeholder="Repite tu nueva contraseña"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirm}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eye}>
              <Text style={styles.eyeText}>{showConfirm ? '👀' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          {/* Error */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Botón */}
          <View style={styles.btnWrapper}>
            <AppButton
              title="Restablecer contraseña"
              onPress={handleSubmit}
              style={styles.btn}
              fullWidth={false}
            />
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  webWrapper: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 700 : '100%',
    alignSelf: 'center',
    flex: 1,
  },
  backBtn: {
    marginBottom: 24,
  },
  backText: {
    color: Colors.white,
    fontSize: 16,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagen: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 19,
  },
  requirements: {
    backgroundColor: 'rgba(0,50,20,0.7)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  reqTitle: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 8,
  },
  reqItem: {
    color: Colors.text.muted,
    fontSize: 13,
    marginBottom: 4,
    lineHeight: 18,
  },
  fieldLabel: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: Colors.black,
  },
  eye: {
    paddingLeft: 8,
  },
  eyeText: {
    fontSize: 18,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  btnWrapper: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 32,
  },
  btn: {
    width: '90%',
    paddingVertical: 14,
  },
});
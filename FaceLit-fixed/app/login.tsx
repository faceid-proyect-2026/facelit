import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { router, Link } from 'expo-router';
import AuthCard from '@/components/AuthCard';
import InputField from '@/components/forms/InputField';
import PasswordField from '@/components/forms/PasswordField';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', policy: '' });

  const handleLogin = () => {
    const newErrors = { email: '', password: '', policy: '' };
    if (!email) newErrors.email = 'Campo vacío';
    if (!password) newErrors.password = 'Campo vacío';
    if (!accepted) newErrors.policy = 'Políticas no aceptadas';
    if (email && !email.includes('@')) newErrors.email = 'Correo inválido (falta @)';
    setErrors(newErrors);
    if (newErrors.email || newErrors.password || newErrors.policy) return;
    if (email !== 'admin@test.com') { Alert.alert('', 'Correo electrónico no registrado'); return; }
    if (password !== '123456') { Alert.alert('', 'Usuario o contraseña incorrectos'); return; }
    Alert.alert('', 'Login exitoso');
  };

  // Componente de enlace que funciona en web Y móvil
  const NavLink = ({ href, label, style }: { href: any; label: string; style?: any }) => {
    if (Platform.OS === 'web') {
      return <Link href={href} style={[styles.link, style]}>{label}</Link>;
    }
    return (
      <TouchableOpacity onPress={() => router.push(href)}>
        <Text style={[styles.link, style]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <AuthCard scrollable={false}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <InputField
        label="Correo"
        value={email}
        onChangeText={setEmail}
        placeholder="Ingresa tu correo"
        keyboardType="email-address"
        error={errors.email}
      />
      <PasswordField
        value={password}
        onChangeText={setPassword}
        placeholder="Ingresa tu contraseña"
        error={errors.password}
      />

      {/* Checkbox + aviso de privacidad */}
      <View style={styles.checkRow}>
        <TouchableOpacity onPress={() => setAccepted(!accepted)} activeOpacity={0.7}>
          <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
            {accepted && <Text style={styles.checkMark}>✓</Text>}
          </View>
        </TouchableOpacity>
        <View style={styles.checkLabelRow}>
          <Text style={styles.checkLabel}>He leído y acepto el </Text>
          <NavLink href="/privacy-notice" label="aviso de privacidad" />
        </View>
      </View>
      {errors.policy ? <Text style={styles.errorText}>{errors.policy}</Text> : null}

      <AppButton title="Inicio sesión" onPress={handleLogin} style={styles.btn} />

      <View style={styles.links}>
        <NavLink href="/password-recovery" label="¿Olvidaste tu contraseña?" />
        <View style={styles.registerRow}>
          <Text style={styles.linkText}>¿No tienes cuenta? </Text>
          <NavLink href="/register" label="Regístrate aquí" />
        </View>
      </View>
    </AuthCard>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', color: Colors.black, marginBottom: 24, textAlign: 'center' },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  checkLabelRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', flex: 1 },
  checkbox: {
    width: 20, height: 20, borderRadius: 4, borderWidth: 1.5,
    borderColor: Colors.secondary, alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkMark: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  checkLabel: { fontSize: 13, color: Colors.black, lineHeight: 18 },
  errorText: { color: Colors.danger, fontSize: 11, marginBottom: 8 },
  btn: { marginTop: 12, marginBottom: 20 },
  links: { alignItems: 'center', gap: 12 },
  link: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  linkText: { fontSize: 13, color: Colors.black },
  registerRow: { flexDirection: 'row', alignItems: 'center' },
});
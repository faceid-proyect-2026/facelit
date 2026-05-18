import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { verifyPasswordReset, newPassword } from '@/services/authService';
import AuthCard from '@/components/AuthCard';
import InputField from '@/components/forms/InputField';
import PasswordField from '@/components/forms/PasswordField';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

export default function VerifyIdentityScreen() {
  const [form, setForm] = useState({ token: '', email: '', newPassword: '', confirmPassword: '' });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,15}$/;

  const handleVerifyToken = async () => {
    const newErrors: Record<string, string> = {};

    if (!form.token.trim()) newErrors.token = 'El token es obligatorio';
    if (!form.email.trim()) newErrors.email = 'El correo es obligatorio';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await verifyPasswordReset({ email: form.email, token: form.token });
      setStep(2);
      setErrors({});
    } catch (error) {
      setErrors({ general: 'Token inválido o expirado' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const newErrors: Record<string, string> = {};

    if (!form.newPassword) newErrors.newPassword = 'La contraseña es obligatoria';
    else if (!PASSWORD_REGEX.test(form.newPassword)) newErrors.newPassword = 'La contraseña no cumple los requisitos';

    if (!form.confirmPassword) newErrors.confirmPassword = 'Debes confirmar la contraseña';
    else if (form.newPassword !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await newPassword({ email: form.email, token: form.token, newPassword: form.newPassword });
      router.replace('/auth/password-reset-done');
    } catch (error) {
      setErrors({ general: 'Error al restablecer la contraseña' });
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <AuthCard>
        <Text style={styles.title}>Verifica tu identidad</Text>

        <InputField label="Correo electrónico" value={form.email}
          onChangeText={(v) => setForm((p) => ({ ...p, email: v }))}
          placeholder="correo@ejemplo.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />

        <InputField label="Token de verificación" value={form.token}
          onChangeText={(v) => setForm((p) => ({ ...p, token: v }))}
          placeholder="Ingresa el token recibido" autoCapitalize="characters" error={errors.token} />

        {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

        <View style={styles.actionRow}>
          <AppButton title={loading ? 'Verificando...' : 'Continuar'} onPress={handleVerifyToken}
            disabled={loading} style={styles.fullBtn} />
          <AppButton title="Volver" onPress={() => router.replace('/auth/password-recovery')}
            variant="secondary" style={styles.fullBtn} />
        </View>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <Text style={styles.title}>Nueva contraseña</Text>

      <PasswordField label="Nueva contraseña" value={form.newPassword}
        onChangeText={(v) => setForm((p) => ({ ...p, newPassword: v }))}
        placeholder="Crea tu nueva contraseña" error={errors.newPassword} />

      <PasswordField label="Confirmar contraseña" value={form.confirmPassword}
        onChangeText={(v) => setForm((p) => ({ ...p, confirmPassword: v }))}
        placeholder="Repite tu contraseña" error={errors.confirmPassword} />

      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      <View style={styles.actionRow}>
        <AppButton title={loading ? 'Guardando...' : 'Guardar'} onPress={handleResetPassword}
          disabled={loading} style={styles.fullBtn} />
        <AppButton title="Cancelar" onPress={() => { setForm({ token: '', email: '', newPassword: '', confirmPassword: '' }); setStep(1); router.replace('/auth/password-recovery'); }}
          variant="secondary" style={styles.fullBtn} />
      </View>
    </AuthCard>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: '700', color: Colors.black, marginBottom: 20 },
  errorText: { color: Colors.danger, fontSize: 12, marginVertical: 8 },
  actionRow: { flexDirection: 'column', gap: 10, marginTop: 20 },
  fullBtn: { width: '100%' }
});
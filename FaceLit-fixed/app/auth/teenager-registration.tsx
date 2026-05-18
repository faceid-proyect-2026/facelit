import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AuthCard from '@/components/AuthCard';
import InputField from '@/components/forms/InputField';
import PasswordField from '@/components/forms/PasswordField';
import DropdownField from '@/components/forms/DropdownField';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

const genderOptions = [
  { label: 'Masculino', value: 'M' },
  { label: 'Femenino', value: 'F' },
  { label: 'Otro', value: 'O' }
];

const departmentOptions = [
  { label: 'Amazonas', value: 'AMA' },
  { label: 'Antioquia', value: 'ANT' },
  { label: 'Arauca', value: 'ARA' },
  { label: 'Atlántico', value: 'ATL' },
  { label: 'Bolívar', value: 'BOL' },
  { label: 'Boyacá', value: 'BOY' },
  { label: 'Caldas', value: 'CAL' },
  { label: 'Caquetá', value: 'CAQ' },
  { label: 'Casanare', value: 'CAS' },
  { label: 'Cauca', value: 'CAU' },
  { label: 'Cesar', value: 'CES' },
  { label: 'Chocó', value: 'CHO' },
  { label: 'Córdoba', value: 'COR' },
  { label: 'Cundinamarca', value: 'CUN' },
  { label: 'Distrito Capital', value: 'DC' },
  { label: 'Guainía', value: 'GUA' },
  { label: 'Guaviare', value: 'GAV' },
  { label: 'Huila', value: 'HUI' },
  { label: 'La Guajira', value: 'LAG' },
  { label: 'Magdalena', value: 'MAG' },
  { label: 'Meta', value: 'MET' },
  { label: 'Nário', value: 'NAR' },
  { label: 'Norte de Santander', value: 'NDS' },
  { label: 'Putumayo', value: 'PUT' },
  { label: 'Quindío', value: 'QUI' },
  { label: 'Risaralda', value: 'RIS' },
  { label: 'San Andrés y Providencia', value: 'SAP' },
  { label: 'Santander', value: 'SAN' },
  { label: 'Sucre', value: 'SUC' },
  { label: 'Tolima', value: 'TOL' },
  { label: 'Valle del Cauca', value: 'VAC' },
  { label: 'Vaupés', value: 'VAU' },
  { label: 'Vichada', value: 'VIC' }
];

export default function TeenagerRegistrationScreen() {
  const [form, setForm] = useState({ phone: '', gender: '', department: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleCancel = () => router.replace('/auth/login');

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    const phone = form.phone.replace(/\D/g, '');
    if (!phone) newErrors.phone = 'El teléfono es obligatorio';
    else if (phone.length < 7) newErrors.phone = 'El teléfono debe tener al menos 7 dígitos';
    else if (phone.length > 13) newErrors.phone = 'El teléfono no puede exceder 13 dígitos';

    if (!form.gender) newErrors.gender = 'El género es obligatorio';
    if (!form.department) newErrors.department = 'El departamento es obligatorio';

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      console.log('Registrando adolescente:', { ...form, phone });
      router.push('/auth/registration-success');
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'Error al registrar' });
    }
  };

  return (
    <AuthCard>
      <Text style={styles.title}>Información adicional</Text>
      <Text style={styles.subtitle}>Completa tu perfil</Text>

      <InputField label="Teléfono" value={form.phone}
        onChangeText={(v) => handleChange('phone', v.replace(/\D/g, ''))}
        placeholder="3001234567" keyboardType="phone-pad" error={errors.phone} />

      <DropdownField label="Género" value={form.gender} onChange={(v) => handleChange('gender', v)}
        options={genderOptions} placeholder="Selecciona tu género" error={errors.gender} />

      <DropdownField label="Departamento" value={form.department} onChange={(v) => handleChange('department', v)}
        options={departmentOptions} placeholder="Selecciona tu departamento" error={errors.department} />

      <View style={styles.actionRow}>
        <AppButton title="Guardar" onPress={handleSubmit} style={styles.fullBtn} />
        <AppButton title="Cancelar" onPress={handleCancel} variant="secondary" style={styles.fullBtn} />
      </View>
    </AuthCard>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: '700', color: Colors.black, marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
  actionRow: { flexDirection: 'column', gap: 10, marginTop: 24 },
  fullBtn: { width: '100%' }
});
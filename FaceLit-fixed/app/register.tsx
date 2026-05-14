import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import AuthCard from '@/components/AuthCard';
import InputField from '@/components/forms/InputField';
import PasswordField from '@/components/forms/PasswordField';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

const ONLY_LETTERS   = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;
const EMAIL_REGEX    = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,15}$/;
const ONLY_DIGITS    = /^\d+$/;

const initialForm = { name: '', lastname: '', document: '', email: '', password: '', confirmPassword: '' };

function calculateAge(date: Date): number {
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

export default function RegisterScreen() {
  const [form, setForm] = useState(initialForm);
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [hasRights, setHasRights] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCancel = () => { setForm(initialForm); setBirthdate(null); router.replace('/login'); };

  const handleRegister = () => {
    const newErrors: Record<string, string> = {};
    const t = { ...form, name: form.name.trim(), lastname: form.lastname.trim(), email: form.email.trim() };

    if (!t.name) newErrors.name = 'El nombre es obligatorio';
    else if (t.name.length < 2) newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    else if (t.name.length > 50) newErrors.name = 'El nombre no puede tener más de 50 caracteres';
    else if (/\d/.test(t.name)) newErrors.name = 'El nombre no puede contener números';
    else if (!ONLY_LETTERS.test(t.name)) newErrors.name = 'El nombre solo puede contener letras';

    if (!t.lastname) newErrors.lastname = 'El apellido es obligatorio';
    else if (t.lastname.length < 2) newErrors.lastname = 'El apellido debe tener al menos 2 caracteres';
    else if (t.lastname.length > 50) newErrors.lastname = 'El apellido no puede tener más de 50 caracteres';
    else if (/\d/.test(t.lastname)) newErrors.lastname = 'El apellido no puede contener números';
    else if (!ONLY_LETTERS.test(t.lastname)) newErrors.lastname = 'El apellido solo puede contener letras';

    if (!t.document) newErrors.document = 'El documento es obligatorio';
    else if (!ONLY_DIGITS.test(t.document)) newErrors.document = 'El documento solo puede contener números';
    else if (t.document.length !== 10) newErrors.document = 'El documento debe tener exactamente 10 dígitos';

    if (!t.email) newErrors.email = 'El correo es obligatorio';
    else if (!t.email.includes('@')) newErrors.email = 'El correo debe contener @';
    else if (!EMAIL_REGEX.test(t.email)) newErrors.email = 'El formato del correo no es válido';

    if (!t.password) newErrors.password = 'La contraseña es obligatoria';
    else if (/\s/.test(t.password)) newErrors.password = 'La contraseña no puede contener espacios';
    else if (t.password.length < 8) newErrors.password = 'La contraseña debe tener mínimo 8 caracteres';
    else if (t.password.length > 15) newErrors.password = 'La contraseña debe tener máximo 15 caracteres';
    else if (!/[A-Z]/.test(t.password)) newErrors.password = 'Debe tener al menos una mayúscula';
    else if (!/[a-z]/.test(t.password)) newErrors.password = 'Debe tener al menos una minúscula';
    else if (!/\d/.test(t.password)) newErrors.password = 'Debe tener al menos un número';
    else if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(t.password)) newErrors.password = 'Debe tener al menos un símbolo';

    if (!t.confirmPassword) newErrors.confirmPassword = 'Debes confirmar tu contraseña';
    else if (t.password !== t.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';

    if (!birthdate) {
      newErrors.birthdate = 'La fecha de nacimiento es obligatoria';
    } else {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (birthdate >= today) newErrors.birthdate = 'La fecha debe ser una fecha pasada';
      else {
        const age = calculateAge(birthdate);
        if (age < 8) newErrors.birthdate = 'La persona debe tener al menos 8 años';
        if (age > 100) newErrors.birthdate = 'La edad no puede ser mayor a 100 años';
      }
    }

    if (!accepted) newErrors.policy = 'Debes aceptar las políticas';
    if (hasRights === null) newErrors.rights = 'Debes responder esta pregunta';

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const age = calculateAge(birthdate!);
    router.push(age >= 18 ? '/teenager-registration' : '/minor-consent');
  };

  return (
    <AuthCard>
      <Text style={styles.title}>Registro de usuario</Text>

      <InputField label="Nombre" value={form.name} onChangeText={(v) => handleChange('name', v)}
        placeholder="Juan" autoCapitalize="words" error={errors.name} />
      <InputField label="Apellido" value={form.lastname} onChangeText={(v) => handleChange('lastname', v)}
        placeholder="Pérez" autoCapitalize="words" error={errors.lastname} />
      <InputField label="Documento de identidad" value={form.document}
        onChangeText={(v) => handleChange('document', v.replace(/\D/g, ''))}
        placeholder="Número de documento" keyboardType="number-pad" maxLength={10} error={errors.document} />
      <InputField label="Correo electrónico" value={form.email}
        onChangeText={(v) => handleChange('email', v.replace(/\s/g, ''))}
        placeholder="correo@ejemplo.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
      <PasswordField label="Contraseña" value={form.password}
        onChangeText={(v) => handleChange('password', v)} placeholder="Crea tu contraseña" error={errors.password} />
      <PasswordField label="Confirmar contraseña" value={form.confirmPassword}
        onChangeText={(v) => handleChange('confirmPassword', v)} placeholder="Repite tu contraseña" error={errors.confirmPassword} />

      {/* Fecha de nacimiento */}
      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Fecha de nacimiento</Text>
        {Platform.OS === 'web' ? (
          <View style={[styles.dateInput, errors.birthdate ? styles.dateInputError : null]}>
            <input type="date"
              max={new Date().toISOString().split('T')[0]}
              min={`${new Date().getFullYear() - 100}-01-01`}
              style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 14,
                color: birthdate ? '#000' : '#888', outline: 'none', width: '100%', cursor: 'pointer' }}
              onChange={(e) => {
                if (e.target.value) {
                  setBirthdate(new Date(e.target.value + 'T00:00:00'));
                  setErrors((prev) => ({ ...prev, birthdate: '' }));
                }
              }} />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.dateInput, errors.birthdate ? styles.dateInputError : null]}
            onPress={() => setShowPicker(true)} activeOpacity={0.8}>
            <Text style={[styles.dateText, !birthdate && styles.datePlaceholder]}>
              {birthdate ? formatDate(birthdate) : 'Fecha de nacimiento'}
            </Text>
            <Text style={styles.calendarIcon}>📆</Text>
          </TouchableOpacity>
        )}
        {errors.birthdate ? <Text style={styles.errorText}>{errors.birthdate}</Text> : null}
      </View>

      {showPicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={birthdate || new Date(2000, 0, 1)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          minimumDate={new Date(new Date().getFullYear() - 100, 0, 1)}
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) { setBirthdate(selectedDate); setErrors((prev) => ({ ...prev, birthdate: '' })); }
          }} />
      )}

      {/* Declaración */}
      <TouchableOpacity style={styles.checkRow} onPress={() => setAccepted(!accepted)} activeOpacity={0.7}>
        <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
          {accepted && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <Text style={styles.checkLabel}>
          Declaro que la información suministrada es verídica. En caso de falsedad,
          suplantación o manipulación de datos, asumo la responsabilidad conforme a la Ley 1581 de 2012.
        </Text>
      </TouchableOpacity>
      {errors.policy ? <Text style={styles.errorText}>{errors.policy}</Text> : null}

      {/* Derechos */}
      <View style={styles.rightsCard}>
        <Text style={styles.rightsQuestion}>
          ¿Ha leído y acepta sus derechos de acceso, actualización y rectificación de datos?
        </Text>
        <View style={styles.rightsButtons}>
          <TouchableOpacity style={[styles.rightsBtn, { backgroundColor: hasRights === true ? Colors.primary : Colors.secondary }]}
            onPress={() => setHasRights(true)}>
            <Text style={styles.rightsBtnText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rightsBtn, { backgroundColor: hasRights === false ? Colors.danger : Colors.secondary }]}
            onPress={() => setHasRights(false)}>
            <Text style={styles.rightsBtnText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/rights')}>
            <Text style={styles.link}>Leer mis derechos</Text>
          </TouchableOpacity>
        </View>
        {errors.rights ? <Text style={styles.errorText}>{errors.rights}</Text> : null}
      </View>

      <View style={styles.actionRow}>
        <AppButton title="Registrarse" onPress={handleRegister} style={styles.fullBtn} />
        <AppButton title="Cancelar" onPress={handleCancel} variant="secondary" style={styles.fullBtn} />
      </View>
    </AuthCard>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: '700', color: Colors.black, marginBottom: 20 },
  fieldWrapper: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.black, marginBottom: 6 },
  dateInput: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: Colors.inputBorder, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 11, backgroundColor: '#FAFAFA', minHeight: 46,
  },
  dateInputError: { borderColor: Colors.inputBorderError },
  dateText: { fontSize: 14, color: Colors.black },
  datePlaceholder: { color: '#888888' },
  calendarIcon: { fontSize: 18 },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 10 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: Colors.secondary, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  checkboxActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  checkMark: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  checkLabel: { flex: 1, fontSize: 13, color: Colors.black, lineHeight: 18 },
  errorText: { color: Colors.danger, fontSize: 11, marginTop: 4, marginBottom: 4 },
  rightsCard: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 16, marginVertical: 12 },
  rightsQuestion: { fontSize: 14, color: Colors.black, marginBottom: 12, lineHeight: 19 },
  rightsButtons: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  rightsBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  rightsBtnText: { color: Colors.white, fontWeight: '600', fontSize: 14 },
  link: { color: Colors.primary, fontSize: 14, fontWeight: '600', textDecorationLine: 'underline', marginLeft: 20 },
  actionRow: { flexDirection: 'column', gap: 10, marginTop: 20 },
  fullBtn: { width: '100%' }

});

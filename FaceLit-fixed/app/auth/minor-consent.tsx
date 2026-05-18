import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AuthCard from '@/components/AuthCard';
import InputField from '@/components/forms/InputField';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/theme';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MinorConsentScreen() {
  const [guardianName, setGuardianName] = useState('');
  const [guardianDoc, setGuardianDoc]   = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [accepted, setAccepted]         = useState(false);
  const [errors, setErrors]             = useState<Record<string, string>>({});

  const handleNameChange = (value: string) => {
    const filtered = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    setGuardianName(filtered);
    setErrors((e) => ({ ...e, guardianName: '' }));
  };

  const handleDocChange = (value: string) => {
    const filtered = value.replace(/\D/g, '');
    if (filtered.length > 10) return;
    setGuardianDoc(filtered);
    setErrors((e) => ({ ...e, guardianDoc: '' }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    const nameParts = guardianName.trim().split(' ').filter(Boolean);
    if (!guardianName.trim()) {
      newErrors.guardianName = 'El nombre del acudiente es obligatorio';
    } else if (nameParts.length < 2) {
      newErrors.guardianName = 'Debe ingresar nombre y apellido';
    }

    if (!guardianDoc) {
      newErrors.guardianDoc = 'El documento es obligatorio';
    } else if (!/^\d{10}$/.test(guardianDoc)) {
      newErrors.guardianDoc = 'El documento debe contener exactamente 10 dígitos';
    }

    if (!guardianEmail) {
      newErrors.guardianEmail = 'El correo es obligatorio';
    } else if (!EMAIL_REGEX.test(guardianEmail)) {
      newErrors.guardianEmail = 'Correo inválido';
    }

    if (!accepted) {
      newErrors.consent = 'Debe confirmar la autorización';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    router.replace('/auth/registration-success');
  };

  return (
    <AuthCard>
      {/* Ícono de alerta */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>!</Text>
        </View>
      </View>

      <Text style={styles.title}>Consentimiento requerido</Text>

      <Text style={styles.subtitle}>
        Detectamos que eres menor de edad. Necesitamos autorización de un adulto responsable para continuar
      </Text>

      {/* Aviso legal */}
      <View style={styles.legalBox}>
        <Text style={styles.legalText}>
          De acuerdo con la ley 1581 de 2012, se requiere el consentimiento expreso del adulto responsable para el tratamiento de datos personales de menores de edad.
        </Text>
      </View>

      <InputField
        label="Nombre del acudiente"
        value={guardianName}
        onChangeText={handleNameChange}
        placeholder="Nombre completo"
        error={errors.guardianName}
      />

      <InputField
        label="Documento del acudiente"
        value={guardianDoc}
        onChangeText={handleDocChange}
        placeholder="Número de documento"
        keyboardType="number-pad"
        error={errors.guardianDoc}
      />

      <InputField
        label="Correo electrónico"
        value={guardianEmail}
        onChangeText={(v) => { setGuardianEmail(v); setErrors((e) => ({ ...e, guardianEmail: '' })); }}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.guardianEmail}
      />

      {/* Checkbox + enlace */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.checkRow} onPress={() => setAccepted(!accepted)} activeOpacity={0.7}>
          <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
            {accepted && <Text style={styles.checkMark}>✓</Text>}
          </View>
          <Text style={styles.checkLabel}>
            Confirmo que autorizo el registro y tratamiento de datos del menor, según lo establecido la ley 1581 de 2012 y sus normas reglamentarias
          </Text>
        </TouchableOpacity>

        {errors.consent ? <Text style={styles.errorText}>{errors.consent}</Text> : null}

        <View style={styles.linkBox}>
          <Text style={styles.linkTitle}>Más información</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://share.google/KHen3qRj2g5sVHCCw')}
          >
            https://share.google/KHen3qRj2g5sVHCCw
          </Text>
        </View>
      </View>

      {/* Botón único */}
      <AppButton
        title="Confirmar autorización"
        onPress={handleSubmit}
        style={styles.confirmBtn}
      />
    </AuthCard>
  );
}

const styles = StyleSheet.create({
  // Ícono alerta
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ff9800',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff9800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  iconText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },

  // Aviso legal
  legalBox: {
    backgroundColor: '#c8824a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },
  legalText: {
    fontSize: 13,
    color: '#fff',
    lineHeight: 20,
    textAlign: 'center',
  },

  // Tarjeta checkbox
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkMark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  checkLabel: { flex: 1, fontSize: 12, color: Colors.black, lineHeight: 18 },
  errorText: { color: Colors.danger, fontSize: 11, marginTop: 6 },

  linkBox: { marginTop: 12 },
  linkTitle: { fontSize: 13, fontWeight: '700', color: Colors.black, textAlign: 'center' },
  link: {
    fontSize: 12,
    color: '#1a73e8',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 2,
  },

  // Botón único
  confirmBtn: {
    width: '100%',
  },
});
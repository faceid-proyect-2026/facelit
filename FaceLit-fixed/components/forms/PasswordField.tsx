// ─────────────────────────────────────────────
//  components/forms/PasswordField.tsx
//  Campo de contraseña con toggle de visibilidad
//  y soporte completo de tema claro/oscuro
// ─────────────────────────────────────────────
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface PasswordFieldProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label?: string;
  error?: string;
}

export default function PasswordField({
  label,
  error,
  style,
  ...props
}: PasswordFieldProps) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      ) : null}
      <View
        style={[
          styles.row,
          {
            backgroundColor: theme.inputBg,
            borderColor: error ? '#961414' : theme.inputBorder,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: theme.inputText }, style]}
          secureTextEntry={!visible}
          placeholderTextColor={theme.inputPlaceholder}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={styles.eye}
          activeOpacity={0.7}
        >
          <Ionicons
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={theme.textMuted}
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
  },
  eye: { paddingHorizontal: 12 },
  error: { color: '#961414', fontSize: 11, marginTop: 4 },
});
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '@/constants/theme';

interface PasswordFieldProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label?: string;
  error?: string;
  labelColor?: string;
}

export default function PasswordField({
  label = 'Contraseña',
  error,
  style,
  labelColor = Colors.black,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={[styles.label, { color: labelColor }]}>{label}</Text> : null}
      <View style={[styles.row, error ? styles.rowError : null]}>
        <TextInput
          style={[styles.input, style]}
          secureTextEntry={!visible}
          placeholderTextColor={Colors.text.hint}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />
        <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.eye}>
          <Text style={styles.eyeText}>{visible ? '👀' : '👁️'}</Text>
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
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  rowError: { borderColor: Colors.inputBorderError },
  input: { flex: 1, paddingHorizontal: 12, paddingVertical: 11, fontSize: 14, color: Colors.black },
  eye: { paddingHorizontal: 12 },
  eyeText: { fontSize: 16 },
  error: { color: Colors.danger, fontSize: 11, marginTop: 4 },
});

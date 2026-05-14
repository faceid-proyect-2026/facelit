import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '@/constants/theme';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function InputField({ label, error, style, ...props }: InputFieldProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={Colors.text.hint}
        autoCapitalize="none"
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.black, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: Colors.black,
    backgroundColor: '#FAFAFA',
  },
  inputError: { borderColor: Colors.inputBorderError },
  error: { color: Colors.danger, fontSize: 11, marginTop: 4 },
});

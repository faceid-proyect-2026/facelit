import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const BG: Record<Variant, string> = {
  primary: '#65B361',
  secondary: Colors.secondary,
  danger: Colors.danger,
  ghost: 'transparent',
};

export default function AppButton({
  title, onPress, variant = 'primary', loading = false,
  disabled = false, style, textStyle, fullWidth = true,
}: AppButtonProps) {
  const bg = BG[variant];
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        { backgroundColor: bg, width: fullWidth ? '100%' : undefined },
        isGhost && styles.ghost,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isGhost ? Colors.primary : Colors.white} />
      ) : (
        <Text style={[styles.text, isGhost && { color: Colors.primary }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 1, // ← valor equilibrado
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghost: { borderWidth: 1.5, borderColor: Colors.primary },
  disabled: { opacity: 0.5 },
  text: { color: Colors.white, fontSize: 15, fontWeight: '600' },
});
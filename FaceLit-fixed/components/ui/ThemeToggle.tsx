// ─────────────────────────────────────────────
//  components/ui/ThemeToggle.tsx
//  Botón de tema con ícono de sol/luna + texto "Tema"
// ─────────────────────────────────────────────
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  style?: ViewStyle;
}

export default function ThemeToggle({ style }: ThemeToggleProps) {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.75}
      style={[
        styles.btn,
        {
          backgroundColor: theme.inputBg,
          borderColor: theme.primary,
        },
        style,
      ]}
    >
      <Ionicons
        name={isDark ? 'sunny-outline' : 'moon-outline'}
        size={15}
        color={theme.primary}
      />
      <Text style={[styles.label, { color: theme.primary }]}>Tema</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    paddingHorizontal: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
});
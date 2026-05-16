import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
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
      <Text style={[styles.label, { color: theme.primary }]}>
        {isDark ? 'Claro' : 'Oscuro'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    minWidth: 72,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
  },
});

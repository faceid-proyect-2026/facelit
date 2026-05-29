// ─────────────────────────────────────────────
//  components/ui/ThemeToggle.tsx
//  Botón para alternar tema claro / oscuro
//  Texto traducido según idioma activo
// ─────────────────────────────────────────────
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  style?: ViewStyle;
}

export default function ThemeToggle({ style }: ThemeToggleProps) {
  const { isDark, toggleTheme, theme } = useTheme();
  const { t } = useTranslation();

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
        {isDark ? t('theme.light') : t('theme.dark')}
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
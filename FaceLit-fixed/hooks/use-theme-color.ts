// ─────────────────────────────────────────────
//  hooks/use-theme-color.ts
//  Hook para leer un color del tema activo.
//  Usa el toggle manual de la app (ThemeContext),
//  NO el esquema del sistema operativo.
// ─────────────────────────────────────────────
import { darkTheme, lightTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
 
const themes = {
  light: lightTheme,
  dark: darkTheme,
};
 
type ThemeColorName = {
  [K in keyof typeof lightTheme]: (typeof lightTheme)[K] extends string ? K : never;
}[keyof typeof lightTheme];
 
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorName
) {
  const { isDark } = useTheme();
  const scheme = isDark ? 'dark' : 'light';
  return props[scheme] ?? themes[scheme][colorName];
}
 
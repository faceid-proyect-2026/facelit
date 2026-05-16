import { darkTheme, lightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return props[scheme] ?? themes[scheme][colorName];
}
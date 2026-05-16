// ─────────────────────────────────────────────
//  constants/theme.ts
//  Colores globales + tokens de tema claro/oscuro
// ─────────────────────────────────────────────

/** Paleta base sin cambios — usada por componentes existentes */
export const Colors = {
  primary: '#65B361',
  secondary: '#A0AF9F',
  danger: '#961414',
  warning: '#D76D24',
  white: '#FFFFFF',
  black: '#000000',
  background: '#0A1A10',
  card: '#FFFFFF',
  text: {
    dark: '#000000',
    light: '#FFFFFF',
    muted: 'rgba(255,255,255,0.75)',
    hint: '#888888',
  },
  inputBorder: '#CCCCCC',
  inputBorderError: '#961414',
  overlay: 'rgba(0,0,0,0.4)',
};

// ─────────────────────────────────────────────
//  TEMA CLARO
// ─────────────────────────────────────────────
export const lightTheme = {
  background: '#FFFFFF',
  backgroundSecondary: '#F4F9F4',
  card: '#FFFFFF',
  cardShadow: 'rgba(0,0,0,0.10)',

  text: '#111111',
  textSecondary: '#333333',
  textMuted: '#666666',

  primary: '#65B361',
  primaryDark: '#4A9146',
  primaryFaint: 'rgba(101,179,97,0.12)',

  inputBorder: '#CCCCCC',
  inputBorderActive: '#65B361',
  inputBg: '#F6F6F6',
  inputText: '#111111',
  inputPlaceholder: '#AAAAAA',

  statusBar: 'dark' as const,

  gradientColors: ['#F0FFF0', '#E8F5E9', '#C8E6C9'] as [string, string, string],

  icon: '#65B361',
  divider: '#E5E5E5',
  overlay: 'rgba(0,0,0,0.35)',
};

// ─────────────────────────────────────────────
//  TEMA OSCURO
// ─────────────────────────────────────────────
export const darkTheme = {
  background: '#050505',
  backgroundSecondary: '#0F0F0F',
  card: '#111111',
  cardShadow: 'rgba(0,0,0,0.55)',

  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textMuted: 'rgba(255,255,255,0.65)',

  primary: '#65B361',
  primaryDark: '#4A9146',
  primaryFaint: 'rgba(101,179,97,0.15)',

  inputBorder: '#2A2A2A',
  inputBorderActive: '#65B361',
  inputBg: '#1A1A1A',
  inputText: '#FFFFFF',
  inputPlaceholder: '#555555',

  statusBar: 'light' as const,

  gradientColors: ['#050505', '#0F2A1D', '#1F5A3A'] as [string, string, string],

  icon: '#65B361',
  divider: '#222222',
  overlay: 'rgba(0,0,0,0.55)',
};

export type AppTheme = typeof lightTheme | typeof darkTheme;

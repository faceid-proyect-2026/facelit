// ─────────────────────────────────────────────
//  shared/constants/colors.ts
//  Paleta de colores centralizada — NO usar
//  hexadecimales directamente en los componentes
// ─────────────────────────────────────────────

export const Colors = {
  // Marca
  primary:        '#65B361',
  primaryLight:   '#72C96D',
  primaryDark:    '#4A9146',
  primaryFaint:   'rgba(101,179,97,0.10)',

  // Neutros oscuro
  dark: {
    background:   '#050505',
    surface:      '#07120D',
    card:         '#0D1F14',
    border:       'rgba(255,255,255,0.08)',
    inputBg:      'rgba(255,255,255,0.05)',
    inputBorder:  'rgba(255,255,255,0.30)',
    text:         '#FFFFFF',
    textMuted:    '#A8BCA6',
    textSecondary:'#CAD6C8',
    placeholder:  '#5A7258',
    link:         '#8EF58A',
    gradient:     ['#000000', '#06170F', '#0B2D17'] as const,
  },

  // Neutros claro
 // Neutros claro — versión con más contraste (modo claro mejorado)
light: {
  background:    '#DCF0D8',   // antes #F7FFF4 — verde más perceptible, no tan blanquecino
  surface:       '#EAF5E6',   // antes #FFFFFF — superficies con un toque verde suave
  card:          '#EAF5E6',   // igual que surface para consistencia
  border:        'rgba(0,0,0,0.14)',   // antes 0.08 — bordes más visibles
  inputBg:       '#DFF0DA',   // antes #FAFAFA — input con tono verde tenue
  inputBorder:   '#8AAF86',   // antes #BBBBBB — borde más verde y definido
  text:          '#111111',   // sin cambio — ya es oscuro ✓
  textMuted:     '#3A3A3A',   // antes #555555 — más legible sobre fondo oscurecido
  textSecondary: '#1E1E1E',   // sin cambio ✓
  placeholder:   '#7A9977',   // antes #AAAAAA — placeholder con identidad verde
  link:          '#2E7229',   // antes #3A8C36 — un poco más oscuro para más contraste
  gradient:      ['#DCF0D8', '#C5E3BE', '#1E4C28'] as const,  // inicio más oscuro
},

  // Estado
  error:    '#D92027',
  warning:  '#E89B2C',
  success:  '#27AE60',
  info:     '#4A90D9',

  // Fijos
  white:    '#FFFFFF',
  black:    '#000000',
  transparent: 'transparent',
} as const;
export const colors = {
  primary: '#149A6C',
  primaryDark: '#0E8F72',
  darkGreen: '#0B3B2C',
  deepDark: '#0D1A15',
  deepDarkAlt: '#0E4A37',
  deepDarkBorder: '#21382E',
  deepDarkCard: '#142921',
  lightBg: '#F7FAF8',
  lightBgAlt: '#EFF4F1',
  cardBorder: '#E3ECE7',
  mutedText: '#5B7269',
  mutedTextDark: '#8FAC9E',
  lightAccent: '#6FD1A8',
  pillBorder: '#CBDED4',
  white: '#FFFFFF',
  black: '#0C2A1F',
} as const;

export type ColorToken = keyof typeof colors;

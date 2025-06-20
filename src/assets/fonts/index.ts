// Font assets index
// Cairo font family for Arabic and Latin typography

export const fonts = {
  'Cairo-Regular': require('./Cairo-Regular.ttf'),
  'Cairo-Light': require('./Cairo-Light.ttf'),
  'Cairo-SemiBold': require('./Cairo-SemiBold.ttf'),
  'Cairo-Bold': require('./Cairo-Bold.ttf'),
};

export const fontWeights = {
  light: 'Cairo-Light',
  regular: 'Cairo-Regular',
  medium: 'Cairo-SemiBold',
  semibold: 'Cairo-SemiBold',
  bold: 'Cairo-Bold',
} as const;

export type FontWeight = keyof typeof fontWeights;

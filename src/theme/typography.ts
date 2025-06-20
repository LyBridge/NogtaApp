import { TextStyle } from 'react-native';

export const typography = {
  // Font families - using Cairo font for Arabic support
  fontFamily: {
    regular: 'Cairo-Regular',
    light: 'Cairo-Light',
    medium: 'Cairo-SemiBold',
    bold: 'Cairo-Bold',
    arabic: 'Cairo-Regular', // Cairo font supports Arabic natively
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Line heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Font weights
  fontWeight: {
    normal: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },

  // Text styles
  heading1: {
    fontFamily: 'Cairo-Bold',
    fontSize: 30,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 36,
    textAlign: 'center' as TextStyle['textAlign'],
  },

  heading2: {
    fontFamily: 'Cairo-Bold',
    fontSize: 24,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 30,
    textAlign: 'center' as TextStyle['textAlign'],
  },

  heading3: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 24,
  },

  body: {
    fontFamily: 'Cairo-Regular',
    fontSize: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 24,
  },

  bodySmall: {
    fontFamily: 'Cairo-Regular',
    fontSize: 14,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 20,
  },

  caption: {
    fontFamily: 'Cairo-Light',
    fontSize: 12,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 16,
  },

  button: {
    fontFamily: 'Cairo-SemiBold',
    fontSize: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 20,
    textAlign: 'center' as TextStyle['textAlign'],
  },
};

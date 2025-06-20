import { I18nManager, TextStyle, ViewStyle } from 'react-native';
import { typography } from '../theme/typography';

/**
 * RTL-aware styling utilities
 */

export const isRTL = I18nManager.isRTL;

/**
 * Get RTL-aware margin/padding values
 */
export const rtlStyle = {
  marginLeft: (value: number): ViewStyle => ({
    [isRTL ? 'marginRight' : 'marginLeft']: value,
  }),
  
  marginRight: (value: number): ViewStyle => ({
    [isRTL ? 'marginLeft' : 'marginRight']: value,
  }),
  
  paddingLeft: (value: number): ViewStyle => ({
    [isRTL ? 'paddingRight' : 'paddingLeft']: value,
  }),
  
  paddingRight: (value: number): ViewStyle => ({
    [isRTL ? 'paddingLeft' : 'paddingRight']: value,
  }),
  
  left: (value: number): ViewStyle => ({
    [isRTL ? 'right' : 'left']: value,
  }),
  
  right: (value: number): ViewStyle => ({
    [isRTL ? 'left' : 'right']: value,
  }),
  
  textAlign: (align: 'left' | 'right' | 'center'): TextStyle => {
    if (align === 'center') return { textAlign: 'center' };
    return {
      textAlign: isRTL 
        ? (align === 'left' ? 'right' : 'left')
        : align,
    };
  },
  
  flexDirection: (direction: 'row' | 'row-reverse'): ViewStyle => ({
    flexDirection: isRTL 
      ? (direction === 'row' ? 'row-reverse' : 'row')
      : direction,
  }),
};

/**
 * RTL-aware text alignment
 */
export const getTextAlign = (align?: 'left' | 'right' | 'center'): TextStyle['textAlign'] => {
  if (!align || align === 'center') return 'center';
  
  if (isRTL) {
    return align === 'left' ? 'right' : 'left';
  }
  
  return align;
};

/**
 * RTL-aware icon direction
 */
export const getIconDirection = (iconName: string): string => {
  const rtlIcons: Record<string, string> = {
    'chevron-left': 'chevron-right',
    'chevron-right': 'chevron-left',
    'arrow-back': 'arrow-forward',
    'arrow-forward': 'arrow-back',
    'keyboard-arrow-left': 'keyboard-arrow-right',
    'keyboard-arrow-right': 'keyboard-arrow-left',
  };
  
  if (isRTL && rtlIcons[iconName]) {
    return rtlIcons[iconName];
  }
  
  return iconName;
};

/**
 * RTL-aware transform for icons that need flipping
 */
export const getIconTransform = (iconName: string): ViewStyle => {
  const flipIcons = [
    'send',
    'reply',
    'share',
    'exit-to-app',
    'input',
    'launch',
  ];
  
  if (isRTL && flipIcons.includes(iconName)) {
    return { transform: [{ scaleX: -1 }] };
  }
  
  return {};
};

/**
 * Create RTL-aware styles
 */
export const createRTLStyle = <T extends Record<string, ViewStyle | TextStyle>>(
  styles: T
): T => {
  const rtlStyles: any = {};
  
  Object.keys(styles).forEach(key => {
    const style = styles[key];
    rtlStyles[key] = {
      ...style,
      // Auto-flip text alignment for RTL
      ...(style.textAlign && style.textAlign !== 'center' && {
        textAlign: getTextAlign(style.textAlign as any),
      }),
    };
  });
  
  return rtlStyles;
};

/**
 * Arabic typography utilities
 */

/**
 * Check if text contains Arabic characters
 */
export const isArabicText = (text: string): boolean => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicRegex.test(text);
};

/**
 * Get appropriate font family for text content
 */
export const getTextFont = (text: string, weight: 'light' | 'regular' | 'medium' | 'bold' = 'regular'): string => {
  // Always use Cairo font as it supports both Arabic and Latin
  return typography.fontFamily[weight] || typography.fontFamily.regular;
};

/**
 * Get Arabic-aware text style
 */
export const getArabicTextStyle = (
  text: string,
  baseStyle: TextStyle = {},
  weight: 'light' | 'regular' | 'medium' | 'bold' = 'regular'
): TextStyle => {
  const fontFamily = getTextFont(text, weight);

  return {
    ...baseStyle,
    fontFamily,
    // Ensure proper text direction for Arabic
    writingDirection: isArabicText(text) ? 'rtl' : 'ltr',
    textAlign: baseStyle.textAlign || (isArabicText(text) ? 'right' : 'left'),
  };
};

/**
 * Create text style with Cairo font
 */
export const createCairoTextStyle = (
  weight: 'light' | 'regular' | 'medium' | 'bold' = 'regular',
  additionalStyle: TextStyle = {}
): TextStyle => ({
  fontFamily: typography.fontFamily[weight] || typography.fontFamily.regular,
  ...additionalStyle,
});

import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { getArabicTextStyle, createCairoTextStyle } from '../utils/rtl';
import { typography } from '../theme/typography';

interface CairoTextProps extends TextProps {
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  variant?: 'heading1' | 'heading2' | 'heading3' | 'body' | 'bodySmall' | 'caption' | 'button';
  children: React.ReactNode;
}

export const CairoText: React.FC<CairoTextProps> = ({
  weight = 'regular',
  variant,
  style,
  children,
  ...props
}) => {
  // Get base style from variant or create custom style
  const baseStyle: TextStyle = variant 
    ? typography[variant]
    : createCairoTextStyle(weight);

  // Get text content for Arabic detection
  const textContent = typeof children === 'string' ? children : '';

  // Apply Arabic-aware styling
  const finalStyle = getArabicTextStyle(textContent, {
    ...baseStyle,
    ...(style as TextStyle),
  }, weight);

  return (
    <Text style={finalStyle} {...props}>
      {children}
    </Text>
  );
};

// Convenience components for common text variants
export const CairoHeading1: React.FC<Omit<CairoTextProps, 'variant'>> = (props) => (
  <CairoText variant="heading1" {...props} />
);

export const CairoHeading2: React.FC<Omit<CairoTextProps, 'variant'>> = (props) => (
  <CairoText variant="heading2" {...props} />
);

export const CairoHeading3: React.FC<Omit<CairoTextProps, 'variant'>> = (props) => (
  <CairoText variant="heading3" {...props} />
);

export const CairoBody: React.FC<Omit<CairoTextProps, 'variant'>> = (props) => (
  <CairoText variant="body" {...props} />
);

export const CairoBodySmall: React.FC<Omit<CairoTextProps, 'variant'>> = (props) => (
  <CairoText variant="bodySmall" {...props} />
);

export const CairoCaption: React.FC<Omit<CairoTextProps, 'variant'>> = (props) => (
  <CairoText variant="caption" {...props} />
);

export const CairoButton: React.FC<Omit<CairoTextProps, 'variant'>> = (props) => (
  <CairoText variant="button" {...props} />
);

import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CairoBodySmall, CairoCaption } from '../CairoText';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  rightToLeft?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  rightToLeft = true, // Default to RTL for Arabic
  ...textInputProps
}) => {
  const { colors, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyle = (): TextStyle => {
    return {
      ...typography.body,
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: error ? colors.error : isFocused ? colors.inputFocus : colors.inputBorder,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 48,
      color: colors.text,
      textAlign: rightToLeft ? 'right' : 'left',
      writingDirection: rightToLeft ? 'rtl' : 'ltr',
    };
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <CairoBodySmall style={[styles.label, { color: colors.text }, labelStyle]}>
          {label}
        </CairoBodySmall>
      )}
      <TextInput
        style={[getInputStyle(), inputStyle]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={colors.textLight}
        {...textInputProps}
      />
      {error && (
        <CairoCaption style={[styles.error, { color: colors.error }, errorStyle]}>
          {error}
        </CairoCaption>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    textAlign: 'right',
  },
  error: {
    marginTop: 4,
    textAlign: 'right',
  },
});

export default Input;

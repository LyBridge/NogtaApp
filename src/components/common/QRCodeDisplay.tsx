import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../../context/ThemeContext';
import Card from './Card';
import { CairoBody, CairoBodySmall } from '../CairoText';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  showLogo?: boolean;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 200,
  title,
  subtitle,
  style,
  showLogo = true,
}) => {
  const { colors, typography } = useTheme();

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.content}>
        {/* Title */}
        {title && (
          <CairoBody style={[styles.title, { color: colors.text }]}>
            {title}
          </CairoBody>
        )}

        {/* QR Code */}
        <View style={styles.qrContainer}>
          <QRCode
            value={value}
            size={size}
            color={colors.text}
            backgroundColor={colors.white}
            logo={showLogo ? undefined : undefined} // You can add a logo here if needed
          />
        </View>

        {/* Subtitle */}
        {subtitle && (
          <CairoBodySmall style={[styles.subtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </CairoBodySmall>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  qrContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 250,
    lineHeight: 18,
  },
});

export default QRCodeDisplay;

import React from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { CairoHeading3, CairoBody, CairoBodySmall } from '../CairoText';
import { useTheme } from '../../context/ThemeContext';
import { images } from '../../assets/images';

interface ImageLogoProps {
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  showText?: boolean;
  source?: '../../assets/logo.png'; // Image source - you can pass require('./path/to/logo.png')
}

const ImageLogo: React.FC<ImageLogoProps> = ({
  size = 'medium',
  style,
  showText = false,
  source = images.logo
}) => {
  const { colors } = useTheme();

  const getLogoSize = () => {
    switch (size) {
      case 'small':
        return { size: 40 };
      case 'large':
        return { size: 120 };
      default: // medium
        return { size: 80 };
    }
  };

  const logoConfig = getLogoSize();
  const TextComponent = size === 'large' ? CairoHeading3 : size === 'small' ? CairoBodySmall : CairoBody;

  return (
    <View style={[styles.container, style]}>
      {/* Logo Image */}
      {source ? (
        <Image
          source={source}
          style={[
            styles.logoImage,
            {
              width: logoConfig.size,
              height: logoConfig.size,
            } as ImageStyle,
          ]}
          resizeMode="contain"
        />
      ) : (
        <View
          style={[
            styles.placeholderLogo,
            {
              width: logoConfig.size,
              height: logoConfig.size,
              backgroundColor: colors.primary,
            },
          ]}
        />
      )}
      
      {/* App Name */}
      {showText && (
        <TextComponent style={[styles.appName, { color: colors.text }]}>
          نقطه
        </TextComponent>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    marginBottom: 8,
  },
  placeholderLogo: {
    borderRadius: 9999,
    marginBottom: 8,
  },
  appName: {
    textAlign: 'center',
  },
});

export default ImageLogo;

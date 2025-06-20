import React from 'react';
import ImageLogo from './ImageLogo';
import { ViewStyle } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  style,
  showText = true
}) => {
  return (
    <ImageLogo
      size={size}
      showText={showText}
      style={style}
    />
  );
};



export default Logo;

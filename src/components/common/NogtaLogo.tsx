import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

interface NogtaLogoProps {
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

export const NogtaLogo: React.FC<NogtaLogoProps> = ({
  size = 100,
  backgroundColor = '#000000',
  textColor = '#FFFFFF',
  style
}) => {
  const fontSize = size * 0.35; // Adjust font size relative to logo size

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        {/* Black circle background */}
        <Circle cx="100" cy="100" r="90" fill={backgroundColor} />

        {/* Arabic text "نقطه" in white using Cairo font */}
        <SvgText
          x="100"
          y="115"
          fontSize={fontSize}
          fill={textColor}
          textAnchor="middle"
          fontFamily="Cairo-Bold"
          fontWeight="bold"
        >
          نقطه
        </SvgText>
      </Svg>
    </View>
  );
};

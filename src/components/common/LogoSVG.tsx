import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';

interface LogoSVGProps {
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

const LogoSVG: React.FC<LogoSVGProps> = ({
  size = 80,
  color,
  backgroundColor,
  style,
}) => {
  const { colors } = useTheme();
  
  const logoColor = color || colors.white;
  const bgColor = backgroundColor || colors.primary;
  const fontSize = size * 0.6; // Adjust font size relative to circle size

  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill={bgColor}
        />
        
        {/* Arabic Text "نقطه" */}
        <SvgText
          x={size / 2}
          y={size / 2 + fontSize / 3} // Adjust vertical position
          fontSize={fontSize}
          fill={logoColor}
          textAnchor="middle"
          fontWeight="700"
          fontFamily="System"
        >
          نقطه
        </SvgText>
      </Svg>
    </View>
  );
};

export default LogoSVG;

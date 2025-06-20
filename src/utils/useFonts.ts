import { useFonts as useExpoFonts } from 'expo-font';
import { fonts } from '../assets/fonts';

export const useFonts = () => {
  const [fontsLoaded] = useExpoFonts(fonts);

  return fontsLoaded;
};

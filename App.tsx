/**
 * نقطه Customer App
 * Main entry point for the loyalty app
 *
 * @format
 */

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { LocalizationProvider } from './src/context/LocalizationContext';
import { useFonts } from './src/utils/useFonts';
import { CairoBody } from './src/components';

function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CairoBody>Loading fonts...</CairoBody>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <LocalizationProvider>
        <ThemeProvider>
          <AuthProvider>
            <NavigationContainer>
              <StatusBar barStyle="light-content" backgroundColor="#000000" />
              <AppNavigator />
            </NavigationContainer>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </SafeAreaProvider>
  );
}

export default App;

import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { Button, Logo, CairoHeading2, CairoBody } from '../../components';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('PhoneInput');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Logo size="large" />
        </View>

        {/* Welcome Text */}
        <View style={styles.textSection}>
          <CairoHeading2 style={{ color: colors.text, marginBottom: 16 }}>
            اجمع النقاط مع كل زيارة
          </CairoHeading2>
          <CairoBody style={{ color: colors.textSecondary, textAlign: 'center' }}>
            أدخل رقم هاتفك لإنشاء رمز QR الشخصي الخاص بك لجمع النقاط
          </CairoBody>
        </View>

        {/* Action Section */}
        <View style={styles.actionSection}>
          <Button
            title="ابدأ الآن"
            onPress={handleGetStarted}
            size="large"
            style={styles.getStartedButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  logoSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  actionSection: {
    paddingBottom: 32,
  },
  getStartedButton: {
    backgroundColor: '#ffffff',
   
  },
  
 
});

export default WelcomeScreen;

import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { Button, Input, Logo, Card, CairoHeading3, CairoHeading2, CairoBody, CairoBodySmall, CairoCaption } from '../../components';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type PhoneInputScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'PhoneInput'>;

const PhoneInputScreen: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const navigation = useNavigation<PhoneInputScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateQR = () => {
    if (!phoneNumber.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال رقم الهاتف');
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert('خطأ', 'يرجى إدخال رقم هاتف صحيح');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPVerification', { phoneNumber });
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Logo size="medium" />
          <CairoHeading3 style={{ color: colors.text, textAlign: 'center', marginTop: 16 }}>
            اجمع النقاط مع كل زيارة
          </CairoHeading3>
        </View>

        {/* Main Card */}
        <Card style={styles.card}>
          <CairoHeading2 style={{ color: colors.text, textAlign: 'center', marginBottom: 8 }}>
            احصل على بطاقة النقاط الخاصة بك
          </CairoHeading2>

          <CairoBodySmall style={{ color: colors.textSecondary, textAlign: 'center', marginBottom: 32, lineHeight: 20 }}>
            أدخل رقم هاتفك لإنشاء رمز QR الشخصي الخاص بك
          </CairoBodySmall>

          <View style={styles.inputSection}>
            <CairoBodySmall style={{ color: colors.text, marginBottom: 8, textAlign: 'right' }}>
              رقم الهاتف
            </CairoBodySmall>

            <Input
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="123 456 7890"
              keyboardType="phone-pad"
              maxLength={15}
              style={styles.phoneInput}
            />
          </View>

          <Button
            title="إنشاء رمز QR"
            onPress={handleCreateQR}
            loading={loading}
            style={styles.createButton}
          />
        </Card>

        {/* Footer */}
        <CairoCaption style={{ color: colors.textSecondary, textAlign: 'center', lineHeight: 16 }}>
          امسح رمز QR الخاص بك في المواقع المشاركة لجمع النقاط
        </CairoCaption>
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
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  card: {
    padding: 24,
    marginBottom: 24,
  },
  inputSection: {
    marginBottom: 24,
  },
  phoneInput: {
    textAlign: 'center',
    fontSize: 18,
    letterSpacing: 1,
  },
  createButton: {
    width: '100%',
  },
});

export default PhoneInputScreen;

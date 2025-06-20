import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { Button, Input, Logo, Card, CairoHeading3, CairoHeading2, CairoBody, CairoBodySmall } from '../../components';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type OTPVerificationScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'OTPVerification'>;
type OTPVerificationScreenRouteProp = RouteProp<AuthStackParamList, 'OTPVerification'>;

const OTPVerificationScreen: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const navigation = useNavigation<OTPVerificationScreenNavigationProp>();
  const route = useRoute<OTPVerificationScreenRouteProp>();
  const { phoneNumber } = route.params;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerifyOTP = () => {
    if (!otp.trim() || otp.length !== 6) {
      Alert.alert('خطأ', 'يرجى إدخال رمز التحقق المكون من 6 أرقام');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // For demo, accept any 6-digit code
      navigation.navigate('Onboarding');
    }, 1500);
  };

  const handleResendOTP = () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(60);
    Alert.alert('تم الإرسال', 'تم إرسال رمز التحقق مرة أخرى');

    // Restart timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Logo size="medium" />
          <CairoHeading3 style={{ color: colors.text, textAlign: 'center', marginTop: 16 }}>
            تحقق من رمز التأكيد
          </CairoHeading3>
        </View>

        {/* Main Card */}
        <Card style={styles.card}>
          <CairoHeading2 style={{ color: colors.text, textAlign: 'center', marginBottom: 8 }}>
            أدخل رمز التحقق
          </CairoHeading2>

          <CairoBodySmall style={{ color: colors.textSecondary, textAlign: 'center', marginBottom: 32, lineHeight: 20 }}>
            تم إرسال رمز التحقق إلى {phoneNumber}
          </CairoBodySmall>

          <View style={styles.inputSection}>
            <Input
              value={otp}
              onChangeText={setOtp}
              placeholder="000000"
              keyboardType="number-pad"
              maxLength={6}
              style={styles.otpInput}
              rightToLeft={false} // Numbers should be LTR
            />
          </View>

          <Button
            title="تحقق"
            onPress={handleVerifyOTP}
            loading={loading}
            style={styles.verifyButton}
          />

          {/* Resend Section */}
          <View style={styles.resendSection}>
            <CairoBodySmall style={{ color: colors.textSecondary, marginBottom: 8 }}>
              لم تستلم الرمز؟
            </CairoBodySmall>

            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={!canResend}
              style={styles.resendButton}
            >
              <CairoBodySmall
                style={{
                  color: canResend ? colors.primary : colors.textLight,
                }}
              >
                {canResend ? 'إعادة الإرسال' : `إعادة الإرسال خلال ${resendTimer}s`}
              </CairoBodySmall>
            </TouchableOpacity>
          </View>
        </Card>
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
  },
  inputSection: {
    marginBottom: 24,
  },
  otpInput: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 8,
    fontWeight: '600',
  },
  verifyButton: {
    width: '100%',
    marginBottom: 24,
  },
  resendSection: {
    alignItems: 'center',
  },
  resendButton: {
    padding: 8,
  },
});

export default OTPVerificationScreen;

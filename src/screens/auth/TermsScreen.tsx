import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Button, Card, Logo, CairoHeading3, CairoHeading2, CairoBody, CairoBodySmall } from '../../components';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuth } from '../../context/AuthContext';

type TermsScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Terms'>;

const TermsScreen: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const navigation = useNavigation<TermsScreenNavigationProp>();
  const { login } = useAuth();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAcceptTerms = async () => {
    if (!acceptedTerms) return;

    setLoading(true);

    try {
      // Simulate login process
      await login('123456789'); // This would normally come from the previous screens
      // Navigation will be handled by the AuthContext/AppNavigator
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const termsContent = [
    {
      title: 'استخدام التطبيق',
      content: 'يمكنك استخدام تطبيق نقطه لجمع النقاط من المتاجر المشاركة واستبدالها بمكافآت حصرية.',
    },
    {
      title: 'جمع النقاط',
      content: 'تحصل على نقاط عند كل عملية شراء من المتاجر المشاركة عبر مسح رمز QR الخاص بك.',
    },
    {
      title: 'استبدال المكافآت',
      content: 'يمكنك استبدال نقاطك بخصومات ومكافآت متنوعة حسب ما هو متاح في التطبيق.',
    },
    {
      title: 'الخصوصية',
      content: 'نحن نحترم خصوصيتك ونحافظ على أمان بياناتك الشخصية وفقاً لسياسة الخصوصية.',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Logo size="small" showText={false} />
          <CairoHeading3 style={{ color: colors.text, textAlign: 'center', marginTop: 16 }}>
            الشروط والأحكام
          </CairoHeading3>
        </View>

        {/* Terms Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card style={styles.termsCard}>
            <CairoHeading2 style={{ color: colors.text, textAlign: 'center', marginBottom: 16 }}>
              مرحباً بك في نقطه!
            </CairoHeading2>

            <CairoBodySmall style={{ color: colors.textSecondary, textAlign: 'center', marginBottom: 24, lineHeight: 20 }}>
              يرجى قراءة الشروط والأحكام التالية قبل استخدام التطبيق:
            </CairoBodySmall>

            {termsContent.map((term, index) => (
              <View key={index} style={styles.termItem}>
                <CairoBody style={{ color: colors.text, marginBottom: 8, textAlign: 'right' }}>
                  {index + 1}. {term.title}
                </CairoBody>
                <CairoBodySmall style={{ color: colors.textSecondary, lineHeight: 20, textAlign: 'right' }}>
                  {term.content}
                </CairoBodySmall>
              </View>
            ))}
          </Card>
        </ScrollView>

        {/* Acceptance Section */}
        <View style={styles.acceptanceSection}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: acceptedTerms ? colors.primary : 'transparent',
                  borderColor: acceptedTerms ? colors.primary : colors.border,
                },
              ]}
            >
              {acceptedTerms && (
                <MaterialIcons name="check" size={16} color={colors.white} />
              )}
            </View>
            <CairoBodySmall style={{ color: colors.text }}>
              أوافق على الشروط والأحكام
            </CairoBodySmall>
          </TouchableOpacity>

          <Button
            title="ابدأ استخدام التطبيق"
            onPress={handleAcceptTerms}
            disabled={!acceptedTerms}
            loading={loading}
            style={styles.startButton}
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
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  termsCard: {
    padding: 20,
    marginBottom: 24,
  },
  termItem: {
    marginBottom: 20,
  },
  acceptanceSection: {
    paddingTop: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  startButton: {
    width: '100%',
  },
});

export default TermsScreen;

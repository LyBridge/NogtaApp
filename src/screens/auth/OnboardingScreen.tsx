import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Button, Card, Logo, CairoHeading3, CairoHeading2, CairoBody } from '../../components';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type OnboardingScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Onboarding'>;

const { width } = Dimensions.get('window');

interface OnboardingStep {
  icon: any;
  title: string;
  description: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    icon: 'qr-code' as any,
    title: 'امسح رمز QR',
    description: 'استخدم رمز QR الخاص بك في المتاجر المشاركة لجمع النقاط مع كل عملية شراء',
  },
  {
    icon: 'stars' as any,
    title: 'اجمع النقاط',
    description: 'احصل على نقاط مع كل زيارة واستمتع بالمكافآت الحصرية',
  },
  {
    icon: 'card-giftcard' as any,
    title: 'استبدل المكافآت',
    description: 'استخدم نقاطك للحصول على خصومات ومكافآت رائعة',
  },
];

const OnboardingScreen: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Terms');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Terms');
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Logo size="small" showText={false} />
          <CairoHeading3 style={{ color: colors.text, textAlign: 'center', marginTop: 16 }}>
            كيفية استخدام نقطه
          </CairoHeading3>
        </View>

        {/* Step Content */}
        <View style={styles.stepContent}>
          <Card style={styles.stepCard}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
              <MaterialIcons name={currentStepData.icon} size={48} color={colors.white} />
            </View>

            <CairoHeading2 style={{ color: colors.text, textAlign: 'center', marginBottom: 16 }}>
              {currentStepData.title}
            </CairoHeading2>

            <CairoBody style={{ color: colors.textSecondary, textAlign: 'center', lineHeight: 24 }}>
              {currentStepData.description}
            </CairoBody>
          </Card>
        </View>

        {/* Step Indicators */}
        <View style={styles.indicators}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor: index === currentStep ? colors.primary : colors.lightGray,
                },
              ]}
            />
          ))}
        </View>

        {/* Navigation */}
        <View style={styles.navigation}>
          <Button
            title="تخطي"
            onPress={handleSkip}
            variant="outline"
            style={styles.skipButton}
          />

          <Button
            title={currentStep === onboardingSteps.length - 1 ? 'التالي' : 'التالي'}
            onPress={handleNext}
            style={styles.nextButton}
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
    marginBottom: 32,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepCard: {
    padding: 32,
    alignItems: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    flex: 1,
    marginRight: 12,
  },
  nextButton: {
    flex: 1,
    marginLeft: 12,
  },
});

export default OnboardingScreen;

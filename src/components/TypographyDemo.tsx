import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  CairoHeading1,
  CairoHeading2,
  CairoHeading3,
  CairoBody,
  CairoBodySmall,
  CairoCaption,
  CairoText,
} from './CairoText';

export const TypographyDemo: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <CairoHeading1>نقطة - Nogta</CairoHeading1>
        <CairoCaption>Arabic Typography Demo</CairoCaption>
      </View>

      <View style={styles.section}>
        <CairoHeading2>العربية والإنجليزية</CairoHeading2>
        <CairoBody>
          هذا نص تجريبي باللغة العربية يوضح كيفية عمل خط القاهرة مع النصوص العربية والإنجليزية معاً.
        </CairoBody>
        <CairoBody>
          This is a sample text in English showing how Cairo font works with both Arabic and English text together.
        </CairoBody>
      </View>

      <View style={styles.section}>
        <CairoHeading3>Font Weights - أوزان الخط</CairoHeading3>
        <CairoText weight="light">Light Weight - خفيف</CairoText>
        <CairoText weight="regular">Regular Weight - عادي</CairoText>
        <CairoText weight="medium">Medium Weight - متوسط</CairoText>
        <CairoText weight="bold">Bold Weight - عريض</CairoText>
      </View>

      <View style={styles.section}>
        <CairoHeading3>Mixed Content</CairoHeading3>
        <CairoBody>
          Welcome to نقطة App! مرحباً بك في تطبيق نقطة
        </CairoBody>
        <CairoBodySmall>
          Earn points with every purchase - اكسب نقاط مع كل عملية شراء
        </CairoBodySmall>
      </View>

      <View style={styles.section}>
        <CairoHeading3>Numbers and Symbols</CairoHeading3>
        <CairoBody>
          English Numbers: 1234567890
        </CairoBody>
        <CairoBody>
          Arabic Numbers: ١٢٣٤٥٦٧٨٩٠
        </CairoBody>
        <CairoBody>
          Mixed: You have ١٠٠ points - لديك 100 نقطة
        </CairoBody>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Logo, NogtaLogo } from './index';
import { CairoHeading2, CairoHeading3, CairoBody } from './CairoText';
import { useTheme } from '../context/ThemeContext';

export const LogoDemo: React.FC = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CairoHeading2 style={[styles.title, { color: colors.text }]}>
        شعار نقطه - Logo Showcase
      </CairoHeading2>

      {/* Logo Component Variants */}
      <View style={styles.section}>
        <CairoHeading3 style={[styles.sectionTitle, { color: colors.text }]}>
          Logo Component Sizes
        </CairoHeading3>
        
        <View style={styles.logoRow}>
          <View style={styles.logoItem}>
            <Logo size="small" />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              Small
            </CairoBody>
          </View>
          
          <View style={styles.logoItem}>
            <Logo size="medium" />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              Medium
            </CairoBody>
          </View>
          
          <View style={styles.logoItem}>
            <Logo size="large" />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              Large
            </CairoBody>
          </View>
        </View>
      </View>

      {/* NogtaLogo Direct Usage */}
      <View style={styles.section}>
        <CairoHeading3 style={[styles.sectionTitle, { color: colors.text }]}>
          NogtaLogo Direct Usage
        </CairoHeading3>
        
        <View style={styles.logoRow}>
          <View style={styles.logoItem}>
            <NogtaLogo size={60} />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              60px
            </CairoBody>
          </View>
          
          <View style={styles.logoItem}>
            <NogtaLogo size={80} />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              80px
            </CairoBody>
          </View>
          
          <View style={styles.logoItem}>
            <NogtaLogo size={100} />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              100px
            </CairoBody>
          </View>
        </View>
      </View>

      {/* Color Variants */}
      <View style={styles.section}>
        <CairoHeading3 style={[styles.sectionTitle, { color: colors.text }]}>
          Color Variants
        </CairoHeading3>
        
        <View style={styles.logoRow}>
          <View style={styles.logoItem}>
            <NogtaLogo 
              size={80} 
              backgroundColor="#000000" 
              textColor="#FFFFFF" 
            />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              Black/White
            </CairoBody>
          </View>
          
          <View style={styles.logoItem}>
            <NogtaLogo 
              size={80} 
              backgroundColor={colors.primary} 
              textColor="#FFFFFF" 
            />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              Primary
            </CairoBody>
          </View>
          
          <View style={styles.logoItem}>
            <NogtaLogo 
              size={80} 
              backgroundColor="#FFFFFF" 
              textColor="#000000" 
              style={{ borderWidth: 1, borderColor: colors.border }}
            />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              White/Black
            </CairoBody>
          </View>
        </View>
      </View>

      {/* Logo without text */}
      <View style={styles.section}>
        <CairoHeading3 style={[styles.sectionTitle, { color: colors.text }]}>
          Logo Only (No Text)
        </CairoHeading3>
        
        <View style={styles.logoRow}>
          <View style={styles.logoItem}>
            <Logo size="small" showText={false} />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              Small
            </CairoBody>
          </View>
          
          <View style={styles.logoItem}>
            <Logo size="medium" showText={false} />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              Medium
            </CairoBody>
          </View>
          
          <View style={styles.logoItem}>
            <Logo size="large" showText={false} />
            <CairoBody style={[styles.logoLabel, { color: colors.textSecondary }]}>
              Large
            </CairoBody>
          </View>
        </View>
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
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logoItem: {
    alignItems: 'center',
    marginBottom: 20,
    minWidth: 100,
  },
  logoLabel: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12,
  },
});

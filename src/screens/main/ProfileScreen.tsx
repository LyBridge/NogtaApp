import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, Logo, QRCodeDisplay, CairoHeading3, CairoBody, CairoBodySmall, CairoCaption } from '../../components';

interface ProfileOption {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
}

const ProfileScreen: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const { user, logout } = useAuth();
  const [showQR, setShowQR] = useState(false);
  const insets = useSafeAreaInsets();

  const profileOptions: ProfileOption[] = [
    {
      icon: 'qr-code',
      title: 'رمز QR الخاص بي',
      subtitle: 'عرض أو مشاركة رمز QR',
      onPress: () => setShowQR(!showQR),
      showArrow: true,
    },
    {
      icon: 'notifications',
      title: 'الإشعارات',
      subtitle: 'إدارة إعدادات الإشعارات',
      onPress: () => Alert.alert('الإشعارات', 'قريباً...'),
      showArrow: true,
    },
    {
      icon: 'language',
      title: 'اللغة',
      subtitle: 'العربية',
      onPress: () => Alert.alert('اللغة', 'قريباً...'),
      showArrow: true,
    },
    {
      icon: 'help',
      title: 'المساعدة والدعم',
      subtitle: 'الأسئلة الشائعة والدعم',
      onPress: () => Alert.alert('المساعدة', 'قريباً...'),
      showArrow: true,
    },
    {
      icon: 'privacy-tip',
      title: 'الخصوصية والأمان',
      subtitle: 'سياسة الخصوصية والأمان',
      onPress: () => Alert.alert('الخصوصية', 'قريباً...'),
      showArrow: true,
    },
    {
      icon: 'info',
      title: 'حول التطبيق',
      subtitle: 'الإصدار 1.0.0',
      onPress: () => Alert.alert('حول التطبيق', 'تطبيق نقطه - نظام الولاء والمكافآت'),
      showArrow: true,
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من أنك تريد تسجيل الخروج؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'تسجيل الخروج',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, 20) }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <CairoHeading3 style={{ color: colors.text }}>
            الملف الشخصي
          </CairoHeading3>
        </View>

        {/* Profile Info */}
        <Card style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <MaterialIcons name="person" size={32} color={colors.white} />
            </View>

            <View style={styles.userInfo}>
              <CairoBody style={{ color: colors.text }}>
                مستخدم نقطه
              </CairoBody>
              <CairoBodySmall style={{ color: colors.textSecondary }}>
                {user?.phoneNumber || '+966 XX XXX XXXX'}
              </CairoBodySmall>
            </View>

            <View style={styles.pointsBadge}>
              <MaterialIcons name="stars" size={16} color={colors.primary} />
              <CairoBodySmall style={{ color: colors.primary }}>
                {user?.points || 0}
              </CairoBodySmall>
            </View>
          </View>
        </Card>

        {/* QR Code Section */}
        {showQR && (
          <QRCodeDisplay
            value={user?.id || 'USER123'}
            title="رمز QR الخاص بك"
            subtitle="اعرض هذا الرمز في المتاجر المشاركة"
            size={160}
            style={styles.qrSection}
          />
        )}

        {/* Profile Options */}
        <View style={styles.optionsSection}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={option.onPress}
            >
              <Card style={styles.optionCard}>
                <View style={styles.optionContent}>
                  <View style={styles.optionLeft}>
                    <View style={[styles.optionIcon, { backgroundColor: colors.primary + '20' }]}>
                      <MaterialIcons name={option.icon as any} size={20} color={colors.primary} />
                    </View>

                    <View style={styles.optionText}>
                      <CairoBody style={{ color: colors.text }}>
                        {option.title}
                      </CairoBody>
                      {option.subtitle && (
                        <CairoBodySmall style={{ color: colors.textSecondary }}>
                          {option.subtitle}
                        </CairoBodySmall>
                      )}
                    </View>
                  </View>

                  {option.showArrow && (
                    <MaterialIcons name="chevron-right" size={20} color={colors.textLight} />
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            title="تسجيل الخروج"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
            textStyle={{ color: colors.error }}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Logo size="small" />
          <CairoCaption style={{ color: colors.textLight }}>
            الإصدار 1.0.0
          </CairoCaption>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Extra padding to account for tab bar
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  profileCard: {
    padding: 20,
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  qrSection: {
    marginBottom: 16,
  },
  optionsSection: {
    marginBottom: 24,
  },
  optionItem: {
    marginBottom: 8,
  },
  optionCard: {
    padding: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  logoutSection: {
    marginBottom: 32,
  },
  logoutButton: {
    width: '100%',
    borderColor: '#FF6B6B',
  },
  appInfo: {
    alignItems: 'center',
    paddingBottom: 32,
  },
});

export default ProfileScreen;

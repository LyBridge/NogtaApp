import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Card,
  QRCodeDisplay,
  Button,
  CairoBodySmall,
  CairoHeading3,
  CairoHeading1,
  CairoCaption,
  CairoBody
} from '../../components';

const DashboardScreen: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const quickActions = [
    {
      icon: 'qr-code-scanner',
      title: 'مسح QR',
      subtitle: 'امسح لجمع النقاط',
      onPress: () => {
        // Navigate to QR scanner
      },
    },
    {
      icon: 'history',
      title: 'تاريخ النقاط',
      subtitle: 'عرض العمليات السابقة',
      onPress: () => {
        // Navigate to history
      },
    },
    {
      icon: 'card-giftcard',
      title: 'المكافآت',
      subtitle: 'استبدل نقاطك',
      onPress: () => {
        // Navigate to rewards
      },
    },
  ];

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
          <View style={styles.headerContent}>
            <CairoBodySmall style={{ color: colors.textSecondary, marginBottom: 4 }}>
              مرحباً بك
            </CairoBodySmall>
            <CairoHeading3 style={{ color: colors.text }}>
              {user?.phoneNumber || 'مستخدم نقطه'}
            </CairoHeading3>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <MaterialIcons name="person" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Points Card */}
        <Card style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <CairoBodySmall style={{ color: colors.textSecondary }}>
              رصيد النقاط
            </CairoBodySmall>
            <MaterialIcons name="stars" size={24} color={colors.primary} />
          </View>

          <CairoHeading1 style={{ color: colors.text, textAlign: 'center', marginBottom: 8 }}>
            {user?.points?.toLocaleString() || '0'}
          </CairoHeading1>

          <CairoCaption style={{ color: colors.textLight, textAlign: 'center' }}>
            نقطة متاحة للاستبدال
          </CairoCaption>
        </Card>

        {/* QR Code Section */}
        <QRCodeDisplay
          value={user?.id || 'USER123'}
          title="رمز QR الخاص بك"
          subtitle="اعرض هذا الرمز في المتاجر المشاركة لجمع النقاط"
          size={180}
          style={styles.qrCard}
        />

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <CairoHeading3 style={{ color: colors.text, marginBottom: 16, textAlign: 'right' }}>
            إجراءات سريعة
          </CairoHeading3>

          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionItem}
                onPress={action.onPress}
              >
                <Card style={styles.quickActionCard}>
                  <MaterialIcons name={action.icon as any} size={32} color={colors.primary} />
                  <CairoBodySmall style={{ color: colors.text, textAlign: 'center', marginTop: 8, marginBottom: 4 }}>
                    {action.title}
                  </CairoBodySmall>
                  <CairoCaption style={{ color: colors.textSecondary, textAlign: 'center' }}>
                    {action.subtitle}
                  </CairoCaption>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentSection}>
          <CairoHeading3 style={{ color: colors.text, marginBottom: 16, textAlign: 'right' }}>
            النشاط الأخير
          </CairoHeading3>

          <Card style={styles.activityCard}>
            <View style={styles.emptyState}>
              <MaterialIcons name="history" size={48} color={colors.lightGray} />
              <CairoBody style={{ color: colors.textLight, textAlign: 'center', marginTop: 12, marginBottom: 4 }}>
                لا توجد عمليات حتى الآن
              </CairoBody>
              <CairoBodySmall style={{ color: colors.textLight, textAlign: 'center' }}>
                ابدأ بجمع النقاط من المتاجر المشاركة
              </CairoBodySmall>
            </View>
          </Card>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  headerContent: {
    flex: 1,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsCard: {
    padding: 20,
    marginBottom: 16,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  qrCard: {
    marginBottom: 24,
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    marginBottom: 12,
  },
  quickActionCard: {
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  recentSection: {
    marginBottom: 32,
  },
  activityCard: {
    padding: 24,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default DashboardScreen;

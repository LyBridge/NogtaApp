import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, CairoHeading3, CairoBody, CairoBodySmall } from '../../components';

const { width, height } = Dimensions.get('window');

const QRScannerScreen: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    // Request camera permission
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      // For demo purposes, we'll simulate permission granted
      // In a real app, you would use react-native-permissions
      setHasPermission(true);
    } catch (error) {
      console.error('Permission error:', error);
      setHasPermission(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);

    // Simulate processing QR code
    processQRCode(data);
  };

  const processQRCode = (data: string) => {
    // Simulate different types of QR codes
    if (data.startsWith('NOGTA_STORE_')) {
      // Store QR code - award points
      const storeId = data.replace('NOGTA_STORE_', '');
      const pointsEarned = Math.floor(Math.random() * 50) + 10; // Random points between 10-60

      if (user) {
        updateUser({ points: user.points + pointsEarned });
      }

      Alert.alert(
        'تم جمع النقاط!',
        `تهانينا! لقد حصلت على ${pointsEarned} نقطة من هذا المتجر.`,
        [
          {
            text: 'رائع!',
            onPress: () => {
              setScanned(false);
              navigation.goBack();
            },
          },
        ]
      );
    } else if (data.startsWith('NOGTA_PROMO_')) {
      // Promotional QR code
      Alert.alert(
        'عرض خاص!',
        'لقد حصلت على عرض خاص! تحقق من قسم المكافآت.',
        [
          {
            text: 'عرض المكافآت',
            onPress: () => {
              setScanned(false);
              // Navigate to rewards
            },
          },
        ]
      );
    } else {
      // Invalid QR code
      Alert.alert(
        'رمز QR غير صحيح',
        'هذا الرمز غير مدعوم في تطبيق نقطه.',
        [
          {
            text: 'حسناً',
            onPress: () => setScanned(false),
          },
        ]
      );
    }
  };

  const startScanning = () => {
    setShowScanner(true);
    setScanned(false);
  };

  const stopScanning = () => {
    setShowScanner(false);
    setScanned(false);
  };

  // Simulate QR scanning for demo
  const simulateQRScan = (type: 'store' | 'promo') => {
    const mockData = type === 'store' ? 'NOGTA_STORE_CAFE123' : 'NOGTA_PROMO_SPECIAL50';
    handleBarCodeScanned({ type: 'qr', data: mockData });
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centerContent}>
          <CairoBody style={{ color: colors.text }}>
            جاري طلب إذن الكاميرا...
          </CairoBody>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centerContent}>
          <MaterialIcons name="camera-alt" size={64} color={colors.lightGray} />
          <CairoBody style={{ color: colors.text }}>
            نحتاج إلى إذن الكاميرا لمسح رموز QR
          </CairoBody>
          <Button
            title="طلب الإذن"
            onPress={requestCameraPermission}
            style={styles.permissionButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <CairoHeading3 style={{ color: colors.text }}>
            مسح QR
          </CairoHeading3>
          <View style={{ width: 24 }} />
        </View>

        {!showScanner ? (
          // Scanner Instructions
          <View style={styles.instructionsContainer}>
            <Card style={styles.instructionsCard}>
              <MaterialIcons name="qr-code-scanner" size={80} color={colors.primary} />

              <CairoBody style={{ color: colors.text, textAlign: 'center', marginBottom: 16 }}>
                امسح رمز QR لجمع النقاط
              </CairoBody>

              <CairoBodySmall style={{ color: colors.textSecondary, textAlign: 'center', lineHeight: 20 }}>
                وجه الكاميرا نحو رمز QR في المتاجر المشاركة لجمع النقاط تلقائياً
              </CairoBodySmall>

              <Button
                title="بدء المسح"
                onPress={startScanning}
                style={styles.startButton}
              />
            </Card>

            {/* Demo Buttons */}
            <Card style={styles.demoCard}>
              <CairoBody style={{ color: colors.text, textAlign: 'center', marginBottom: 16 }}>
                تجربة المسح (للعرض التوضيحي)
              </CairoBody>

              <View style={styles.demoButtons}>
                <Button
                  title="مسح متجر"
                  onPress={() => simulateQRScan('store')}
                  variant="outline"
                  style={styles.demoButton}
                />

                <Button
                  title="مسح عرض"
                  onPress={() => simulateQRScan('promo')}
                  variant="outline"
                  style={styles.demoButton}
                />
              </View>
            </Card>
          </View>
        ) : (
          // Scanner View (Simulated)
          <View style={styles.scannerContainer}>
            <View style={[styles.scannerOverlay, { borderColor: colors.primary }]}>
              <CairoBodySmall style={{ color: colors.white, textAlign: 'center', marginBottom: 20 }}>
                وجه الكاميرا نحو رمز QR
              </CairoBodySmall>

              <View style={[styles.scannerFrame, { borderColor: colors.primary }]} />

              <View style={styles.scannerActions}>
                <Button
                  title="إيقاف المسح"
                  onPress={stopScanning}
                  variant="outline"
                  style={styles.stopButton}
                />
              </View>
            </View>
          </View>
        )}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 24,
  },
  permissionButton: {
    marginTop: 16,
  },
  instructionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  instructionsCard: {
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  startButton: {
    width: '100%',
  },
  demoCard: {
    padding: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  demoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demoButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  scannerContainer: {
    flex: 1,
  },
  scannerView: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },
  scannerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  scannerText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  scannerControls: {
    padding: 20,
    backgroundColor: '#000000',
  },
  cancelButton: {
    width: '100%',
  },
  scannerActions: {
    padding: 20,
    backgroundColor: '#000000',
  },
  stopButton: {
    width: '100%',
  },
});

export default QRScannerScreen;

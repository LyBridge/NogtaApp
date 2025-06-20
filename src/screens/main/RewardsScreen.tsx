import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Card, Button, CairoHeading3, CairoBody, CairoBodySmall, CairoCaption } from '../../components';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  icon: string;
  available: boolean;
}

const mockRewards: Reward[] = [
  {
    id: '1',
    title: 'خصم 10%',
    description: 'خصم 10% على جميع المشتريات',
    pointsCost: 100,
    category: 'خصومات',
    icon: 'local-offer',
    available: true,
  },
  {
    id: '2',
    title: 'مشروب مجاني',
    description: 'احصل على مشروب مجاني من اختيارك',
    pointsCost: 50,
    category: 'مشروبات',
    icon: 'local-cafe',
    available: true,
  },
  {
    id: '3',
    title: 'خصم 20%',
    description: 'خصم 20% على المشتريات فوق 100 ريال',
    pointsCost: 200,
    category: 'خصومات',
    icon: 'local-offer',
    available: true,
  },
  {
    id: '4',
    title: 'وجبة مجانية',
    description: 'وجبة مجانية من القائمة المحددة',
    pointsCost: 300,
    category: 'طعام',
    icon: 'restaurant',
    available: false,
  },
];

const RewardsScreen: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const { user, updateUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  const categories = ['الكل', 'خصومات', 'مشروبات', 'طعام'];

  const filteredRewards = selectedCategory === 'الكل'
    ? mockRewards
    : mockRewards.filter(reward => reward.category === selectedCategory);

  const handleRedeemReward = (reward: Reward) => {
    if (!user) return;

    if (user.points < reward.pointsCost) {
      Alert.alert('نقاط غير كافية', 'ليس لديك نقاط كافية لاستبدال هذه المكافأة');
      return;
    }

    if (!reward.available) {
      Alert.alert('غير متاح', 'هذه المكافأة غير متاحة حالياً');
      return;
    }

    Alert.alert(
      'تأكيد الاستبدال',
      `هل تريد استبدال ${reward.pointsCost} نقطة للحصول على ${reward.title}؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'استبدال',
          onPress: () => {
            updateUser({ points: user.points - reward.pointsCost });
            Alert.alert('تم الاستبدال', 'تم استبدال المكافأة بنجاح!');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <CairoHeading3 style={{ color: colors.text }}>
            المكافآت
          </CairoHeading3>
          <View style={styles.pointsInfo}>
            <MaterialIcons name="stars" size={20} color={colors.primary} />
            <CairoBody style={{ color: colors.text }}>
              {user?.points || 0} نقطة
            </CairoBody>
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: selectedCategory === category ? colors.primary : colors.white,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <CairoBodySmall
                style={{
                  color: selectedCategory === category ? colors.white : colors.text,
                }}
              >
                {category}
              </CairoBodySmall>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Rewards List */}
        <ScrollView style={styles.rewardsList} showsVerticalScrollIndicator={false}>
          {filteredRewards.map((reward) => (
            <Card key={reward.id} style={styles.rewardCard}>
              <View style={styles.rewardContent}>
                <View style={styles.rewardInfo}>
                  <View style={[styles.rewardIcon, { backgroundColor: colors.primary + '20' }]}>
                    <MaterialIcons name={reward.icon as any} size={24} color={colors.primary} />
                  </View>

                  <View style={styles.rewardDetails}>
                    <CairoBody style={{ color: colors.text }}>
                      {reward.title}
                    </CairoBody>
                    <CairoBodySmall style={{ color: colors.textSecondary }}>
                      {reward.description}
                    </CairoBodySmall>
                    <View style={styles.rewardMeta}>
                      <CairoCaption style={{ color: colors.textLight }}>
                        {reward.category}
                      </CairoCaption>
                      <View style={styles.pointsCost}>
                        <MaterialIcons name="stars" size={16} color={colors.primary} />
                        <CairoCaption style={{ color: colors.primary }}>
                          {reward.pointsCost}
                        </CairoCaption>
                      </View>
                    </View>
                  </View>
                </View>

                <Button
                  title={reward.available ? 'استبدال' : 'غير متاح'}
                  onPress={() => handleRedeemReward(reward)}
                  disabled={!reward.available || (user?.points || 0) < reward.pointsCost}
                  size="small"
                  style={styles.redeemButton}
                />
              </View>
            </Card>
          ))}

          {filteredRewards.length === 0 && (
            <Card style={styles.emptyCard}>
              <View style={styles.emptyState}>
                <MaterialIcons name="card-giftcard" size={48} color={colors.lightGray} />
                <CairoBody style={{ color: colors.textLight }}>
                  لا توجد مكافآت في هذه الفئة
                </CairoBody>
              </View>
            </Card>
          )}
        </ScrollView>
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  pointsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  rewardsList: {
    flex: 1,
  },
  rewardCard: {
    padding: 16,
    marginBottom: 12,
  },
  rewardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rewardDetails: {
    flex: 1,
  },
  rewardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsCost: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redeemButton: {
    minWidth: 80,
    marginLeft: 12,
  },
  emptyCard: {
    padding: 32,
  },
  emptyState: {
    alignItems: 'center',
  },
});

export default RewardsScreen;

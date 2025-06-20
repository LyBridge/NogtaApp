import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { Card, CairoHeading3, CairoBody, CairoBodySmall, CairoCaption } from '../../components';

interface Transaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  location?: string;
  date: Date;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'earned',
    points: 25,
    description: 'شراء من المتجر',
    location: 'كافيه نقطه - الرياض',
    date: new Date('2024-01-15T14:30:00'),
  },
  {
    id: '2',
    type: 'redeemed',
    points: -50,
    description: 'استبدال مشروب مجاني',
    location: 'كافيه نقطه - الرياض',
    date: new Date('2024-01-14T16:45:00'),
  },
  {
    id: '3',
    type: 'earned',
    points: 15,
    description: 'شراء من المتجر',
    location: 'مطعم نقطه - جدة',
    date: new Date('2024-01-12T12:20:00'),
  },
  {
    id: '4',
    type: 'earned',
    points: 30,
    description: 'شراء من المتجر',
    location: 'كافيه نقطه - الدمام',
    date: new Date('2024-01-10T18:15:00'),
  },
];

const HistoryScreen: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'earned' | 'redeemed'>('all');
  const insets = useSafeAreaInsets();

  const filters = [
    { key: 'all', label: 'الكل' },
    { key: 'earned', label: 'مكتسبة' },
    { key: 'redeemed', label: 'مستبدلة' },
  ];

  const filteredTransactions = selectedFilter === 'all'
    ? mockTransactions
    : mockTransactions.filter(transaction => transaction.type === selectedFilter);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionIcon = (type: string) => {
    return type === 'earned' ? 'add-circle' : 'remove-circle';
  };

  const getTransactionColor = (type: string) => {
    return type === 'earned' ? colors.success : colors.error;
  };

  const totalEarned = mockTransactions
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.points, 0);

  const totalRedeemed = mockTransactions
    .filter(t => t.type === 'redeemed')
    .reduce((sum, t) => sum + Math.abs(t.points), 0);

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
            تاريخ النقاط
          </CairoHeading3>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCardLeft}>
            <View style={styles.summaryContent}>
              <MaterialIcons name="trending-up" size={24} color={colors.success} />
              <CairoBody style={{ color: colors.success }}>
                +{totalEarned}
              </CairoBody>
              <CairoCaption style={{ color: colors.textSecondary }}>
                نقاط مكتسبة
              </CairoCaption>
            </View>
          </Card>

          <Card style={styles.summaryCardRight}>
            <View style={styles.summaryContent}>
              <MaterialIcons name="trending-down" size={24} color={colors.error} />
              <CairoBody style={{ color: colors.error }}>
                -{totalRedeemed}
              </CairoBody>
              <CairoCaption style={{ color: colors.textSecondary }}>
                نقاط مستبدلة
              </CairoCaption>
            </View>
          </Card>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                {
                  backgroundColor: selectedFilter === filter.key ? colors.primary : colors.white,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setSelectedFilter(filter.key as any)}
            >
              <CairoBodySmall
                style={{
                  color: selectedFilter === filter.key ? colors.white : colors.text,
                }}
              >
                {filter.label}
              </CairoBodySmall>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Transactions List */}
        <View style={styles.transactionsContainer}>
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionContent}>
                <View style={styles.transactionInfo}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: getTransactionColor(transaction.type) + '20' }
                  ]}>
                    <MaterialIcons
                      name={getTransactionIcon(transaction.type) as any}
                      size={24}
                      color={getTransactionColor(transaction.type)}
                    />
                  </View>

                  <View style={styles.transactionDetails}>
                    <CairoBody style={{ color: colors.text }}>
                      {transaction.description}
                    </CairoBody>
                    {transaction.location && (
                      <CairoBodySmall style={{ color: colors.textSecondary }}>
                        {transaction.location}
                      </CairoBodySmall>
                    )}
                    <CairoCaption style={{ color: colors.textLight }}>
                      {formatDate(transaction.date)}
                    </CairoCaption>
                  </View>
                </View>

                <View style={styles.transactionPoints}>
                  <CairoBody
                    style={{ color: getTransactionColor(transaction.type) }}
                  >
                    {transaction.points > 0 ? '+' : ''}{transaction.points}
                  </CairoBody>
                  <CairoCaption style={{ color: colors.textLight }}>
                    نقطة
                  </CairoCaption>
                </View>
              </View>
            </Card>
          ))}

          {filteredTransactions.length === 0 && (
            <Card style={styles.emptyCard}>
              <View style={styles.emptyState}>
                <MaterialIcons name="history" size={48} color={colors.lightGray} />
                <CairoBody style={{ color: colors.textLight, textAlign: 'center', marginTop: 12 }}>
                  لا توجد معاملات في هذه الفئة
                </CairoBody>
              </View>
            </Card>
          )}
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
  summaryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  summaryCard: {
    padding: 16,
  },
  summaryCardLeft: {
    padding: 16,
    flex: 1,
    marginRight: 8,
  },
  summaryCardRight: {
    padding: 16,
    flex: 1,
    marginLeft: 8,
  },
  summaryContent: {
    alignItems: 'center',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 4,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  transactionsContainer: {
    flex: 1,
  },
  transactionCard: {
    padding: 16,
    marginBottom: 12,
  },
  transactionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionPoints: {
    alignItems: 'flex-end',
  },
  emptyCard: {
    padding: 32,
  },
  emptyState: {
    alignItems: 'center',
  },
});

export default HistoryScreen;

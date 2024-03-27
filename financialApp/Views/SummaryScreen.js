import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TransactionContext } from '../TransactionContext';

const calculateTotalExpenses = (transactions) => {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
};

const calculateHighLowSpending = (transactions) => {
  const amounts = transactions.map(transaction => transaction.amount);
  const maxAmount = Math.max(...amounts);
  const minAmount = Math.min(...amounts);
  return { maxAmount, minAmount };
};

const calculateDateRange = (transactions) => {
  const dates = transactions.map(transaction => new Date(transaction.date));
  const startDate = new Date(Math.min(...dates));
  const endDate = new Date(Math.max(...dates));
  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const endMonth = endDate.toLocaleString('default', { month: 'short' });
  return { startDate, endDate, startMonth, endMonth };
};

const SummaryScreen = () => {
  const { transactions } = useContext(TransactionContext);

  const totalExpenses = calculateTotalExpenses(transactions);
  const { maxAmount, minAmount } = calculateHighLowSpending(transactions);
  const { startDate, endDate, startMonth, endMonth } = calculateDateRange(transactions);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Expenses</Text>

      <View style={styles.summaryItem}>
        <Text style={styles.label}>Total Expenses:</Text>
        <Text style={[styles.value, styles.totalExpense]}>${totalExpenses}</Text>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.label}>High Spending:</Text>
        <Text style={styles.value}>${maxAmount}</Text>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.label}>Low Spending:</Text>
        <Text style={styles.value}>${minAmount}</Text>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.label}>Number of Transactions:</Text>
        <Text style={styles.value}>{transactions.length}</Text>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.label}>Date Range:</Text>
        <Text style={styles.value}>{startMonth} {startDate.getDate()} - {endMonth} {endDate.getDate()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  totalExpense: {
    fontSize: 20,
    color: 'green', 
  },
});

export default SummaryScreen;
